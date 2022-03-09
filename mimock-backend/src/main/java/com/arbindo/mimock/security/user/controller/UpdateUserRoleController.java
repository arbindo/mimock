package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.security.user.models.request.UpdateUserRoleRequest;
import com.arbindo.mimock.security.user.models.response.UpdateUserRoleResponse;
import com.arbindo.mimock.security.user.service.UpdateUserRoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springdoc.api.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(UrlConfig.UPDATE_ROLE)
@Log4j2
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class UpdateUserRoleController {
    @Autowired
    UpdateUserRoleService service;

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Update user role")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UpdateUserRoleRequest request) {
        User updatedUser;
        try {
            log.log(Level.INFO, "Invoking service to update user role");
            updatedUser = service.updateUserRole(request);
        } catch (UsernameNotFoundException e) {
            log.log(Level.ERROR, e.getMessage());
            return ResponseEntity.internalServerError().body(new ErrorMessage(e.getMessage()));
        }

        log.log(Level.INFO, "Role of the user {} updated successfully", updatedUser.getUserName());
        return ResponseEntity.ok().body(new UpdateUserRoleResponse(
                updatedUser.getUserName(),
                updatedUser.getUserRoles().getRoleName()
        ));
    }
}
