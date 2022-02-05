package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.ResponseType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = WriterCollection.class)
class WriterCollectionTest {

    @Autowired
    WriterCollection writerCollection;

    @Test
    void shouldReturnTextualResponseWriter_WhenResponseTypeIsTextual() {
        ResponseWriter responseWriter = writerCollection.getWriterFor(ResponseType.TEXTUAL_RESPONSE);

        assertEquals(TextualResponseWriter.class, responseWriter.getClass());
    }

    @Test
    void shouldReturnBinaryResponseWriter_WhenResponseTypeIsBinary() {
        ResponseWriter responseWriter = writerCollection.getWriterFor(ResponseType.BINARY_RESPONSE);

        assertEquals(BinaryResponseWriter.class, responseWriter.getClass());
    }

    @Test
    void shouldReturnEmptyResponseWriter_WhenResponseTypeIsNull() {
        ResponseWriter responseWriter = writerCollection.getWriterFor(ResponseType.NULL_RESPONSE);

        assertEquals(EmptyResponseWriter.class, responseWriter.getClass());
    }

    @Test
    void shouldReturnEmptyResponseWriter_WhenResponseTypeIsInvalid() {
        ResponseWriter responseWriter = writerCollection.getWriterFor(null);

        assertEquals(EmptyResponseWriter.class, responseWriter.getClass());
    }
}
