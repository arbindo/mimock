package com.arbindo.mimock.constants;

public class ExceptionMessages {
    public static final String ILLEGAL_INSTANTIATION_EXCEPTION_MSG = "Class holds static fields. Cannot instantiate";

    private ExceptionMessages() throws IllegalAccessException {
        throw new IllegalAccessException(ILLEGAL_INSTANTIATION_EXCEPTION_MSG);
    }
}
