package com.arbindo.mimock.manage.mimocks.enums;

public enum ExpectedResponseType {
    TEXTUAL_RESPONSE("TEXTUAL_RESPONSE"),
    BINARY_RESPONSE("BINARY_RESPONSE"),
    EMPTY_RESPONSE("EMPTY_RESPONSE");

    public final String value;

    private ExpectedResponseType(String value) {
        this.value = value;
    }
}
