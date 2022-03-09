package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.user.models.request.UpdatePasswordRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class UpdatePasswordServiceTest {
    @Autowired
    UpdatePasswordService service;

    @MockBean
    UserRepository mockUserRepository;

    @Test
    void shouldUpdateUserPassword_WhenUserExists() {
        UserRole userRole = UserRole.builder()
                .roleName("ADMIN")
                .build();

        UpdatePasswordRequest request = UpdatePasswordRequest.builder()
                .userName("test_admin")
                .password("$2a$12$AnCFHRMd8.UlVlKUZxVpXeuBRaBd1G3LGJ1GTbQxBxTulzm0NpVmq")
                .build();

        User userBeforeUpdating = User.builder()
                .id(UUID.randomUUID())
                .userName("test_admin")
                .password("$2a$12$xQ6KO0MicjoJcBGBQfE62e7JuoyAB2JOOE578suh0QXLzx091K3Ca")
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .build();

        User userAfterUpdating = User.builder()
                .id(UUID.randomUUID())
                .userName("test_admin")
                .password("$2a$12$AnCFHRMd8.UlVlKUZxVpXeuBRaBd1G3LGJ1GTbQxBxTulzm0NpVmq")
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .build();

        lenient().when(mockUserRepository.findByUserName(request.getUserName())).thenReturn(Optional.of(userBeforeUpdating));
        lenient().when(mockUserRepository.save(any())).thenReturn(userAfterUpdating);

        User updatePassword = service.updatePassword(request);

        assertEquals(userAfterUpdating.getPassword(), updatePassword.getPassword());
    }

    @Test
    void shouldThrowUsernameNotFoundExceptionException_WhenUserDoesNotExists() {
        UpdatePasswordRequest request = UpdatePasswordRequest.builder()
                .userName("test_admin")
                .password("$2a$12$AnCFHRMd8.UlVlKUZxVpXeuBRaBd1G3LGJ1GTbQxBxTulzm0NpVmq")
                .build();

        lenient().when(mockUserRepository.findByUserName(request.getUserName())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> service.updatePassword(request));
    }
}