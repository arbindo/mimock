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
public class UpdatePasswordRequest {
    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "mimock_admin", description = "Unique user name for the user")
    @Size(min = 4, message = "User name must be at least 4 characters long")
    @Size(max = 24, message = "User name cannot be more than 24 characters")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(
            example = "$2a$12$GekvNjpI6TOSDXJRYMNzguU4edoaHaTXs1jvHELi27AW2zsNopTxm",
            description = "BCrypt encoded password"
    )
    private String password;
}
