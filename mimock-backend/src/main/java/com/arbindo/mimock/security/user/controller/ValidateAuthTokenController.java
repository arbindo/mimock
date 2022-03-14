package com.arbindo.mimock.security.user.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.security.user.service.ValidateAuthTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@Log4j2
@Tag(name = "User Authentication", description = "Handles operations related to user authentication.")
public class ValidateAuthTokenController {
    @Autowired
    ValidateAuthTokenService service;

    @GetMapping(UrlConfig.VALIDATE_TOKEN)
    @Operation(
            summary = "Validate user auth token",
            description = "Validates if the auth token is valid or not"
    )
    public void validateAuthToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authHeader = request.getHeader("Authorization");

        if (doesHeaderHaveValidToken(authHeader)) {
            log.log(Level.ERROR, "Auth token cannot be validated");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        Boolean isTokenValid = service.isTokenValid(authHeader.substring(7));
        if (!isTokenValid) {
            log.log(Level.ERROR, "Auth token is invalid");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }

        log.log(Level.INFO, "Auth token is valid");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private boolean doesHeaderHaveValidToken(String authHeader) {
        return authHeader == null
                || authHeader.isBlank()
                || !authHeader.startsWith("Bearer")
                || authHeader.substring(7).isBlank();
    }
}
