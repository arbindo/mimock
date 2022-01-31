package com.arbindo.mimock.generic;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = GenericMockRequestController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class GenericMockRequestControllerTest {

    @Autowired
    GenericMockRequestController genericMockRequestController;

    @MockBean
    GenericMockRequestService genericMockRequestService;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @Autowired
    MockMvc mockMvc;

    @Test
    void shouldReturnHttpOK_WhenMatchingMockExists_WithoutQueryParamsAndTextualResponseAndStatus200() throws Exception {
        String route = "/api/testmock/testroute";
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .build();

        lenient().when(genericMockRequestService.extractQueryParams(any())).thenReturn(new StringBuilder());
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenReturn(expectedMock);

        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOK_WhenMatchingMockExists_WithQueryParamsAndTextualResponseAndStatus200() throws Exception {
        String route = "/api/testmock/testroute?version=2.0&active=true";
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(200)
                .responseBody(expectedResponseBody)
                .build();

        lenient().when(genericMockRequestService.extractQueryParams(any())).thenReturn(new StringBuilder("version=2.0&active=true"));
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenReturn(expectedMock);

        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_WhenMatchingMockExists_WithQueryParamsAndTextualResponseAndStatus400() throws Exception {
        String route = "/api/testmock/testroute?version=2.0&active=true";
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'error': 'Required field missing'}";

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(400)
                .responseBody(expectedResponseBody)
                .build();

        lenient().when(genericMockRequestService.extractQueryParams(any())).thenReturn(new StringBuilder("version=2.0&active=true"));
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenReturn(expectedMock);

        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpNotFound_WhenMatchingMockDoesNotExist() throws Exception {
        String route = "/api/testmock/testroute?version=2.0&active=true";

        lenient().when(genericMockRequestService.extractQueryParams(any())).thenReturn(new StringBuilder("version=2.0&active=true"));
        lenient().when(genericMockRequestService.serveMockRequest(any())).thenThrow(MatchingMockNotFoundException.class);

        mockMvc.perform(get(route))
                .andExpect(status().isNotFound());
    }
}
