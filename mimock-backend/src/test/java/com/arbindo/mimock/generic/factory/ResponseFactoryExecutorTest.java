package com.arbindo.mimock.generic.factory;

import com.arbindo.mimock.entities.BinaryResponse;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.entities.TextualResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ResponseFactoryExecutorTest {

    @Autowired
    ResponseFactoryExecutor responseFactoryExecutor;

    @Test
    void shouldReturnImplementationForTextualResponse() {
        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{'message': 'Hello World!'}")
                .build();

        Mock textualResponseMock = Mock.builder()
                .textualResponse(textualResponse)
                .binaryResponse(null)
                .build();

        ResponseFactory responseFactory = responseFactoryExecutor.responseFactory(textualResponseMock);

        assertEquals(TextualResponseImpl.class, responseFactory.getClass());
        assertEquals(textualResponse.getResponseBody(), responseFactory.responseBody());
    }

    @Test
    void shouldReturnImplementationForBinaryResponse() {
        byte[] bytes = "Test string".getBytes(StandardCharsets.UTF_8);
        BinaryResponse binaryResponse = BinaryResponse.builder()
                .responseFile(bytes)
                .build();

        Mock binaryResponseMock = Mock.builder()
                .textualResponse(null)
                .binaryResponse(binaryResponse)
                .build();

        ResponseFactory responseFactory = responseFactoryExecutor.responseFactory(binaryResponseMock);

        assertEquals(BinaryResponseImpl.class, responseFactory.getClass());
        assertEquals(binaryResponse.getResponseFile(), responseFactory.responseBody());
    }

    @Test
    void shouldReturnImplementationForNullResponse() {
        Mock binaryResponseMock = Mock.builder()
                .textualResponse(null)
                .binaryResponse(null)
                .build();

        ResponseFactory responseFactory = responseFactoryExecutor.responseFactory(binaryResponseMock);

        assertEquals(NullResponseImpl.class, responseFactory.getClass());
        assertNull(responseFactory.responseBody());
    }
}
