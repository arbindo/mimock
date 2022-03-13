package com.arbindo.mimock.staticrecords.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.JwtRequestFilter;
import com.arbindo.mimock.staticrecords.service.GetStaticRecordsService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.http.MediaType;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = GetStaticRecordsController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class GetStaticRecordsControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @MockBean
    DefaultHttpInterceptor defaultHttpInterceptor;

    @MockBean
    UserDetailsService userDetailsService;

    @MockBean
    GetStaticRecordsService mockGetStaticRecordsService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    @Test
    void listAllSupportedHttpMethods() throws Exception {
        String route = UrlConfig.STATIC_RECORDS_PATH + UrlConfig.HTTP_METHODS_STATIC_RECORDS;

        List<HttpMethod> httpMethodsFromDB = new ArrayList<>();
        HttpMethod getMethod = HttpMethod.builder()
                .method("GET")
                .build();
        HttpMethod postMethod = HttpMethod.builder()
                .method("POST")
                .build();
        httpMethodsFromDB.add(getMethod);
        httpMethodsFromDB.add(postMethod);

        lenient().when(mockGetStaticRecordsService.listAllSupportedHttpMethods()).thenReturn(httpMethodsFromDB);

        MvcResult result = mockMvc.perform(
                        get(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();
        assertNotNull(response);

        ObjectMapper objectMapper = new ObjectMapper();
        List<HttpMethod> httpMethods = Arrays.asList(objectMapper.readValue(response, HttpMethod[].class));

        assertNotNull(httpMethods);
        assertFalse(httpMethods.isEmpty());

        assertEquals("GET", httpMethods.get(0).getMethod());
        assertEquals("POST", httpMethods.get(1).getMethod());
    }

    @Test
    void listAllSupportedResponseContentTypes() throws Exception {
        String route = UrlConfig.STATIC_RECORDS_PATH + UrlConfig.RESPONSE_CONTENT_TYPE_STATIC_RECORDS;

        List<ResponseContentType> contentTypesFromDB = new ArrayList<>();
        ResponseContentType jsonType = ResponseContentType.builder()
                .contentType("application/json")
                .build();
        ResponseContentType xmlType = ResponseContentType.builder()
                .contentType("application/xml")
                .build();
        contentTypesFromDB.add(jsonType);
        contentTypesFromDB.add(xmlType);

        lenient().when(mockGetStaticRecordsService.listAllSupportedResponseContentTypes()).thenReturn(contentTypesFromDB);

        MvcResult result = mockMvc.perform(
                        get(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();
        assertNotNull(response);

        ObjectMapper objectMapper = new ObjectMapper();
        List<ResponseContentType> contentTypes = Arrays.asList(objectMapper.readValue(response, ResponseContentType[].class));

        assertNotNull(contentTypes);
        assertFalse(contentTypes.isEmpty());

        assertEquals("application/json", contentTypes.get(0).getContentType());
        assertEquals("application/xml", contentTypes.get(1).getContentType());
    }

    @Test
    void listAllSupportedEntityStatus() throws Exception {
        String route = UrlConfig.STATIC_RECORDS_PATH + UrlConfig.ENTITY_STATUS_STATIC_RECORDS;

        List<EntityStatus> entityStatusesFromDB = new ArrayList<>();
        EntityStatus deleted = EntityStatus.builder().status("DELETED").build();
        EntityStatus archived = EntityStatus.builder().status("ARCHIVED").build();
        entityStatusesFromDB.add(deleted);
        entityStatusesFromDB.add(archived);

        lenient().when(mockGetStaticRecordsService.listAllSupportedEntityStatus()).thenReturn(entityStatusesFromDB);

        MvcResult result = mockMvc.perform(
                        get(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();
        assertNotNull(response);

        ObjectMapper objectMapper = new ObjectMapper();
        List<EntityStatus> entityStatuses = Arrays.asList(objectMapper.readValue(response, EntityStatus[].class));

        assertNotNull(entityStatuses);
        assertFalse(entityStatuses.isEmpty());

        assertEquals("DELETED", entityStatuses.get(0).getStatus());
        assertEquals("ARCHIVED", entityStatuses.get(1).getStatus());
    }
}