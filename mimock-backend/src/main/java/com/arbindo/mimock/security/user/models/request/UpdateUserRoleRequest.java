package com.arbindo.mimock.security.user.models.request;

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
public class UpdateUserRoleRequest {
    @NotBlank(message = "Username cannot be empty")
    @Schema(example = "frodo1", description = "Unique user name for the user")
    @Size(min = 4, message = "User name must be at least 4 characters long")
    @Size(max = 24, message = "User name cannot be more than 24 characters")
    private String userName;

    @ValidRole
    @Schema(example = "ADMIN", description = "Role of the user")
    private String userRole;
}
