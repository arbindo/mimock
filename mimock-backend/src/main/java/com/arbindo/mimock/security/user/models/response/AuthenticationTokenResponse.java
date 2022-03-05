package com.arbindo.mimock.security.user.models.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class AuthenticationTokenResponse implements AuthenticationResponse {
    @Schema(
            example = "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYiJ9.nUJOGFyLon333gOsQpvIXWoLwx6jzbvHygfRObeqjl0",
            description = "JWT for the authenticated user"
    )
    private String token;

    @Schema(
            example = "22-06-2022 10:45 PM",
            description = "The expiry timestamp for the token"
    )
    private String expiresAt;
}
