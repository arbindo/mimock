package com.arbindo.mimock.security.user.models.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class UserActivationRequest {
    @NotNull(message = "User status is mandatory")
    @Schema(description = "Activation status for the user", example = "true")
    private Boolean isUserActive;

    @NotBlank(message = "Username cannot be empty")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 128, message = "User name cannot be more than 128 characters")
    @Schema(description = "Username for which the activation status need to be set", example = "mimock_admin")
    private String userName;
}
