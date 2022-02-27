package com.arbindo.mimock.security.user.service;

class AddNewUserFailedException extends RuntimeException {
    AddNewUserFailedException(String message) {
        super(message);
    }
}