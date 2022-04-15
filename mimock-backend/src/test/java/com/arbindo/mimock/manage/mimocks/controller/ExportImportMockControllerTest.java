package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.manage.mimocks.service.ExportImportService;
import com.arbindo.mimock.manage.mimocks.service.MockManagementService;
import com.arbindo.mimock.manage.mimocks.service.exceptions.ExportImportDisabledException;
import com.arbindo.mimock.security.JwtRequestFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.generateListOfMocks;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(value = ExportImportMockController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
public class ExportImportMockControllerTest {

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

    @MockBean
    UserDetailsService userDetailsService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

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

    @Test
    void shouldReturnHttpBadRequestError_WhenExportTemplateCsv_ExportImportFeatureIsDisabled() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_CSV_TEMPLATE_EXPORT;

        String fileName = "mocks_template.csv";
        lenient().when(exportImportService.generateTemplateFileName()).thenReturn(fileName);
        doThrow(ExportImportDisabledException.class).when(exportImportService).validateExportImportFeature();

        // Act
        mockMvc.perform(get(route))
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    void shouldReturnHttpBadRequestError_WhenExportMocksCsv_ExportImportFeatureIsDisabled() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH + UrlConfig.MOCKS_CSV_EXPORT;
        String fileName = "mocks_2022-02-04_19-31-05.csv";
        List<Mock> expectedMocks = generateListOfMocks();

        lenient().when(mockManagementService.getAllMocks()).thenReturn(expectedMocks);
        lenient().when(exportImportService.generateFileName()).thenReturn(fileName);

        doThrow(ExportImportDisabledException.class).when(exportImportService).validateExportImportFeature();

        // Act
        mockMvc.perform(get(route))
                .andExpect(status().isBadRequest())
                .andReturn();
    }
}
