package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.helpers.db.HttpMethodDBHelper;
import com.arbindo.mimock.helpers.db.ResponseContentTypeDBHelper;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.helpers.general.RandomDataGenerator;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.MocksRepository;
import com.arbindo.mimock.repository.RequestBodiesForMockRepository;
import com.arbindo.mimock.repository.RequestHeadersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class GenericMockRequestServiceTest {

    @Autowired
    HttpMethodDBHelper httpMethodsDBHelper;

    @Autowired
    ResponseContentTypeDBHelper responseContentTypeDBHelper;

    @Autowired
    DomainModelMapper domainModelMapper;

    @MockBean
    RequestBodiesForMockRepository requestBodiesForMockRepository;

    @MockBean
    RequestHeadersRepository requestHeadersRepository;

    @MockBean
    MocksRepository mockRepository;

    @MockBean
    HttpMethodsRepository mockHttpMethodsRepository;

    GenericMockRequestService genericMockRequestService;

    @BeforeEach
    void setupMock() {
        this.genericMockRequestService = GenericMockRequestService.builder()
                .httpMethodsRepository(mockHttpMethodsRepository)
                .repository(mockRepository)
                .domainModelMapper(domainModelMapper)
                .requestBodiesForMockRepository(requestBodiesForMockRepository)
                .requestHeadersRepository(requestHeadersRepository)
                .build();
    }

    @Test
    void shouldReturnMockData_WhenMatchingMockExists() {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";
        Map<String, Object> requestHeaderMap1 = RandomDataGenerator.getRequestHeaders();
        Map<String, Object> requestHeaderMap2 = RandomDataGenerator.getRequestHeaders();
        String requestBody = "{\"name\": \"blog\", \"auto_init\": true, \"private\": true, \"gitignore_template\": \"nanoc\"}";
        Map<String, String> queryParamMap = new HashMap<>() {{
            put("version", "1.0");
            put("auto", "true");
        }};

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .queryParamMap(queryParamMap)
                .route(expectedRoute)
                .requestHeaders(requestHeaderMap1)
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        RequestHeader requestHeader1 = RequestHeader.builder()
                .requestHeader(requestHeaderMap1)
                .matchExact(true)
                .build();
        RequestHeader requestHeader2 = RequestHeader.builder()
                .requestHeader(requestHeaderMap2)
                .matchExact(true)
                .build();

        RequestBodiesForMock requestBodiesForMock = RequestBodiesForMock.builder()
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        Mock expectedMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(requestHeader1)
                .requestBodiesForMock(requestBodiesForMock)
                .statusCode(200)
                .build();

        Mock altMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(requestHeader2)
                .requestBodiesForMock(requestBodiesForMock)
                .statusCode(200)
                .build();

        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap()))
                .thenReturn(Optional.of(requestBodiesForMock));
        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any(RequestBodiesForMock.class))
        ).thenReturn(List.of(expectedMock, altMock));

        DomainModelForMock actualMock = genericMockRequestService.serveMockRequest(genericRequestModel);

        verify(requestBodiesForMockRepository, times(1))
                .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap());
        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any(RequestBodiesForMock.class)
        );

        assertEquals(expectedRoute, actualMock.getRoute());
        assertEquals(200, actualMock.getStatusCode());
        assertEquals(responseContentType.getContentType(), actualMock.getResponseContentType());
    }

    @Test
    void shouldReturnMockData_WhenMatchingMockExistsWithNoRequestHeaders() {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";
        Map<String, Object> requestHeaderMap = RandomDataGenerator.getRequestHeaders();
        String requestBody = "{\"name\": \"blog\", \"auto_init\": true, \"private\": true, \"gitignore_template\": \"nanoc\"}";

        Map<String, String> queryParamMap = new HashMap<>() {{
            put("version", "1.0");
            put("auto", "true");
        }};

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .queryParamMap(queryParamMap)
                .route(expectedRoute)
                .requestHeaders(requestHeaderMap)
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        RequestBodiesForMock requestBodiesForMock = RequestBodiesForMock.builder()
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        Mock expectedMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(null)
                .requestBodiesForMock(requestBodiesForMock)
                .statusCode(200)
                .build();

        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap()))
                .thenReturn(Optional.of(requestBodiesForMock));
        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any(RequestBodiesForMock.class))
        ).thenReturn(List.of(expectedMock));

        DomainModelForMock actualMock = genericMockRequestService.serveMockRequest(genericRequestModel);

        verify(requestBodiesForMockRepository, times(1))
                .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap());
        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any(RequestBodiesForMock.class)
        );

        assertEquals(expectedRoute, actualMock.getRoute());
        assertEquals(200, actualMock.getStatusCode());
        assertEquals(responseContentType.getContentType(), actualMock.getResponseContentType());
    }

    @Test
    void shouldReturnMockData_WhenMatchingMockExistsWithoutQueryParams() {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";
        Map<String, Object> requestHeaders = RandomDataGenerator.getRequestHeaders();
        String requestBody = "{\"name\": \"blog\", \"auto_init\": true, \"private\": true, \"gitignore_template\": \"nanoc\"}";

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .route(expectedRoute)
                .requestHeaders(requestHeaders)
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        RequestHeader requestHeader = RequestHeader.builder()
                .requestHeader(requestHeaders)
                .matchExact(true)
                .build();
        RequestBodiesForMock requestBodiesForMock = RequestBodiesForMock.builder()
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        Mock expectedMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(requestHeader)
                .requestBodiesForMock(requestBodiesForMock)
                .statusCode(200)
                .build();

        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap()))
                .thenReturn(Optional.of(requestBodiesForMock));
        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findUniqueMock(
                genericRequestModel.getRoute(),
                httpMethod,
                new HashMap<>(),
                requestBodiesForMock)
        ).thenReturn(List.of(expectedMock));

        DomainModelForMock actualMock = genericMockRequestService.serveMockRequest(genericRequestModel);

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findUniqueMock(
                genericRequestModel.getRoute(),
                httpMethod,
                new HashMap<>(),
                requestBodiesForMock);

        assertEquals(expectedRoute, actualMock.getRoute());
        assertEquals(200, actualMock.getStatusCode());
        assertEquals(responseContentType.getContentType(), actualMock.getResponseContentType());
    }

    @Test
    void shouldThrowMatchingMockNotFoundException_WhenNoMatchingMockExists() {
        String method = "GET";
        String route = "/api/testmock/testroute";
        String expectedExceptionMessage = "Matching mock does not exist";
        Map<String, String> queryParamMap = new HashMap<>() {{
            put("version", "1.0");
            put("auto", "true");
        }};

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .route(route)
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap()))
                .thenReturn(Optional.empty());
        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findUniqueMock(
                genericRequestModel.getRoute(),
                httpMethod,
                null,
                null)
        ).thenReturn(List.of());

        MatchingMockNotFoundException matchingMockNotFoundException = assertThrows(
                MatchingMockNotFoundException.class,
                () -> genericMockRequestService.serveMockRequest(genericRequestModel)
        );

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any());

        assertNotNull(matchingMockNotFoundException);
        assertEquals(expectedExceptionMessage, matchingMockNotFoundException.getMessage());
    }

    @Test
    void shouldThrowMatchingMockNotFoundException_WhenRequestHeadersDoNotMatch() {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";
        String expectedExceptionMessage = "There are no matching mocks available";

        Map<String, String> queryParamMap = new HashMap<>() {{
            put("version", "1.0");
            put("auto", "true");
        }};

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .queryParamMap(queryParamMap)
                .route(expectedRoute)
                .requestHeaders(RandomDataGenerator.getRequestHeaders())
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        RequestHeader requestHeader = RequestHeader.builder()
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .matchExact(true)
                .build();

        Mock expectedMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(requestHeader)
                .statusCode(200)
                .build();

        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any())
        ).thenReturn(List.of(expectedMock));

        MatchingMockNotFoundException matchingMockNotFoundException = assertThrows(
                MatchingMockNotFoundException.class,
                () -> genericMockRequestService.serveMockRequest(genericRequestModel)
        );

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any()
        );

        assertNotNull(matchingMockNotFoundException);
        assertEquals(expectedExceptionMessage, matchingMockNotFoundException.getMessage());
    }

    @ParameterizedTest
    @ValueSource(strings = {"ARCHIVED", "DELETED"})
    void shouldThrowMatchingMockNotFoundException_WhenEntityStatusIsNotNONE(String status) {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";
        Map<String, Object> requestHeaderMap1 = RandomDataGenerator.getRequestHeaders();
        Map<String, Object> requestHeaderMap2 = RandomDataGenerator.getRequestHeaders();
        String requestBody = "{\"name\": \"blog\", \"auto_init\": true, \"private\": true, \"gitignore_template\": \"nanoc\"}";
        Map<String, String> queryParamMap = new HashMap<>() {{
            put("version", "1.0");
            put("auto", "true");
        }};

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .queryParamMap(queryParamMap)
                .route(expectedRoute)
                .requestHeaders(requestHeaderMap1)
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");
        RequestHeader requestHeader1 = RequestHeader.builder()
                .requestHeader(requestHeaderMap1)
                .matchExact(true)
                .build();
        RequestHeader requestHeader2 = RequestHeader.builder()
                .requestHeader(requestHeaderMap2)
                .matchExact(true)
                .build();

        RequestBodiesForMock requestBodiesForMock = RequestBodiesForMock.builder()
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody))
                .build();

        EntityStatus entityStatus = EntityStatus.builder()
                .status(status)
                .build();

        Mock expectedMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(requestHeader1)
                .requestBodiesForMock(requestBodiesForMock)
                .statusCode(200)
                .entityStatus(entityStatus)
                .build();

        Mock altMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(requestHeader2)
                .requestBodiesForMock(requestBodiesForMock)
                .statusCode(200)
                .build();

        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap()))
                .thenReturn(Optional.of(requestBodiesForMock));
        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any(RequestBodiesForMock.class))
        ).thenReturn(List.of(expectedMock, altMock));

        MatchingMockNotFoundException matchingMockNotFoundException = assertThrows(
                MatchingMockNotFoundException.class,
                () -> genericMockRequestService.serveMockRequest(genericRequestModel)
        );

        verify(requestBodiesForMockRepository, times(1))
                .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap());
        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findUniqueMock(
                anyString(),
                any(HttpMethod.class),
                anyMap(),
                any(RequestBodiesForMock.class)
        );

        assertNotNull(matchingMockNotFoundException);
        assertEquals("There are no matching mocks available", matchingMockNotFoundException.getMessage());
    }
}
