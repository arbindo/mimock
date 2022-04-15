package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.repository.UserRoleRepository;
import com.arbindo.mimock.security.user.models.request.UpdateUserRoleRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class UpdateUserRoleServiceTest {
    @Autowired
    UpdateUserRoleService service;

    @MockBean
    UserRoleRepository mockUserRoleRepository;

    @MockBean
    UserRepository mockUserRepository;

    @Test
    void shouldUpdateUserRole_WhenUserExists() {
        UpdateUserRoleRequest request = UpdateUserRoleRequest.builder()
                .userName("bruce_vengeance")
                .userRole("MANAGER")
                .build();

        UserRole userRole = UserRole.builder()
                .roleName("ADMIN")
                .build();

        User user = User.builder()
                .userName(request.getUserName())
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .build();

        User userAfterUpdatingRole = User.builder()
                .userName(request.getUserName())
                .userRoles(UserRole.builder().roleName("MANAGER").build())
                .isUserBlocked(false)
                .isUserActive(true)
                .build();

        lenient().when(mockUserRoleRepository.findByRoleName(request.getUserRole())).thenReturn(userRole);
        lenient().when(mockUserRepository.findByUserName(request.getUserName())).thenReturn(Optional.of(user));
        lenient().when(mockUserRepository.save(any())).thenReturn(userAfterUpdatingRole);

        User updatedUser = service.updateUserRole(request);

        assertEquals("MANAGER", updatedUser.getUserRoles().getRoleName());
    }

    @Test
    void shouldThrowUsernameNotFoundException_WhenUserDoesNotExist() {
        UpdateUserRoleRequest request = UpdateUserRoleRequest.builder()
                .userName("bruce_vengeance")
                .userRole("MANAGER")
                .build();

        lenient().when(mockUserRepository.findByUserName(request.getUserName())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> service.updateUserRole(request));
    }

    @Test
    void shouldThrowIllegalArgumentException_WhenUserRoleIsInvalid() {
        UpdateUserRoleRequest request = UpdateUserRoleRequest.builder()
                .userName("bruce_vengeance")
                .userRole("MANAGER")
                .build();

        UserRole userRole = UserRole.builder()
                .roleName("ADMIN")
                .build();

        User user = User.builder()
                .userName(request.getUserName())
                .userRoles(userRole)
                .isUserBlocked(false)
                .isUserActive(true)
                .build();

        lenient().when(mockUserRepository.findByUserName(request.getUserName())).thenReturn(Optional.of(user));
        lenient().when(mockUserRoleRepository.findByRoleName(request.getUserRole())).thenReturn(null);

        assertThrows(IllegalArgumentException.class, () -> service.updateUserRole(request));
    }
}