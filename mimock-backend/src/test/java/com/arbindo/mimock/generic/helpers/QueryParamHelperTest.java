package com.arbindo.mimock.generic.helpers;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = QueryParamHelper.class)
class QueryParamHelperTest {

    @Test
    void shouldReturnOneQueryParamAndValue() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setRequestURI("/api/testmock/testroute");
        mockHttpServletRequest.setParameter("version", "1.0");

        StringBuilder queryParams = QueryParamHelper.extractQueryParams(mockHttpServletRequest);

        assertEquals("version=1.0", queryParams.toString());
    }

    @Test
    void shouldAppendAndReturnWhenThereAreMultipleQueryParams() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setRequestURI("/api/testmock/testroute");
        mockHttpServletRequest.setParameter("version", "1.0");
        mockHttpServletRequest.setParameter("active", "true");

        StringBuilder queryParams = QueryParamHelper.extractQueryParams(mockHttpServletRequest);

        assertEquals("version=1.0&active=true", queryParams.toString());
    }

    @Test
    void shouldReturnEmptyStringWhenThereAreNoQueryParams() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setRequestURI("/api/testmock/testroute");

        StringBuilder queryParams = QueryParamHelper.extractQueryParams(mockHttpServletRequest);

        assertEquals("", queryParams.toString());
    }
}
