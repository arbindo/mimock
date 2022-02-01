package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.Mock;

public class TextualResponseImpl implements ResponseFactory {
    private final Mock mock;

    public TextualResponseImpl(Mock mock) {
        this.mock = mock;
    }

    @Override
    public Object responseBody() {
        return this.mock.getTextualResponse().getResponseBody();
    }
}
