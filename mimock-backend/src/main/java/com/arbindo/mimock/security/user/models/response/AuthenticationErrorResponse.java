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
public class AuthenticationErrorResponse implements AuthenticationResponse {
    @Schema(
            example = "User does not exist",
            description = "Error message when user authentication fails"
    )
    private String errorMessage;
}
