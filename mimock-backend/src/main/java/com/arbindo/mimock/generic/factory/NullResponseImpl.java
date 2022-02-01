package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.Mock;

public class NullResponseImpl implements ResponseFactory {

    public NullResponseImpl(Mock mock) {
    }

    @Override
    public Object responseBody() {
        return null;
    }
}
