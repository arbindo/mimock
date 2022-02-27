package com.arbindo.mimock.security.user.models;

import com.arbindo.mimock.constants.Roles;
import com.arbindo.mimock.constraints.ValidPassword;
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
    @Size(min = 2, max = 225)
    private String name;

    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "mithrandir_69", description = "Unique user name for the user")
    @Size(min = 6, max = 128)
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(
            example = "$2a$12$GekvNjpI6TOSDXJRYMNzguU4edoaHaTXs1jvHELi27AW2zsNopTxm",
            description = "BCrypt encoded password"
    )
    @ValidPassword
    private String password;

    @NotBlank(message = "User role cannot be empty")
    @Schema(example = "ADMIN", description = "Role of the user")
    private Roles userRole;
}
