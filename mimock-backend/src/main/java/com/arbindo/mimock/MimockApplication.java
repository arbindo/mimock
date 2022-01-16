package com.arbindo.mimock;

import com.arbindo.mimock.init.InitDatabase;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class MimockApplication {

    public MimockApplication(InitDatabase initDatabase) {
        initDatabase.initConnection();
    }

    public static void main(String[] args) {
        SpringApplication.run(MimockApplication.class, args);
    }

}
