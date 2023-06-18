package com.arbindo.mimock.manage.mimocks.models.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProcessedMockRequest {
    private String name;
    private String description;
    private String route;
    private String httpMethod;
    private int statusCode;
    private String responseContentType;
    private String queryParams;
    private Map<String, Object> queryParamValue;
    private Map<String, Object> requestHeader;
    private Boolean shouldDoExactHeaderMatching;
    private Map<String, Object> responseHeaders;
    private Map<String, Object> requestBody;
    private String requestBodyType;
    private String expectedTextResponse;
    private MultipartFile binaryFile;
    private String binaryFileName;
}
