package com.arbindo.mimock.manage.mimocks.models.v1;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(example = "/github/v3/pull", description = "Route of the mock")
    private String route;

    @NotBlank(message = "HttpMethod is required")
    @Schema(example = "GET", description = "Name of the HTTP Method")
    private String httpMethod;

    @NotNull(message = "StatusCode is required")
    @Schema(example = "200", description = "Expected status code of the mock")
    private int statusCode;

    @Schema(example = "application/json", description = "Name of the Response Content Type")
    private String responseContentType;

    @Size(max = 1024, message = "QueryParams can be maximum of 1024 characters")
    @Schema(example = "name=John&age=10", description = "Associated query params of the mock")
    private String queryParams;

    @NotBlank
    @Size(min = 5, max = 255, message = "Name should be at least 5 characters long")
    @Schema(example = "Weather api mock", description = "Uniquely identifiable name for the mimock")
    private String name;

    @Size(min = 1, max = 255, message = "Description should be at least 1-250 characters")
    @Schema(example = "This is my new mock!!!", description = "Custom Description of the Mock")
    private String description;

    // Value should be obtained as strigified JSON
    @Schema(example = "{'Content-Type': 'application/json'}", description = "Request headers for the mock")
    private String requestHeader;

    @Schema(example = "true", description = "Decides whether request headers need to be matched strictly or loosely")
    private Boolean shouldDoExactHeaderMatching;

    public Boolean isHeaderMatchingSetToStrict() {
        return this.shouldDoExactHeaderMatching;
    }

    @Schema(example = "{'id': 1,'purpose': 'Just for testing'}", description = "Request body for the mock")
    private String requestBody;

    @Schema(example = "application/json", description = "Request body type")
    private String requestBodyType;

    // Optional - Value should be obtained as strigified JSON
    @Schema(
            example = "{'x-auth-token': 'SOME_TOKEN'}",
            description = "Response headers to be sent after invoking the mock endpoint"
    )
    private String responseHeaders;

    // Optional - Validated in Logic
    @Schema(description = "Represents the expected textual response")
    private String expectedTextResponse;

    // Optional - Validated in Logic
    @Schema(description = "Represents the expected binary response")
    private MultipartFile binaryFile;

}
