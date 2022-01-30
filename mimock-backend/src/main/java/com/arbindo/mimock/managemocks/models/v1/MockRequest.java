package com.arbindo.mimock.managemocks.models.v1;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
public class MockRequest {

    private String route;
    private String httpMethod;
    private String responseContentType;
    private String queryParams;
    private int statusCode;
    private String expectedTextResponse;
    private MultipartFile binaryFile;
    private String description;

}
