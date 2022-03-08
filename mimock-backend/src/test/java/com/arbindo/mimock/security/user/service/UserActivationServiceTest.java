package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.user.models.request.UserActivationRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class UserActivationServiceTest {
    @Autowired
    UserActivationService service;

    @MockBean
    UserRepository mockRepository;

    @Test
    void shouldSetActivationStatus_WhenUserIsPresent() {
        UserActivationRequest request = UserActivationRequest.builder()
                .isUserActive(Boolean.TRUE)
                .userName("mimock_admin")
                .build();

        User user = User.builder().userName(request.getUserName()).isUserActive(Boolean.FALSE).build();

        lenient().when(mockRepository.findByUserName(request.getUserName())).thenReturn(Optional.of(user));
        user.setIsUserActive(request.getIsUserActive());

        lenient().when(mockRepository.save(any())).thenReturn(user);

        User updatedUser = service.updateUserActivationStatus(request);

        assertTrue(updatedUser.getIsUserActive());
    }

    @Test
    void shouldThrowUsernameNotFoundException_WhenUserIsAbsent() {
        UserActivationRequest request = UserActivationRequest.builder()
                .isUserActive(Boolean.TRUE)
                .userName("mimock_admin")
                .build();

        lenient().when(mockRepository.findByUserName(request.getUserName())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> service.updateUserActivationStatus(request));
    }
}