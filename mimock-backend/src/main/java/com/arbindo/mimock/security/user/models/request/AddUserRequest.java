package com.arbindo.mimock.security.user.models.request;

import com.arbindo.mimock.constraints.ValidPassword;
import com.arbindo.mimock.constraints.ValidRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Builder
@Getter
public class AddUserRequest {
    @NotBlank(message = "Name of the user cannot be empty")
    @Schema(example = "Gandalf", description = "Name of the user")
    @Size(min = 4, max = 24)
    private String name;

    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "mithrandir_69", description = "Unique user name for the user")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 24, message = "User name cannot be more than 24 characters")
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(
            example = "$2a$12$GekvNjpI6TOSDXJRYMNzguU4edoaHaTXs1jvHELi27AW2zsNopTxm",
            description = "BCrypt encoded password"
    )
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Size(max = 128, message = "Password cannot be more than 128 characters long")
    @ValidPassword
    private String password;

    @ValidRole
    @Schema(example = "ADMIN", description = "Role of the user")
    private String userRole;
}
