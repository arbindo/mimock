package com.arbindo.mimock.security.user.models.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class UpdateUserRoleResponse {
    @Schema(description = "User name for which the role was updated", example = "mimock_admin")
    private String userName;

    @Schema(description = "Updated user role", example = "MANAGER")
    private String updatedUserRole;
}
