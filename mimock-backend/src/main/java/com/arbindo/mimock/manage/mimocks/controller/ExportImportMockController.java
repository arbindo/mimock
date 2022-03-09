package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.service.ExportImportService;
import com.arbindo.mimock.manage.mimocks.service.MockManagementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MOCKS_PATH)
@Tag(name = "Mock Management", description = "Handles operations related to mock resource.")
public class ExportImportMockController {

    @Autowired
    private MockManagementService mockManagementService;

    @Autowired
    private ExportImportService exportImportService;

    @Operation(summary = "Export Mock CSV Template", description = "Exports the mock template CSV file which can used" +
            " while import operation.", tags = {"Mock Management"})
    @GetMapping(UrlConfig.MOCKS_CSV_TEMPLATE_EXPORT)
    public void exportTemplateCsv(HttpServletResponse response) {
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + exportImportService.generateTemplateFileName();
        try {
            response.setContentType("text/csv");
            response.setHeader(headerKey, headerValue);
            exportImportService.exportMockTemplateCsv(response.getWriter());
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            response.setStatus(500);
        }
    }

    @Operation(summary = "Export Mocks", description = "Exports the mocks in CSV file format.", tags = {"Mock Management"})
    @GetMapping(UrlConfig.MOCKS_CSV_EXPORT)
    public void exportAllMocksInCsvFormat(HttpServletResponse response) {
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + exportImportService.generateFileName();
        try {
            List<Mock> mockList = mockManagementService.getAllMocks();
            response.setContentType("text/csv");
            response.setHeader(headerKey, headerValue);
            exportImportService.exportMockListToCsv(response.getWriter(), mockList);
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            response.setStatus(500);
        }
    }
}
