package com.arbindo.mimock.security.user.mapper;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.security.user.models.UserInfo;
import com.arbindo.mimock.security.user.models.Users;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserResponseMapperTest {

    @Autowired
    UserResponseMapper userResponseMapper;

    @Test
    void shouldReturnMappedUsers() {
        UserRole userRole = UserRole.builder()
                .roleName("ADMIN")
                .build();

        User user1 = User.builder()
                .id(UUID.randomUUID())
                .userName("test_1")
                .password("$2a$12$xQ6KO0MicjoJcBGBQfE62e7JuoyAB2JOOE578suh0QXLzx091K3Ca")
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .createdAt(ZonedDateTime.now())
                .build();
        User user2 = User.builder()
                .id(UUID.randomUUID())
                .userName("test_@")
                .password("$2a$12$xQ6KO0MicjoJcBGBQfE62e7JuoyAB2JOOE578suh0QXLzx091K3Ca")
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .createdAt(ZonedDateTime.now())
                .deletedAt(ZonedDateTime.now())
                .passwordUpdatedAt(ZonedDateTime.now())
                .build();

        List<User> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);

        UserInfo userInfo1 = UserInfo.builder()
                .userId(user1.getId().toString())
                .userName(user1.getUserName())
                .name(user1.getName())
                .isUserActive(user1.getIsUserActive())
                .isUserLocked(user1.getIsUserBlocked())
                .isUserCurrentlyLoggedIn(user1.getIsSessionActive())
                .userRole("ADMIN")
                .userCreatedAt(user1.getCreatedAt())
                .passwordUpdatedAt(user1.getPasswordUpdatedAt())
                .isUserDeleted(false)
                .build();
        UserInfo userInfo2 = UserInfo.builder()
                .userId(user2.getId().toString())
                .userName(user2.getUserName())
                .name(user2.getName())
                .isUserActive(user2.getIsUserActive())
                .isUserLocked(user2.getIsUserBlocked())
                .isUserCurrentlyLoggedIn(user2.getIsSessionActive())
                .userRole("ADMIN")
                .userCreatedAt(user2.getCreatedAt())
                .passwordUpdatedAt(user2.getPasswordUpdatedAt())
                .isUserDeleted(true)
                .build();

        Users expectedUsers = new Users();
        expectedUsers.add(userInfo1);
        expectedUsers.add(userInfo2);

        Users actualUsers = userResponseMapper.mappedUserResponse(userList);

        assertEquals(expectedUsers, actualUsers);
    }

    @Test
    void shouldReturnMappedUserInfo() {
        UserRole userRole = UserRole.builder()
                .roleName("ADMIN")
                .build();

        User user = User.builder()
                .id(UUID.randomUUID())
                .userName("test_1")
                .password("$2a$12$xQ6KO0MicjoJcBGBQfE62e7JuoyAB2JOOE578suh0QXLzx091K3Ca")
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .createdAt(ZonedDateTime.now())
                .passwordUpdatedAt(ZonedDateTime.now())
                .build();


        UserInfo expectedUserInfo = UserInfo.builder()
                .userId(user.getId().toString())
                .userName(user.getUserName())
                .name(user.getName())
                .isUserActive(user.getIsUserActive())
                .isUserLocked(user.getIsUserBlocked())
                .isUserCurrentlyLoggedIn(user.getIsSessionActive())
                .userRole("ADMIN")
                .userCreatedAt(user.getCreatedAt())
                .passwordUpdatedAt(user.getPasswordUpdatedAt())
                .isUserDeleted(false)
                .build();

        UserInfo actualUserInfo = userResponseMapper.mappedUserResponse(user);

        assertEquals(expectedUserInfo.getUserId(), actualUserInfo.getUserId());
        assertEquals(expectedUserInfo.getUserName(), actualUserInfo.getUserName());
        assertEquals(expectedUserInfo.getName(), actualUserInfo.getName());
        assertEquals(expectedUserInfo.getIsUserActive(), actualUserInfo.getIsUserActive());
        assertEquals(expectedUserInfo.getUserRole(), actualUserInfo.getUserRole());
        assertEquals(expectedUserInfo.getUserCreatedAt(), actualUserInfo.getUserCreatedAt());
        assertEquals(expectedUserInfo.getPasswordUpdatedAt(), actualUserInfo.getPasswordUpdatedAt());
        assertFalse(actualUserInfo.getIsUserDeleted());
        assertFalse(actualUserInfo.getIsUserLocked());
        assertTrue(actualUserInfo.getIsUserActive());
    }
}