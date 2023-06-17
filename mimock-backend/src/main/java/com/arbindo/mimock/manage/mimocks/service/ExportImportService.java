package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.service.exceptions.ExportImportDisabledException;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public interface ExportImportService {
    String generateTemplateFileName();
    String generateFileName();
    void validateExportImportFeature() throws ExportImportDisabledException;
    void exportMockTemplateCsv(PrintWriter writer) throws IOException;
    void exportMockListToCsv(PrintWriter writer, List<Mock> mockList) throws IOException;
    void importMocksFromCsv() throws IOException;
}
