package com.arbindo.mimock.models.v1;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GenericResponseWrapper<T> {
    private String code;
    private String message;
    private T data;
}
