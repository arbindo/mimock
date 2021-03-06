package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.security.user.models.request.UserActivationRequest;
import com.arbindo.mimock.security.user.models.response.UserActivationResponse;
import com.arbindo.mimock.security.user.service.UserActivationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springdoc.api.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(UrlConfig.USER_ACTIVATION)
@Log4j2
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class UserActivationController {
    @Autowired
    UserActivationService userActivationService;

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update user activation status", description = "To enable or disable a user account")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", content = {
                            @Content(mediaType = "application/json", schema = @Schema(implementation = UserActivationResponse.class))
                    }),
                    @ApiResponse(responseCode = "500", content = {
                            @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))
                    })
            }
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
