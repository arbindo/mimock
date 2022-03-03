package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.constants.Role;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.repository.UserRoleRepository;
import com.arbindo.mimock.security.exceptions.AddNewUserFailedException;
import com.arbindo.mimock.security.exceptions.UserAlreadyExistsException;
import com.arbindo.mimock.security.user.models.AddUserRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class AddUserServiceTest {

    @Autowired
    AddUserService userService;

    @MockBean
    UserRoleRepository mockUserRoleRepository;

    @MockBean
    UserRepository mockUserRepository;

    @Test
    void shouldSaveNewUser() {
        UserRole userRole = UserRole.builder()
                .id(1L)
                .roleName("ADMIN")
                .build();

        User user = User.builder()
                .name("test")
                .userName("admin")
                .password("$2a$12$efMhY99Z5Y6FkjcJnoJ8jugS7G5RdrQJ5POMN1uTfrujailC/cIH6")
                .userRoles(userRole)
                .isUserActive(false)
                .isUserBlocked(false)
                .build();

        AddUserRequest addUserRequest = AddUserRequest.builder()
                .name(user.getName())
                .userName(user.getUserName())
                .password(user.getPassword())
                .userRole(Role.ADMIN.toString())
                .build();

        lenient().when(mockUserRoleRepository.findByRoleName("ADMIN")).thenReturn(userRole);
        lenient().when(mockUserRepository.findByUserName(any())).thenReturn(Optional.empty());
        lenient().when(mockUserRepository.save(any())).thenReturn(user);

        User savedUser = userService.addNewUser(addUserRequest);

        assertNotNull(savedUser);

        assertEquals(user.getUserName(), savedUser.getUserName());
        assertEquals(user.getName(), savedUser.getName());
        assertEquals(user.getPassword(), savedUser.getPassword());
    }

    @Test
    void shouldThrowException_WhenUserAlreadyExists() {
        UserRole userRole = UserRole.builder()
                .id(1L)
                .roleName("ADMIN")
                .build();

        User user = User.builder()
                .id(UUID.randomUUID())
                .name("test")
                .userName("admin")
                .password("$2a$12$efMhY99Z5Y6FkjcJnoJ8jugS7G5RdrQJ5POMN1uTfrujailC/cIH6")
                .userRoles(userRole)
                .isUserActive(false)
                .isUserBlocked(false)
                .build();

        AddUserRequest addUserRequest = AddUserRequest.builder()
                .name(user.getName())
                .userName(user.getUserName())
                .password(user.getPassword())
                .userRole(Role.ADMIN.toString())
                .build();

        lenient().when(mockUserRoleRepository.findByRoleName("ADMIN")).thenReturn(userRole);
        lenient().when(mockUserRepository.findByUserName(any())).thenReturn(Optional.of(user));
        lenient().when(mockUserRepository.save(any())).thenThrow(new IllegalArgumentException());

        assertThrows(UserAlreadyExistsException.class, () -> userService.addNewUser(addUserRequest));
    }

    @Test
    void shouldThrowException_WhenSavingNewUserFails() {
        UserRole userRole = UserRole.builder()
                .id(1L)
                .roleName("ADMIN")
                .build();

        User user = User.builder()
                .name("test")
                .userName("admin")
                .password("$2a$12$efMhY99Z5Y6FkjcJnoJ8jugS7G5RdrQJ5POMN1uTfrujailC/cIH6")
                .userRoles(userRole)
                .isUserActive(false)
                .isUserBlocked(false)
                .build();

        AddUserRequest addUserRequest = AddUserRequest.builder()
                .name(user.getName())
                .userName(user.getUserName())
                .password(user.getPassword())
                .userRole(Role.ADMIN.toString())
                .build();

        lenient().when(mockUserRoleRepository.findByRoleName("ADMIN")).thenReturn(userRole);
        lenient().when(mockUserRepository.findByUserName(any())).thenReturn(Optional.empty());
        lenient().when(mockUserRepository.save(any())).thenThrow(new IllegalArgumentException());

        assertThrows(AddNewUserFailedException.class, () -> userService.addNewUser(addUserRequest));
    }
}