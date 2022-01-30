package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.generic.helpers.QueryParamHelper;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.helpers.db.HttpMethodDBHelper;
import com.arbindo.mimock.helpers.db.ResponseContentTypeDBHelper;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.MocksRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;

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
    QueryParamHelper queryParamHelper;

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
                .queryParamHelper(queryParamHelper)
                .domainModelMapper(domainModelMapper)
                .build();
    }

    @Test
    void shouldExtractQueryParams() {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setRequestURI("/api/testmock/testroute");
        mockHttpServletRequest.setParameter("version", "1.0");

        StringBuilder queryParams = this.genericMockRequestService.extractQueryParams(mockHttpServletRequest);

        assertEquals(queryParams.toString(), "version=1.0");
    }

    @Test
    void shouldReturnMockData_WhenMatchingMockExists() throws Exception {
        String method = "GET";
        String expectedRoute = "/api/testmock/testroute";

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .route(expectedRoute)
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByResponseType("application/json");

        Mock expectedMock = Mock.builder()
                .route(genericRequestModel.getRoute())
                .httpMethod(httpMethod)
                .responseContentType(responseContentType)
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
        assertEquals(responseContentType.getResponseType(), actualMock.getResponseContentType());
    }

    @Test
    void shouldThrowMatchingMockNotFoundException_WhenNoMatchingMockExists() throws Exception {
        String method = "GET";
        String route = "/api/testmock/testroute";
        String expectedMessage = "Matching mock does not exist";

        GenericRequestModel genericRequestModel = GenericRequestModel.builder()
                .httpMethod(method)
                .queryParam("version=1.0.0&auto=true")
                .route(route)
                .build();

        HttpMethod httpMethod = HttpMethod.builder()
                .method(method)
                .id(httpMethodsDBHelper.getHttpMethodByMethod(method).getId())
                .build();

        ResponseContentType responseContentType = responseContentTypeDBHelper.findOneByResponseType("application/json");

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
        assertEquals(expectedMessage, matchingMockNotFoundException.getMessage());
    }
}
