package com.arbindo.mimock.security;

import com.arbindo.mimock.constants.Roles;
import com.arbindo.mimock.constants.UrlConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class DefaultAuthConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String apiPath = UrlConfig.API_PATH + UrlConfig.VERSION;
        String adminPath = UrlConfig.API_PATH + UrlConfig.VERSION + UrlConfig.ADMIN;
        String managePath = UrlConfig.API_PATH + UrlConfig.VERSION + UrlConfig.MANAGE;
        String wildCardPath = "/**";

        http.authorizeRequests()
                .antMatchers(adminPath + wildCardPath).hasRole(Roles.ADMIN.toString())
                .antMatchers(managePath + wildCardPath).hasAnyRole(
                        Roles.ADMIN.toString(),
                        Roles.MANAGER.toString()
                )
                .antMatchers(apiPath + wildCardPath).hasAnyRole(
                        Roles.ADMIN.toString(),
                        Roles.MANAGER.toString(),
                        Roles.VIEWER.toString()
                )
                .antMatchers("/").permitAll().and().httpBasic();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2A);
    }
}
