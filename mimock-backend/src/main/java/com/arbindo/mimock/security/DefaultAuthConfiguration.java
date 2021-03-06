package com.arbindo.mimock.security;

import com.arbindo.mimock.common.constants.Role;
import com.arbindo.mimock.common.constants.UrlConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
public class DefaultAuthConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtRequestFilter jwtRequestFilter;

    @Value("#{'${app.security.cors-config.allowed-origins}'.split(',')}")
    private List<String> corsAllowedOrigins;

    @Value("#{'${app.security.cors-config.allowed-methods}'.split(',')}")
    private List<String> corsAllowedMethods;

    @Value("#{'${app.security.cors-config.allowed-headers}'.split(',')}")
    private List<String> corsAllowedHeaders;

    @Value("#{'${app.security.cors-config.exposed-headers}'.split(',')}")
    private List<String> corsExposedHeaders;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String apiPath = UrlConfig.API_PATH + UrlConfig.VERSION;
        String adminPath = UrlConfig.API_PATH + UrlConfig.VERSION + UrlConfig.ADMIN;
        String wildCardPath = "/**";

        CustomHttpAuthorization.authorizeBasedOnHttpMethodAndUserRole(http);

        http.authorizeRequests()
                .antMatchers(adminPath + "/users/update-password").hasAnyRole(
                        Role.ADMIN.toString(),
                        Role.MANAGER.toString(),
                        Role.VIEWER.toString()
                )
                .antMatchers(adminPath + wildCardPath).hasRole(Role.ADMIN.toString())
                .antMatchers(UrlConfig.AUTHENTICATE).permitAll().and().authorizeRequests()
                .antMatchers(apiPath + wildCardPath).hasAnyRole(
                        Role.ADMIN.toString(),
                        Role.MANAGER.toString(),
                        Role.VIEWER.toString()
                )
                .antMatchers("/").permitAll()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        setupCSRF(http, apiPath + wildCardPath);
        setupCorsConfig(http, apiPath + wildCardPath);

        http.headers().frameOptions().sameOrigin();
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    private void setupCSRF(HttpSecurity http, String apiPath) throws Exception {
        http.antMatcher(apiPath).csrf((csrfInstance) -> csrfInstance
                .ignoringAntMatchers(UrlConfig.AUTHENTICATE)
                .ignoringAntMatchers("/mimock-ui/**")
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));
    }

    private void setupCorsConfig(HttpSecurity http, String apiPath) throws Exception {
        http.antMatcher(apiPath).cors(cors -> {
            CorsConfigurationSource cs = resources -> {
                CorsConfiguration corsConfiguration = new CorsConfiguration();
                corsConfiguration.setAllowedOrigins(corsAllowedOrigins);
                corsConfiguration.setAllowedMethods(corsAllowedMethods);
                corsConfiguration.setAllowedHeaders(corsAllowedHeaders);
                corsConfiguration.setExposedHeaders(corsExposedHeaders);
                corsConfiguration.setAllowCredentials(true);
                return corsConfiguration;
            };

            cors.configurationSource(cs);
        });
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
