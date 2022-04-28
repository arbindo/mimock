package com.arbindo.mimock.security.user.models.response.getuser;

import com.arbindo.mimock.security.user.models.UserInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GetUserInfoResponse implements GetUserResponse {
    @Schema(description = "User info with all the user details")
    UserInfo userInfo;
}
