package com.arbindo.mimock.manage.mimocks.mapper;

import com.arbindo.mimock.helpers.entities.MocksGenerator;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.helpers.general.RandomDataGenerator;
import com.arbindo.mimock.manage.mimocks.models.request.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RequestModelMapperTest {

    @Test
    void shouldMapRequestModelToProcessedRequestModal() {
        MockRequest request = MocksGenerator.createMockRequest();
        String requestHeadersAsString = RandomDataGenerator.generateRequestHeadersAsString();
        String responseHeadersAsString = RandomDataGenerator.generateResponseHeadersAsString();
        String requestBodyAsString = RandomDataGenerator.generateRequestBodyAsString();

        MockRequest requestToBeMapped = MockRequest.builder()
                .name(request.getName())
                .description(request.getDescription())
                .route(request.getRoute())
                .httpMethod(request.getHttpMethod())
                .statusCode(request.getStatusCode())
                .responseContentType(request.getResponseContentType())
                .queryParams(request.getQueryParams())
                .requestHeader(requestHeadersAsString)
                .shouldDoExactHeaderMatching(request.isHeaderMatchingSetToStrict())
                .requestBody(requestBodyAsString)
                .requestBodyType(request.getRequestBodyType())
                .responseHeaders(responseHeadersAsString)
                .expectedTextResponse(request.getExpectedTextResponse())
                .build();

        ProcessedMockRequest expectedRequest = ProcessedMockRequest.builder()
                .name(request.getName())
                .description(request.getDescription())
                .route(request.getRoute())
                .httpMethod(request.getHttpMethod())
                .statusCode(request.getStatusCode())
                .responseContentType(request.getResponseContentType())
                .queryParams(request.getQueryParams())
                .requestHeader(JsonMapper.convertJSONStringToMapWithLowerCaseKeys(requestHeadersAsString))
                .shouldDoExactHeaderMatching(request.isHeaderMatchingSetToStrict())
                .requestBody(JsonMapper.convertJSONStringToMapWithLowerCaseKeys(requestBodyAsString))
                .requestBodyType(request.getRequestBodyType())
                .responseHeaders(JsonMapper.convertJSONStringToMapWithLowerCaseKeys(responseHeadersAsString))
                .expectedTextResponse(request.getExpectedTextResponse())
                .build();

        ProcessedMockRequest mappedRequest = RequestModelMapper.map(requestToBeMapped);

        assertEquals(expectedRequest.getName(), mappedRequest.getName());
        assertEquals(expectedRequest.getDescription(), mappedRequest.getDescription());
        assertEquals(expectedRequest.getRoute(), mappedRequest.getRoute());
        assertEquals(expectedRequest.getHttpMethod(), mappedRequest.getHttpMethod());
        assertEquals(expectedRequest.getStatusCode(), mappedRequest.getStatusCode());
        assertEquals(expectedRequest.getResponseContentType(), mappedRequest.getResponseContentType());
        assertEquals(expectedRequest.getQueryParams(), mappedRequest.getQueryParams());
        assertEquals(expectedRequest.getRequestHeader(), mappedRequest.getRequestHeader());
        assertEquals(expectedRequest.getShouldDoExactHeaderMatching(), mappedRequest.getShouldDoExactHeaderMatching());
        assertEquals(expectedRequest.getRequestBody(), mappedRequest.getRequestBody());
        assertEquals(expectedRequest.getRequestBodyType(), mappedRequest.getRequestBodyType());
        assertEquals(expectedRequest.getResponseHeaders(), mappedRequest.getResponseHeaders());
        assertEquals(expectedRequest.getExpectedTextResponse(), mappedRequest.getExpectedTextResponse());
    }
}