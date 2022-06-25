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
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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

    @Test
    void shouldReturnNull_WhenNoUsersExistInDB() {
        lenient().when(userRepository.findAllByDeletedAtIsNull()).thenReturn(null);

        Users allUsers = userService.getAllUsers();

        assertNull(allUsers);
    }

    @Test
    void shouldReturnUserInfo_WhenUsersWithTheUserIdExistInDB() {
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
                .build();

        lenient().when(userRepository.findUserById(user.getId())).thenReturn(Optional.of(user));

        UserInfo expectedUserInfo = UserInfo.builder()
                .userId(user.getId().toString())
                .userName(user.getUserName())
                .name(user.getName())
                .isUserActive(user.getIsUserActive())
                .isUserLocked(user.getIsUserBlocked())
                .isUserCurrentlyLoggedIn(user.getIsSessionActive())
                .userRole("ADMIN")
                .userCreatedAt(user.getCreatedAt())
                .isUserDeleted(false)
                .build();

        UserInfo actualUserInfo = userService.getUserById(user.getId());

        assertEquals(expectedUserInfo.getUserId(), actualUserInfo.getUserId());
        assertEquals(expectedUserInfo.getUserName(), actualUserInfo.getUserName());
        assertEquals(expectedUserInfo.getName(), actualUserInfo.getName());
        assertEquals(expectedUserInfo.getIsUserActive(), actualUserInfo.getIsUserActive());
        assertEquals(expectedUserInfo.getUserRole(), actualUserInfo.getUserRole());
        assertFalse(actualUserInfo.getIsUserDeleted());
        assertFalse(actualUserInfo.getIsUserLocked());
        assertTrue(actualUserInfo.getIsUserActive());
    }

    @Test
    void shouldThrowUserNameNotFoundException_WhenUsersWithTheUserIdDoesNotExistInDB() {
        lenient().when(userRepository.findUserById(UUID.randomUUID())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.getUserById(any(UUID.class)));
    }

    @Test
    void shouldReturnUserInfo_WhenUsersWithTheUserNameExistInDB() {
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
                .build();

        lenient().when(userRepository.findUserByUserName(user.getUserName())).thenReturn(Optional.of(user));

        UserInfo expectedUserInfo = UserInfo.builder()
                .userId(user.getId().toString())
                .userName(user.getUserName())
                .name(user.getName())
                .isUserActive(user.getIsUserActive())
                .isUserLocked(user.getIsUserBlocked())
                .isUserCurrentlyLoggedIn(user.getIsSessionActive())
                .userRole("ADMIN")
                .userCreatedAt(user.getCreatedAt())
                .isUserDeleted(false)
                .build();

        UserInfo actualUserInfo = userService.getUserByUserName(user.getUserName());

        assertEquals(expectedUserInfo.getUserId(), actualUserInfo.getUserId());
        assertEquals(expectedUserInfo.getUserName(), actualUserInfo.getUserName());
        assertEquals(expectedUserInfo.getName(), actualUserInfo.getName());
        assertEquals(expectedUserInfo.getIsUserActive(), actualUserInfo.getIsUserActive());
        assertEquals(expectedUserInfo.getUserRole(), actualUserInfo.getUserRole());
        assertFalse(actualUserInfo.getIsUserDeleted());
        assertFalse(actualUserInfo.getIsUserLocked());
        assertTrue(actualUserInfo.getIsUserActive());
    }

    @Test
    void shouldThrowUserNameNotFoundException_WhenUsersWithTheUserNameDoesNotExistInDB() {
        lenient().when(userRepository.findByUserName("test_1")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.getUserByUserName(any(String.class)));
    }
}