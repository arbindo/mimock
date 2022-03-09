package com.arbindo.mimock.manage.mimocks.mapper;

import com.arbindo.mimock.manage.mimocks.models.request.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.utils.JSONUtils;

import java.util.Map;

public class RequestModelMapper {
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
        return JSONUtils.convertJSONStringToMap(requestBody);
    }

    private static Map<String, Object> getHeadersMap(String requestHeaders) {
        return JSONUtils.convertJSONStringToMapWithLowerCaseKeys(requestHeaders);
    }
}
