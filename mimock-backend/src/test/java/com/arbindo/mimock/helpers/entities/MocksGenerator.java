package com.arbindo.mimock.helpers.entities;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.manage.mimocks.models.v1.Status;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.arbindo.mimock.helpers.general.RandomDataGenerator.*;

public class MocksGenerator {

    public static List<Mock> generateListOfMocks(){
        return generateListOfMocks(10);
    }

    public static List<Mock> generateListOfMocks(int count){
        List<Mock> mockList = new ArrayList<>();
        for (int i=0; i<count; i++) {
            mockList.add(generateMock());
        }
        return mockList;
    }

    public static Optional<Mock> generateOptionalMock(){
        Mock mock = generateMock();
        return Optional.of(mock);
    }

    public static Optional<Mock> generateOptionalMock(MockRequest request){
        Mock mock = generateMock(request);
        return Optional.of(mock);
    }

    public static Mock generateMock(){
        return Mock.builder()
                .id(generateRandomUUID())
                .route(generateRandomAlphanumericString())
                .httpMethod(generateHttpMethod())
                .responseContentType(generateResponseContentType())
                .queryParams(generateRandomAlphanumericString())
                .description(generateRandomAlphanumericString())
                .statusCode(generateRandomNumber())
                .textualResponse(generateTextualResponse())
                .binaryResponse(generateBinaryResponse())
                .entityStatus(generateDefaultEntityStatus())
                .build();
    }

    public static Mock generateMock(MockRequest request){
        return Mock.builder()
                .id(generateRandomUUID())
                .route(request.getRoute())
                .httpMethod(generateHttpMethod(request.getHttpMethod()))
                .responseContentType(generateResponseContentType(request.getResponseContentType()))
                .queryParams(request.getQueryParams())
                .description(request.getDescription())
                .statusCode(request.getStatusCode())
                .textualResponse(generateTextualResponse(request.getExpectedTextResponse()))
                .binaryResponse(generateBinaryResponse(request.getBinaryFile()))
                .createdAt(ZonedDateTime.now())
                .entityStatus(generateDefaultEntityStatus())
                .build();
    }

    public static EntityStatus generateDefaultEntityStatus(){
        return EntityStatus.builder()
                .status(Status.NONE.name())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    private static TextualResponse generateTextualResponse(){
        return TextualResponse.builder()
                .id(1L)
                .responseBody(generateRandomAlphabeticString())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    private static TextualResponse generateTextualResponse(String responseBody){
        return TextualResponse.builder()
                .id(1L)
                .responseBody(responseBody)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    private static BinaryResponse generateBinaryResponse(){
        try {
            return BinaryResponse.builder()
                    .id(1L)
                    .responseFile(getMockMultipartFile().getBytes())
                    .createdAt(ZonedDateTime.now())
                    .build();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static BinaryResponse generateBinaryResponse(MultipartFile file) {
       if(file != null){
           byte[] fileData = null;
           try{
               fileData = file.getBytes();
               return BinaryResponse.builder()
                       .id(1L)
                       .responseFile(fileData)
                       .createdAt(ZonedDateTime.now())
                       .build();
           }catch(IOException e){
               e.printStackTrace();
           }
       }
        return null;
    }

    private static ResponseContentType generateResponseContentType(String responseContentType) {
        return ResponseContentType.builder()
                .id(1L)
                .responseType(responseContentType)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    private static HttpMethod generateHttpMethod(String httpMethod) {
        return HttpMethod.builder()
                .id(1L)
                .method(httpMethod)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static HttpMethod generateHttpMethod(){
        return HttpMethod.builder()
                .id(1L)
                .method("GET")
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static ResponseContentType generateResponseContentType(){
        return ResponseContentType.builder()
                .id(1L)
                .responseType("application/json")
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static MockRequest createMockRequest(){
        return MockRequest.builder()
                .route(generateRandomAlphanumericString())
                .httpMethod(getValidHttpMethod())
                .responseContentType(getValidResponseContentType())
                .queryParams(generateRandomAlphanumericString())
                .statusCode(generateRandomNumber())
                .expectedTextResponse(generateRandomAlphanumericString())
                .binaryFile(getMockMultipartFile())
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

    public static String getValidHttpMethod(){
        String[] methods = {"GET", "POST", "HEAD", "OPTIONS", "DELETE"};
        int index = generateRandomNumber(methods.length - 1);
        return methods[index];
    }

    public static String getValidResponseContentType(){
        String[] responseContentTypes = {"application/json", "application/pdf", "application/xml", "application/zip", "image/png"};
        int index = generateRandomNumber(responseContentTypes.length - 1);
        return responseContentTypes[index];
    }
}
