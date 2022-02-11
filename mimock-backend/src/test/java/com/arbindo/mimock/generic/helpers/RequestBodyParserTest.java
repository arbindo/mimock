package com.arbindo.mimock.generic.helpers;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class RequestBodyParserTest {

    @Test
    void shouldReturnRequestBodyString_WhenServletRequestHasRequestBody() throws IOException {
        String expectedBodyString = "{'message': 'Hello world!', 'code': 101, 'success': false}";
        byte[] bytes = expectedBodyString.getBytes(StandardCharsets.UTF_8);

        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setContent(bytes);

        String requestBody = RequestBodyParser.getRequestBody(mockHttpServletRequest);

        assertEquals(expectedBodyString, requestBody);
    }

    @Test
    void shouldReturnNull_WhenReadingRequestBodyThrowsException() throws IOException {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();

        mockHttpServletRequest.getInputStream().close();

        String requestBody = RequestBodyParser.getRequestBody(mockHttpServletRequest);

        assertNull(requestBody);
    }

}