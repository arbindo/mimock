package com.arbindo.mimock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class MimockApplication {

    public static void main(String[] args) {
        SpringApplication.run(MimockApplication.class, args);
    }

}
