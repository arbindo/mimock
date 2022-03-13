package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.helpers.db.HttpMethodDBHelper;
import com.arbindo.mimock.helpers.db.ResponseContentTypeDBHelper;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.helpers.general.RandomDataGenerator;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.MocksRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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

    @org.mockito.Mock
    MocksRepository mockRepository;

    @org.mockito.Mock
    HttpMethodsRepository mockHttpMethodsRepository;

    GenericMockRequestService genericMockRequestService;

    @BeforeEach
    void setupMock() {
        this.genericMockRequestService = GenericMockRequestService.builder()
                .httpMethodsRepository(mockHttpMethodsRepository)
                .repository(mockRepository)
                .domainModelMapper(domainModelMapper)
                .build();
    }

    @Test
    void shouldReturnMockData_WhenMatchingMockExists() throws Exception {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";
        Map<String, Object> requestHeaders = RandomDataGenerator.getRequestHeaders();
        String requestBody = "{\"name\": \"blog\", \"auto_init\": true, \"private\": true, \"gitignore_template\": \"nanoc\"}";

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
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

        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findOneByRouteAndHttpMethodAndQueryParams(
                genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam())
        ).thenReturn(Optional.of(expectedMock));

        DomainModelForMock actualMock = genericMockRequestService.serveMockRequest(genericRequestModel);

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findOneByRouteAndHttpMethodAndQueryParams(genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam());

        assertEquals(expectedRoute, actualMock.getRoute());
        assertEquals(200, actualMock.getStatusCode());
        assertEquals(responseContentType.getContentType(), actualMock.getResponseContentType());
    }

    @Test
    void shouldReturnMockData_WhenMatchingMockExistsWithoutQueryParams() throws Exception {
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

        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findOneByRouteAndHttpMethod(
                genericRequestModel.getRoute(),
                httpMethod)
        ).thenReturn(Optional.of(expectedMock));

        DomainModelForMock actualMock = genericMockRequestService.serveMockRequest(genericRequestModel);

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findOneByRouteAndHttpMethod(genericRequestModel.getRoute(),
                httpMethod);

        assertEquals(expectedRoute, actualMock.getRoute());
        assertEquals(200, actualMock.getStatusCode());
        assertEquals(responseContentType.getContentType(), actualMock.getResponseContentType());
    }

    @Test
    void shouldThrowMatchingMockNotFoundException_WhenNoMatchingMockExists() throws Exception {
        String method = "GET";
        String route = "/api/testmock/testroute";
        String expectedExceptionMessage = "Matching mock does not exist";

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .route(route)
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findOneByRouteAndHttpMethodAndQueryParams(
                genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam())
        ).thenReturn(Optional.empty());

        MatchingMockNotFoundException matchingMockNotFoundException = assertThrows(MatchingMockNotFoundException.class, () -> {
            genericMockRequestService.serveMockRequest(genericRequestModel);
        });

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findOneByRouteAndHttpMethodAndQueryParams(genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam());


        assertNotNull(matchingMockNotFoundException);
        assertEquals(expectedExceptionMessage, matchingMockNotFoundException.getMessage());
    }

    @Test
    void shouldThrowMatchingMockNotFoundException_WhenRequestHeadersDoNotMatch() {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";
        String expectedExceptionMessage = "Headers does not match";

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
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
        lenient().when(mockRepository.findOneByRouteAndHttpMethodAndQueryParams(
                genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam())
        ).thenReturn(Optional.of(expectedMock));

        MatchingMockNotFoundException matchingMockNotFoundException = assertThrows(MatchingMockNotFoundException.class, () -> {
            genericMockRequestService.serveMockRequest(genericRequestModel);
        });

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findOneByRouteAndHttpMethodAndQueryParams(genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam());

        assertNotNull(matchingMockNotFoundException);
        assertEquals(expectedExceptionMessage, matchingMockNotFoundException.getMessage());
    }

    @Test
    void shouldThrowMatchingMockNotFoundException_WhenRequestBodiesDoNotMatch() {
        String method = "GET";
        String requestBody1 = "{\"name\": \"blog\", \"auto_init\": true, \"private\": true, \"gitignore_template\": \"nanoc\"}";
        String requestBody2 = "{\"name\": \"blog\", \"auto_init\": false, \"private\": true, \"gitignore_template\": \"nanoc\"}";
        String expectedRoute = "/api/testmock/testroute";
        String expectedExceptionMessage = "The request body does not match";

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .route(expectedRoute)
                .requestHeaders(RandomDataGenerator.getRequestHeaders())
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody1))
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByContentType("application/json");

        RequestHeader requestHeader = RequestHeader.builder()
                .requestHeader(RandomDataGenerator.getRequestHeaders())
                .matchExact(false)
                .build();

        RequestBodiesForMock requestBodiesForMock = RequestBodiesForMock.builder()
                .requestBody(JsonMapper.convertJSONStringToMap(requestBody2))
                .build();

        Mock expectedMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
                .requestHeaders(requestHeader)
                .requestBodiesForMock(requestBodiesForMock)
                .statusCode(200)
                .build();

        lenient().when(mockHttpMethodsRepository.findByMethod(method)).thenReturn(httpMethod);
        lenient().when(mockRepository.findOneByRouteAndHttpMethodAndQueryParams(
                genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam())
        ).thenReturn(Optional.of(expectedMock));

        MatchingMockNotFoundException matchingMockNotFoundException = assertThrows(MatchingMockNotFoundException.class, () -> {
            genericMockRequestService.serveMockRequest(genericRequestModel);
        });

        verify(mockHttpMethodsRepository, times(1)).findByMethod(method);
        verify(mockRepository, times(1)).findOneByRouteAndHttpMethodAndQueryParams(genericRequestModel.getRoute(),
                httpMethod,
                genericRequestModel.getQueryParam());

        assertNotNull(matchingMockNotFoundException);
        assertEquals(expectedExceptionMessage, matchingMockNotFoundException.getMessage());
    }
}
