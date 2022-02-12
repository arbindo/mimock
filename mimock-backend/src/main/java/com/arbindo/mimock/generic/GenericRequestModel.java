package com.arbindo.mimock.generic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class GenericRequestModel {
    private String route;
    private String httpMethod;
    private String queryParam;
    private Map<String, Object> requestHeaders;
    private String requestBody;
}
