package com.arbindo.mimock.generic;

class MatchingMockNotFoundException extends RuntimeException {
    MatchingMockNotFoundException(String message) {
        super(message);
    }
}
