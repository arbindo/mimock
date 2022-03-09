package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.user.MimockUserDetailsService;
import com.arbindo.mimock.security.user.models.MimockUserDetails;
import com.arbindo.mimock.security.user.models.request.AuthenticateUserRequest;
import com.arbindo.mimock.security.utils.JWTUtils;
import io.jsonwebtoken.Jwts;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.crypto.spec.SecretKeySpec;
import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        value = {UserAuthenticateController.class, JWTUtils.class},
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class,
        }
)
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class UserAuthenticateControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @MockBean
    DefaultHttpInterceptor defaultHttpInterceptor;

    @MockBean
    MimockUserDetailsService userDetailsService;

    @MockBean
    AuthenticationManager authenticationManager;

    @Test
    void shouldReturnAuthTokenWithStatusOK_WhenUserIsValid() throws Exception {
        String route = UrlConfig.AUTHENTICATE;

        AuthenticateUserRequest authenticateUserRequest = AuthenticateUserRequest.builder()
                .userName("admin_user")
                .password("Password@007")
                .build();

        MimockUserDetails userDetails = new MimockUserDetails(
                User.builder()
                        .userName(authenticateUserRequest.getUserName())
                        .password(authenticateUserRequest.getPassword())
                        .userRoles(UserRole.builder().roleName("ADMIN").build())
                        .build()
        );

        lenient().when(authenticationManager.authenticate(any())).thenReturn(any());
        lenient().when(userDetailsService.loadUserByUsername(authenticateUserRequest.getUserName())).thenReturn(userDetails);

        MvcResult result = mockMvc.perform(
                        post(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(authenticateUserRequest)))
                )
                .andExpect(status().isOk())
                .andReturn();

        Map<String, Object> responseMap = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString());
        assertNotNull(responseMap);

        SecretKeySpec key = new SecretKeySpec("C4BE6B45CBBD4CBADFE5E22F4BCDBAF8".getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        String subject = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(responseMap.get("token").toString()).getBody().getSubject();

        assertEquals(userDetails.getUsername(), subject);
    }

    @Test
    void shouldFailWithStatusUnUnauthorized_WhenUserAuthenticationFails() throws Exception {
        String route = UrlConfig.AUTHENTICATE;

        AuthenticateUserRequest authenticateUserRequest = AuthenticateUserRequest.builder()
                .userName("admin_user")
                .password("wrongpassword")
                .build();

        MimockUserDetails userDetails = new MimockUserDetails(
                User.builder()
                        .userName(authenticateUserRequest.getUserName())
                        .password(authenticateUserRequest.getPassword())
                        .userRoles(UserRole.builder().roleName("ADMIN").build())
                        .build()
        );

        String expectedError = "password is incorrect";
        lenient().when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException(expectedError));
        lenient().when(userDetailsService.loadUserByUsername(authenticateUserRequest.getUserName())).thenReturn(userDetails);

        MvcResult result = mockMvc.perform(
                        post(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(authenticateUserRequest)))
                )
                .andExpect(status().isUnauthorized())
                .andReturn();

        Map<String, Object> responseMap = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString());
        assertNotNull(responseMap);

        assertEquals(expectedError, responseMap.get("errorMessage"));
    }
}