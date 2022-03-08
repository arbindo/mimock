package com.arbindo.mimock.security.user.models.request;

import com.arbindo.mimock.constraints.ValidPassword;
import com.arbindo.mimock.constraints.ValidRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Builder
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserRequest {
    @NotBlank(message = "Name of the user cannot be empty")
    @Schema(example = "Gandalf", description = "Name of the user")
    @Size(min = 2, max = 225)
    @EqualsAndHashCode.Include
    private String name;

    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "mithrandir_69", description = "Unique user name for the user")
    @Size(min = 6, message = "User name must be at least 6 characters long")
    @Size(max = 128, message = "User name cannot be more than 128 characters")
    @EqualsAndHashCode.Include
    private String userName;

    @NotBlank(message = "Password cannot be empty")
    @Schema(
            example = "$2a$12$GekvNjpI6TOSDXJRYMNzguU4edoaHaTXs1jvHELi27AW2zsNopTxm",
            description = "BCrypt encoded password"
    )
    @ValidPassword
    @EqualsAndHashCode.Include
    private String password;

    @ValidRole
    @Schema(example = "ADMIN", description = "Role of the user")
    @EqualsAndHashCode.Include
    private String userRole;
}
