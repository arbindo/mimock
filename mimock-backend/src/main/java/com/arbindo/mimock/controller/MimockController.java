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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@Log4j2
@RequestMapping(Constants.MOCKS_PATH)
public class MimockController {

    @Autowired
    private MocksServiceImpl mocksService;

    @PostMapping
    public GenericResponseWrapper<Mock> createMock(@RequestBody CreateMockRequest request) {
        Mock mock = mocksService.createMock(request);
        if(mock != null){
            return new GenericResponseWrapper<Mock>(HttpStatus.CREATED.toString(),
                    Messages.CREATE_RESOURCE_SUCCESS(mock.getId().toString()), mock);
        }
        return new GenericResponseWrapper<Mock>(HttpStatus.CONFLICT.toString(), Messages.CREATE_RESOURCE_FAILED, null);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Mock> getAllMocks() {
        return mocksService.getMocks();
    }


    @GetMapping("{mockId}")
    public GenericResponseWrapper<Mock> getMockById(@PathVariable String mockId){
        Mock mock = mocksService.getMockById(mockId);
        if(mock != null){
            return new GenericResponseWrapper<Mock>(HttpStatus.OK.toString(), Messages.GET_RESOURCE_SUCCESS, mock);
        }
        return new GenericResponseWrapper<Mock>(HttpStatus.CONFLICT.toString(), Messages.GET_RESOURCE_FAILED, null);
    }
}
