package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.utils.Messages;
import com.arbindo.mimock.manage.mimocks.service.MockActionsService;
import com.arbindo.mimock.manage.mimocks.models.GenericResponseWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MOCKS_PATH)
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "Mock Management", description = "Handles operations related to mock resource.")
public class MockActionsController {

    @Autowired
    private MockActionsService mockActionsService;

    @Operation(summary = "Archive Mock", description = "Archives a mock based on the given mockId.",
            tags = {"Mock Management"})
    @PostMapping("{mockId}" + UrlConfig.ARCHIVE_ACTION)
    public ResponseEntity<GenericResponseWrapper<Mock>> archiveMockById(@PathVariable String mockId) {
        Mock mock = mockActionsService.archiveMock(mockId);
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
            tags = {"Mock Management"})
    @PostMapping("{mockId}" + UrlConfig.UNARCHIVE_ACTION)
    public ResponseEntity<GenericResponseWrapper<Mock>> unarchiveMockById(@PathVariable String mockId) {
        Mock mock = mockActionsService.unarchiveMock(mockId);
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
