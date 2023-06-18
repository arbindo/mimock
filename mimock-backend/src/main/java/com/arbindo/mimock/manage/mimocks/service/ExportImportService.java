package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.mimocks.service.exceptions.ExportImportDisabledException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public interface ExportImportService {
    String generateTemplateFileName();
    String generateFileName();
    void validateExportImportFeature() throws ExportImportDisabledException;
    void exportMockTemplateCsv(PrintWriter writer) throws IOException;
    void exportMockListToCsv(PrintWriter writer, List<Mock> mockList) throws IOException;
    boolean validateMultipartFile(MultipartFile file);
    List<ProcessedMockRequest> importMocksFromCsv(MultipartFile file) throws IOException;
}
