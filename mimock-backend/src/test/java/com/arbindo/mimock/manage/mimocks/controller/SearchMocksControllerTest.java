package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.manage.mimocks.models.response.ListMocksResponse;
import com.arbindo.mimock.manage.mimocks.service.SearchMocksService;
import com.arbindo.mimock.security.JwtRequestFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.generateMocksPageable;
import static com.arbindo.mimock.helpers.entities.MocksGenerator.getListMocksResponseInPageableFormat;
import static com.arbindo.mimock.helpers.general.JsonMapper.convertObjectToJsonString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = SearchMocksController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
public class SearchMocksControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    SearchMocksService mockSearchService;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @MockBean
    DefaultHttpInterceptor defaultHttpInterceptor;

    @MockBean
    UserDetailsService userDetailsService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    @Test
    void shouldReturnHttpOk_SearchMocks_ReturnMocksAsPageableForSearchQuery() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_SEARCH;
        String expectedContentType = "application/json";
        Page<Mock> expectedMocksFromDB = generateMocksPageable();
        Page<ListMocksResponse> expectedListMocksResponse = getListMocksResponseInPageableFormat(expectedMocksFromDB);
        String expectedResponseBody = convertObjectToJsonString(expectedListMocksResponse);

        lenient().when(mockSearchService.searchMocks(any(Pageable.class), anyString(), anyString()))
                .thenReturn(expectedMocksFromDB);

        // Act
        MvcResult result = mockMvc.perform(get(route)
                        .param("searchColumnString", "NAME")
                        .param("searchQuery", "randomQueryString"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_SearchMocks_UnableToGetMocksDueToInvalidSearchColumn() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_SEARCH;

        lenient().when(mockSearchService.searchMocks(any(Pageable.class), anyString(), anyString()))
                .thenReturn(null);

        // Act & Assert
        MvcResult result = mockMvc.perform(get(route)
                        .param("searchColumnString", "NAME")
                        .param("searchQuery", "randomQueryString"))
                .andExpect(status().isBadRequest())
                .andReturn();

    }
}
