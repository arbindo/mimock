package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.security.user.models.AddUserRequest;
import com.arbindo.mimock.security.user.service.AddUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springdoc.api.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping(UrlConfig.USER_PATH)
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class AddUserController {
    @Autowired
    AddUserService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Add new user", description = "Adds a new user to mimock",
            tags = {"User Management"})
    public ResponseEntity<Object> addNewUser(@RequestBody AddUserRequest request) {
        try {
            log.log(Level.INFO, "Invoking service to save new user");
            service.addNewUser(request);
            return ResponseEntity.ok("");
        } catch (Exception e) {
            log.log(Level.ERROR, "Error occurred while saving new user : " + e.getMessage());
            return ResponseEntity.internalServerError().body(new ErrorMessage(e.getMessage()));
        }
    }
}
