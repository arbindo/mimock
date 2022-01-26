package com.arbindo.mimock.mockhandler;

import com.arbindo.mimock.helpers.db.*;
import com.arbindo.mimock.mockhandler.entities.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class HandleMockRequestRepositoryTest {
    @Autowired
    MocksDBHelper mocksDBHelper;

    @Autowired
    HttpMethodDBHelper httpMethodsDBHelper;

    @Autowired
    HandleMockRequestRepository handleMockRequestRepository;

    @Autowired
    TextualResponseDBHelper textualResponseDBHelper;

    @Autowired
    BinaryResponseDBHelper binaryResponseDBHelper;

    @Autowired
    ResponseContentTypeDBHelper responseContentTypeDBHelper;

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

        TextualResponseBody textualResponseBody = TextualResponseBody.builder()
                .responseBody("{testResponse: 'This is a response'}")
                .build();
        textualResponseBody = textualResponseDBHelper.save(textualResponseBody);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByResponseType("application/json");

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mocks testMock1 = Mocks.builder()
                .id(expectedMockId)
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .textualResponse(textualResponseBody)
                .responseContentType(responseContentType)
                .statusCode(200)
                .build();

        Mocks testMock2 = Mocks.builder()
                .id(mockId)
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .textualResponse(textualResponseBody)
                .responseContentType(responseContentType)
                .statusCode(400)
                .build();

        Mocks mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mocks mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Mocks actualMockFromDB = handleMockRequestRepository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(textualResponseBody.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
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

        BinaryResponseBody binaryResponseBody = BinaryResponseBody.builder()
                .responseFile(generateFile())
                .build();
        deleteTestFile();
        binaryResponseBody = binaryResponseDBHelper.save(binaryResponseBody);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByResponseType("text/plain");

        String expectedRoute = "/api/mock/test";
        String expectedQueryParams = "version=1.0.0&auto=true";
        String queryParams = "version=1.0.0&auto=false";
        UUID expectedMockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14aaaa");
        UUID mockId = UUID.fromString("98737aed-e655-4bfd-88c5-ab10df14bbbb");

        Mocks testMock1 = Mocks.builder()
                .id(expectedMockId)
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .binaryResponse(binaryResponseBody)
                .responseContentType(responseContentType)
                .statusCode(200)
                .build();

        Mocks testMock2 = Mocks.builder()
                .id(mockId)
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .binaryResponse(binaryResponseBody)
                .responseContentType(responseContentType)
                .statusCode(400)
                .build();

        Mocks mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mocks mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Mocks actualMockFromDB = handleMockRequestRepository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(binaryResponseBody.getResponseFile(), actualMockFromDB.getBinaryResponse().getResponseFile());
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

        Mocks testMock1 = Mocks.builder()
                .id(expectedMockId)
                .route(expectedRoute)
                .httpMethod(expectedHttpMethod)
                .queryParams(expectedQueryParams)
                .responseContentType(responseContentType)
                .statusCode(200)
                .build();

        Mocks testMock2 = Mocks.builder()
                .id(mockId)
                .route(expectedRoute)
                .httpMethod(httpMethod)
                .queryParams(queryParams)
                .responseContentType(responseContentType)
                .statusCode(400)
                .build();

        Mocks mock1 = mocksDBHelper.save(testMock1);
        assertNotNull(mock1);

        Mocks mock2 = mocksDBHelper.save(testMock2);
        assertNotNull(mock2);

        Mocks actualMockFromDB = handleMockRequestRepository.findOneByRouteAndHttpMethodAndQueryParams(expectedRoute, expectedHttpMethod, expectedQueryParams);

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

        Mocks actualMockFromDB = handleMockRequestRepository.findOneByRouteAndHttpMethodAndQueryParams(route, httpMethod, queryParam);

        assertNull(actualMockFromDB);
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
