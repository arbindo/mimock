package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.service.ExportImportService;
import com.arbindo.mimock.manage.mimocks.service.ListMocksService;
import com.arbindo.mimock.manage.mimocks.service.exceptions.ExportImportDisabledException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MOCKS_PATH)
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "Mock Management", description = "Handles operations related to mock resource.")
public class ExportImportMockController {

    @Autowired
    private ListMocksService listMocksService;

    @Autowired
    private ExportImportService exportImportService;

    @Operation(summary = "Export Mock CSV Template", description = "Exports the mock template CSV file which can used" +
            " while import operation.", tags = {"Mock Management"})
    @GetMapping(UrlConfig.MOCKS_CSV_TEMPLATE_EXPORT)
    public void exportTemplateCsv(HttpServletResponse response) throws IOException {
        validateExportImportFeatureForPlatform(response);
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
    public void exportAllMocksInCsvFormat(HttpServletResponse response) throws IOException {
        validateExportImportFeatureForPlatform(response);
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + exportImportService.generateFileName();
        try {
            List<Mock> mockList = listMocksService.getAllMocks();
            response.setContentType("text/csv");
            response.setHeader(headerKey, headerValue);
            exportImportService.exportMockListToCsv(response.getWriter(), mockList);
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            response.setStatus(500);
        }
    }

    @Operation(summary = "Import Mocks", description = "Imports the mocks from CSV file format.", tags = {"Mock Management"})
    @PostMapping(UrlConfig.MOCKS_CSV_IMPORT)
    public void importAllMocksInCsvFormat(HttpServletResponse response) throws IOException {
        validateExportImportFeatureForPlatform(response);
        try {
            exportImportService.importMocksFromCsv();
            response.setContentType("application/json");
            response.getWriter().write("Imported Mocks Successfully!");
            response.getWriter().flush();
            response.setStatus(200);
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            response.setStatus(500);
        }
    }

    private void validateExportImportFeatureForPlatform(HttpServletResponse response) throws IOException {
        try {
            exportImportService.validateExportImportFeature();
        } catch (ExportImportDisabledException e) {
            log.log(Level.ERROR, e.getMessage());
            response.setStatus(400);
            response.sendError(400, e.getMessage());
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            response.setStatus(500);
        }
    }
}
