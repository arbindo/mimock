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

        assertEquals(responseFactory.getClass(), TextualResponseImpl.class);
        assertEquals(responseFactory.responseBody(), textualResponse.getResponseBody());
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

        assertEquals(responseFactory.getClass(), BinaryResponseImpl.class);
        assertEquals(responseFactory.responseBody(), binaryResponse.getResponseFile());
    }

    @Test
    void shouldReturnImplementationForNullResponse() {
        Mock binaryResponseMock = Mock.builder()
                .textualResponse(null)
                .binaryResponse(null)
                .build();

        ResponseFactory responseFactory = responseFactoryExecutor.responseFactory(binaryResponseMock);

        assertEquals(responseFactory.getClass(), NullResponseImpl.class);
        assertNull(responseFactory.responseBody());
    }
}
