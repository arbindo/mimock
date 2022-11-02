package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.common.wrapper.GenericResponseWrapper;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.request.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.mimocks.service.BulkMockManagementService;
import com.arbindo.mimock.manage.mimocks.service.exceptions.MockAlreadyExistsException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MOCKS_PATH)
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "Mock Management", description = "Handles operations related to mock resource.")
public class BulkMockManagementController {

    @Autowired
    private BulkMockManagementService bulkMockManagementService;

    @Operation(summary = "Bulk Insert Mocks", description = "Bulk Inserts mocks as per the given data in multi-part form.",
            tags = {"Mock Management"})
    @PostMapping(path = UrlConfig.MOCKS_BULK)
    public ResponseEntity<GenericResponseWrapper<List<Mock>>> bulkInsertMocks(
            @RequestBody @Valid List<MockRequest> requestList, @RequestParam int param) {
        List<Mock> mocks;
        List<ProcessedMockRequest> processedMockRequests = new ArrayList<>();
        for (int i=1;i <=10000;i++){
            ProcessedMockRequest request = ProcessedMockRequest.builder()
                    .name("TestMockRun_"+ param + "_" +i)
                    .httpMethod("GET")
                    .description("optional")
                    .route("/api/google/v" + param + "_" +i)
                    .statusCode(200)
                    .build();
            processedMockRequests.add(request);
        }
//        List<ProcessedMockRequest> processedMockRequests = requestList.stream().map(RequestModelMapper::map).collect(Collectors.toList());
        try {
           mocks = bulkMockManagementService.bulkCreateMocks(processedMockRequests);
           mocks = bulkMockManagementService.saveAllMocks(mocks);
        } catch (MockAlreadyExistsException e) {
            log.log(Level.ERROR, e.getMessage());
            return ResponseEntity.badRequest().body(
                    getGenericResponseWrapper(HttpStatus.BAD_REQUEST, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    getGenericResponseWrapper(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), null)
            );
        }
        return ResponseEntity.ok(getGenericResponseWrapper(HttpStatus.OK, mocks.size() + " Bulk Items Created", mocks));
    }

    private GenericResponseWrapper<List<Mock>> getGenericResponseWrapper(HttpStatus httpStatus, String responseMessage, List<Mock> mocksList) {
        return GenericResponseWrapper.<List<Mock>>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(mocksList)
                .build();
    }

}
