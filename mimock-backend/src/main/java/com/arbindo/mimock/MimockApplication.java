package com.arbindo.mimock;

import com.arbindo.mimock.common.constants.UrlConfig;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import liquibase.Liquibase;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.stream.Stream;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableScheduling
@EnableCaching
public class MimockApplication {
    public static void main(String[] args) {
        SpringApplication.run(MimockApplication.class, args);
    }

    @Bean
    public static BeanFactoryPostProcessor dependsOnPostProcessor() {
        return bf -> {
            Stream.of(bf.getBeanNamesForType(Liquibase.class))
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("databaseStartupValidator"));

            Stream.of(bf.getBeanNamesForType(EntityManagerFactory.class))
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("databaseStartupValidator"));
        };
    }

    @Bean
    public DatabaseStartupValidator databaseStartupValidator(DataSource dataSource) {
        DatabaseStartupValidator validator = new DatabaseStartupValidator();
        validator.setDataSource(dataSource);
        validator.setInterval(5);
        validator.setTimeout(60);
        return validator;
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(getApiInfo())
                .components(getApiComponents());
    }

    private Components getApiComponents() {
        return new Components()
                .addSecuritySchemes(UrlConfig.SWAGGER_BEARER_AUTH_KEY, getBearerJwtSecurityScheme());
    }

    private SecurityScheme getBearerJwtSecurityScheme() {
        return new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT");
    }

    private Info getApiInfo() {
        return new Info()
                .title("Mimock")
                .description("Utility to set up mock rest api endpoints to mimic actual endpoints")
                .contact(new Contact().name("Mimock").url("http://www.mimock.io/"))
                .license(new License().name("Apache License 2.0").url("https://github.com/neel1996/mimock/blob/main/LICENSE"))
                .version("v0.1");
    }
}
