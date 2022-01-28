package com.arbindo.mimock.managemocks.models.v1;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GenericResponseWrapper<T> {
    private String code;
    private String message;
    private T data;
}
