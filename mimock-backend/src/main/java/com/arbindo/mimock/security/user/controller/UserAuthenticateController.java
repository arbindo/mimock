package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.security.user.MimockUserDetailsService;
import com.arbindo.mimock.security.user.models.request.AuthenticateUserRequest;
import com.arbindo.mimock.security.user.models.response.AuthenticationErrorResponse;
import com.arbindo.mimock.security.user.models.response.AuthenticationResponse;
import com.arbindo.mimock.security.user.models.response.AuthenticationTokenResponse;
import com.arbindo.mimock.security.utils.JWTUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping(UrlConfig.AUTHENTICATE)
@Log4j2
@Tag(name = "User Management", description = "Handles operations related to user management.")
public class UserAuthenticateController {
    @Autowired
    MimockUserDetailsService userDetailsService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTUtils jwtUtils;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Authenticate user",
            description = "Authenticates the user and returns the auth token",
            tags = {"User Management"}
    )
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticateUserRequest authenticateUserRequest) {
        try {
            log.log(Level.INFO, "Authenticating user with the credentials supplied in the request");
            log.log(Level.DEBUG, String.format("{userName: %s}", authenticateUserRequest.getUserName()));
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticateUserRequest.getUserName(), authenticateUserRequest.getPassword())
            );
        } catch (Exception e) {
            log.log(Level.ERROR, "User authentication failed with exception : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    AuthenticationErrorResponse.builder()
                            .errorMessage(e.getMessage())
                            .build()
            );
        }

        log.log(Level.INFO, "User successfully authenticated");
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticateUserRequest.getUserName());
        HashMap<String, Object> userClaims = generateClaims(userDetails);

        log.log(Level.INFO, "Returning the auth token for the user");
        return ResponseEntity.ok(
                AuthenticationTokenResponse.builder()
                        .token(jwtUtils.generateJWT(userDetails, userClaims))
                        .expiresAt(jwtUtils.getTokenExpiryTimestamp().toString())
                        .build()
        );
    }

    private HashMap<String, Object> generateClaims(UserDetails userDetails) {
        log.log(Level.INFO, "Generating claims for the user");

        String role = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()).get(0);

        HashMap<String, Object> userClaims = new HashMap<>();
        userClaims.put("userName", userDetails.getUsername());
        userClaims.put("userRole", role);

        return userClaims;
    }
}
