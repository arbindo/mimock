package com.arbindo.mimock.manage.mimocks.models.v1;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
public class MockRequest {

    @NotBlank(message = "Route is required")
    private String route;

    @NotBlank(message = "HttpMethod is required")
    private String httpMethod;

    @NotBlank(message = "ResponseContentType is required")
    private String responseContentType;

    @NotNull(message = "StatusCode is required")
    private int statusCode;

    @Size(max = 1024, message = "QueryParams can be maximum of 1024 characters")
    private String queryParams;

    @Size(min = 1, max = 255, message = "Description should be at least 1-250 characters")
    private String description;

    // Optional - Validated in Logic
    private String expectedTextResponse;

    // Optional - Validated in Logic
    private MultipartFile binaryFile;

}
