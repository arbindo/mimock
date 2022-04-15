package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.helpers.db.*;
import com.arbindo.mimock.helpers.general.RandomDataGenerator;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MimockMockRepositoryTest {

    @Autowired
    MocksDBHelper mocksDBHelper;

    @Autowired
    HttpMethodDBHelper httpMethodsDBHelper;

    @Autowired
    TextualResponseDBHelper textualResponseDBHelper;

    @Autowired
    BinaryResponseDBHelper binaryResponseDBHelper;

    @Autowired
    ResponseContentTypeDBHelper responseContentTypeDBHelper;

    @Autowired
    EntityStatusDBHelper entityStatusDBHelper;

    @Autowired
    ResponseHeadersDBHelper responseHeadersDBHelper;

    @Autowired
    RequestHeadersDBHelper requestHeadersDBHelper;

    @Autowired
    RequestBodiesForMockDBHelper requestBodiesForMockDBHelper;

    @Autowired
    RequestBodyTypeDBHelper requestBodyTypeDBHelper;

    @Autowired
    MocksRepository repository;

    @Transactional
    @Test
    void shouldGetMockWithTextualResponseByRouteAndHttpMethod() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{testResponse: 'This is a response'}")
                .build();
        textualResponse = textualResponseDBHelper.save(textualResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .mockName("test mock 1")
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .textualResponse(textualResponse)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .mockName("test mock 2")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .textualResponse(textualResponse)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mock mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Optional<Mock> resultFromDB = repository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(textualResponse.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getResponseHeaders());
        assertNull(actualMockFromDB.getRequestBodiesForMock());
    }

    @Transactional
    @Test
    void shouldGetMockWithBinaryResponseByRouteAndHttpMethod() throws Exception {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        BinaryResponse binaryResponse = BinaryResponse.builder()
                .responseFile(generateFile())
                .build();
        deleteTestFile();
        binaryResponse = binaryResponseDBHelper.save(binaryResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("text/plain");

        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .mockName("test mock 1")
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .binaryResponse(binaryResponse)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .mockName("test mock 2")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .binaryResponse(binaryResponse)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mock mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Optional<Mock> resultFromDB = repository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(binaryResponse.getResponseFile(), actualMockFromDB.getBinaryResponse().getResponseFile());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getResponseHeaders());
        assertNull(actualMockFromDB.getRequestBodiesForMock());
    }

    @Transactional
    @Test
    void shouldGetMockWithEmptyResponseByRouteAndHttpMethod() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .mockName("test mock 1")
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .mockName("test mock 2")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mock mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Optional<Mock> resultFromDB = repository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertNull(actualMockFromDB.getTextualResponse());
        assertNull(actualMockFromDB.getBinaryResponse());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getResponseHeaders());
        assertNull(actualMockFromDB.getRequestBodiesForMock());
    }

    @Transactional
    @Test
    void shouldGetMockWithResponseAndRequestHeaders() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        ResponseHeader expectedResponseHeaders = ResponseHeader.builder()
                .responseHeader(RandomDataGenerator.generateResponseHeaders())
                .build();
        responseHeadersDBHelper.save(expectedResponseHeaders);

        RequestHeader expectedRequestHeaders = RequestHeader.builder()
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .matchExact(false)
                .build();
        requestHeadersDBHelper.save(expectedRequestHeaders);

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .mockName("test mock 1")
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(entityStatus)
                .responseHeaders(expectedResponseHeaders)
                .requestHeaders(expectedRequestHeaders)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .deletedAt(null)
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .mockName("test mock 2")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .deletedAt(null)
                .build();

        Mock mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mock mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Optional<Mock> resultFromDB = repository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(expectedResponseHeaders.toString(), actualMockFromDB.getResponseHeaders().toString());
        assertEquals(expectedRequestHeaders.toString(), actualMockFromDB.getRequestHeaders().toString());
        assertNull(actualMockFromDB.getTextualResponse());
        assertNull(actualMockFromDB.getBinaryResponse());
        assertNull(actualMockFromDB.getRequestBodiesForMock());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNotEquals("", actualMockFromDB.toString());
    }

    @Transactional
    @Test
    void shouldGetMockWithRequestBody() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        ResponseHeader expectedResponseHeaders = ResponseHeader.builder()
                .responseHeader(RandomDataGenerator.generateResponseHeaders())
                .build();
        responseHeadersDBHelper.save(expectedResponseHeaders);

        RequestHeader expectedRequestHeaders = RequestHeader.builder()
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .matchExact(false)
                .build();
        requestHeadersDBHelper.save(expectedRequestHeaders);

        RequestBodyType requestBodyType = requestBodyTypeDBHelper.findOneByRequestBodyType("application/json");
        RequestBodiesForMock expectedRequestBody = RequestBodiesForMock.builder()
                .requestBody(RandomDataGenerator.generateRequestBody())
                .requestBodyType(requestBodyType)
                .updatedAt(null)
                .deletedAt(null)
                .build();
        requestBodiesForMockDBHelper.save(expectedRequestBody);

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .mockName("test mock 1")
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(entityStatus)
                .responseHeaders(expectedResponseHeaders)
                .requestBodiesForMock(expectedRequestBody)
                .requestHeaders(expectedRequestHeaders)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .mockName("test mock 2")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mock mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Optional<Mock> resultFromDB = repository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(expectedResponseHeaders, actualMockFromDB.getResponseHeaders());
        assertEquals(expectedRequestHeaders, actualMockFromDB.getRequestHeaders());
        assertEquals(expectedRequestBody.toString(), actualMockFromDB.getRequestBodiesForMock().toString());
        assertNull(actualMockFromDB.getTextualResponse());
        assertNull(actualMockFromDB.getBinaryResponse());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
    }

    @Transactional
    @ParameterizedTest
    @ValueSource(strings = {"NONE", "ARCHIVED", "DELETED"})
    void shouldFindAllMocksByEntityStatus(String expectedEntityStatus) {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(expectedEntityStatus);
        EntityStatus deletedEntityStatus = entityStatusDBHelper.findByStatus(Status.DELETED.name());

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .mockName("test mock 1")
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(entityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .mockName("test mock 2")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(deletedEntityStatus)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mock mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        List<Mock> mockList = new ArrayList<>();
        mockList.add(mock1);
        mockList.add(mock2);
        long expectedCount = mockList.stream().filter(mock -> mock.getEntityStatus().getStatus().equals(expectedEntityStatus)).count();

        Page<Mock> resultFromDB = repository.findAllByEntityStatus(entityStatus, Pageable.unpaged());
        assertNotNull(resultFromDB);

        List<Mock> actualMocksFromDB = resultFromDB.getContent();
        assertEquals(expectedCount, actualMocksFromDB.size());
        Mock actualMockFromDB = actualMocksFromDB.get(0);
        assertNotNull(actualMockFromDB);
        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertNull(actualMockFromDB.getTextualResponse());
        assertNull(actualMockFromDB.getBinaryResponse());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertEquals(expectedEntityStatus, actualMockFromDB.getEntityStatus().getStatus());
        assertNull(actualMockFromDB.getResponseHeaders());
        assertNull(actualMockFromDB.getRequestBodiesForMock());
    }

    @Test
    void shouldReturnNullWhenThereAreNoMocksInTheDB() {
        HttpMethod httpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();

        String route = "/api/mock/test";
        String queryParam = "version=1.0.0&auto=true";

        Optional<Mock> resultFromDB = repository.findOneByRouteAndHttpMethodAndQueryParams(route, httpMethod, queryParam);
        assertFalse(resultFromDB.isPresent());
    }

    @Transactional
    @Test
    void shouldReturnListOfMocksByEntityStatus(){
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID mockId1 = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId2 = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");
        UUID mockId3 = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14cccc");

        EntityStatus deletedEntityStatus = entityStatusDBHelper.findByStatus(Status.DELETED.name());
        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        ZonedDateTime creationTimestamp = ZonedDateTime.now().minusDays(50);
        ZonedDateTime thirtyDaysAgo = ZonedDateTime.now().minusDays(30);
        ZonedDateTime tenDaysAgo = ZonedDateTime.now().minusDays(10);

        Mock testMock1 = Mock.builder()
                .id(mockId1)
                .mockName("test mock 1")
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(entityStatus)
                .createdAt(creationTimestamp)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId2)
                .mockName("test mock 2")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(deletedEntityStatus)
                .createdAt(creationTimestamp)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock testMock3 = Mock.builder()
                .id(mockId3)
                .mockName("test mock 3")
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(deletedEntityStatus)
                .createdAt(creationTimestamp)
                .createdBy("TEST_USER")
                .modifiedBy("TEST_USER")
                .build();

        Mock mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mock mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        mock2.setDeletedAt(thirtyDaysAgo);
        Mock deletedMock2 = mocksDBHelper.save(mock2);
        assertNotNull(deletedMock2);

        Mock mock3 = mocksDBHelper.save(testMock3);
        assertNotNull(mock3);

        mock3.setDeletedAt(tenDaysAgo);
        Mock deletedMock3 = mocksDBHelper.save(mock3);
        assertNotNull(deletedMock3);

        List<Mock> expectedDeletedMockList = new ArrayList<>();
        expectedDeletedMockList.add(deletedMock2); // mock2 is only deleted mock 30 days ago
        long expectedCount = expectedDeletedMockList.size();

        List<Mock> mocks = repository.findAllByEntityStatusAndDeletedAt(deletedEntityStatus, thirtyDaysAgo);
        assertNotNull(mocks);
        assertEquals(expectedDeletedMockList, mocks);
        assertEquals(expectedCount, mocks.size());
    }

    byte[] generateFile() throws Exception {
        String fileName = "test.txt";
        File testFile = new File(fileName);
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(testFile));
        bufferedWriter.write("Test file");
        bufferedWriter.close();

        return Files.readAllBytes(testFile.toPath());
    }

    void deleteTestFile() {
        String fileName = "test.txt";
        File testFile = new File(fileName);
        testFile.deleteOnExit();
    }
}
