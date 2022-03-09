package com.arbindo.mimock.manage.mimocks.models;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GenericResponseWrapper<T> {

    @Schema(example = "200", description = "Response status code")
    private String code;

    @Schema(example = "SUCCESS", description = "Response message")
    private String message;

    @Schema(description = "Generic response data")
    private T data;
}
