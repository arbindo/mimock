package com.arbindo.mimock.manage.mimocks.mapper;

import com.arbindo.mimock.manage.mimocks.models.request.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.utils.JSONUtils;
import com.google.common.base.Splitter;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;

import java.util.HashMap;
import java.util.Map;

@Log4j2
public class RequestModelMapper {
    private RequestModelMapper() {
    }

    public static ProcessedMockRequest map(MockRequest request) {
        Map<String, Object> queryParamValues = new HashMap<>();

        try {
            Map<String, String> splitMap = Splitter.on("&").trimResults()
                    .withKeyValueSeparator('=')
                    .split(request.getQueryParams());

            splitMap.entrySet().stream().forEach(i -> {
                queryParamValues.put(i.getKey(), i.getValue());
            });
        } catch (Exception e) {
            log.log(Level.ERROR, "Query params {} is not valid", request.getQueryParams());
        }

        return ProcessedMockRequest.builder()
                .name(request.getName())
                .description(request.getDescription())
                .route(request.getRoute())
                .httpMethod(request.getHttpMethod())
                .statusCode(request.getStatusCode())
                .responseContentType(request.getResponseContentType())
                .queryParams(request.getQueryParams())
                .queryParamValue(queryParamValues)
                .requestHeader(getHeadersMap(request.getRequestHeader()))
                .shouldDoExactHeaderMatching(request.isHeaderMatchingSetToStrict())
                .requestBody(getRequestBodyMap(request.getRequestBody()))
                .requestBodyType(request.getRequestBodyType())
                .responseHeaders(getHeadersMap(request.getResponseHeaders()))
                .expectedTextResponse(request.getExpectedTextResponse())
                .binaryFile(request.getBinaryFile())
                .binaryFileName(request.getBinaryFileName())
                .build();
    }

    private static Map<String, Object> getRequestBodyMap(String requestBody) {
        if (requestBody == null || requestBody.isBlank()) {
            return new HashMap<>();
        }
        return JSONUtils.convertJSONStringToMap(requestBody);
    }

    private static Map<String, Object> getHeadersMap(String requestHeaders) {
        if (requestHeaders == null || requestHeaders.isBlank()) {
            return new HashMap<>();
        }
        return JSONUtils.convertJSONStringToMapWithLowerCaseKeys(requestHeaders);
    }
}
