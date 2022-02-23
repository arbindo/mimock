package com.arbindo.mimock;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import liquibase.Liquibase;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.support.DatabaseStartupValidator;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.stream.Stream;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
// TODO: Enable this once security setup is complete
//@EnableJpaRepositories(basePackageClasses = UserRepository.class)
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
        var validator = new DatabaseStartupValidator();
        validator.setDataSource(dataSource);
        validator.setInterval(5);
        validator.setTimeout(60);
        return validator;
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Mimock")
                .description("Utility to set up mock rest api endpoints to mimic actual endpoints")
                .contact(new Contact().name("Mimock").url("http://www.mimock.io/"))
                .license(new License().name("Apache License 2.0").url("https://github.com/neel1996/mimock/blob/main/LICENSE"))
                .version("v0.1"));
    }
}
