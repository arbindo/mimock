package com.arbindo.mimock.security.user.mapper;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.security.user.models.UserInfo;
import com.arbindo.mimock.security.user.models.Users;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserResponseMapper {
    public Users mappedUserResponse(List<User> userList) {
        List<UserInfo> collectedList = userList.stream().map((user) -> UserInfo.builder()
                .userId(user.getId().toString())
                .name(user.getName())
                .userName(user.getUserName())
                .isUserActive(user.getIsUserActive())
                .isUserLocked(user.getIsUserBlocked())
                .isUserDeleted(user.getDeletedAt() != null)
                .userRole(user.getUserRoles().getRoleName())
                .isUserCurrentlyLoggedIn(user.getIsSessionActive())
                .build()
        ).collect(Collectors.toList());

        Users users = new Users();
        users.addAll(collectedList);

        return users;
    }

    public UserInfo mappedUserResponse(User user) {
        return UserInfo.builder()
                .userId(user.getId().toString())
                .name(user.getName())
                .userName(user.getUserName())
                .isUserActive(user.getIsUserActive())
                .isUserLocked(user.getIsUserBlocked())
                .isUserDeleted(user.getDeletedAt() != null)
                .userRole(user.getUserRoles().getRoleName())
                .isUserCurrentlyLoggedIn(user.getIsSessionActive())
                .build();
    }
}
