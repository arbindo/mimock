package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Service;
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.constraint.NotNull;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class ExportImportServiceImpl implements ExportImportService {

    @Override
    public String generateTemplateFileName() {
        return "mocks_template.csv";
    }

    @Override
    public String generateFileName() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormat.format(new Date());
        return String.format("mocks_%s.csv", currentDateTime);
    }

    @Override
    public void exportMockTemplateCsv(PrintWriter writer) throws IOException {
        ICsvBeanWriter csvWriter = null;
        try{
            csvWriter = new CsvBeanWriter(writer, CsvPreference.STANDARD_PREFERENCE);
            writeTemplateHeaders(csvWriter);
        }catch (Exception e){
            log.log(Level.DEBUG, e.getMessage());
        } finally {
            close(csvWriter);
        }
    }

    @Override
    public void exportMockListToCsv(PrintWriter writer, List<Mock> mockList) throws IOException {
        ICsvBeanWriter csvWriter = null;
        try{
            csvWriter = new CsvBeanWriter(writer, CsvPreference.STANDARD_PREFERENCE);
            writeHeaders(csvWriter);
            writeData(mockList, csvWriter);
        } catch (Exception e){
            log.log(Level.DEBUG, e.getMessage());
        } finally {
            close(csvWriter);
        }
    }

    private void close(ICsvBeanWriter csvWriter) throws IOException {
        if(ValidationUtil.isArgNotNull(csvWriter)){
            csvWriter.close();
            log.log(Level.DEBUG, "CSV Write Completed!");
        }
    }

    private void writeData(List<Mock> mockList, ICsvBeanWriter csvWriter) throws IOException {
        String[] nameMapping = getNameMappings();
        CellProcessor[] cellProcessors = getExportCellProcessors();
        for(Mock mock : mockList){
            csvWriter.write(mock, nameMapping, cellProcessors);
        }
        log.log(Level.DEBUG, "CSV Data Write Completed!");
    }

    private void writeHeaders(ICsvBeanWriter csvWriter) throws IOException {
        String[] csvHeader = getCsvHeaders();
        csvWriter.writeHeader(csvHeader);
        log.log(Level.DEBUG, "CSV Header Write Completed!");
    }

    private void writeTemplateHeaders(ICsvBeanWriter csvWriter) throws IOException {
        String[] csvHeader = getCsvTemplateHeaders();
        csvWriter.writeHeader(csvHeader);
        log.log(Level.DEBUG, "CSV Template Header Write Completed!");
    }

    protected static String[] getCsvTemplateHeaders() {
        return new String[]{"Route", "Description", "Http Method", "Status Code", "Response Content Type", "Query Params"};
    }

    protected static String[] getCsvHeaders() {
        return new String[]{"Mock Id", "Route", "Description", "Http Method", "Status Code", "Response Content Type", "Query Params"};
    }

    private String[] getNameMappings(){
        return new String[]{"id", "route", "description", "httpMethod", "statusCode", "responseContentType", "queryParams"};
    }

    private static CellProcessor[] getExportCellProcessors(){
        return new CellProcessor[]{
                new NotNull(), // id
                new NotNull(), // route
                new Optional(), // description
                new NotNull(), // httpMethod
                new NotNull(), // statusCode
                new Optional(), // responseContentType
                new Optional() // queryParams
        };
    }
}
