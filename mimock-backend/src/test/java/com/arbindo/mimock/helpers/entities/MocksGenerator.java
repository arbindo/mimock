package com.arbindo.mimock.helpers.entities;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static com.arbindo.mimock.helpers.general.RandomDataGenerator.*;

public class MocksGenerator {

    public static List<Mock> GenerateListOfMocks(){
        return GenerateListOfMocks(10);
    }

    public static List<Mock> GenerateListOfMocks(int count){
        List<Mock> mockList = new ArrayList<>();
        for (int i=0; i<count; i++) {
            mockList.add(GenerateMock());
        }
        return mockList;
    }

    public static Mock GenerateMock(){
        return Mock.builder()
                .id(generateRandomUUID())
                .route(generateRandomAlphanumericString())
                .httpMethod(null)
                .responseContentType(null)
                .queryParams(generateRandomAlphanumericString())
                .description(generateRandomAlphanumericString())
                .statusCode(generateRandomNumber())
                .textualResponse(null)
                .binaryResponse(null)
                .build();
    }

    public static Mock GenerateMock(MockRequest request){
        return Mock.builder()
                .id(generateRandomUUID())
                .route(request.getRoute())
                .httpMethod(null)
                .responseContentType(null)
                .queryParams(request.getQueryParams())
                .description(request.getDescription())
                .statusCode(request.getStatusCode())
                .textualResponse(null)
                .binaryResponse(null)
                .build();
    }

    public static MockRequest createMockRequest(){
        return MockRequest.builder()
                .route(generateRandomAlphanumericString())
                .httpMethod(null)
                .responseContentType(null)
                .queryParams(generateRandomAlphanumericString())
                .statusCode(generateRandomNumber())
                .expectedTextResponse(generateRandomAlphanumericString())
                .description(generateRandomAlphanumericString())
                .build();
    }

    public static MockRequest createMockRequestWithFile(MultipartFile file){
        MockRequest mockRequest = createMockRequest();
        mockRequest.setBinaryFile(file);
        return mockRequest;
    }

    public static MockMultipartFile getMockMultipartFile(){
        return new MockMultipartFile("binaryFile", "testFile.txt", "text/plain", "Awesome File Content Here!!!!".getBytes());
    }
}
