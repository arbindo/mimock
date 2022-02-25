package com.arbindo.mimock.security.user.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class UserInfo {
    private String userName;
    private String userId;
    private String name;
    private Boolean isUserActive;
    private Boolean isUserLocked;
    private Boolean isUserCurrentlyLoggedIn;
    private String userRole;
    private ZonedDateTime userCreatedAt;
    private Boolean isUserDeleted;
}
