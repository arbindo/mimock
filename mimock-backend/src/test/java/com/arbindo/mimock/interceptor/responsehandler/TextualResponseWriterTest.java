package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.generic.model.ResponseType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = TextualResponseWriter.class)
class TextualResponseWriterTest {

    @Autowired
    TextualResponseWriter textualResponseWriter;

    @Test
    void shouldWritePassedTextualResponseToHttpResponse() throws IOException {
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";

        MockHttpServletResponse mockHttpServletResponse = new MockHttpServletResponse();

        DomainModelForMock mock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .responseType(ResponseType.TEXTUAL_RESPONSE)
                .build();

        textualResponseWriter.write(mock, mockHttpServletResponse);

        assertEquals(expectedResponseBody, mockHttpServletResponse.getContentAsString());
    }

    @Test
    void shouldThrowIOException_WhenResponseWriterIsNotAccessible() throws IOException {
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";

        HttpServletResponse mockHttpServletResponse = mock(HttpServletResponse.class);

        when(mockHttpServletResponse.getWriter()).thenThrow(new IOException());

        DomainModelForMock mock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .responseType(ResponseType.TEXTUAL_RESPONSE)
                .build();

        IOException ioException = assertThrows(IOException.class, () -> {
            textualResponseWriter.write(mock, mockHttpServletResponse);
        });

        assertEquals(IOException.class, ioException.getClass());
    }
}
