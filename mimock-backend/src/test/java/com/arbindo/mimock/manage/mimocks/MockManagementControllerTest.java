package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.manage.mimocks.models.v1.GenericResponseWrapper;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.v1.Status;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static com.arbindo.mimock.helpers.general.JsonMapper.convertObjectToJsonString;
import static com.arbindo.mimock.helpers.general.RandomDataGenerator.generateRandomAlphabeticString;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = MockManagementController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class MockManagementControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MockManagementService mockManagementService;

    @MockBean
    ExportImportService exportImportService;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @MockBean
    DefaultHttpInterceptor defaultHttpInterceptor;

    @Test
    void shouldReturnHttpOk_ListMocksApi_ReturnsEmpty() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;
        String expectedContentType = "application/json";
        List<Mock> expectedMocks = new ArrayList<Mock>();
        String expectedResponseBody = convertObjectToJsonString(expectedMocks);

        lenient().when(mockManagementService.getAllMocks()).thenReturn(expectedMocks);

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

        lenient().when(mockManagementService.getAllMocks()).thenReturn(expectedMocks);

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

        lenient().when(mockManagementService.getAllMocks()).thenReturn(null);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_FilteredListMocksApi_WithoutStatusQueryParam() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + "/" + UrlConfig.MOCKS_FILTER;
        Page<Mock> expectedMocks = new PageImpl<>(new ArrayList<>());

        lenient().when(mockManagementService.getAllActiveMocks(any(Pageable.class), any(Status.class)))
                .thenReturn(expectedMocks);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Assert
        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_FilteredListMocksApi_ReturnsEmpty() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + "/" + UrlConfig.MOCKS_FILTER;
        String expectedContentType = "application/json";
        Page<Mock> expectedMocks = new PageImpl<>(new ArrayList<>());
        String expectedResponseBody = convertObjectToJsonString(expectedMocks);

        lenient().when(mockManagementService.getAllActiveMocks(any(Pageable.class), any(Status.class)))
                .thenReturn(expectedMocks);

        // Act
        MvcResult result = mockMvc.perform(get(route).param("status", "NONE"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_FilteredListMocksApi_ReturnsListOfMocks() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + "/" + UrlConfig.MOCKS_FILTER;
        String expectedContentType = "application/json";
        Page<Mock> expectedMocks = generateMocksPageable();
        String expectedResponseBody = convertObjectToJsonString(expectedMocks);

        lenient().when(mockManagementService.getAllActiveMocks(any(Pageable.class), any(Status.class)))
                .thenReturn(expectedMocks);

        // Act
        MvcResult result = mockMvc.perform(get(route).param("status", "NONE"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_FilteredListMocksApi_ReturnsNull() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + "/" + UrlConfig.MOCKS_FILTER;

        lenient().when(mockManagementService.getAllActiveMocks(any(Pageable.class), any(Status.class)))
                .thenReturn(null);

        // Act
        MvcResult result = mockMvc.perform(get(route).param("status", "NONE"))
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

        lenient().when(mockManagementService.softDeleteMockById(mockId)).thenReturn(false);

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

        lenient().when(mockManagementService.softDeleteMockById(mockId)).thenReturn(true);

        // Act
        MvcResult result = mockMvc.perform(delete(route))
                .andExpect(status().isNoContent())
                .andReturn();

        // Assert
        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_ForceDeleteMockByIdApi_ReturnsNullData() throws Exception {
        // Arrange
        String mockId = UUID.randomUUID().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId + UrlConfig.FORCE_DELETE_ACTION;

        lenient().when(mockManagementService.hardDeleteMockById(mockId)).thenReturn(false);

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
    void shouldReturnHttpNoContent_ForceDeleteMockByIdApi_ReturnsNoContent() throws Exception {
        // Arrange
        Mock mock = generateMock();
        String mockId = mock.getId().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId + UrlConfig.FORCE_DELETE_ACTION;

        lenient().when(mockManagementService.hardDeleteMockById(mockId)).thenReturn(true);

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
                        .param("name", mockRequest.getName())
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
                        .param("name", mockRequest.getName())
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

    @ParameterizedTest
    @NullSource
    @EmptySource
    void shouldReturnHttpBadRequest_CreateMockApi_WithInvalidParametersForRouteInRequest_ReturnsValidationErrors(String testData) throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);

        // Modify the MockRequest.Route to check
        mockRequest.setRoute(testData);

        String route = UrlConfig.MOCKS_PATH;

        // Act and Assert
        mockMvc.perform(multipart(route)
                        .file(file)
                        .param("name", mockRequest.getName())
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(response -> assertNotNull(response.getResolvedException()))
                .andExpect(response -> assertTrue(response.getResolvedException().getMessage().contains("Route is required")))
                .andReturn();
    }

    @ParameterizedTest
    @NullSource
    @EmptySource
    void shouldReturnHttpBadRequest_CreateMockApi_WithInvalidParametersForHttpMethodInRequest_ReturnsValidationErrors(String testData) throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);

        // Modify the MockRequest.HttpMethod to check
        mockRequest.setHttpMethod(testData);

        String route = UrlConfig.MOCKS_PATH;

        // Act and Assert
        mockMvc.perform(multipart(route)
                        .file(file)
                        .param("name", mockRequest.getName())
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(response -> assertNotNull(response.getResolvedException()))
                .andExpect(response -> assertTrue(response.getResolvedException().getMessage().contains("HttpMethod is required")))
                .andReturn();
    }

    @Test
    void shouldReturnHttpBadRequest_CreateMockApi_WithInvalidParametersForStatusCodeInRequest_ReturnsValidationErrors() throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);

        String route = UrlConfig.MOCKS_PATH;

        // Act and Assert
        mockMvc.perform(multipart(route)
                        .file(file)
                        .param("name", mockRequest.getName())
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        // Remove the MockRequest.StatusCode to check
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(response -> assertNotNull(response.getResolvedException()))
                .andExpect(response -> assertTrue(response.getResolvedException().getMessage().contains("statusCode")))
                .andReturn();
    }

    @Test
    void shouldReturnHttpBadRequest_CreateMockApi_WithInvalidParametersForDescriptionInRequest_ReturnsValidationErrors() throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);

        // Modify the MockRequest.Description with empty value
        mockRequest.setDescription("");

        String route = UrlConfig.MOCKS_PATH;

        // Act and Assert
        mockMvc.perform(multipart(route)
                        .file(file)
                        .param("name", mockRequest.getName())
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(response -> assertNotNull(response.getResolvedException()))
                .andExpect(response -> assertTrue(response.getResolvedException().getMessage().contains("Description should be at least 1-250 characters")))
                .andReturn();

        // Modify the MockRequest.Description with longer value
        mockRequest.setDescription(generateRandomAlphabeticString(300));

        // Act and Assert
        mockMvc.perform(multipart(route)
                        .file(file)
                        .param("name", mockRequest.getName())
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(response -> assertNotNull(response.getResolvedException()))
                .andExpect(response -> assertTrue(response.getResolvedException().getMessage().contains("Description should be at least 1-250 characters")))
                .andReturn();
    }

    @Test
    void shouldReturnHttpBadRequest_CreateMockApi_WithInvalidParametersForQueryParamsInRequest_ReturnsValidationErrors() throws Exception {
        // Arrange
        MockMultipartFile file = getMockMultipartFile();
        MockRequest mockRequest = createMockRequestWithFile(file);

        String route = UrlConfig.MOCKS_PATH;

        // Modify the MockRequest.QueryParams with longer value
        mockRequest.setQueryParams(generateRandomAlphabeticString(2000));

        // Act and Assert
        mockMvc.perform(multipart(route)
                        .file(file)
                        .param("name", mockRequest.getName())
                        .param("route", mockRequest.getRoute())
                        .param("httpMethod", mockRequest.getHttpMethod())
                        .param("responseContentType", mockRequest.getResponseContentType())
                        .param("statusCode", String.valueOf(mockRequest.getStatusCode()))
                        .param("expectedTextResponse", mockRequest.getExpectedTextResponse())
                        .param("queryParams", mockRequest.getQueryParams())
                        .param("description", mockRequest.getDescription()))
                .andExpect(status().isBadRequest())
                .andExpect(response -> assertNotNull(response.getResolvedException()))
                .andExpect(response -> assertTrue(response.getResolvedException().getMessage().contains("QueryParams can be maximum of 1024 characters")))
                .andReturn();
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
                        .param("name", mockRequest.getName())
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
                        .param("name", mockRequest.getName())
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
    void shouldReturnHttpOk_ExportTemplateCsv_ReturnCsvTemplateFile() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_CSV_TEMPLATE_EXPORT;
        String expectedContentType = "text/csv";

        String fileName = "mocks_template.csv";
        lenient().when(exportImportService.generateTemplateFileName()).thenReturn(fileName);

        // Act
        mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andExpect(header().exists("Content-Disposition"))
                .andExpect(header().string("Content-Disposition", "attachment; filename=" + fileName))
                .andReturn();

        // Assert
        verify(exportImportService, times(1)).exportMockTemplateCsv(any(PrintWriter.class));
    }

    @Test
    void shouldReturnHttpInternalServerError_WhenExportTemplateCsv_ThrowsException() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_CSV_TEMPLATE_EXPORT;

        String fileName = "mocks_template.csv";
        lenient().when(exportImportService.generateTemplateFileName()).thenReturn(fileName);
        doThrow(IOException.class).when(exportImportService).exportMockTemplateCsv(any(PrintWriter.class));

        // Act
        mockMvc.perform(get(route))
                .andExpect(status().isInternalServerError())
                .andReturn();
    }

    @Test
    void shouldReturnHttpOk_ExportMocksCsv_ReturnCsvFile() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_CSV_EXPORT;
        String expectedContentType = "text/csv";
        String fileName = "mocks_2022-02-04_19-31-05.csv";

        List<Mock> expectedMocks = generateListOfMocks();

        lenient().when(mockManagementService.getAllMocks()).thenReturn(expectedMocks);
        lenient().when(exportImportService.generateFileName()).thenReturn(fileName);

        // Act
        mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andExpect(header().exists("Content-Disposition"))
                .andExpect(header().string("Content-Disposition", "attachment; filename=" + fileName))
                .andReturn();

        // Assert
        verify(exportImportService, times(1)).exportMockListToCsv(any(PrintWriter.class), anyList());
    }

    @Test
    void shouldReturnHttpInternalServerError_WhenExportMocksCsv_ThrowsException() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_CSV_EXPORT;
        String expectedContentType = "text/csv";
        String fileName = "mocks_2022-02-04_19-31-05.csv";

        List<Mock> expectedMocks = generateListOfMocks();

        lenient().when(mockManagementService.getAllMocks()).thenReturn(expectedMocks);
        lenient().when(exportImportService.generateFileName()).thenReturn(fileName);

        doThrow(IOException.class).when(exportImportService).exportMockListToCsv(any(PrintWriter.class), anyList());

        // Act
        mockMvc.perform(get(route))
                .andExpect(status().isInternalServerError())
                .andReturn();
    }


    private GenericResponseWrapper<Mock> getGenericResponseWrapper(HttpStatus httpStatus, String responseMessage, Mock mock) {
        return GenericResponseWrapper.<Mock>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(mock)
                .build();
    }

}
