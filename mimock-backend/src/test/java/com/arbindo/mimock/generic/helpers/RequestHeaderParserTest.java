package com.arbindo.mimock.generic.helpers;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import static org.junit.jupiter.api.Assertions.*;

class RequestHeaderParserTest {

    @Test
    void shouldReturnHeaderMap_WhenRequestHasHeaders() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.addHeader("Content-Type", "application/xml");
        mockHttpServletRequest.addHeader("Content-Length", 10);
        mockHttpServletRequest.addHeader("x-auth-token", "AUTH_TOKEN");
        mockHttpServletRequest.addHeader("cookies", "cookie=some_cookie;");

        Map<String, Object> hashMap = new HashMap<>();
        hashMap.put("Content-Type", "application/xml");
        hashMap.put("Content-Length", "10");
        hashMap.put("x-auth-token", "AUTH_TOKEN");
        hashMap.put("cookies", "cookie=some_cookie;");

        Map<String, Object> headerMap = RequestHeaderParser.getHeaderMap(mockHttpServletRequest);
        TreeMap<String, Object> expectedHeaderMap = new TreeMap<>(hashMap);

        assertNotNull(headerMap);
        assertEquals(expectedHeaderMap.entrySet(), headerMap.entrySet());
    }

    @Test
    void shouldReturnNull_WhenRequestHasNoHeaders() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();

        Map<String, Object> headerMap = RequestHeaderParser.getHeaderMap(mockHttpServletRequest);

        assertNull(headerMap);
    }

}