package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.Messages;
import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.common.wrapper.GenericResponseWrapper;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.arbindo.mimock.manage.mimocks.mapper.RequestModelMapper;
import com.arbindo.mimock.manage.mimocks.mapper.ResponseModelMapper;
import com.arbindo.mimock.manage.mimocks.models.request.MockRequest;
import com.arbindo.mimock.manage.mimocks.models.response.ListMocksResponse;
import com.arbindo.mimock.manage.mimocks.service.MockManagementService;
import com.arbindo.mimock.manage.mimocks.service.exceptions.MockAlreadyExistsException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MOCKS_PATH)
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "Mock Management", description = "Handles operations related to mock resource.")
public class MockManagementController {

    @Autowired
    private MockManagementService mockManagementService;

    @Operation(summary = "Create Mock", description = "Creates a mock as per the given data in multi-part form.",
            tags = {"Mock Management"})
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<GenericResponseWrapper<Mock>> createMock(@Valid MockRequest request) {
        Mock mock;

        try {
            mock = mockManagementService.createMock(RequestModelMapper.map(request));
        } catch (MockAlreadyExistsException e) {
            log.log(Level.ERROR, e.getMessage());

            return ResponseEntity.badRequest().body(
                    getGenericResponseWrapper(HttpStatus.BAD_REQUEST, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    getGenericResponseWrapper(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), null)
            );
        }

        final URI location = ServletUriComponentsBuilder
                .fromCurrentServletMapping().path(UrlConfig.MOCKS_PATH + "/{mockId}").build()
                .expand(mock.getId()).toUri();
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.CREATED,
                Messages.createResourceSuccess(location.toString()), mock);
        return ResponseEntity.created(location).body(genericResponseWrapper);
    }

    @Operation(summary = "List Mocks", description = "List all mocks.", tags = {"Mock Management"})
    @GetMapping
    public ResponseEntity<List<Mock>> getAllMocks() {
        return ResponseEntity.ok(mockManagementService.getAllMocks());
    }

    @Operation(summary = "List Mocks As Pageable", description = "List all mocks in pageable format and filter based on " +
            "the status filter (NONE, ARCHIVED, DELETED), if provided",
            tags = {"Mock Management"})
    @GetMapping(UrlConfig.MOCKS_PAGEABLE)
    public ResponseEntity<Page<ListMocksResponse>> getMocksAsPageable(@SortDefault(sort = "createdAt",
            direction = Sort.Direction.DESC) Pageable pageable, @RequestParam(required = false) Status status) {
        Page<Mock> mockPageable = mockManagementService.getMocksAsPageable(pageable, status);
        if(mockPageable == null){
            return ResponseEntity.ok(null);
        }
        Page<ListMocksResponse> responsePage = mockPageable.map(ResponseModelMapper::map);
        return ResponseEntity.ok(responsePage);
    }

    @Operation(summary = "Get Mock", description = "Get mock based on the given mockId.", tags = {"Mock Management"})
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

    @Operation(summary = "Delete Mock", description = "Performs soft delete on mock based on the given mockId.", tags = {"Mock Management"})
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
            tags = {"Mock Management"})
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

    @Operation(summary = "Delete Mocks", description = "Deletes all mocks.", tags = {"Mock Management"})
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
            tags = {"Mock Management"})
    @PutMapping(value = "{mockId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<GenericResponseWrapper<Mock>> updateMockById(@PathVariable @NotBlank String mockId, @NotNull @Valid MockRequest request) {
        Mock updatedMock;

        try {
            updatedMock = mockManagementService.updateMock(mockId, RequestModelMapper.map(request));
        } catch (MockAlreadyExistsException e) {
            log.log(Level.ERROR, e.getMessage());

            return ResponseEntity.badRequest().body(
                    getGenericResponseWrapper(HttpStatus.BAD_REQUEST, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    getGenericResponseWrapper(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), null)
            );
        }

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                Messages.UPDATE_RESOURCE_SUCCESS, updatedMock);
        return ResponseEntity.ok(genericResponseWrapper);
    }

    private GenericResponseWrapper<Mock> getGenericResponseWrapper(HttpStatus httpStatus, String responseMessage, Mock mock) {
        return GenericResponseWrapper.<Mock>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(mock)
                .build();
    }
}
