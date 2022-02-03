package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.generic.model.ResponseType;

public interface ResponseFactory {
    Object responseBody();

    ResponseType responseType();
}
