package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.service.ExportImportService;
import com.arbindo.mimock.manage.mimocks.service.ExportImportServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.List;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.generateListOfMocks;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class ExportImportServiceTest {

    ExportImportService mockExportImportService;

    @BeforeEach
    void setupMock(){
        this.mockExportImportService = ExportImportServiceImpl.builder().build();
    }

    @Test
    void shouldReturnTemplateFileName(){
        // Act
        String fileName = mockExportImportService.generateTemplateFileName();
        // Assert
        assertNotNull(fileName);
        assertTrue(fileName.contains("mock"));
        assertTrue(fileName.contains(".csv"));
        assertTrue(fileName.contains("template"));
    }

    @Test
    void shouldReturnFileName(){
        // Act
        String fileName = mockExportImportService.generateFileName();
        // Assert
        assertNotNull(fileName);
        assertTrue(fileName.contains("mock"));
        assertTrue(fileName.contains(".csv"));
        assertFalse(fileName.contains("template"));
    }

    @Test
    void shouldWriteMockTemplateHeadersToCsvWriter_Success() throws IOException {
        // Arrange
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        // Act
        mockExportImportService.exportMockTemplateCsv(printWriter);

        // Assert
        String expectedResult = Arrays.toString(ExportImportServiceImpl.getCsvTemplateHeaders())
                .replace("[", "")
                .replace("]", "")
                .replace(", ", ",");
        assertEquals(expectedResult, stringWriter.toString().trim());
    }

    @Test
    void shouldWriteMocksToCsvWriter_Success() throws IOException {
        // Arrange
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        List<Mock> mockList = generateListOfMocks();

        // Act
        mockExportImportService.exportMockListToCsv(printWriter, mockList);

        // Assert
        String expectedResultHeaders = Arrays.toString(ExportImportServiceImpl.getCsvHeaders())
                .replace("[", "")
                .replace("]", "")
                .replace(", ", ",");
        String result = stringWriter.toString();
        assertTrue(result.contains(expectedResultHeaders));
        for (Mock mock : mockList) {
            assertTrue(result.contains(mock.getId().toString()));
            assertTrue(result.contains(mock.getRoute()));
            assertTrue(result.contains(mock.getHttpMethod().getMethod()));
            assertTrue(result.contains(mock.getResponseContentType().getContentType()));
            assertTrue(result.contains(mock.getDescription()));
            assertTrue(result.contains(mock.getQueryParams()));
            assertTrue(result.contains(mock.getStatusCode().toString()));
        }
    }

}
