package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class DeleteUserServiceTest {
    @Autowired
    DeleteUserService deleteUserService;

    @MockBean
    UserRepository mockUserRepository;

    @Test
    void shouldDeleteUser_WhenUserIsPresent() {
        String userName = "test_user";

        User user = User.builder()
                .id(UUID.randomUUID())
                .userName(userName)
                .password("$2a$12$AnCFHRMd8.UlVlKUZxVpXeuBRaBd1G3LGJ1GTbQxBxTulzm0NpVmq")
                .build();

        lenient().when(mockUserRepository.findByUserName(userName)).thenReturn(Optional.of(user));

        assertDoesNotThrow(() -> deleteUserService.deleteUser(userName));
    }

    @Test
    void shouldThrowUsernameNotFoundException_WhenUserIsNotPresent() {
        String userName = "test_user";

        lenient().when(mockUserRepository.findByUserName(userName)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> deleteUserService.deleteUser(userName));
    }
}