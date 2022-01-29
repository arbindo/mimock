package com.arbindo.mimock.generic.helpers;

import com.arbindo.mimock.constants.UrlConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.http.HttpRequest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class QueryParamHelperTest {

    @Autowired
    QueryParamHelper queryParamHelper;

    @Test
    void shouldReturnOneQueryParamAndValue() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setRequestURI("/api/testmock/testroute");
        mockHttpServletRequest.setParameter("version", "1.0");

        StringBuilder queryParams = queryParamHelper.extractQueryParams(mockHttpServletRequest);

        assertEquals(queryParams.toString(), "version=1.0");
    }

    @Test
    void shouldAppendAndReturnWhenThereAreMultipleQueryParams() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setRequestURI("/api/testmock/testroute");
        mockHttpServletRequest.setParameter("version", "1.0");
        mockHttpServletRequest.setParameter("active", "true");

        StringBuilder queryParams = queryParamHelper.extractQueryParams(mockHttpServletRequest);

        assertEquals(queryParams.toString(), "version=1.0&active=true");
    }

    @Test
    void shouldReturnEmptyStringWhenThereAreNoQueryParams() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setRequestURI("/api/testmock/testroute");

        StringBuilder queryParams = queryParamHelper.extractQueryParams(mockHttpServletRequest);

        assertEquals(queryParams.toString(), "");
    }
}
