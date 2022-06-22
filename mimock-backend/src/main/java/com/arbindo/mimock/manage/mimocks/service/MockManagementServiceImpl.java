package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.audit.AuditorService;
import com.arbindo.mimock.common.services.EntityStatusService;
import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.manage.mimocks.enums.ExpectedResponseType;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.mimocks.service.exceptions.MockAlreadyExistsException;
import com.arbindo.mimock.manage.mimocks.service.helpers.MockParamBuilder;
import com.arbindo.mimock.repository.BinaryResponseRepository;
import com.arbindo.mimock.repository.MocksRepository;
import com.arbindo.mimock.repository.TextualResponseRepository;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class MockManagementServiceImpl implements MockManagementService {

    @Autowired
    private MocksRepository mocksRepository;

    @Autowired
    private TextualResponseRepository textualResponseRepository;

    @Autowired
    private BinaryResponseRepository binaryResponseRepository;

    @Autowired
    private EntityStatusService entityStatusService;

    @Autowired
    private MockParamBuilder mockParamBuilder;

    @Autowired
    AuditorService auditorService;

    @Override
    public List<Mock> getAllMocks() {
        return mocksRepository.findAll();
    }

    @Override
    public Page<Mock> getMocksAsPageable(Pageable pageable, Status status,
                                         String httpMethod, ExpectedResponseType expectedResponseType) {
        HttpMethod httpMethodFromQueryString = null;
        EntityStatus entityStatus = null;
        if(ValidationUtil.isArgNotNull(httpMethod)){
            httpMethodFromQueryString = mockParamBuilder.findHttpMethodFromQueryString(httpMethod);
        }
        if (ValidationUtil.isArgNotNull(status)) {
            entityStatus = entityStatusService.findByEntityStatus(status.name());
        }
        if(ValidationUtil.isArgNotNull(httpMethodFromQueryString)
                && ValidationUtil.isArgNotNull(entityStatus)){
            return mocksRepository.findAllByEntityStatusAndHttpMethod(entityStatus, httpMethodFromQueryString, pageable);
        }
        if(ValidationUtil.isArgNotNull(httpMethodFromQueryString)){
            return mocksRepository.findAllByHttpMethod(httpMethodFromQueryString, pageable);
        }
        if (ValidationUtil.isArgNotNull(entityStatus)) {
            return mocksRepository.findAllByEntityStatus(entityStatus, pageable);
        }
        return mocksRepository.findAll(pageable);
    }

    @Override
    public Mock getMockById(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Optional<Mock> mock = mocksRepository.findById(UUID.fromString(mockId));
                return mock.orElseThrow(EntityNotFoundException::new);
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return null;
    }

    @Override
    public boolean hardDeleteMockById(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = getMockById(mockId);
                if (mock != null) {
                    mocksRepository.delete(mock);
                    return true;
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
                return false;
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return false;
    }

    @Transactional
    @Override
    public boolean softDeleteMockById(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = getMockById(mockId);
                if (mock != null) {
                    // Perform only soft delete i.e. Mark EntityStatus as DELETED
                    EntityStatus entityStatus = entityStatusService.getDeletedMockEntityStatus();
                    mock.setEntityStatus(entityStatus);
                    mock.setDeletedAt(ZonedDateTime.now());
                    mocksRepository.save(mock);
                    return true;
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
                return false;
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return false;
    }

    @Override
    public boolean deleteAllMocks() {
        try {
            mocksRepository.deleteAll();
            return true;
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
        }
        log.log(Level.DEBUG, "Unable to delete all mocks!");
        return false;
    }

    @Override
    public void flushDeletedMocks() {
        try {
            EntityStatus entityStatus = entityStatusService.getDeletedMockEntityStatus();
            ZonedDateTime thirtyDaysAgo = ZonedDateTime.now().minusDays(30);
            List<Mock> deletedMocks = mocksRepository.findAllByEntityStatusAndDeletedAt(entityStatus, thirtyDaysAgo);
            mocksRepository.deleteAll(deletedMocks);
            log.log(Level.INFO, "Flushed " + deletedMocks.size() + " mock(s)!");
            return;
        } catch (Exception e){
            log.log(Level.DEBUG, e.getMessage());
        }
        log.log(Level.DEBUG, "Unable to flush deleted mocks!");
    }

    @Transactional(rollbackOn = {Exception.class, RuntimeException.class, MockAlreadyExistsException.class})
    @Override
    public Mock createMock(ProcessedMockRequest request) {
        if (isMockNameAlreadyExists(request)) {
            String err = String.format("Mock with %s name already exists!", request.getName());
            log.log(Level.ERROR, err);
            throw new MockAlreadyExistsException(err);
        }

        try {
            mockParamBuilder.setRequest(request);

            log.log(Level.INFO, "Initiating new mock creation");
            Optional<Mock> matchingMock = mocksRepository.findUniqueMock(
                    request.getRoute(),
                    mockParamBuilder.httpMethod(),
                    request.getQueryParams(),
                    mockParamBuilder.requestBody(),
                    mockParamBuilder.requestHeaders()
            );

            if (matchingMock.isPresent()) {
                String err = "Mock with matching unique selectors already exist";
                log.log(Level.ERROR, err);
                throw new MockAlreadyExistsException(err);
            }

            String currentAuditor = auditorService.getCurrentAuditor();
            Mock mock = buildNewMockWith(request, mockParamBuilder, currentAuditor);
            setResponseForNewMock(request, mock);

            log.log(Level.INFO, "Saving new mock to repository");
            return mocksRepository.save(mock);
        } catch (MockAlreadyExistsException e) {
            log.log(Level.DEBUG, e.getMessage());
            throw e;
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    private void setResponseForNewMock(ProcessedMockRequest request, Mock mock) throws IOException {
        if (request.getExpectedTextResponse() == null && request.getBinaryFile() == null) {
            log.log(Level.INFO, "Mock has no response. Skipping response setup");
            return;
        }

        if (request.getExpectedTextResponse() != null) {
            log.log(Level.INFO, "Adding textual response to new mock");

            TextualResponse textualResponse = TextualResponse.builder()
                    .responseBody(request.getExpectedTextResponse())
                    .createdAt(ZonedDateTime.now())
                    .build();
            textualResponseRepository.save(textualResponse);
            mock.setTextualResponse(textualResponse);
        }

        if (request.getBinaryFile() != null) {
            log.log(Level.INFO, "Adding binary file response to new mock");

            MultipartFile file = request.getBinaryFile();
            BinaryResponse binaryResponse = BinaryResponse.builder()
                    .responseFile(file.getBytes())
                    .createdAt(ZonedDateTime.now())
                    .build();
            binaryResponseRepository.save(binaryResponse);
            mock.setBinaryResponse(binaryResponse);
        }
    }

    private Mock buildNewMockWith(ProcessedMockRequest request, MockParamBuilder mockParamBuilder,
                                  String currentAuditor) throws Exception {
        log.log(Level.INFO, "Building new mock with request values");
        UUID mockId = UUID.randomUUID();

        String responseContentTypeString = request.getResponseContentType() != null
                ? request.getResponseContentType() : "application/json";

        return Mock.builder()
                .id(mockId)
                .mockName(request.getName())
                .route(request.getRoute())
                .httpMethod(mockParamBuilder.httpMethod())
                .responseContentType(mockParamBuilder.responseContentType(responseContentTypeString))
                .statusCode(request.getStatusCode())
                .queryParams(request.getQueryParams())
                .description(request.getDescription())
                .createdAt(ZonedDateTime.now())
                .createdBy(currentAuditor)
                .modifiedBy(currentAuditor)
                .entityStatus(entityStatusService.getDefaultMockEntityStatus())
                .requestHeaders(mockParamBuilder.requestHeaders())
                .requestBodiesForMock(mockParamBuilder.requestBody())
                .responseHeaders(mockParamBuilder.responseHeaders())
                .build();
    }

    @Transactional(rollbackOn = {Exception.class, RuntimeException.class, MockAlreadyExistsException.class})
    @Override
    public Mock updateMock(String mockId, ProcessedMockRequest request) {
        try {
            Mock mock = getMockById(mockId);
            validateMockToBeUpdated(mockId, mock);

            mockParamBuilder.setRequest(request);

            String responseContentTypeString = request.getResponseContentType() != null
                    ? request.getResponseContentType() : mock.getResponseContentType().getContentType();
            String currentAuditor = auditorService.getCurrentAuditor();
            Mock updatedMock = buildMockToBeUpdated(request, mock, responseContentTypeString, currentAuditor);

            // Update Mock Name Only if it is different from existing name
            if (!StringUtils.equals(mock.getMockName(), request.getName())) {
                if (isMockNameAlreadyExists(request)) {
                    String errorMessage = String.format("Mock with %s name already exists!", request.getName());
                    log.log(Level.DEBUG, errorMessage);
                    throw new MockAlreadyExistsException(errorMessage);
                }
                updatedMock.setMockName(request.getName());
            }

            Optional<Mock> matchingMock = mocksRepository.findUniqueMock(
                    request.getRoute(),
                    mockParamBuilder.httpMethod(),
                    request.getQueryParams(),
                    mockParamBuilder.requestBody(),
                    mockParamBuilder.requestHeaders()
            );

            if (matchingMock.isPresent() && !matchingMock.get().getId().toString().equals(mockId)) {
                String errorMessage = "Mock with matching unique selectors already exist";
                log.log(Level.ERROR, errorMessage);
                throw new MockAlreadyExistsException(errorMessage);
            }

            setResponseForMockToBeUpdated(request, mock, updatedMock);

            mocksRepository.save(updatedMock);
            return updatedMock;
        } catch (MockAlreadyExistsException e) {
            log.log(Level.DEBUG, e.getMessage());
            throw e;
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    private void validateMockToBeUpdated(String mockId, Mock mock) {
        String errorMessage;
        if (mock == null) {
            errorMessage = String.format("Mock with ID : %s does not exist", mockId);
            log.log(Level.ERROR, errorMessage);
            throw new RuntimeException(errorMessage);
        }

        if (!mock.canEditMock()) {
            errorMessage = String.format("Mock with ID : %s cannot be edited", mockId);
            log.log(Level.ERROR, errorMessage);
            throw new RuntimeException(errorMessage);
        }
    }

    private Mock buildMockToBeUpdated(ProcessedMockRequest request, Mock mock, String responseContentTypeString,
                                      String currentAuditor) throws Exception {
        return Mock.builder()
                .id(mock.getId())
                .mockName(request.getName())
                .route(request.getRoute())
                .httpMethod(mockParamBuilder.httpMethod())
                .responseContentType(mockParamBuilder.responseContentType(responseContentTypeString))
                .statusCode(request.getStatusCode())
                .queryParams(request.getQueryParams())
                .description(request.getDescription())
                .createdAt(mock.getCreatedAt())
                .createdBy(mock.getCreatedBy())
                .updatedAt(ZonedDateTime.now())
                .modifiedBy(currentAuditor)
                .entityStatus(entityStatusService.getDefaultMockEntityStatus())
                .build();
    }

    private void setResponseForMockToBeUpdated(ProcessedMockRequest request, Mock mock, Mock updatedMock) throws IOException {
        if (request.getExpectedTextResponse() != null) {
            TextualResponse existingTextualResponse = mock.getTextualResponse();
            if (existingTextualResponse != null) {
                existingTextualResponse.setResponseBody(request.getExpectedTextResponse());
                existingTextualResponse.setUpdatedAt(ZonedDateTime.now());
                textualResponseRepository.save(existingTextualResponse);
                updatedMock.setTextualResponse(existingTextualResponse);
            } else {
                TextualResponse textualResponse = TextualResponse.builder()
                        .responseBody(request.getExpectedTextResponse())
                        .createdAt(ZonedDateTime.now())
                        .build();
                textualResponseRepository.save(textualResponse);
                updatedMock.setTextualResponse(textualResponse);
            }
            return;
        }

        if (request.getBinaryFile() != null) {
            MultipartFile file = request.getBinaryFile();
            BinaryResponse existingBinaryResponse = mock.getBinaryResponse();
            if (existingBinaryResponse != null) {
                existingBinaryResponse.setResponseFile(file.getBytes());
                existingBinaryResponse.setUpdatedAt(ZonedDateTime.now());
                binaryResponseRepository.save(existingBinaryResponse);
                updatedMock.setBinaryResponse(existingBinaryResponse);
            } else {
                BinaryResponse binaryResponse = BinaryResponse.builder()
                        .responseFile(file.getBytes())
                        .createdAt(ZonedDateTime.now())
                        .build();
                binaryResponseRepository.save(binaryResponse);
                updatedMock.setBinaryResponse(binaryResponse);
            }
        }
    }

    private boolean isMockNameAlreadyExists(ProcessedMockRequest request) {
        Optional<Mock> mock = mocksRepository.findOneByMockName(request.getName());
        return mock.isPresent();
    }

}
