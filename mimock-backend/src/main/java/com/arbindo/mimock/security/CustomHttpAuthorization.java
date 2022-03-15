package com.arbindo.mimock.security;

import com.arbindo.mimock.common.constants.Role;
import com.arbindo.mimock.common.constants.UrlConfig;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public class CustomHttpAuthorization {
    // Add any custom route here which needs to be authorized based on user role + Http method
    public static void authorizeBasedOnHttpMethodAndUserRole(HttpSecurity http) throws Exception {
        http.authorizeRequests(r -> {
            r
                    .antMatchers(
                            HttpMethod.POST,
                            UrlConfig.MOCKS_PATH,
                            UrlConfig.MOCKS_PATH + "/**")
                    .hasAnyRole(Role.ADMIN.toString(), Role.MANAGER.toString())
                    .antMatchers(
                            HttpMethod.DELETE,
                            UrlConfig.MOCKS_PATH,
                            UrlConfig.MOCKS_PATH + "/**")
                    .hasAnyRole(Role.ADMIN.toString(), Role.MANAGER.toString())
                    .antMatchers(
                            HttpMethod.PUT,
                            UrlConfig.MOCKS_PATH,
                            UrlConfig.MOCKS_PATH + "/**")
                    .hasAnyRole(Role.ADMIN.toString(), Role.MANAGER.toString());
        });
    }
}
