package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.helpers.db.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
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

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByResponseType("application/json");

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .textualResponse(textualResponse)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(EntityStatus.NONE)
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .textualResponse(textualResponse)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(EntityStatus.NONE)
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

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByResponseType("text/plain");

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .binaryResponse(binaryResponse)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(EntityStatus.NONE)
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .binaryResponse(binaryResponse)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(EntityStatus.NONE)
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

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByResponseType("application/json");

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mock testMock1 = Mock.builder()
                .id(expectedMockId)
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .responseContentType(responseContentType)
                .statusCode(200)
                .entityStatus(EntityStatus.NONE)
                .build();

        Mock testMock2 = Mock.builder()
                .id(mockId)
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .entityStatus(EntityStatus.NONE)
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
