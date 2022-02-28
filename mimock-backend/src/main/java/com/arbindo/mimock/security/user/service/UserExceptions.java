package com.arbindo.mimock.security.user.service;

class AddNewUserFailedException extends RuntimeException {
    AddNewUserFailedException(String message) {
        super(message);
    }
}

class UserAlreadyExistsException extends RuntimeException {
    UserAlreadyExistsException(String message) {
        super(message);
    }
}