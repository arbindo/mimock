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
            String[] liquibase = bf.getBeanNamesForType(Liquibase.class);
            Stream.of(liquibase)
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("databaseStartupValidator"));

            String[] jpa = bf.getBeanNamesForType(EntityManagerFactory.class);
            Stream.of(jpa)
                    .map(bf::getBeanDefinition)
                    .forEach(it -> it.setDependsOn("databaseStartupValidator"));
        };
    }

    @Bean
    public DatabaseStartupValidator databaseStartupValidator(DataSource dataSource) {
        var dsv = new DatabaseStartupValidator();
        dsv.setDataSource(dataSource);
        dsv.setValidationQuery(DatabaseDriver.POSTGRESQL.getValidationQuery());
        return dsv;
    }
}
