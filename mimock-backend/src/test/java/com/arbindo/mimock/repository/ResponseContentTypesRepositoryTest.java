package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.ResponseContentType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ResponseContentTypesRepositoryTest {

    @Autowired
    ResponseContentTypesRepository responseContentTypesRepository;

    @Test
    void shouldReturnResponseContentTypeForValidType() {
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType("application/pdf");

        assertNotNull(responseType);
        assertEquals(responseType.getResponseType(), "application/pdf");
    }

    @Test
    void shouldReturnNullForInValidType() {
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType("application/excel");

        assertNull(responseType);
    }
}
