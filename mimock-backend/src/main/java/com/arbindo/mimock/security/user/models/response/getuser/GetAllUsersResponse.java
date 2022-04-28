package com.arbindo.mimock.security.user.models.response.getuser;

import com.arbindo.mimock.security.user.models.Users;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GetAllUsersResponse implements GetUserResponse {
    @Schema(description = "List of all users from the database")
    Users users;
}
