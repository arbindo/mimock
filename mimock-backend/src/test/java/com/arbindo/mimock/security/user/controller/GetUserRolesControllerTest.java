package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.JwtRequestFilter;
import com.arbindo.mimock.security.exceptions.FailedToFetchUserRolesException;
import com.arbindo.mimock.security.user.models.response.UserRolesResponse;
import com.arbindo.mimock.security.user.service.GetUserRolesService;
import io.jsonwebtoken.lang.Collections;
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
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

import static com.arbindo.mimock.helpers.general.JsonMapper.convertObjectToJsonString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = GetUserRolesController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class GetUserRolesControllerTest {
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
    GetUserRolesService mockGetUserRolesService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    @Test
    void shouldReturnUserRolesWithStatusOK_WhenUserRolesExist() throws Exception {
        String route = UrlConfig.STATIC_RECORDS_PATH + UrlConfig.USER_ROLES_STATIC_RECORDS;
        String expectedContentType = "application/json";

        List<UserRolesResponse> response = new ArrayList<>(Collections.arrayToList(
                new UserRolesResponse[]{
                        UserRolesResponse.builder()
                                .roleName("ADMIN")
                                .roleDescription("Admin")
                                .build(),
                        UserRolesResponse.builder()
                                .roleName("MANAGER")
                                .roleDescription("Manager")
                                .build()
                }
        ));

        String expectedResponseBody = convertObjectToJsonString(response);

        lenient().when(mockGetUserRolesService.getAllUserRoles()).thenReturn(response);

        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnStatusInternalServerError_WhenServiceThrowsException() throws Exception {
        String route = UrlConfig.STATIC_RECORDS_PATH + UrlConfig.USER_ROLES_STATIC_RECORDS;

        lenient().when(mockGetUserRolesService.getAllUserRoles()).thenThrow(FailedToFetchUserRolesException.class);

        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isInternalServerError())
                .andReturn();

        assertEquals("", result.getResponse().getContentAsString());
    }
}