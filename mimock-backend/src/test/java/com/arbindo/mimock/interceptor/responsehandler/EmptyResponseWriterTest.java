package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.generic.model.ResponseType;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = EmptyResponseWriter.class)
class EmptyResponseWriterTest {

    @Autowired
    EmptyResponseWriter emptyResponseWriter;

    @Mock
    HttpServletResponse mockHttpServletResponse;

    @Mock
    PrintWriter mockPrintWriter;

    @Test
    void shouldCloseResponseWriterWithoutWritingAnyResponse() throws IOException {
        String contentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";

        DomainModelForMock mock = DomainModelForMock.builder()
                .responseContentType(contentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .responseType(ResponseType.TEXTUAL_RESPONSE)
                .build();

        lenient().when(mockHttpServletResponse.getWriter()).thenReturn(mockPrintWriter);

        emptyResponseWriter.write(mock, mockHttpServletResponse);

        verify(mockPrintWriter, times(1)).close();
    }

}
