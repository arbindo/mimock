package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.Mock;

public class BinaryResponseImpl implements ResponseFactory {
    private final Mock mock;

    public BinaryResponseImpl(Mock mock) {
        this.mock = mock;
    }

    @Override
    public Object responseBody() {
        return this.mock.getBinaryResponse().getResponseFile();
    }
}
