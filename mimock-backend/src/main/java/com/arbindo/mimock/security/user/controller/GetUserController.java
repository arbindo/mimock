package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.security.user.models.UserInfo;
import com.arbindo.mimock.security.user.models.Users;
import com.arbindo.mimock.security.user.models.response.getuser.GetAllUsersResponse;
import com.arbindo.mimock.security.user.models.response.getuser.GetUserErrorResponse;
import com.arbindo.mimock.security.user.models.response.getuser.GetUserInfoResponse;
import com.arbindo.mimock.security.user.models.response.getuser.GetUserResponse;
import com.arbindo.mimock.security.user.service.GetUserService;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(UrlConfig.USER_PATH)
@Log4j2
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class GetUserController {

    @Autowired
    GetUserService userService;

    @Operation(summary = "List all users", description = "Returns all the existing users who are not deleted",
            tags = {"User Management"})
    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<GetUserResponse> getAllUsers() {
        log.log(Level.INFO, "Getting all existing users");
        Users allUsers = userService.getAllUsers();

        if (allUsers == null) {
            log.log(Level.ERROR, "No users exist. Returning no content");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new GetUserErrorResponse("No users exist in the system")
            );
        }

        log.log(Level.INFO, "Returning all existing users");
        return ResponseEntity.ok(new GetAllUsersResponse(allUsers));
    }

    @Operation(summary = "List user info", description = "Returns the user info for an user",
            tags = {"User Management"})
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", content = {
                            @Content(mediaType = "application/json", schema = @Schema(implementation = UserInfo.class))
                    }),
                    @ApiResponse(responseCode = "404", content = {
                            @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))
                    }),
                    @ApiResponse(responseCode = "500", content = {
                            @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))
                    })
            }
    )
    @GetMapping(path = UrlConfig.GET_USER_BY_ID, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<GetUserResponse> getUserInfo(@RequestParam(name = "userId") Optional<String> userId,
                                                       @RequestParam(name = "userName") Optional<String> userName) {

        try {
            UserInfo user = null;
            if (userId.isPresent()) {
                log.log(Level.INFO, "Getting single user with ID : {}", userId.get());
                user = userService.getUserById(UUID.fromString(userId.get()));
            } else if (userName.isPresent()) {
                log.log(Level.INFO, "Getting single user with userName : {}", userName.get());
                user = userService.getUserByUserName(userName.get());
            }
            return ResponseEntity.ok(new GetUserInfoResponse(user));
        } catch (UsernameNotFoundException e) {
            log.log(Level.ERROR, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new GetUserErrorResponse(e.getMessage())
            );
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new GetUserErrorResponse(e.getMessage())
            );
        }
    }
}
