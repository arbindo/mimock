package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.HttpMethod;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HttpMethodsRepositoryTest {

    @Autowired
    HttpMethodsRepository httpMethodsRepository;

    @ParameterizedTest
    @ValueSource(strings = {"GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "TRACE", "PATCH"})
    void shouldReturnHttpMethodForValidMethod(String method) {
        // Act
        HttpMethod httpMethod = httpMethodsRepository.findByMethod(method);
        // Assert
        assertNotNull(httpMethod);
        assertEquals(method, httpMethod.getMethod());
    }

    @ParameterizedTest
    @ValueSource(strings = {"TEST", "RANDOM", "EXEC", "123X", "OPTIONS"})
    void shouldReturnNullForInvalidMethod(String method) {
        // Act
        HttpMethod httpMethod = httpMethodsRepository.findByMethod(method);
        // Assert
        assertNull(httpMethod);
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNullForInvalidMethodWhenEmptyOrNull(String method) {
        // Act
        HttpMethod httpMethod = httpMethodsRepository.findByMethod(method);
        // Assert
        assertNull(httpMethod);
    }

    @ParameterizedTest
    @ValueSource(strings = {"get", "Head", "pOSt", "put", "Delete", "connect", "Options", "trace", "PaTch"})
    void shouldReturnNullForCaseSensitiveMethodStrings(String method) {
        // Act
        HttpMethod httpMethod = httpMethodsRepository.findByMethod(method);
        // Assert
        assertNull(httpMethod);
    }

    @ParameterizedTest
    @ValueSource(strings = {"get OR 1=1", "GET; DROP TABLE mocks;"})
    void shouldReturnNullForInvalidMethodForSqlInjectionStrings(String method) {
        // Act
        HttpMethod httpMethod = httpMethodsRepository.findByMethod(method);
        // Assert
        assertNull(httpMethod);
    }
}
