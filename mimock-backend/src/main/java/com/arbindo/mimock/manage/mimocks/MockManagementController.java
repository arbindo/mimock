package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.manage.mimocks.models.v1.GenericResponseWrapper;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.v1.Status;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MOCKS_PATH)
@Tag(name = "Mock Management", description = "Handles operations related to mock resource.")
public class MockManagementController {

    @Autowired
    private MockManagementService mockManagementService;

    @Autowired
    private ExportImportService exportImportService;

    @Operation(summary = "Create Mock", description = "Creates a mock as per the given data in multi-part form.",
            tags = { "Mock Management" })
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<GenericResponseWrapper<Mock>> createMock(@Valid MockRequest request) {
        Mock mock = mockManagementService.createMock(request);
        if (mock != null) {
            final URI location = ServletUriComponentsBuilder
                    .fromCurrentServletMapping().path(UrlConfig.MOCKS_PATH + "/{mockId}").build()
                    .expand(mock.getId()).toUri();
            GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.CREATED,
                    Messages.createResourceSuccess(location.toString()), mock);
            return ResponseEntity.created(location).body(genericResponseWrapper);
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.CREATE_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @Operation(summary = "List Mocks", description = "List all mocks.", tags = { "Mock Management" })
    @GetMapping
    public ResponseEntity<List<Mock>> getAllMocks() {
        return ResponseEntity.ok(mockManagementService.getAllMocks());
    }

    @Operation(summary = "Filter Mocks By Status", description = "List all mocks based on the status filter (NONE, ARCHIVED, DELETED)",
            tags = { "Mock Management" })
    @GetMapping(UrlConfig.MOCKS_FILTER)
    public ResponseEntity<Page<Mock>> getAllMocksWithFilter(@SortDefault(sort = "createdAt",
            direction = Sort.Direction.DESC) Pageable pageable, @RequestParam Status status) {
        Page<Mock> mockPageable = mockManagementService.getAllActiveMocks(pageable, status);
        return ResponseEntity.ok(mockPageable);
    }

    @Operation(summary = "Get Mock", description = "Get mock based on the given mockId.", tags = { "Mock Management" })
    @GetMapping("{mockId}")
    public ResponseEntity<GenericResponseWrapper<Mock>> getMockById(@PathVariable String mockId) {
        Mock mock = mockManagementService.getMockById(mockId);
        if (mock != null) {
            GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK, Messages.GET_RESOURCE_SUCCESS, mock);
            return ResponseEntity.ok(genericResponseWrapper);
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST, Messages.GET_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @Operation(summary = "Delete Mock", description = "Performs soft delete on mock based on the given mockId.", tags = { "Mock Management" })
    @DeleteMapping("{mockId}")
    public ResponseEntity<GenericResponseWrapper<Mock>> softDeleteMockById(@PathVariable String mockId) {
        boolean isMockDeleted = mockManagementService.softDeleteMockById(mockId);
        if (isMockDeleted) {
            return ResponseEntity.noContent().build();
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(
                HttpStatus.BAD_REQUEST,
                Messages.DELETE_RESOURCE_FAILED,
                null
        );
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @Operation(summary = "Force Delete Mock", description = "Performs hard delete on mock based on the given mockId.",
            tags = { "Mock Management" })
    @DeleteMapping("{mockId}" + UrlConfig.FORCE_DELETE_ACTION)
    public ResponseEntity<GenericResponseWrapper<Mock>> hardDeleteMockById(@PathVariable String mockId) {
        boolean isMockDeleted = mockManagementService.hardDeleteMockById(mockId);
        if (isMockDeleted) {
            return ResponseEntity.noContent().build();
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(
                HttpStatus.BAD_REQUEST,
                Messages.DELETE_RESOURCE_FAILED,
                null
        );
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @Operation(summary = "Delete Mocks", description = "Deletes all mocks.", tags = { "Mock Management" })
    @DeleteMapping
    public ResponseEntity<GenericResponseWrapper<Boolean>> deleteAllMocks() {
        boolean allMocksDeleted = mockManagementService.deleteAllMocks();
        if (allMocksDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.badRequest().body(GenericResponseWrapper.<Boolean>builder()
                .code(HttpStatus.BAD_REQUEST.toString())
                .message(Messages.DELETE_ALL_RESOURCES_FAILED).build());
    }

    @Operation(summary = "Update Mock", description = "Updates mock for the given mockId using the data in multi-part form.",
            tags = { "Mock Management" })
    @PutMapping(value = "{mockId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<GenericResponseWrapper<Mock>> updateMockById(@PathVariable String mockId, @Valid MockRequest request) {
        Mock updatedMock = mockManagementService.updateMock(mockId, request);
        if (updatedMock != null) {
            GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                    Messages.UPDATE_RESOURCE_SUCCESS, updatedMock);
            return ResponseEntity.ok(genericResponseWrapper);
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.UPDATE_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @Operation(summary = "Export Mock CSV Template", description = "Exports the mock template CSV file which can used" +
            " while import operation.", tags = { "Mock Management" })
    @GetMapping(UrlConfig.MOCKS_CSV_TEMPLATE_EXPORT)
    public void exportTemplateCsv(HttpServletResponse response) {
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + exportImportService.generateTemplateFileName();
        try {
            response.setContentType("text/csv");
            response.setHeader(headerKey, headerValue);
            exportImportService.exportMockTemplateCsv(response.getWriter());
        } catch (Exception e){
            log.log(Level.DEBUG, e.getMessage());
            response.setStatus(500);
        }
    }

    @Operation(summary = "Export Mocks", description = "Exports the mocks in CSV file format.", tags = { "Mock Management" })
    @GetMapping(UrlConfig.MOCKS_CSV_EXPORT)
    public void exportAllMocksInCsvFormat(HttpServletResponse response) {
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + exportImportService.generateFileName();
        try {
            List<Mock> mockList = mockManagementService.getAllMocks();
            response.setContentType("text/csv");
            response.setHeader(headerKey, headerValue);
            exportImportService.exportMockListToCsv(response.getWriter(), mockList);
        } catch (Exception e){
            log.log(Level.DEBUG, e.getMessage());
            response.setStatus(500);
        }
    }

    @Operation(summary = "Archive Mock", description = "Archives a mock based on the given mockId.",
            tags = { "Mock Management" })
    @PostMapping("{mockId}" + UrlConfig.ARCHIVE_ACTION)
    public ResponseEntity<GenericResponseWrapper<Mock>> archiveMockById(@PathVariable String mockId) {
        Mock mock = mockManagementService.archiveMock(mockId);
        if (mock != null) {
            GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                    Messages.ARCHIVED_RESOURCE_SUCCESS, mock);
            return ResponseEntity.ok(genericResponseWrapper);
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.ARCHIVE_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @Operation(summary = "Unarchive Mock", description = "Unarchive a mock based on the given mockId.",
            tags = { "Mock Management" })
    @PostMapping("{mockId}" + UrlConfig.UNARCHIVE_ACTION)
    public ResponseEntity<GenericResponseWrapper<Mock>> unarchiveMockById(@PathVariable String mockId) {
        Mock mock = mockManagementService.unarchiveMock(mockId);
        if (mock != null) {
            GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                    Messages.UNARCHIVED_RESOURCE_SUCCESS, mock);
            return ResponseEntity.ok(genericResponseWrapper);
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.UNARCHIVE_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }


    private GenericResponseWrapper<Mock> getGenericResponseWrapper(HttpStatus httpStatus, String responseMessage, Mock mock) {
        return GenericResponseWrapper.<Mock>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(mock)
                .build();
    }
}
