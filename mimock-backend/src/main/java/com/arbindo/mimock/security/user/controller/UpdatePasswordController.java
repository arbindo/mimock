package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.security.UserPermissionValidator;
import com.arbindo.mimock.security.exceptions.UserNotPermittedException;
import com.arbindo.mimock.security.user.models.request.UpdatePasswordRequest;
import com.arbindo.mimock.security.user.service.UpdatePasswordService;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(UrlConfig.UPDATE_PASSWORD)
@Log4j2
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class UpdatePasswordController {
    final
    UpdatePasswordService updatePasswordService;

    final
    UserPermissionValidator userPermissionValidator;

    public UpdatePasswordController(UpdatePasswordService updatePasswordService,
                                    UserPermissionValidator userPermissionValidator) {
        this.updatePasswordService = updatePasswordService;
        this.userPermissionValidator = userPermissionValidator;
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update user password")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", content = {
                            @Content(mediaType = "application/json")
                    }),
                    @ApiResponse(responseCode = "500", content = {
                            @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))
                    })
            }
    )
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdatePasswordRequest request) {
        User updatedUser;
        try {
            userPermissionValidator.isUserAllowedToPerformAction(request.getUserName());
            log.log(Level.INFO, "Invoking service to update user password");
            updatedUser = updatePasswordService.updatePassword(request);
        } catch (UsernameNotFoundException | UserNotPermittedException e) {
            log.log(Level.ERROR, e.getMessage());
            return ResponseEntity.internalServerError().body(new ErrorMessage(e.getMessage()));
        }

        log.log(Level.INFO, "Password for {} updated successfully", updatedUser.getUserName());
        return ResponseEntity.ok().build();
    }
}
