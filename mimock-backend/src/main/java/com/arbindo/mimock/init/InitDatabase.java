package com.arbindo.mimock.init;

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
    @Value("${spring.datasource.url}")
    private String dbURL;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Value("${spring.datasource.driver-class-name}")
    private String dbDriver;

    private Connection connection;

    public void initConnection() {
        Connection connection;
        try {
            Class.forName(this.dbDriver);
            connection = DriverManager.getConnection(this.dbURL, this.dbUser, dbPassword);
            log.log(Level.INFO, "Database connection initialized");
            this.connection = connection;
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
        }
    }

    public Connection getConnection() {
        return this.connection;
    }
}
