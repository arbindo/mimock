package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.security.user.models.request.UserActivationRequest;
import com.arbindo.mimock.security.user.models.response.UserActivationResponse;
import com.arbindo.mimock.security.user.service.UserActivationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springdoc.api.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(UrlConfig.USER_ACTIVATION)
@Log4j2
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class UserActivationController {
    @Autowired
    UserActivationService userActivationService;

    @PutMapping
    @Operation(
            summary = "Update user activation status",
            description = "To enable or disable a user account.",
            tags = {"User Management"}
    )
    public ResponseEntity<?> updateUserActivationStatus(@Valid @RequestBody UserActivationRequest request) {
        User updatedUser;

        try {
            log.log(Level.INFO, "Invoking service to update user activation status");
            updatedUser = userActivationService.updateUserActivationStatus(request);
        } catch (Exception e) {
            log.log(Level.ERROR, "Failed while updating user activation status : " + e.getMessage());
            return ResponseEntity.internalServerError().body(new ErrorMessage(e.getMessage()));
        }

        return ResponseEntity
                .ok()
                .body(new UserActivationResponse(updatedUser.getUserName(), updatedUser.getIsUserActive()));
    }
}
