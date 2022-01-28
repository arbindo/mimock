package com.arbindo.mimock.controller;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.service.ManagementServiceImpl;
import com.arbindo.mimock.utilities.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping(Constants.MANAGE_PATH)
public class ManagementController {

    @Autowired
    ManagementServiceImpl managementService;

    @GetMapping(value = "/http-methods")
    public ResponseEntity<List<HttpMethod>> listAllSupportedHttpMethods(){
        return ResponseEntity.ok(managementService.listAllSupportedHttpMethods());
    }

    @GetMapping(value = "/response-content-types")
    public ResponseEntity<List<ResponseContentType>> listAllSupportedResponseContentTypes(){
        return ResponseEntity.ok(managementService.listAllSupportedResponseContentTypes());
    }
}
