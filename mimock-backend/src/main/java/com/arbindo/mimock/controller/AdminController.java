package com.arbindo.mimock.controller;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.service.AdminServiceImpl;
import com.arbindo.mimock.utilities.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping(Constants.ADMIN_PATH)
public class AdminController {

    @Autowired
    AdminServiceImpl adminService;

    @GetMapping(value = "/http-methods")
    @ResponseStatus(HttpStatus.OK)
    public List<HttpMethod> listAllSupportedHttpMethods(){
        return adminService.listAllSupportedHttpMethods();
    }

    @GetMapping(value = "/response-content-types")
    @ResponseStatus(HttpStatus.OK)
    public List<ResponseContentType> listAllSupportedResponseContentTypes(){
        return adminService.listAllSupportedResponseContentTypes();
    }
}
