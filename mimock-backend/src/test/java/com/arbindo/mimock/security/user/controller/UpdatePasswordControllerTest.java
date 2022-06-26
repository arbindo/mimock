package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.JwtRequestFilter;
import com.arbindo.mimock.security.UserPermissionValidator;
import com.arbindo.mimock.security.exceptions.UserNotPermittedException;
import com.arbindo.mimock.security.user.models.request.UpdatePasswordRequest;
import com.arbindo.mimock.security.user.service.UpdatePasswordService;
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

import javax.sql.DataSource;
import java.util.Objects;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        value = UpdatePasswordController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class,
        }
)
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class UpdatePasswordControllerTest {
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
    UpdatePasswordService mockUpdatePasswordService;

    @MockBean
    UserPermissionValidator mockUserPermissionValidator;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    private final String route = UrlConfig.UPDATE_PASSWORD;

    @Test
    void shouldRespondWithStatusOK_WhenUserPasswordIsUpdatedSuccessfully() throws Exception {
        UpdatePasswordRequest request = UpdatePasswordRequest.builder()
                .userName("mimock_admin")
                .password("$2a$12$AnCFHRMd8.UlVlKUZxVpXeuBRaBd1G3LGJ1GTbQxBxTulzm0NpVmq")
                .build();

        User user = User.builder()
                .userName(request.getUserName())
                .password(request.getPassword())
                .build();

        lenient().when(mockUpdatePasswordService.updatePassword(any())).thenReturn(user);
        lenient().doNothing().when(mockUserPermissionValidator).isUserAllowedToPerformAction(request.getUserName());

        mockMvc.perform(
                        put(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void shouldRespondWithStatusInternalServerError_WhenUserPasswordUpdateFails() throws Exception {
        UpdatePasswordRequest request = UpdatePasswordRequest.builder()
                .userName("mimock_admin")
                .password("$2a$12$AnCFHRMd8.UlVlKUZxVpXeuBRaBd1G3LGJ1GTbQxBxTulzm0NpVmq")
                .build();

        lenient().when(mockUpdatePasswordService.updatePassword(any())).thenThrow(UsernameNotFoundException.class);
        lenient().doNothing().when(mockUserPermissionValidator).isUserAllowedToPerformAction(request.getUserName());

        mockMvc.perform(
                        put(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isInternalServerError())
                .andReturn();
    }

    @Test
    void shouldRespondWithStatusInternalServerError_WhenUserIsNotAllowedToUpdatePassword() throws Exception {
        UpdatePasswordRequest request = UpdatePasswordRequest.builder()
                .userName("test_user")
                .password("$2a$12$AnCFHRMd8.UlVlKUZxVpXeuBRaBd1G3LGJ1GTbQxBxTulzm0NpVmq")
                .build();

        User user = User.builder()
                .userName(request.getUserName())
                .password(request.getPassword())
                .build();

        lenient().when(mockUpdatePasswordService.updatePassword(any())).thenReturn(user);
        lenient().doThrow(UserNotPermittedException.class)
                .when(mockUserPermissionValidator)
                .isUserAllowedToPerformAction(request.getUserName());

        mockMvc.perform(
                        put(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isInternalServerError())
                .andReturn();
    }
}