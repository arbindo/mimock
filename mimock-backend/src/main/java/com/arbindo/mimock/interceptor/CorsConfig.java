package com.arbindo.mimock.interceptor;

import com.arbindo.mimock.constants.UrlConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(UrlConfig.MOCKS_PATH + "/**")
                        .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "OPTIONS", "PATCH")
                        .allowedHeaders("*")
                        .allowedOrigins("http://localhost:3000");
            }
        };
    }
}
