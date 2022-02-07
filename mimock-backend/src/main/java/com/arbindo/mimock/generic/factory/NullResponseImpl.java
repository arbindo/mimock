package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.model.TypeOfResponse;

public class NullResponseImpl implements ResponseFactory {

    public NullResponseImpl(Mock mock) {
    }

    @Override
    public Object responseBody() {
        return null;
    }

    @Override
    public TypeOfResponse typeOfResponse() {
        return TypeOfResponse.EMPTY_RESPONSE;
    }
}
