package com.arbindo.mimock.security.user.models.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class UserRolesResponse {
    @Schema(description = "User role name", example = "ADMIN")
    private String roleName;

    @Schema(description = "User role description", example = "Admin can manage both mocks and users")
    private String roleDescription;
}
