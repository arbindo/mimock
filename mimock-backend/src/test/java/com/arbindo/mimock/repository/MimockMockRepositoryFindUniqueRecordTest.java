package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.helpers.db.*;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MimockMockRepositoryFindUniqueRecordTest {

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
    void shouldReturnUniqueMockBasedOnAllSelectors() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{\"testResponse\": \"This is a response\"}")
                .build();
        textualResponse = textualResponseDBHelper.save(textualResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        Map<String, Object> requestBodyMap = JsonMapper.convertJSONStringToMap("{ \"userId\": 1, \"id\": 1, " +
                "\"title\": \"delectus aut autem\", " +
                "\"completed\": false }");
        RequestBodiesForMock expectedRequestBody = requestBodiesForMockDBHelper.save(
                RequestBodiesForMock.builder()
                        .requestBody(requestBodyMap)
                        .requestBodyType(requestBodyTypeDBHelper.findOneByRequestBodyType("application/json"))
                        .build()
        );

        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap("{\"Authorization\": \"Bearer TOKEN\"," +
                "\"x-trace-id\": \"sadf3w4fr\"}");
        RequestHeader expectedRequestHeader = requestHeadersDBHelper.save(
                RequestHeader.builder().requestHeader(headerMap).matchExact(Boolean.FALSE).build()
        );

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
                .requestBodiesForMock(expectedRequestBody)
                .requestHeaders(expectedRequestHeader)
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

        Optional<Mock> resultFromDB = repository.findUniqueMock(
                expectedRoute,
                expectedHttpMethod,
                expectedQueryParams,
                expectedRequestBody,
                expectedRequestHeader
        );
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(expectedRequestBody, actualMockFromDB.getRequestBodiesForMock());
        assertEquals(expectedRequestHeader, actualMockFromDB.getRequestHeaders());

        assertEquals(textualResponse.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getResponseHeaders());
    }

    @Transactional
    @Test
    void shouldReturnUniqueMock_WhenRequestBodyIsNull() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{\"testResponse\": \"This is a response\"}")
                .build();
        textualResponse = textualResponseDBHelper.save(textualResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap("{\"Authorization\": \"Bearer TOKEN\"," +
                "\"x-trace-id\": \"sadf3w4fr\"}");
        RequestHeader expectedRequestHeader = requestHeadersDBHelper.save(
                RequestHeader.builder().requestHeader(headerMap).matchExact(Boolean.FALSE).build()
        );

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
                .requestBodiesForMock(null)
                .requestHeaders(expectedRequestHeader)
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

        Optional<Mock> resultFromDB = repository.findUniqueMock(
                expectedRoute,
                expectedHttpMethod,
                expectedQueryParams,
                null,
                expectedRequestHeader
        );
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(expectedRequestHeader, actualMockFromDB.getRequestHeaders());

        assertEquals(textualResponse.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
        assertNull(actualMockFromDB.getRequestBodiesForMock());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getResponseHeaders());
    }

    @Transactional
    @Test
    void shouldReturnUniqueMock_WhenRequestHeaderIsNull() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{\"testResponse\": \"This is a response\"}")
                .build();
        textualResponse = textualResponseDBHelper.save(textualResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        Map<String, Object> requestBodyMap = JsonMapper.convertJSONStringToMap("{ \"userId\": 1, \"id\": 1, " +
                "\"title\": \"delectus aut autem\", " +
                "\"completed\": false }");
        RequestBodiesForMock expectedRequestBody = requestBodiesForMockDBHelper.save(
                RequestBodiesForMock.builder()
                        .requestBody(requestBodyMap)
                        .requestBodyType(requestBodyTypeDBHelper.findOneByRequestBodyType("application/json"))
                        .build()
        );

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
                .requestBodiesForMock(expectedRequestBody)
                .requestHeaders(null)
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

        Optional<Mock> resultFromDB = repository.findUniqueMock(
                expectedRoute,
                expectedHttpMethod,
                expectedQueryParams,
                expectedRequestBody,
                null
        );
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(expectedRequestBody, actualMockFromDB.getRequestBodiesForMock());

        assertEquals(textualResponse.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getRequestHeaders());
        assertNull(actualMockFromDB.getResponseHeaders());
    }

    @Transactional
    @Test
    void shouldReturnUniqueMock_WhenRequestBodyAndHeadersAreNull() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{\"testResponse\": \"This is a response\"}")
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
                .requestBodiesForMock(null)
                .requestHeaders(null)
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

        Optional<Mock> resultFromDB = repository.findUniqueMock(
                expectedRoute,
                expectedHttpMethod,
                expectedQueryParams,
                null,
                null
        );
        assertTrue(resultFromDB.isPresent());

        Mock actualMockFromDB = resultFromDB.get();

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());

        assertEquals(textualResponse.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getRequestHeaders());
        assertNull(actualMockFromDB.getRequestBodiesForMock());
        assertNull(actualMockFromDB.getResponseHeaders());
    }

    @Transactional
    @Test
    void shouldReturnNull_WhenRequestBodyDoesNotMatch() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{\"testResponse\": \"This is a response\"}")
                .build();
        textualResponse = textualResponseDBHelper.save(textualResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        Map<String, Object> requestBodyMap = JsonMapper.convertJSONStringToMap("{ \"userId\": 1, \"id\": 1, " +
                "\"title\": \"Lord of the rings\", " +
                "\"completed\": false }");
        Map<String, Object> nonMatchingRequestBodyMap = JsonMapper.convertJSONStringToMap("{ \"userId\": 1, \"id\": 1, " +
                "\"title\": \"Selfish Gene\", " +
                "\"completed\": false }");

        RequestBodiesForMock expectedRequestBody = requestBodiesForMockDBHelper.save(
                RequestBodiesForMock.builder()
                        .requestBody(requestBodyMap)
                        .requestBodyType(requestBodyTypeDBHelper.findOneByRequestBodyType("application/json"))
                        .build()
        );
        RequestBodiesForMock nonMatchingRequestBody = requestBodiesForMockDBHelper.save(
                RequestBodiesForMock.builder()
                        .requestBody(nonMatchingRequestBodyMap)
                        .requestBodyType(requestBodyTypeDBHelper.findOneByRequestBodyType("application/json"))
                        .build()
        );

        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap("{\"Authorization\": \"Bearer TOKEN\"," +
                "\"x-trace-id\": \"sadf3w4fr\"}");
        RequestHeader expectedRequestHeader = requestHeadersDBHelper.save(
                RequestHeader.builder().requestHeader(headerMap).matchExact(Boolean.FALSE).build()
        );

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
                .requestBodiesForMock(expectedRequestBody)
                .requestHeaders(expectedRequestHeader)
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

        Optional<Mock> resultFromDB = repository.findUniqueMock(
                expectedRoute,
                expectedHttpMethod,
                expectedQueryParams,
                nonMatchingRequestBody,
                expectedRequestHeader
        );
        assertTrue(resultFromDB.isEmpty());
    }

    @Transactional
    @Test
    void shouldReturnUniqueMock_WithNoRequestHeaders() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{\"testResponse\": \"This is a response\"}")
                .build();
        textualResponse = textualResponseDBHelper.save(textualResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        Map<String, Object> requestBodyMap = JsonMapper.convertJSONStringToMap("{ \"userId\": 1, \"id\": 1, " +
                "\"title\": \"delectus aut autem\", " +
                "\"completed\": false }");
        RequestBodiesForMock expectedRequestBody = requestBodiesForMockDBHelper.save(
                RequestBodiesForMock.builder()
                        .requestBody(requestBodyMap)
                        .requestBodyType(requestBodyTypeDBHelper.findOneByRequestBodyType("application/json"))
                        .build()
        );

        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap("{\"Authorization\": \"Bearer TOKEN\"," +
                "\"x-trace-id\": \"sadf3w4fr\"}");
        RequestHeader expectedRequestHeader = requestHeadersDBHelper.save(
                RequestHeader.builder().requestHeader(headerMap).matchExact(Boolean.FALSE).build()
        );

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
                .requestBodiesForMock(expectedRequestBody)
                .requestHeaders(expectedRequestHeader)
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

        List<Mock> resultFromDB = repository.findUniqueMock(
                expectedRoute,
                expectedHttpMethod,
                expectedQueryParams,
                expectedRequestBody
        );
        assertFalse(resultFromDB.isEmpty());

        Mock actualMockFromDB = resultFromDB.get(0);

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(expectedRequestBody, actualMockFromDB.getRequestBodiesForMock());
        assertEquals(expectedRequestHeader, actualMockFromDB.getRequestHeaders());

        assertEquals(textualResponse.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getResponseHeaders());
    }

    @Transactional
    @Test
    void shouldReturnUniqueMock_WithNoRequestHeadersAndQueryParams() {
        HttpMethod expectedHttpMethod = HttpMethod.builder()
                .method("GET")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("GET").getId())
                .build();
        HttpMethod httpMethod = HttpMethod.builder()
                .method("POST")
                .id(httpMethodsDBHelper.getHttpMethodByMethod("POST").getId())
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{\"testResponse\": \"This is a response\"}")
                .build();
        textualResponse = textualResponseDBHelper.save(textualResponse);

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        EntityStatus entityStatus = entityStatusDBHelper.findByStatus(Status.NONE.name());

        Map<String, Object> requestBodyMap = JsonMapper.convertJSONStringToMap("{ \"userId\": 1, \"id\": 1, " +
                "\"title\": \"delectus aut autem\", " +
                "\"completed\": false }");
        RequestBodiesForMock expectedRequestBody = requestBodiesForMockDBHelper.save(
                RequestBodiesForMock.builder()
                        .requestBody(requestBodyMap)
                        .requestBodyType(requestBodyTypeDBHelper.findOneByRequestBodyType("application/json"))
                        .build()
        );

        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap("{\"Authorization\": \"Bearer TOKEN\"," +
                "\"x-trace-id\": \"sadf3w4fr\"}");
        RequestHeader expectedRequestHeader = requestHeadersDBHelper.save(
                RequestHeader.builder().requestHeader(headerMap).matchExact(Boolean.FALSE).build()
        );

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
                .requestBodiesForMock(expectedRequestBody)
                .requestHeaders(expectedRequestHeader)
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

        List<Mock> resultFromDB = repository.findUniqueMock(
                expectedRoute,
                expectedHttpMethod,
                expectedRequestBody
        );
        assertFalse(resultFromDB.isEmpty());

        Mock actualMockFromDB = resultFromDB.get(0);

        assertEquals(expectedMockId, actualMockFromDB.getId());
        assertEquals(expectedRoute, actualMockFromDB.getRoute());
        assertEquals(expectedHttpMethod.getMethod(), actualMockFromDB.getHttpMethod().getMethod());
        assertEquals(expectedRequestBody, actualMockFromDB.getRequestBodiesForMock());
        assertEquals(expectedRequestHeader, actualMockFromDB.getRequestHeaders());

        assertEquals(textualResponse.getResponseBody(), actualMockFromDB.getTextualResponse().getResponseBody());
        assertNotNull(actualMockFromDB.getCreatedAt().toString());
        assertNull(actualMockFromDB.getResponseHeaders());
    }
}
