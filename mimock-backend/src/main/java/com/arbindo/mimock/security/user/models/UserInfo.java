package com.arbindo.mimock.security.user.models;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private Boolean isUserDeleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private ZonedDateTime userCreatedAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private ZonedDateTime passwordUpdatedAt;
}
