package com.arbindo.mimock.security.user.models.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date expiresAt;

    @Schema(
            example = "1800",
            description = "The age of the token in seconds"
    )
    private Long expiresAfterSeconds;
}
