package com.arbindo.mimock.init;

import liquibase.pro.packaged.I;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Connection;
import java.sql.DriverManager;

@Configuration
@Log4j2
public class InitDatabase {
    @Value("${app.database_password}")
    private String dbPassword;

    @Bean
    InitDatabase init() {
        return new InitDatabase();
    }

    public Connection initConnection() {
        Connection connection;

        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/mimock_db",
                    "mimock",
                    dbPassword);
            log.log(Level.INFO, "Database connection initialized");
            return connection;
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
        }
        return null;
    }
}
