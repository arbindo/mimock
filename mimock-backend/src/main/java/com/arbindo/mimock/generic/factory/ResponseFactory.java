package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.generic.model.TypeOfResponse;

public interface ResponseFactory {
    Object responseBody();

    TypeOfResponse typeOfResponse();
}
