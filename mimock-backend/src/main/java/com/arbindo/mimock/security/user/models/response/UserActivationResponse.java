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
public class UserActivationResponse {
    @Schema(description = "User name for which the status was updated", example = "frodo_baggins")
    private String userName;

    @Schema(description = "Updated activation status", example = "false")
    private Boolean updatedActivationStatus;
}
