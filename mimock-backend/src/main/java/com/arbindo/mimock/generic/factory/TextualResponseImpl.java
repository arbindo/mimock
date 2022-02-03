package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.model.ResponseType;

public class TextualResponseImpl implements ResponseFactory {
    private final Mock mock;

    public TextualResponseImpl(Mock mock) {
        this.mock = mock;
    }

    @Override
    public Object responseBody() {
        return this.mock.getTextualResponse().getResponseBody();
    }

    @Override
    public ResponseType responseType() {
        return ResponseType.TEXTUAL_RESPONSE;
    }
}
