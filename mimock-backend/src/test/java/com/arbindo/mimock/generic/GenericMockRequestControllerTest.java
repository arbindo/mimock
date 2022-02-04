package com.arbindo.mimock.generic;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = {GenericMockRequestController.class})
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class GenericMockRequestControllerTest {

    @Autowired
    GenericMockRequestController genericMockRequestController;

    @MockBean
    GenericMockRequestService genericMockRequestService;

    @Test
    void shouldReturnHttpOK_WhenMatchingMockExists_WithoutQueryParamsAndTextualResponseAndStatus200() throws Exception {
        String route = "/api/testmock/testroute";
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";

        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .build();

        lenient().when(genericMockRequestService.extractQueryParams(mockHttpServletRequest)).thenReturn(new StringBuilder());
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenReturn(expectedMock);

        Optional<DomainModelForMock> response = genericMockRequestController.serveRequest(
                route,
                mockHttpServletRequest
        );
        assertTrue(response.isPresent());

        DomainModelForMock actualResponse = response.get();

        assertEquals(expectedResponseBody, actualResponse.getResponseBody().toString());
        assertEquals(200, actualResponse.getStatusCode());
        assertEquals(expectedContentType, actualResponse.getResponseContentType());
    }

    @Test
    void shouldReturnHttpOK_WhenMatchingMockExists_WithQueryParamsAndTextualResponseAndStatus200() throws Exception {
        String route = "/api/testmock/testroute?version=2.0&active=true";
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";

        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setQueryString("version=2.0&active=true");

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .build();

        lenient().when(genericMockRequestService.extractQueryParams(mockHttpServletRequest)).thenReturn(new StringBuilder("version=2.0&active=true"));
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenReturn(expectedMock);

        Optional<DomainModelForMock> response = genericMockRequestController.serveRequest(
                route,
                mockHttpServletRequest
        );
        assertTrue(response.isPresent());

        DomainModelForMock actualResponse = response.get();

        assertEquals(expectedResponseBody, actualResponse.getResponseBody().toString());
        assertEquals(200, actualResponse.getStatusCode());
        assertEquals(expectedContentType, actualResponse.getResponseContentType());
    }

    @Test
    void shouldReturnHttpBadRequest_WhenMatchingMockExists_WithQueryParamsAndTextualResponseAndStatus400() throws Exception {
        String route = "/api/testmock/testroute?version=2.0&active=true";
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'error': 'Required field missing'}";

        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setQueryString("version=2.0&active=true");

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(400)
                .responseBody(expectedResponseBody)
                .build();

        lenient().when(genericMockRequestService.extractQueryParams(any())).thenReturn(new StringBuilder("version=2.0&active=true"));
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenReturn(expectedMock);

        Optional<DomainModelForMock> response = genericMockRequestController.serveRequest(
                route,
                mockHttpServletRequest
        );
        assertTrue(response.isPresent());

        DomainModelForMock actualResponse = response.get();

        assertEquals(expectedResponseBody, actualResponse.getResponseBody().toString());
        assertEquals(400, actualResponse.getStatusCode());
        assertEquals(expectedContentType, actualResponse.getResponseContentType());
    }

    @Test
    void shouldReturnHttpNotFound_WhenMatchingMockDoesNotExist() throws Exception {
        String route = "/api/testmock/testroute?version=2.0&active=true";
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();

        lenient().when(genericMockRequestService.extractQueryParams(any())).thenReturn(new StringBuilder("version=2.0&active=true"));
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenThrow(MatchingMockNotFoundException.class);

        Optional<DomainModelForMock> response = genericMockRequestController.serveRequest(
                route,
                mockHttpServletRequest
        );
        assertTrue(response.isEmpty());
    }
}
