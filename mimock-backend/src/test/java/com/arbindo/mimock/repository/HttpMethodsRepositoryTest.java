package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.HttpMethod;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HttpMethodsRepositoryTest {
    @Autowired
    HttpMethodsRepository httpMethodsRepository;

    @Test
    void shouldReturnHttpMethodForValidMethod() {
        HttpMethod get = httpMethodsRepository.findByMethod("GET");

        assertNotNull(get);
        assertEquals(get.getMethod(), "GET");
    }

    @Test
    void shouldReturnNullForInValidMethod() {
        HttpMethod get = httpMethodsRepository.findByMethod("TEST");

        assertNull(get);
    }
}
