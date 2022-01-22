package com.arbindo.mimock;

import com.arbindo.mimock.init.InitDatabase;
import liquibase.Liquibase;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.jdbc.DatabaseDriver;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.support.DatabaseStartupValidator;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.stream.Stream;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class MimockApplication {

    public MimockApplication(InitDatabase initDatabase) {
        initDatabase.initConnection();
    }

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
}
