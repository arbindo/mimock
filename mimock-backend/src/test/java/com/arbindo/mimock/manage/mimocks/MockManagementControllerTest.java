package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.v1.GenericResponseWrapper;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static com.arbindo.mimock.helpers.general.JsonMapper.convertObjectToJsonString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = MockManagementController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
public class MockManagementControllerTest {

    @Autowired
    MockManagementController mockManagementController;

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MockManagementService mockManagementService;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @BeforeAll
    static void setupDataSource(){

    }

    @Test
    void shouldReturnHttpOk_ListMocksApi_ReturnsEmpty() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;
        String expectedContentType = "application/json";
        List<Mock> expectedMocks = new ArrayList<Mock>();
        String expectedResponseBody = convertObjectToJsonString(expectedMocks);

        lenient().when(mockManagementService.getMocks()).thenReturn(expectedMocks);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_ListMocksApi_ReturnsListOfMocks() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;
        String expectedContentType = "application/json";
        List<Mock> expectedMocks = generateListOfMocks();
        String expectedResponseBody = convertObjectToJsonString(expectedMocks);

        lenient().when(mockManagementService.getMocks()).thenReturn(expectedMocks);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_ListMocksApi_ReturnsNull() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;

        lenient().when(mockManagementService.getMocks()).thenReturn(null);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_GetMockByIdApi_ReturnsNullData() throws Exception {
        // Arrange
        String mockId = UUID.randomUUID().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId;

        lenient().when(mockManagementService.getMockById(mockId)).thenReturn(null);

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST, Messages.GET_RESOURCE_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_GetMockByIdApi_ReturnsValidMockData() throws Exception {
        // Arrange
        Mock mock = generateMock();
        String mockId = mock.getId().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId;

        lenient().when(mockManagementService.getMockById(mockId)).thenReturn(mock);

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK, Messages.GET_RESOURCE_SUCCESS, mock);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_DeleteMockByIdApi_ReturnsNullData() throws Exception {
        // Arrange
        String mockId = UUID.randomUUID().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId;

        lenient().when(mockManagementService.deleteMockById(mockId)).thenReturn(false);

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST, Messages.DELETE_RESOURCE_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MvcResult result = mockMvc.perform(delete(route))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpNoContent_DeleteMockByIdApi_ReturnsNoContent() throws Exception {
        // Arrange
        Mock mock = generateMock();
        String mockId = mock.getId().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId;

        lenient().when(mockManagementService.deleteMockById(mockId)).thenReturn(true);

        // Act
        MvcResult result = mockMvc.perform(delete(route))
                .andExpect(status().isNoContent())
                .andReturn();

        // Assert
        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_DeleteAllMocksApi_ReturnsNullData() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;

        lenient().when(mockManagementService.deleteAllMocks()).thenReturn(false);

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST, Messages.DELETE_ALL_RESOURCES_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MvcResult result = mockMvc.perform(delete(route))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpNoContent_DeleteAllMocksApi_ReturnsNoContent() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;

        lenient().when(mockManagementService.deleteAllMocks()).thenReturn(true);

        // Act
        MvcResult result = mockMvc.perform(delete(route))
                .andExpect(status().isNoContent())
                .andReturn();

        // Assert
        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpCreated_CreateMockApi_ReturnsValidMockData() throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);
        Mock createdMock = generateMock(mockRequest);
        String route = UrlConfig.MOCKS_PATH;

        lenient().when(mockManagementService.createMock(any(MockRequest.class))).thenReturn(createdMock);

        final String location = "http://localhost" + route + "/" + createdMock.getId();
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.CREATED,
                Messages.createResourceSuccess(location), createdMock);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MvcResult result = mockMvc.perform(multipart(route)
                                .file(file)
                                .param("route", mockRequest.getRoute())
                                .param("httpMethod", mockRequest.getHttpMethod())
                                .param("responseContentType", mockRequest.getResponseContentType())
                                .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                                .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                                .param("description", mockRequest.getDescription()))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_CreateMockApi_ReturnsNullMockData() throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);
        String route = UrlConfig.MOCKS_PATH;

        lenient().when(mockManagementService.createMock(any(MockRequest.class))).thenReturn(null);

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.CREATE_RESOURCE_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MvcResult result = mockMvc.perform(multipart(route)
                        .file(file)
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_UpdateMockByIdApi_ReturnsValidMockData() throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);
        Mock mock = generateMock(mockRequest);
        String route = UrlConfig.MOCKS_PATH + "/" + mock.getId();

        lenient().when(mockManagementService.updateMock(anyString(), any(MockRequest.class))).thenReturn(mock);

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                Messages.UPDATE_RESOURCE_SUCCESS, mock);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MockMultipartHttpServletRequestBuilder builder = MockMvcRequestBuilders.multipart(route);
        builder.with(request -> {
            request.setMethod("PUT");
            return request;
        });

        MvcResult result = mockMvc.perform(builder
                        .file(file)
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_UpdateMockByIdApi_ReturnsNullMockData() throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);
        Mock mock = generateMock(mockRequest);
        String route = UrlConfig.MOCKS_PATH + "/" + mock.getId();

        lenient().when(mockManagementService.updateMock(anyString(), any(MockRequest.class))).thenReturn(null);

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.UPDATE_RESOURCE_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";

        // Act
        MockMultipartHttpServletRequestBuilder builder = MockMvcRequestBuilders.multipart(route);
        builder.with(request -> {
            request.setMethod("PUT");
            return request;
        });

        MvcResult result = mockMvc.perform(builder
                        .file(file)
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }


    private GenericResponseWrapper<Mock> getGenericResponseWrapper(HttpStatus httpStatus, String responseMessage, Mock mock) {
        return GenericResponseWrapper.<Mock>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(mock)
                .build();
    }

}
