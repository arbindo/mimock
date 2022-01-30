package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import com.arbindo.mimock.repository.*;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Override
    public List<Mock> getMocks() {
        return mocksRepository.findAll();
    }

    @Override
    public Mock getMockById(String mockId) {
        if (ValidationUtil.IsNotNullOrEmpty(mockId)) {
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
    public boolean deleteMockById(String mockId) {
        if (ValidationUtil.IsNotNullOrEmpty(mockId)) {
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
        if (ValidationUtil.IsArgNull(request)) {
            log.log(Level.DEBUG, "CreateMockRequest is null!");
            return null;
        }
        try {
            UUID mockId = UUID.randomUUID();
            HttpMethod httpMethod = GetHttpMethod(request.getHttpMethod());
            ResponseContentType responseContentType = GetResponseContentType(request.getResponseContentType());

            Mock mock = Mock.builder()
                    .id(mockId)
                    .route(request.getRoute())
                    .httpMethod(httpMethod)
                    .responseContentType(responseContentType)
                    .statusCode(request.getStatusCode())
                    .queryParams(request.getQueryParams())
                    .description(request.getDescription())
                    .createdAt(ZonedDateTime.now())
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
        if (ValidationUtil.IsNullOrEmpty(mockId)) {
            log.log(Level.DEBUG, "Invalid MockId!");
            return null;
        }
        if (ValidationUtil.IsArgNull(request)) {
            log.log(Level.DEBUG, "UpdateMockRequest is null!");
            return null;
        }
        try {
            Mock mock = getMockById(mockId);
            if (mock != null) {
                HttpMethod httpMethod = GetHttpMethod(request.getHttpMethod());
                ResponseContentType responseContentType = GetResponseContentType(request.getResponseContentType());

                Mock updatedMock = Mock.builder()
                        .id(mock.getId())
                        .route(request.getRoute())
                        .httpMethod(httpMethod)
                        .responseContentType(responseContentType)
                        .statusCode(request.getStatusCode())
                        .queryParams(request.getQueryParams())
                        .description(request.getDescription())
                        .createdAt(mock.getCreatedAt())
                        .updatedAt(ZonedDateTime.now())
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

    private HttpMethod GetHttpMethod(String httpMethodString) throws Exception {
        if (ValidationUtil.IsNotNullOrEmpty(httpMethodString)) {
            return httpMethodsRepository.findByMethod(httpMethodString);
        }
        throw new Exception(String.format("Unable to extract HTTP Method!! Invalid method: %s", httpMethodString));
    }

    private ResponseContentType GetResponseContentType(String responseContentTypeString) throws Exception {
        if (ValidationUtil.IsNotNullOrEmpty(responseContentTypeString)) {
            return responseContentTypesRepository.findByResponseType(responseContentTypeString);
        }
        throw new Exception(String.format("Unable to extract Response Content Type!! Invalid responseContentType: %s", responseContentTypeString));
    }
}
