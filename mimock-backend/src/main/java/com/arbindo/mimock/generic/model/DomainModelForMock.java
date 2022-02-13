package com.arbindo.mimock.generic.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class DomainModelForMock {
    private String route;
    private String responseContentType;
    private Integer statusCode;
    private Object responseBody;
    private Map<String, Object> responseHeaders;
    private TypeOfResponse typeOfResponse;
}
