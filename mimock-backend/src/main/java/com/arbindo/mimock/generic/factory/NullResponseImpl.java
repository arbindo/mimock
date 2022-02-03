package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.model.ResponseType;

public class NullResponseImpl implements ResponseFactory {

    public NullResponseImpl(Mock mock) {
    }

    @Override
    public Object responseBody() {
        return null;
    }

    @Override
    public ResponseType responseType() {
        return null;
    }
}
