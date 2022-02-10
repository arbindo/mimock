package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.v1.Status;
import com.arbindo.mimock.repository.*;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
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
    private HttpMethodsRepository httpMethodsRepository;

    @Autowired
    private ResponseContentTypesRepository responseContentTypesRepository;

    @Autowired
    private TextualResponseRepository textualResponseRepository;

    @Autowired
    private BinaryResponseRepository binaryResponseRepository;

    @Autowired
    private EntityStatusRepository entityStatusRepository;

    @Override
    public List<Mock> getAllMocks() {
        return mocksRepository.findAll();
    }

    @Override
    public Page<Mock> getAllActiveMocks(Pageable pageable, Status status) {
        if (ValidationUtil.isArgNotNull(status)) {
            EntityStatus entityStatus = findByEntityStatus(status.name());
            if (ValidationUtil.isArgNotNull(entityStatus)) {
                return mocksRepository.findAllByEntityStatus(entityStatus, pageable);
            }
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
                    EntityStatus entityStatus = getDeletedMockEntityStatus();
                    mock.setEntityStatus(entityStatus);
                    mock.setDeletedAt(ZonedDateTime.now());
                    mocksRepository.save(mock);
                    return true;
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
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

    @Transactional
    @Override
    public Mock createMock(MockRequest request) {
        if (ValidationUtil.isArgNull(request)) {
            log.log(Level.DEBUG, "CreateMockRequest is null!");
            return null;
        }
        if(IsMockNameAlreadyExists(request)) {
            log.log(Level.DEBUG, String.format("Mock with %s name already exists!", request.getName()));
            return null;
        }
        try {
            UUID mockId = UUID.randomUUID();
            HttpMethod httpMethod = getHttpMethod(request.getHttpMethod());
            ResponseContentType responseContentType = getResponseContentType(request.getResponseContentType());

            Mock mock = Mock.builder()
                    .id(mockId)
                    .mockName(request.getName())
                    .route(request.getRoute())
                    .httpMethod(httpMethod)
                    .responseContentType(responseContentType)
                    .statusCode(request.getStatusCode())
                    .queryParams(request.getQueryParams())
                    .description(request.getDescription())
                    .createdAt(ZonedDateTime.now())
                    .entityStatus(getDefaultMockEntityStatus())
                    .build();

            if (request.getExpectedTextResponse() != null) {
                TextualResponse textualResponse = TextualResponse.builder()
                        .responseBody(request.getExpectedTextResponse())
                        .createdAt(ZonedDateTime.now())
                        .build();
                textualResponseRepository.save(textualResponse);
                mock.setTextualResponse(textualResponse);
            }

            if (request.getBinaryFile() != null) {
                MultipartFile file = request.getBinaryFile();
                BinaryResponse binaryResponse = BinaryResponse.builder()
                        .responseFile(file.getBytes())
                        .createdAt(ZonedDateTime.now())
                        .build();
                binaryResponseRepository.save(binaryResponse);
                mock.setBinaryResponse(binaryResponse);
            }

            return mocksRepository.save(mock);
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
        }
        return null;
    }

    @Transactional
    @Override
    public Mock updateMock(String mockId, MockRequest request) {
        if (ValidationUtil.isNullOrEmpty(mockId)) {
            log.log(Level.DEBUG, "Invalid MockId!");
            return null;
        }
        if (ValidationUtil.isArgNull(request)) {
            log.log(Level.DEBUG, "UpdateMockRequest is null!");
            return null;
        }
        if(IsMockNameAlreadyExists(request)) {
            log.log(Level.DEBUG, String.format("Mock with %s name already exists!", request.getName()));
            return null;
        }
        try {
            Mock mock = getMockById(mockId);
            if (mock != null) {
                HttpMethod httpMethod = getHttpMethod(request.getHttpMethod());
                ResponseContentType responseContentType = getResponseContentType(request.getResponseContentType());

                Mock updatedMock = Mock.builder()
                        .id(mock.getId())
                        .mockName(request.getName())
                        .route(request.getRoute())
                        .httpMethod(httpMethod)
                        .responseContentType(responseContentType)
                        .statusCode(request.getStatusCode())
                        .queryParams(request.getQueryParams())
                        .description(request.getDescription())
                        .createdAt(mock.getCreatedAt())
                        .updatedAt(ZonedDateTime.now())
                        .entityStatus(getDefaultMockEntityStatus())
                        .build();

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

                mocksRepository.save(updatedMock);
                return updatedMock;
            }
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
        }
        return null;
    }

    @Transactional
    @Override
    public Mock archiveMock(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = getMockById(mockId);
                if (mock != null) {
                    if(mock.isArchived()){
                        return mock;
                    } else {
                        // Archive the mock i.e. Mark EntityStatus as ARCHIVED
                        if(mock.canModifyEntityStatus()){
                            EntityStatus entityStatus = getArchivedMockEntityStatus();
                            mock.setEntityStatus(entityStatus);
                            mock.setUpdatedAt(ZonedDateTime.now());
                            return mocksRepository.save(mock);
                        }
                    }
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return null;
    }

    @Transactional
    @Override
    public Mock unarchiveMock(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = getMockById(mockId);
                if (mock != null) {
                    // Idempotent behaviour - Unarchive the mock i.e. Mark EntityStatus as NONE
                    if(mock.canModifyEntityStatus()){
                        EntityStatus entityStatus = getDefaultMockEntityStatus();
                        mock.setEntityStatus(entityStatus);
                        mock.setUpdatedAt(ZonedDateTime.now());
                        return mocksRepository.save(mock);
                    }
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return null;
    }

    private boolean IsMockNameAlreadyExists(MockRequest request){
        Optional<Mock> mock = mocksRepository.findOneByMockName(request.getName());
        return mock.isPresent();
    }

    private HttpMethod getHttpMethod(String httpMethodString) throws Exception {
        if (ValidationUtil.isNotNullOrEmpty(httpMethodString)) {
            return httpMethodsRepository.findByMethod(httpMethodString);
        }
        throw new Exception(String.format("Unable to extract HTTP Method!! Invalid method: %s", httpMethodString));
    }

    private ResponseContentType getResponseContentType(String responseContentTypeString) throws Exception {
        if (ValidationUtil.isNotNullOrEmpty(responseContentTypeString)) {
            return responseContentTypesRepository.findByContentType(responseContentTypeString);
        }
        throw new Exception(String.format("Unable to extract Response Content Type!! Invalid responseContentType: %s",
                responseContentTypeString));
    }

    private EntityStatus getDefaultMockEntityStatus() {
        return findByEntityStatus(Status.NONE.name());
    }

    private EntityStatus getDeletedMockEntityStatus() {
        return findByEntityStatus(Status.DELETED.name());
    }

    private EntityStatus getArchivedMockEntityStatus(){
        return findByEntityStatus(Status.ARCHIVED.name());
    }

    private EntityStatus findByEntityStatus(String status) {
        return entityStatusRepository.findByStatus(status);
    }

}
