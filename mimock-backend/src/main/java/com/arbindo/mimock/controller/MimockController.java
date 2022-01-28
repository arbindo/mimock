package com.arbindo.mimock.controller;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.models.v1.CreateMockRequest;
import com.arbindo.mimock.models.v1.GenericResponseWrapper;
import com.arbindo.mimock.service.MocksServiceImpl;
import com.arbindo.mimock.utilities.Constants;
import com.arbindo.mimock.utilities.Messages;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@Log4j2
@RequestMapping(Constants.MOCKS_PATH)
public class MimockController {

    @Autowired
    private MocksServiceImpl mocksService;

    @PostMapping
    public ResponseEntity<GenericResponseWrapper<Mock>> createMock(@RequestBody CreateMockRequest request) {
        Mock mock = mocksService.createMock(request);
        if(mock != null){
            final URI location = ServletUriComponentsBuilder
                    .fromCurrentServletMapping().path(Constants.MOCKS_PATH + "/{mockId}").build()
                    .expand(mock.getId()).toUri();
            GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.CREATED,
                    Messages.CREATE_RESOURCE_SUCCESS(location.toString()), mock);
            return ResponseEntity.created(location).body(genericResponseWrapper);
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.CREATE_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @GetMapping
    public ResponseEntity<List<Mock>> getAllMocks() {
        return ResponseEntity.ok(mocksService.getMocks());
    }


    @GetMapping("{mockId}")
    public ResponseEntity<GenericResponseWrapper<Mock>> getMockById(@PathVariable String mockId){
        Mock mock = mocksService.getMockById(mockId);
        if(mock != null){
            GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK, Messages.GET_RESOURCE_SUCCESS, mock);
            return ResponseEntity.ok(genericResponseWrapper);
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST, Messages.GET_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    @DeleteMapping("{mockId}")
    public ResponseEntity<GenericResponseWrapper<Mock>> deleteMockById(@PathVariable String mockId){
        boolean isMockDeleted = mocksService.deleteMockById(mockId);
        if(isMockDeleted){
            return ResponseEntity.noContent().build();
        }
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST, Messages.DELETE_RESOURCE_FAILED, null);
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
