package com.arbindo.mimock.staticrecords.service;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.repository.EntityStatusRepository;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.ResponseContentTypesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class GetStaticRecordsServiceImplTest {
    @Autowired
    GetStaticRecordsServiceImpl service;

    @MockBean
    HttpMethodsRepository mockHttpMethodsRepository;

    @MockBean
    ResponseContentTypesRepository mockResponseContentTypesRepository;

    @MockBean
    EntityStatusRepository mockEntityStatusRepository;

    @Test
    void shouldReturnAllSupportedHttpMethods() {
        List<HttpMethod> httpMethodsFromDB = new ArrayList<>();
        HttpMethod getMethod = HttpMethod.builder()
                .method("GET")
                .build();
        HttpMethod postMethod = HttpMethod.builder()
                .method("POST")
                .build();
        httpMethodsFromDB.add(getMethod);
        httpMethodsFromDB.add(postMethod);

        lenient().when(mockHttpMethodsRepository.findAll()).thenReturn(httpMethodsFromDB);

        List<HttpMethod> httpMethods = service.listAllSupportedHttpMethods();

        assertNotNull(httpMethods);
        assertNotEquals(0, httpMethods.size());
        assertEquals("GET", httpMethods.get(0).getMethod());
        assertEquals("POST", httpMethods.get(1).getMethod());
    }

    @Test
    void shouldReturnAllSupportedResponseContentTypes() {
        List<ResponseContentType> contentTypesFromDB = new ArrayList<>();
        ResponseContentType jsonType = ResponseContentType.builder()
                .contentType("application/json")
                .build();
        ResponseContentType xmlType = ResponseContentType.builder()
                .contentType("application/xml")
                .build();
        contentTypesFromDB.add(jsonType);
        contentTypesFromDB.add(xmlType);

        lenient().when(mockResponseContentTypesRepository.findAll()).thenReturn(contentTypesFromDB);

        List<ResponseContentType> contentTypes = service.listAllSupportedResponseContentTypes();

        assertNotNull(contentTypes);
        assertNotEquals(0, contentTypes.size());
        assertEquals("application/json", contentTypes.get(0).getContentType());
        assertEquals("application/xml", contentTypes.get(1).getContentType());
    }

    @Test
    void shouldReturnAllSupportedEntityStatus() {
        List<EntityStatus> entityStatusesFromDB = new ArrayList<>();
        EntityStatus deleted = EntityStatus.builder().status("DELETED").build();

        entityStatusesFromDB.add(deleted);

        lenient().when(mockEntityStatusRepository.findAll()).thenReturn(entityStatusesFromDB);

        List<EntityStatus> entityStatuses = service.listAllSupportedEntityStatus();

        assertNotNull(entityStatuses);
        assertNotEquals(0, entityStatuses.size());
        assertEquals("DELETED", entityStatuses.get(0).getStatus());
    }
}