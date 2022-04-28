package com.arbindo.mimock.security.user.models.response.getuser;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GetUserErrorResponse implements GetUserResponse {
    @Schema(description = "Get user error message")
    String message;
}
