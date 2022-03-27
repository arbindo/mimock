package com.arbindo.mimock.manage.mimocks.service.exceptions;

public class MockAlreadyExistsException extends RuntimeException {
    public MockAlreadyExistsException(String message) {
        super(message);
    }
}
