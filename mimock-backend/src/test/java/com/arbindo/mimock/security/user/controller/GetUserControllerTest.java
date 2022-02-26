package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.user.models.UserInfo;
import com.arbindo.mimock.security.user.models.Users;
import com.arbindo.mimock.security.user.service.GetUserService;
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
import java.time.ZonedDateTime;
import java.util.UUID;

import static com.arbindo.mimock.helpers.general.JsonMapper.convertObjectToJsonString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = GetUserController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class GetUserControllerTest {

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
    GetUserService mockUserService;

    @Test
    void shouldReturnUsersWithStatusOK_WhenUsersExist() throws Exception {
        String route = UrlConfig.USER_PATH;
        String expectedContentType = "application/json";
        UserInfo userInfo1 = UserInfo.builder()
                .userId(UUID.randomUUID().toString())
                .userName("admin")
                .name("test")
                .isUserActive(true)
                .isUserLocked(false)
                .isUserCurrentlyLoggedIn(false)
                .userRole("ADMIN")
                .userCreatedAt(ZonedDateTime.now())
                .isUserDeleted(false)
                .build();
        UserInfo userInfo2 = UserInfo.builder()
                .userId(UUID.randomUUID().toString())
                .userName("test_user")
                .name("test 1")
                .isUserActive(true)
                .isUserLocked(false)
                .isUserCurrentlyLoggedIn(false)
                .userRole("MANAGER")
                .userCreatedAt(ZonedDateTime.now())
                .isUserDeleted(false)
                .build();

        Users expectedUsers = new Users();
        expectedUsers.add(userInfo1);
        expectedUsers.add(userInfo2);
        String expectedResponseBody = convertObjectToJsonString(expectedUsers);

        lenient().when(mockUserService.getAllUsers()).thenReturn(expectedUsers);

        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnStatusNoContent_WhenNoUsersExist() throws Exception {
        String route = UrlConfig.USER_PATH;

        lenient().when(mockUserService.getAllUsers()).thenReturn(null);

        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isNoContent())
                .andReturn();

        assertEquals("", result.getResponse().getContentAsString());
    }
}