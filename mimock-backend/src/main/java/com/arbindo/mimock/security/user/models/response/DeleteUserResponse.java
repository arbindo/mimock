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
public class DeleteUserResponse {
    @Schema(description = "User name which was deleted", example = "mimock_admin")
    private String deletedUser;
}
