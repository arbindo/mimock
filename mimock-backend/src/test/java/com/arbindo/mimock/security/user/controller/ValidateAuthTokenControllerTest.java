package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.JwtRequestFilter;
import com.arbindo.mimock.security.user.service.ValidateAuthTokenService;
import com.arbindo.mimock.security.utils.JWTUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
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

import javax.sql.DataSource;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(
        value = {ValidateAuthTokenController.class, JWTUtils.class},
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class,
        }
)
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class ValidateAuthTokenControllerTest {
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
    ValidateAuthTokenService mockService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    private final String route = UrlConfig.VALIDATE_TOKEN;

    @Test
    void shouldRespondWithStatusOK_WhenAuthTokenIsValid() throws Exception {
        String authToken = "eyJpYXQiOiJNb24gTWFyIDE0IDIzOjE1OjE0" +
                "IElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVz" +
                "ZXJSb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0NzI4MTc" +
                "xNH0.2_87mCjwnaZFpQA0CVtxoLcALF4WTaTFkSlTLmelJbc";

        lenient().when(mockService.isTokenValid(authToken)).thenReturn(true);

        mockMvc.perform(
                        get(route)
                                .header("Authorization", "Bearer eyJpYXQiOiJNb24gTWFyIDE0IDIzOjE1OjE0" +
                                        "IElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVz" +
                                        "ZXJSb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0NzI4MTc" +
                                        "xNH0.2_87mCjwnaZFpQA0CVtxoLcALF4WTaTFkSlTLmelJbc")
                )
                .andExpect(status().isOk())
                .andReturn();

        verify(mockService, times(1)).isTokenValid(authToken);
    }

    @Test
    void shouldRespondWithStatusBadRequest_WhenAuthHeaderIsNotPresent() throws Exception {
        mockMvc.perform(
                        get(route)
                )
                .andExpect(status().isBadRequest())
                .andReturn();

        verify(mockService, times(0)).isTokenValid(anyString());
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "",
            "Prefix",
            "Bearer "
    })
    void shouldRespondWithStatusBadRequest_WhenAuthHeaderHasNoValidToken(String token) throws Exception {
        mockMvc.perform(
                        get(route)
                                .header("Authorization", token)
                )
                .andExpect(status().isBadRequest())
                .andReturn();

        verify(mockService, times(0)).isTokenValid(anyString());
    }

    @Test
    void shouldRespondWithStatusUnAuthorised_WhenAuthTokenIsInValid() throws Exception {
        String authToken = "eyJpYXQiOiJNb24gTWFyIDE0IDIzOjE1OjE0" +
                "IElTVCAyMDIyIiwiYWxnInValidyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVz" +
                "ZXJSb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0NzI4MTc" +
                "xNH0.2_87mCjwnaZFpQA0CVtxoLcALF4WTaTFkSlTLmelJbc";

        lenient().when(mockService.isTokenValid(authToken)).thenReturn(false);

        mockMvc.perform(
                        get(route)
                                .header("Authorization", "Bearer eyJpYXQiOiJNb24gTWFyIDE0IDIzOjE1OjE0" +
                                        "IElTVCAyMDIyIiwiYWxnInValidyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVz" +
                                        "ZXJSb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0NzI4MTc" +
                                        "xNH0.2_87mCjwnaZFpQA0CVtxoLcALF4WTaTFkSlTLmelJbc")
                )
                .andExpect(status().isUnauthorized())
                .andReturn();

        verify(mockService, times(1)).isTokenValid(authToken);
    }
}