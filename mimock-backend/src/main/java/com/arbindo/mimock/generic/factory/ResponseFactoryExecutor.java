package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
@Component
public class ResponseFactoryExecutor {
    public ResponseFactory responseFactory(Mock mock) {
        ResponseFactory implementation = getMatchingFactoryImplementation(mock);

        if (implementation == null) {
            return new NullResponseImpl(mock);
        }

        return implementation;
    }

    private ResponseFactory getMatchingFactoryImplementation(Mock mock) {
        Map<Boolean, ResponseFactory> responseMap = new HashMap<>();
        responseMap.put(ValidationUtil.isArgNotNull(mock.getTextualResponse()), new TextualResponseImpl(mock));
        responseMap.put(ValidationUtil.isArgNotNull(mock.getBinaryResponse()), new BinaryResponseImpl(mock));

        return responseMap.get(true);
    }
}
