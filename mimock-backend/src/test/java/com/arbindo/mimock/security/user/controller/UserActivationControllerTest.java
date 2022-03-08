package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.JwtRequestFilter;
import com.arbindo.mimock.security.user.models.request.UserActivationRequest;
import com.arbindo.mimock.security.user.service.AddUserService;
import com.arbindo.mimock.security.user.service.UserActivationService;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;

import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        value = UserActivationController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class,
        }
)
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class UserActivationControllerTest {
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
    UserActivationService mockUserActivationService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    private final String route = UrlConfig.USER_ACTIVATION;

    @Test
    void shouldReturnStatusOK_WhenUserActivationIsUpdated() throws Exception {
        UserActivationRequest request = UserActivationRequest.builder()
                .userName("mimock_admin")
                .isUserActive(Boolean.TRUE)
                .build();

        User user = User.builder()
                .userName(request.getUserName())
                .isUserActive(Boolean.TRUE)
                .build();

        lenient().when(mockUserActivationService.updateUserActivationStatus(any())).thenReturn(user);

        MvcResult result = mockMvc.perform(
                        put(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isOk())
                .andReturn();

        Map<String, Object> responseMap = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString());
        assertNotNull(responseMap);
        assertFalse(responseMap.isEmpty());
        assertNotNull(responseMap.get("updatedActivationStatus"));
        assertTrue((Boolean) responseMap.get("updatedActivationStatus"));
    }

    @Test
    void shouldReturnStatusInternalServerError_WhenUserActivationStatusUpdateFails() throws Exception {
        UserActivationRequest request = UserActivationRequest.builder()
                .userName("mimock_admin")
                .isUserActive(Boolean.TRUE)
                .build();

        lenient()
                .when(mockUserActivationService.updateUserActivationStatus(any()))
                .thenThrow(new UsernameNotFoundException("User is not present in the Database"));

        MvcResult result = mockMvc.perform(
                        put(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isInternalServerError())
                .andReturn();

        Map<String, Object> errorResponseMap = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString());
        assertNotNull(errorResponseMap);
        assertFalse(errorResponseMap.isEmpty());
        assertNotNull(errorResponseMap.get("message"));
        assertEquals("User is not present in the Database", errorResponseMap.get("message").toString());
    }
}