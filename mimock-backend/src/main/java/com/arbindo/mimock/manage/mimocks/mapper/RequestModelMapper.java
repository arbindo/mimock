package com.arbindo.mimock.manage.mimocks.mapper;

import com.arbindo.mimock.manage.mimocks.models.request.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.utils.JSONUtils;

import java.util.HashMap;
import java.util.Map;

public class RequestModelMapper {
    private RequestModelMapper() {
    }

    public static ProcessedMockRequest map(MockRequest request) {
        return ProcessedMockRequest.builder()
                .name(request.getName())
                .description(request.getDescription())
                .route(request.getRoute())
                .httpMethod(request.getHttpMethod())
                .statusCode(request.getStatusCode())
                .responseContentType(request.getResponseContentType())
                .queryParams(request.getQueryParams())
                .requestHeader(getHeadersMap(request.getRequestHeader()))
                .shouldDoExactHeaderMatching(request.isHeaderMatchingSetToStrict())
                .requestBody(getRequestBodyMap(request.getRequestBody()))
                .requestBodyType(request.getRequestBodyType())
                .responseHeaders(getHeadersMap(request.getResponseHeaders()))
                .expectedTextResponse(request.getExpectedTextResponse())
                .binaryFile(request.getBinaryFile())
                .build();
    }

    private static Map<String, Object> getRequestBodyMap(String requestBody) {
        if (requestBody.isBlank()) {
            return new HashMap<>();
        }
        return JSONUtils.convertJSONStringToMap(requestBody);
    }

    private static Map<String, Object> getHeadersMap(String requestHeaders) {
        if (requestHeaders.isBlank()) {
            return new HashMap<>();
        }
        return JSONUtils.convertJSONStringToMapWithLowerCaseKeys(requestHeaders);
    }
}
