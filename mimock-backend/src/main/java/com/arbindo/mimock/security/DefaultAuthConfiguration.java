package com.arbindo.mimock.security;

import com.arbindo.mimock.constants.Role;
import com.arbindo.mimock.constants.UrlConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Set;

@EnableWebSecurity
public class DefaultAuthConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsService userDetailsService;

    @Value("#{'${app.security.cors-config.allowed-origins}'.split(',')}")
    private Set<String> corsAllowedOrigins;

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
                .antMatchers(adminPath + wildCardPath).hasRole(Role.ADMIN.toString())
                .antMatchers(managePath + wildCardPath).hasAnyRole(
                        Role.ADMIN.toString(),
                        Role.MANAGER.toString()
                )
                .antMatchers(UrlConfig.AUTHENTICATE).permitAll().and().authorizeRequests()
                .antMatchers(apiPath + wildCardPath).hasAnyRole(
                        Role.ADMIN.toString(),
                        Role.MANAGER.toString(),
                        Role.VIEWER.toString()
                )
                .and().httpBasic().and().authorizeRequests()
                .antMatchers("/").permitAll()
                .and().csrf().disable()
                .cors().configurationSource(corsConfigurationSource());
    }

    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        for (String allowedOrigin : corsAllowedOrigins) {
            corsConfiguration.addAllowedOrigin(allowedOrigin);
        }
        corsConfiguration.addAllowedHeader("Content-type");
        corsConfiguration.addAllowedHeader("Authorization");
        source.registerCorsConfiguration(UrlConfig.API_PREFIX + "/**", corsConfiguration);

        return source;
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2A);
    }
}
