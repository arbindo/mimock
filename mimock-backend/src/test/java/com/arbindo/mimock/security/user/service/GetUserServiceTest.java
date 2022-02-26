package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.user.models.UserInfo;
import com.arbindo.mimock.security.user.models.Users;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class GetUserServiceTest {
    @Autowired
    GetUserService userService;

    @MockBean
    UserRepository userRepository;

    @Test
    void shouldReturnAllUsers_WhenUsersExistInDB() {
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
                .build();
        User user2 = User.builder()
                .id(UUID.randomUUID())
                .userName("test_@")
                .password("$2a$12$xQ6KO0MicjoJcBGBQfE62e7JuoyAB2JOOE578suh0QXLzx091K3Ca")
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .deletedAt(null)
                .build();

        List<User> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);

        lenient().when(userRepository.findAllByDeletedAtIsNull()).thenReturn(userList);

        UserInfo userInfo1 = UserInfo.builder()
                .userId(user1.getId().toString())
                .userName(user1.getUserName())
                .name(user1.getName())
                .isUserActive(user1.getIsUserActive())
                .isUserLocked(user1.getIsUserBlocked())
                .isUserCurrentlyLoggedIn(user1.getIsSessionActive())
                .userRole("ADMIN")
                .userCreatedAt(user1.getCreatedAt())
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
                .isUserDeleted(false)
                .build();

        Users expectedUsers = new Users();
        expectedUsers.add(userInfo1);
        expectedUsers.add(userInfo2);

        Users allUsers = userService.getAllUsers();

        assertEquals(expectedUsers, allUsers);
    }
}