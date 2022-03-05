package com.arbindo.mimock.security.user.models.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Builder
@Getter
public class AuthenticateUserRequest {
    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "mithrandir_69", description = "Unique user name for the user")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 128, message = "User name cannot be more than 128 characters")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(
            example = "admin@123",
            description = "Password entered by the user"
    )
    private String password;
}
