package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.constants.Role;
import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.exceptions.UserAlreadyExistsException;
import com.arbindo.mimock.security.user.models.AddUserRequest;
import com.arbindo.mimock.security.user.service.AddUserService;
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
import org.springframework.http.MediaType;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;
import java.util.Objects;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = AddUserController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class AddUserControllerTest {

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
    AddUserService mockUserService;

    @ParameterizedTest
    @ValueSource(strings = {"ADMIN", "MANAGER", "VIEWER"})
    void shouldReturnStatusOK_OnSavingNewUserSuccessfully(String role) throws Exception {
        String route = UrlConfig.USER_PATH;

        AddUserRequest request = AddUserRequest.builder()
                .name("admin")
                .userName("admin_new")
                .password("$2a$12$ZlN1NFw1WRhLb7Hn1BSFt.W.PkWjRa/I598Aab/WuXP4PM0QH9yau")
                .userRole(role)
                .build();

        User user = User.builder()
                .id(UUID.randomUUID())
                .name(request.getName())
                .userName(request.getUserName())
                .password(request.getPassword())
                .build();

        lenient().when(mockUserService.addNewUser(request)).thenReturn(user);

        MvcResult result = mockMvc.perform(
                        post(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isOk())
                .andReturn();

        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnInternalServerError_WhenServiceThrowsException() throws Exception {
        String route = UrlConfig.USER_PATH;
        AddUserRequest request = AddUserRequest.builder()
                .name("admin")
                .userName("admin_new")
                .password("$2a$12$ZlN1NFw1WRhLb7Hn1BSFt.W.PkWjRa/I598Aab/WuXP4PM0QH9yau")
                .userRole(Role.ADMIN.toString())
                .build();

        lenient().when(mockUserService.addNewUser(any())).thenThrow(new UserAlreadyExistsException("User already exists"));

        MvcResult result = mockMvc.perform(
                        post(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isInternalServerError())
                .andReturn();

        String expectedErrorMessage = "User already exists";

        String actualErrorMessage = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString()).get("message").toString();

        assertEquals(expectedErrorMessage, actualErrorMessage);
    }

    @Test
    void shouldReturnBadRequestError_WhenPasswordIsNotEncoded() throws Exception {
        String route = UrlConfig.USER_PATH;
        AddUserRequest request = AddUserRequest.builder()
                .name("admin_new")
                .userName("admin")
                .password("password")
                .userRole(Role.ADMIN.toString())
                .build();

        mockMvc.perform(
                        post(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    void shouldReturnBadRequestError_WhenRoleIsInvalid() throws Exception {
        String route = UrlConfig.USER_PATH;
        AddUserRequest request = AddUserRequest.builder()
                .name("admin")
                .userName("admin_new")
                .password("$2a$12$ZlN1NFw1WRhLb7Hn1BSFt.W.PkWjRa/I598Aab/WuXP4PM0QH9yau")
                .userRole("OWNER")
                .build();

        mockMvc.perform(
                        post(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isBadRequest())
                .andReturn();
    }
}