package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.security.JwtRequestFilter;
import com.arbindo.mimock.security.user.models.request.UpdateUserRoleRequest;
import com.arbindo.mimock.security.user.service.UpdateUserRoleService;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        value = UpdateUserRoleController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class,
        }
)
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
class UpdateUserRoleControllerTest {
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
    UpdateUserRoleService mockUpdateUserRoleService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    private final String route = UrlConfig.UPDATE_ROLE;

    @Test
    void shouldRespondWithStatusOK_WhenUserRoleIsUpdatedSuccessfully() throws Exception {
        UpdateUserRoleRequest request = UpdateUserRoleRequest.builder()
                .userName("mimock_admin")
                .userRole("MANAGER")
                .build();

        UserRole userRole = UserRole.builder()
                .roleName("MANAGER")
                .build();

        User user = User.builder()
                .userName(request.getUserName())
                .userRoles(userRole)
                .build();

        lenient().when(mockUpdateUserRoleService.updateUserRole(any())).thenReturn(user);

        MvcResult result = mockMvc.perform(
                        put(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isOk())
                .andReturn();

        Map<String, Object> responseMap = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString());
        assertNotNull(responseMap);
        assertNotNull(responseMap.get("userName"));
        assertNotNull(responseMap.get("updatedUserRole"));

        assertEquals(request.getUserName(), responseMap.get("userName"));
        assertEquals(request.getUserRole(), responseMap.get("updatedUserRole"));
    }

    @Test
    void shouldRespondWithStatusInternalServerError_WhenUserRoleUpdateFails() throws Exception {
        UpdateUserRoleRequest request = UpdateUserRoleRequest.builder()
                .userName("mimock_admin")
                .userRole("MANAGER")
                .build();

        String errorMessage = "User name no found";
        lenient().when(mockUpdateUserRoleService.updateUserRole(any()))
                .thenThrow(new UsernameNotFoundException(errorMessage));

        MvcResult result = mockMvc.perform(
                        put(route)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(Objects.requireNonNull(JsonMapper.convertObjectToJsonString(request)))
                )
                .andExpect(status().isInternalServerError())
                .andReturn();

        Map<String, Object> responseMap = JsonMapper.convertJSONStringToMap(result.getResponse().getContentAsString());
        assertNotNull(responseMap);
        assertNotNull(responseMap.get("message"));

        assertEquals(errorMessage, responseMap.get("message"));
    }
}
