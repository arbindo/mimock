package com.arbindo.mimock.generic;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@SpringBootTest
class UIRouteFilterTest {
    @Autowired
    UIRouteFilter uiRouteFilter;

    @Test
    void shouldForwardRequest_WhenRequestIsForUI() throws ServletException, IOException {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRequestURI("/mimock-ui/home");

        MockHttpServletResponse response = new MockHttpServletResponse();

        FilterChain mockFilterChain = mock(FilterChain.class);

        uiRouteFilter.doFilter(request, response, mockFilterChain);

        verify(mockFilterChain, times(0)).doFilter(request, response);

        assertEquals("/", response.getForwardedUrl());
    }

    @Test
    void shouldPassRequestToNextFilter_WhenRequestIsNotForUI() throws ServletException, IOException {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setRequestURI("/api/v1/create");

        MockHttpServletResponse response = new MockHttpServletResponse();

        FilterChain mockFilterChain = mock(FilterChain.class);

        uiRouteFilter.doFilter(request, response, mockFilterChain);

        verify(mockFilterChain, times(1)).doFilter(request, response);

        assertNull(response.getForwardedUrl());
    }
}