package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.JwtRequestFilter;
import com.arbindo.mimock.security.user.service.DeleteUserService;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.BDDMockito.willThrow;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        value = DeleteUserController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class,
        }
)
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class DeleteUserControllerTest {
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
    DeleteUserService mockDeleteUserService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    private final String route = UrlConfig.DELETE_USER + "?userName=";

    @Test
    void shouldRespondWithStatusOK_WhenUserIsAvailable() throws Exception {
        String userName = "test_user";

        lenient().doNothing().when(mockDeleteUserService).deleteUser(userName);

        MvcResult result = mockMvc.perform(delete(route + userName))
                .andExpect(status().isOk())
                .andReturn();

        Map<String, Object> responseMap = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString());
        assertNotNull(responseMap);
        assertNotNull(responseMap.get("deletedUser"));

        assertEquals(userName, responseMap.get("deletedUser"));
    }

    @Test
    void shouldRespondWithStatusInternalServerError_WhenUserIsNotAvailable() throws Exception {
        String userName = "test_user";

        willThrow(new UsernameNotFoundException("user not found")).given(mockDeleteUserService).deleteUser(userName);

        mockMvc.perform(delete(route + userName))
                .andExpect(status().isInternalServerError())
                .andReturn();
    }
}