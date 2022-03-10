package com.arbindo.mimock.helpers.entities;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.helpers.general.RandomDataGenerator;
import com.arbindo.mimock.common.wrapper.GenericResponseWrapper;
import com.arbindo.mimock.manage.mimocks.models.request.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.arbindo.mimock.helpers.general.RandomDataGenerator.*;

public class MocksGenerator {

    public static List<Mock> generateListOfMocks() {
        return generateListOfMocks(10);
    }

    public static Page<Mock> generateMocksPageable() {
        return new PageImpl<>(generateListOfMocks(10));
    }

    public static List<Mock> generateListOfMocks(int count) {
        List<Mock> mockList = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            mockList.add(generateMock());
        }
        return mockList;
    }

    public static Optional<Mock> generateOptionalMock() {
        Mock mock = generateMock();
        return Optional.of(mock);
    }

    public static Optional<Mock> generateOptionalMock(MockRequest request) {
        Mock mock = generateMock(request);
        return Optional.of(mock);
    }

    public static Optional<Mock> generateOptionalMock(ProcessedMockRequest request) {
        Mock mock = generateMock(request);
        return Optional.of(mock);
    }

    public static Mock generateMock() {
        return Mock.builder()
                .id(generateRandomUUID())
                .mockName(generateUniqueMockName())
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

    public static Mock generateMock(MockRequest request) {
        return Mock.builder()
                .id(generateRandomUUID())
                .mockName(generateUniqueMockName())
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

    public static Mock generateMock(ProcessedMockRequest request) {
        return Mock.builder()
                .id(generateRandomUUID())
                .mockName(generateUniqueMockName())
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

    public static Mock generateMockWithHeadersAndBody(ProcessedMockRequest request) {
        return Mock.builder()
                .id(generateRandomUUID())
                .mockName(generateUniqueMockName())
                .route(request.getRoute())
                .httpMethod(generateHttpMethod(request.getHttpMethod()))
                .responseContentType(generateResponseContentType(request.getResponseContentType()))
                .queryParams(request.getQueryParams())
                .description(request.getDescription())
                .statusCode(request.getStatusCode())
                .requestHeaders(generateRequestHeader(request.getRequestHeader()))
                .responseHeaders(generateResponseHeader(request.getResponseHeaders()))
                .requestBodiesForMock(generateRequestBodiesForMock(request.getRequestBody()))
                .textualResponse(generateTextualResponse(request.getExpectedTextResponse()))
                .binaryResponse(generateBinaryResponse(request.getBinaryFile()))
                .createdAt(ZonedDateTime.now())
                .entityStatus(generateDefaultEntityStatus())
                .build();
    }

    public static EntityStatus generateDefaultEntityStatus() {
        return EntityStatus.builder()
                .status(Status.NONE.name())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static EntityStatus generateArchivedEntityStatus() {
        return EntityStatus.builder()
                .status(Status.ARCHIVED.name())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static EntityStatus generateDeletedEntityStatus() {
        return EntityStatus.builder()
                .status(Status.DELETED.name())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    private static TextualResponse generateTextualResponse() {
        return TextualResponse.builder()
                .id(1L)
                .responseBody(generateRandomAlphabeticString())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    private static TextualResponse generateTextualResponse(String responseBody) {
        return TextualResponse.builder()
                .id(1L)
                .responseBody(responseBody)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    private static BinaryResponse generateBinaryResponse() {
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
        if (file != null) {
            byte[] fileData = null;
            try {
                fileData = file.getBytes();
                return BinaryResponse.builder()
                        .id(1L)
                        .responseFile(fileData)
                        .createdAt(ZonedDateTime.now())
                        .build();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    private static ResponseContentType generateResponseContentType(String responseContentType) {
        return ResponseContentType.builder()
                .id(1L)
                .contentType(responseContentType)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static RequestBodyType generateRequestBodyType() {
        return RequestBodyType.builder()
                .id(1L)
                .requestBodyType(getValidRequestType())
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

    public static HttpMethod generateHttpMethod() {
        return HttpMethod.builder()
                .id(1L)
                .method("GET")
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static ResponseContentType generateResponseContentType() {
        return ResponseContentType.builder()
                .id(1L)
                .contentType("application/json")
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static RequestHeader generateRequestHeader() {
        return RequestHeader.builder()
                .id(1L)
                .matchExact(false)
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static RequestHeader generateRequestHeader(Map<String, Object> header) {
        return RequestHeader.builder()
                .id(1L)
                .matchExact(false)
                .requestHeader(header)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static ResponseHeader generateResponseHeader() {
        return ResponseHeader.builder()
                .id(1L)
                .responseHeader(RandomDataGenerator.generateResponseHeaders())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static ResponseHeader generateResponseHeader(Map<String, Object> header) {
        return ResponseHeader.builder()
                .id(1L)
                .responseHeader(header)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static RequestBodiesForMock generateRequestBodiesForMock() {
        return RequestBodiesForMock.builder()
                .id(1L)
                .requestBody(RandomDataGenerator.generateRequestBody())
                .requestBodyType(generateRequestBodyType())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static RequestBodiesForMock generateRequestBodiesForMock(Map<String, Object> requestBody) {
        return RequestBodiesForMock.builder()
                .id(1L)
                .requestBody(requestBody)
                .requestBodyType(generateRequestBodyType())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static MockRequest createMockRequest() {
        return MockRequest.builder()
                .name(generateUniqueMockName())
                .route(generateRandomAlphanumericString())
                .httpMethod(getValidHttpMethod())
                .responseContentType(getValidResponseContentType())
                .queryParams(generateRandomAlphanumericString())
                .statusCode(generateRandomNumber())
                .expectedTextResponse(generateRandomAlphanumericString())
                .binaryFile(getMockMultipartFile())
                .description(generateRandomAlphanumericString())
                .requestHeader(RandomDataGenerator.generateRequestHeadersAsString())
                .requestBody(RandomDataGenerator.generateRequestBodyAsString())
                .build();
    }

    public static ProcessedMockRequest createProcessedMockRequest() {
        return ProcessedMockRequest.builder()
                .name(generateUniqueMockName())
                .route(generateRandomAlphanumericString())
                .httpMethod(getValidHttpMethod())
                .responseContentType(getValidResponseContentType())
                .queryParams(generateRandomAlphanumericString())
                .statusCode(generateRandomNumber())
                .expectedTextResponse(generateRandomAlphanumericString())
                .binaryFile(getMockMultipartFile())
                .description(generateRandomAlphanumericString())
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .requestBody(RandomDataGenerator.generateRequestBody())
                .build();
    }

    public static ProcessedMockRequest createProcessedMockRequestWithHeadersAndBody() {
        return ProcessedMockRequest.builder()
                .name(generateUniqueMockName())
                .route(generateRandomAlphanumericString())
                .httpMethod(getValidHttpMethod())
                .responseContentType(getValidResponseContentType())
                .queryParams(generateRandomAlphanumericString())
                .statusCode(generateRandomNumber())
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .responseHeaders(RandomDataGenerator.generateResponseHeaders())
                .requestBody(RandomDataGenerator.generateRequestBody())
                .requestBodyType(generateRequestBodyType().getRequestBodyType())
                .expectedTextResponse(generateRandomAlphanumericString())
                .binaryFile(getMockMultipartFile())
                .description(generateRandomAlphanumericString())
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .requestBody(RandomDataGenerator.generateRequestBody())
                .build();
    }

    public static ProcessedMockRequest createMockRequestWithNullRequestValues() {
        return ProcessedMockRequest.builder()
                .name(generateUniqueMockName())
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

    public static MockRequest createMockRequestWithFile(MultipartFile file) {
        MockRequest mockRequest = createMockRequest();
        mockRequest.setBinaryFile(file);
        return mockRequest;
    }

    public static MockMultipartFile getMockMultipartFile() {
        return new MockMultipartFile("binaryFile", "testFile.txt", "text/plain", "Awesome File Content Here!!!!".getBytes());
    }

    public static String getValidHttpMethod() {
        String[] methods = {"GET", "POST", "HEAD", "OPTIONS", "DELETE"};
        int index = generateRandomNumber(methods.length - 1);
        return methods[index];
    }

    public static String getValidResponseContentType() {
        String[] responseContentTypes = {"application/json", "application/pdf", "application/xml", "application/zip", "image/png"};
        int index = generateRandomNumber(responseContentTypes.length - 1);
        return responseContentTypes[index];
    }

    public static String getValidRequestType() {
        String[] requestTypes = {"application/json", "application/xml", "text/plain"};
        int index = generateRandomNumber(requestTypes.length - 1);
        return requestTypes[index];
    }

    public static Mock archiveMock(Mock mock) {
        mock.setEntityStatus(generateArchivedEntityStatus());
        mock.setUpdatedAt(ZonedDateTime.now());
        return mock;
    }

    public static Mock unarchiveMock(Mock mock) {
        mock.setEntityStatus(generateDefaultEntityStatus());
        mock.setUpdatedAt(ZonedDateTime.now());
        return mock;
    }

    public static Mock deleteMock(Mock mock) {
        mock.setEntityStatus(generateDeletedEntityStatus());
        mock.setUpdatedAt(ZonedDateTime.now());
        return mock;
    }

    public static GenericResponseWrapper<Mock> getGenericResponseWrapper(
            HttpStatus httpStatus, String responseMessage, Mock mock) {
        return GenericResponseWrapper.<Mock>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(mock)
                .build();
    }
}
