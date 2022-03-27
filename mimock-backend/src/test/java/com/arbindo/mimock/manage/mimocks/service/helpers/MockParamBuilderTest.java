package com.arbindo.mimock.manage.mimocks.service.helpers;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.helpers.general.JsonMapper;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class MockParamBuilderTest {
    @MockBean
    RequestHeadersRepository requestHeadersRepository;

    @MockBean
    ResponseHeadersRepository responseHeadersRepository;

    @MockBean
    RequestBodyTypeRepository requestBodyTypeRepository;

    @MockBean
    RequestBodiesForMockRepository requestBodiesForMockRepository;

    @MockBean
    HttpMethodsRepository httpMethodsRepository;

    @MockBean
    ResponseContentTypesRepository responseContentTypesRepository;

    @Autowired
    MockParamBuilder mockParamBuilder;

    @Test
    void shouldReturnRequestBodyFromDB_WhenRequestBodyAlreadyExists() {
        String requestJSON = "{\"id\":1,\"title\":\"delectus aut autem\",\"userId\":1," +
                "\"location\":{\"city\":\"NYC\",\"zip\":\"10001\"},\"completed\":true}";

        String bodyType = "application/json";
        Map<String, Object> requestBody = JsonMapper.convertJSONStringToMap(requestJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .requestBodyType(bodyType)
                .requestBody(requestBody)
                .build();

        mockParamBuilder.setRequest(request);

        RequestBodyType requestBodyType = RequestBodyType.builder()
                .requestBodyType(bodyType)
                .build();
        lenient().when(requestBodyTypeRepository.findOneByRequestBodyType(bodyType)).thenReturn(requestBodyType);

        RequestBodiesForMock expectedRequestBody = RequestBodiesForMock.builder()
                .requestBodyType(requestBodyType)
                .requestBody(requestBody)
                .build();
        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(any()))
                .thenReturn(Optional.of(expectedRequestBody));

        RequestBodiesForMock actualRequestBody = mockParamBuilder.requestBody();

        assertEquals(requestJSON, JsonMapper.convertMapToJsonString(actualRequestBody.getRequestBody()));
    }

    @Test
    void shouldSaveNewRequestBodyToDB_WhenRequestBodyDoesNotExists() {
        String requestJSON = "{\"id\":1,\"title\":\"delectus aut autem\",\"userId\":1," +
                "\"location\":{\"city\":\"NYC\",\"zip\":\"10001\"},\"completed\":true}";

        String bodyType = "application/json";
        Map<String, Object> requestBody = JsonMapper.convertJSONStringToMap(requestJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .requestBodyType(bodyType)
                .requestBody(requestBody)
                .build();

        mockParamBuilder.setRequest(request);

        RequestBodyType requestBodyType = RequestBodyType.builder()
                .requestBodyType(bodyType)
                .build();
        lenient().when(requestBodyTypeRepository.findOneByRequestBodyType(bodyType)).thenReturn(requestBodyType);

        RequestBodiesForMock expectedRequestBody = RequestBodiesForMock.builder()
                .requestBodyType(requestBodyType)
                .requestBody(requestBody)
                .build();
        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(any()))
                .thenReturn(Optional.empty());
        lenient().when(requestBodiesForMockRepository.save(any(RequestBodiesForMock.class))).thenReturn(expectedRequestBody);

        RequestBodiesForMock actualRequestBody = mockParamBuilder.requestBody();

        verify(requestBodiesForMockRepository, times(1))
                .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(requestBody);
        verify(requestBodiesForMockRepository, times(1)).save(any(RequestBodiesForMock.class));

        assertEquals(requestJSON, JsonMapper.convertMapToJsonString(actualRequestBody.getRequestBody()));
    }

    @Test
    void shouldReturnNull_WhenRequestBodyIsNull() {
        ProcessedMockRequest request1 = ProcessedMockRequest.builder()
                .requestBodyType(null)
                .requestBody(null)
                .build();
        ProcessedMockRequest request2 = ProcessedMockRequest.builder()
                .requestBodyType(null)
                .requestBody(new HashMap<>())
                .build();

        List<ProcessedMockRequest> requests = List.of(request1, request2);

        requests.forEach(request -> {
            mockParamBuilder.setRequest(request);

            RequestBodiesForMock actualRequestBody = mockParamBuilder.requestBody();

            verify(requestBodiesForMockRepository, times(0))
                    .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(anyMap());
            verify(requestBodiesForMockRepository, times(0)).save(any(RequestBodiesForMock.class));

            assertNull(actualRequestBody);
        });
    }

    @Test
    void shouldReturnNullForRequestBody_WhenDBOperationThrowsException() {
        String requestJSON = "{\"id\":1,\"title\":\"delectus aut autem\",\"userId\":1," +
                "\"location\":{\"city\":\"NYC\",\"zip\":\"10001\"},\"completed\":true}";

        String bodyType = "application/json";
        Map<String, Object> requestBody = JsonMapper.convertJSONStringToMap(requestJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .requestBodyType(bodyType)
                .requestBody(requestBody)
                .build();

        mockParamBuilder.setRequest(request);

        RequestBodyType requestBodyType = RequestBodyType.builder()
                .requestBodyType(bodyType)
                .build();

        lenient().when(requestBodyTypeRepository.findOneByRequestBodyType(bodyType)).thenReturn(requestBodyType);
        lenient().when(requestBodiesForMockRepository.findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(any()))
                .thenThrow(IllegalArgumentException.class);

        RequestBodiesForMock actualRequestBody = mockParamBuilder.requestBody();

        verify(requestBodiesForMockRepository, times(1))
                .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(requestBody);
        verify(requestBodiesForMockRepository, times(0)).save(any(RequestBodiesForMock.class));

        assertNull(actualRequestBody);
    }

    @Test
    void shouldReturnRequestHeadersFromDB_WhenRequestHeadersExist() {
        String headerJSON = "{\"authorization\":\"nDFGdgfd_jhgjhZHHTdyhgfdghjdgjH\",\"Content-Type\":\"application/json\"}";
        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap(headerJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .requestHeader(headerMap)
                .build();

        RequestHeader requestHeader = RequestHeader.builder()
                .requestHeader(headerMap)
                .build();

        mockParamBuilder.setRequest(request);

        lenient().when(requestHeadersRepository.findRequestHeaderByRequestHeaderAndDeletedAtIsNull(anyMap()))
                .thenReturn(Optional.of(requestHeader));

        RequestHeader actualRequestHeaders = mockParamBuilder.requestHeaders();

        verify(requestHeadersRepository, times(1)).findRequestHeaderByRequestHeaderAndDeletedAtIsNull(anyMap());
        verify(requestHeadersRepository, times(0)).save(any());

        assertEquals(headerMap, actualRequestHeaders.getRequestHeader());
    }

    @Test
    void shouldSaveRequestHeadersToDB_WhenRequestHeadersDoesNotExist() {
        String headerJSON = "{\"authorization\":\"nDFGdgfd_jhgjhZHHTdyhgfdghjdgjH\",\"Content-Type\":\"application/json\"}";
        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap(headerJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .requestHeader(headerMap)
                .build();

        RequestHeader requestHeader = RequestHeader.builder()
                .requestHeader(headerMap)
                .build();

        mockParamBuilder.setRequest(request);

        lenient().when(requestHeadersRepository.findRequestHeaderByRequestHeaderAndDeletedAtIsNull(anyMap()))
                .thenReturn(Optional.empty());
        lenient().when(requestHeadersRepository.save(any(RequestHeader.class)))
                .thenReturn(requestHeader);

        RequestHeader actualRequestHeaders = mockParamBuilder.requestHeaders();

        verify(requestHeadersRepository, times(1)).findRequestHeaderByRequestHeaderAndDeletedAtIsNull(anyMap());
        verify(requestHeadersRepository, times(1)).save(any(RequestHeader.class));

        assertEquals(headerMap, actualRequestHeaders.getRequestHeader());
    }

    @Test
    void shouldReturnNull_WhenRequestHasNoHeaders() {
        ProcessedMockRequest request1 = ProcessedMockRequest.builder()
                .requestHeader(null)
                .build();
        ProcessedMockRequest request2 = ProcessedMockRequest.builder()
                .requestHeader(new HashMap<>())
                .build();

        List<ProcessedMockRequest> requests = List.of(request1, request2);

        requests.forEach(request -> {
            mockParamBuilder.setRequest(request);

            RequestHeader actualRequestHeaders = mockParamBuilder.requestHeaders();

            verify(requestHeadersRepository, times(0)).findRequestHeaderByRequestHeaderAndDeletedAtIsNull(anyMap());
            verify(requestHeadersRepository, times(0)).save(any(RequestHeader.class));

            assertNull(actualRequestHeaders);
        });
    }

    @Test
    void shouldReturnNullForRequestHeaders_WhenDBOperationThrowsException() {
        String headerJSON = "{\"authorization\":\"nDFGdgfd_jhgjhZHHTdyhgfdghjdgjH\",\"Content-Type\":\"application/json\"}";
        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap(headerJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .requestHeader(headerMap)
                .build();

        mockParamBuilder.setRequest(request);

        lenient().when(requestHeadersRepository.findRequestHeaderByRequestHeaderAndDeletedAtIsNull(anyMap()))
                .thenThrow(IllegalArgumentException.class);

        RequestHeader actualRequestHeaders = mockParamBuilder.requestHeaders();

        verify(requestHeadersRepository, times(1)).findRequestHeaderByRequestHeaderAndDeletedAtIsNull(anyMap());
        verify(requestHeadersRepository, times(0)).save(any(RequestHeader.class));

        assertNull(actualRequestHeaders);
    }

    @Test
    void shouldSaveResponseHeadersToDB_WhenResponseHeadersExistInRequest() {
        String headerJSON = "{\"x-trace-id\":\"B78HJHJ89HJH\",\"Content-Type\":\"application/json\"}";
        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap(headerJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .responseHeaders(headerMap)
                .build();

        ResponseHeader responseHeader = ResponseHeader.builder()
                .responseHeader(headerMap)
                .build();

        mockParamBuilder.setRequest(request);

        lenient().when(responseHeadersRepository.save(any(ResponseHeader.class))).thenReturn(responseHeader);

        ResponseHeader actualResponseHeaders = mockParamBuilder.responseHeaders();

        verify(responseHeadersRepository, times(1)).save(any(ResponseHeader.class));

        assertEquals(headerMap, actualResponseHeaders.getResponseHeader());
    }

    @Test
    void shouldReturnNull_WhenSavingResponseHeadersToDBFails() {
        String headerJSON = "{\"x-trace-id\":\"B78HJHJ89HJH\",\"Content-Type\":\"application/json\"}";
        Map<String, Object> headerMap = JsonMapper.convertJSONStringToMap(headerJSON);

        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .responseHeaders(headerMap)
                .build();

        mockParamBuilder.setRequest(request);

        lenient().when(responseHeadersRepository.save(any(ResponseHeader.class))).thenThrow(IllegalArgumentException.class);

        ResponseHeader actualResponseHeaders = mockParamBuilder.responseHeaders();

        verify(responseHeadersRepository, times(1)).save(any(ResponseHeader.class));

        assertNull(actualResponseHeaders);
    }

    @Test
    void shouldReturnNull_WhenRequestHasNoResponseHeaders() {
        ProcessedMockRequest request1 = ProcessedMockRequest.builder()
                .responseHeaders(null)
                .build();

        ProcessedMockRequest request2 = ProcessedMockRequest.builder()
                .responseHeaders(new HashMap<>())
                .build();

        List<ProcessedMockRequest> requests = List.of(request1, request2);

        requests.forEach(request -> {
            mockParamBuilder.setRequest(request);

            ResponseHeader actualResponseHeaders = mockParamBuilder.responseHeaders();

            verify(responseHeadersRepository, times(0)).save(any(ResponseHeader.class));

            assertNull(actualResponseHeaders);
        });
    }

    @Test
    void shouldReturnHttpMethodFromDB() throws Exception {
        String getMethod = "GET";
        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .httpMethod(getMethod)
                .build();

        mockParamBuilder.setRequest(request);

        lenient().when(httpMethodsRepository.findByMethod(getMethod))
                .thenReturn(HttpMethod.builder().method(getMethod).build());

        HttpMethod actualHttpMethod = mockParamBuilder.httpMethod();

        assertEquals(getMethod, actualHttpMethod.getMethod());
    }

    @Test
    void shouldThrowException_WhenHttpMethodIsNullInRequest() throws Exception {
        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .httpMethod(null)
                .build();

        mockParamBuilder.setRequest(request);

        verify(httpMethodsRepository, times(0)).findByMethod(anyString());

        assertThrows(Exception.class, () -> mockParamBuilder.httpMethod());
    }

    @Test
    void shouldReturnResponseContentType_WhenDBHasMatchingResponseContentType() throws Exception {
        String contentType = "application/json";
        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .responseContentType(contentType)
                .build();

        mockParamBuilder.setRequest(request);

        lenient().when(responseContentTypesRepository.findByContentType(contentType))
                .thenReturn(ResponseContentType.builder().contentType(contentType).build());

        ResponseContentType actualResponseContentType = mockParamBuilder.responseContentType(contentType);

        assertEquals(contentType, actualResponseContentType.getContentType());
    }

    @Test
    void shouldReturnNull_WhenRequestHasNoResponseContentType() throws Exception {
        ProcessedMockRequest request = ProcessedMockRequest.builder()
                .responseContentType(null)
                .build();

        mockParamBuilder.setRequest(request);

        verify(responseContentTypesRepository, times(0)).findByContentType(anyString());

        assertThrows(Exception.class, () -> mockParamBuilder.responseContentType(null));
    }
}