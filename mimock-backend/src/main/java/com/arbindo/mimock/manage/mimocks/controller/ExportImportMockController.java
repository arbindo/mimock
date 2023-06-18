package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.service.BulkMockManagementService;
import com.arbindo.mimock.manage.mimocks.service.ExportImportService;
import com.arbindo.mimock.manage.mimocks.service.ListMocksService;
import com.arbindo.mimock.manage.mimocks.service.exceptions.ExportImportDisabledException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private BulkMockManagementService bulkMockManagementService;

    @Operation(summary = "Export Mock CSV Template", description = "Exports the mock template CSV file which can used" +
            " while import operation.", tags = {"Mock Management"})
    @GetMapping(UrlConfig.MOCKS_CSV_TEMPLATE_EXPORT)
    public void exportTemplateCsv(HttpServletResponse response) throws IOException {
        if (isExportImportFeatureDisabledForPlatform(response)){
            return;
        }
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + exportImportService.generateTemplateFileName();
        try {
            response.setContentType("text/csv");
            response.setHeader(headerKey, headerValue);
            exportImportService.exportMockTemplateCsv(response.getWriter());
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            response.sendError(500, e.getMessage());
        }
    }

    @Operation(summary = "Export Mocks", description = "Exports the mocks in CSV file format.", tags = {"Mock Management"})
    @GetMapping(UrlConfig.MOCKS_CSV_EXPORT)
    public void exportAllMocksInCsvFormat(HttpServletResponse response) throws IOException {
        if (isExportImportFeatureDisabledForPlatform(response)){
            return;
        }
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + exportImportService.generateFileName();
        try {
            List<Mock> mockList = listMocksService.getAllMocks();
            response.setContentType("text/csv");
            response.setHeader(headerKey, headerValue);
            exportImportService.exportMockListToCsv(response.getWriter(), mockList);
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            response.sendError(500, e.getMessage());
        }
    }

    @Operation(summary = "Import Mocks", description = "Imports the mocks from CSV file format.", tags = {"Mock Management"})
    @PostMapping(UrlConfig.MOCKS_CSV_IMPORT)
    public void importAllMocksInCsvFormat(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws IOException {
        if (isExportImportFeatureDisabledForPlatform(response)){
            return;
        }
        boolean isValidFile = exportImportService.validateMultipartFile(file);
        if(!isValidFile){
            log.log(Level.DEBUG, "Not in CSV Format");
            var customErrorMsg = "Import mocks failed due to file not in '.csv' format";
            response.sendError(400, customErrorMsg);
            return;
        }
        try {
            var requestList = exportImportService.importMocksFromCsv(file);
            var mocks = bulkMockManagementService.bulkCreateMocks(requestList);
            response.setContentType("application/json");
            var customSuccessMsg = "Imported mocks from file: " +
                    file.getOriginalFilename() + "; Total Mocks Imported: " + mocks.size();
            response.setStatus(200);
            var printWriter = response.getWriter();
            printWriter.write(customSuccessMsg);
            printWriter.close();
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            var customMsg = "Import mocks failed due to: " + e.getMessage();
            response.sendError(500, customMsg);
        }
    }

    private boolean isExportImportFeatureDisabledForPlatform(HttpServletResponse response) throws IOException {
        try {
            exportImportService.validateExportImportFeature();
        } catch (ExportImportDisabledException e) {
            log.log(Level.DEBUG, e.getMessage());
            response.sendError(400, e.getMessage());
            return true;
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            response.sendError(500, e.getMessage());
            return true;
        }
        return false;
    }
}
