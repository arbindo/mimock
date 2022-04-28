package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.security.user.models.response.UserRolesResponse;
import com.arbindo.mimock.security.user.service.GetUserRolesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(UrlConfig.STATIC_RECORDS_PATH)
@Log4j2
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "Static Records", description = "List all available user roles")
public class GetUserRolesController {
    final GetUserRolesService service;

    public GetUserRolesController(GetUserRolesService service) {
        this.service = service;
    }

    @Operation(summary = "List all user roles", description = "Returns all the existing users roles",
            tags = {"Static Records"})
    @GetMapping(UrlConfig.USER_ROLES_STATIC_RECORDS)
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", content = {
                            @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = UserRolesResponse.class))
                            )
                    }),
                    @ApiResponse(responseCode = "500", content = {
                            @Content(mediaType = "application/json")
                    })
            }
    )
    public ResponseEntity<List<UserRolesResponse>> getAllUserRoles() {
        log.log(Level.DEBUG, "Getting user roles from service");

        try {
            List<UserRolesResponse> userRoles = service.getAllUserRoles();

            log.log(Level.DEBUG, "Returning user roles");
            return ResponseEntity.ok().body(userRoles);
        } catch (Exception e) {
            log.log(Level.ERROR, "Error occurred while fetching user roles : {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
