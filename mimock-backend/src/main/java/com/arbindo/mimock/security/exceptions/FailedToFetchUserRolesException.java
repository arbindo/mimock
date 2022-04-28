package com.arbindo.mimock.security.exceptions;

public class FailedToFetchUserRolesException extends RuntimeException {
    public FailedToFetchUserRolesException(String message) {
        super(message);
    }
}
