package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.generic.model.TypeOfResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = BinaryResponseWriter.class)
class BinaryResponseWriterTest {

    @Autowired
    BinaryResponseWriter binaryResponseWriter;

    @Test
    void shouldWritePassedBinaryResponseToHttpResponse() throws IOException {
        String contentType = "application/pdf";
        String str = "%PDF-1.7<</ColorSpace/DeviceGray/Subtype/Image/Height 250";
        byte[] expectedResponseBody = str.getBytes(StandardCharsets.UTF_8);

        MockHttpServletResponse mockHttpServletResponse = new MockHttpServletResponse();

        DomainModelForMock mock = DomainModelForMock.builder()
                .responseContentType(contentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .typeOfResponse(TypeOfResponse.BINARY_RESPONSE)
                .build();

        binaryResponseWriter.write(mock, mockHttpServletResponse);

        assertArrayEquals(expectedResponseBody, mockHttpServletResponse.getContentAsByteArray());
    }

    @Test
    void shouldThrowIOException_WhenResponseWriterIsNotAccessible() throws IOException {
        String contentType = "application/pdf";
        String str = "%PDF-1.7<</ColorSpace/DeviceGray/Subtype/Image/Height 250";
        byte[] responseBody = str.getBytes(StandardCharsets.UTF_8);

        HttpServletResponse mockHttpServletResponse = mock(HttpServletResponse.class);

        when(mockHttpServletResponse.getOutputStream()).thenThrow(new IOException());

        DomainModelForMock mock = DomainModelForMock.builder()
                .responseContentType(contentType)
                .statusCode(200)
                .responseBody(responseBody)
                .typeOfResponse(TypeOfResponse.BINARY_RESPONSE)
                .build();

        IOException ioException = assertThrows(IOException.class, () -> {
            binaryResponseWriter.write(mock, mockHttpServletResponse);
        });

        assertEquals(IOException.class, ioException.getClass());
    }
}
