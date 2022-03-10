package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.security.user.models.response.DeleteUserResponse;
import com.arbindo.mimock.security.user.service.DeleteUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springdoc.api.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UrlConfig.DELETE_USER)
@Log4j2
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class DeleteUserController {
    @Autowired
    DeleteUserService service;

    @DeleteMapping
    @Operation(summary = "Delete user based on user name")
    public ResponseEntity<?> updatePassword(@RequestParam(name = "userName") String userName) {
        try {
            log.log(Level.INFO, "Invoking service to delete user");
            service.deleteUser(userName);
        } catch (UsernameNotFoundException e) {
            log.log(Level.ERROR, e.getMessage());
            return ResponseEntity.internalServerError().body(new ErrorMessage(e.getMessage()));
        }

        return ResponseEntity.ok().body(new DeleteUserResponse(userName));
    }
}
