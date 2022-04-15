package com.arbindo.mimock.audit;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AuditServiceTest {

    @org.mockito.Mock
    UserRepository mockUserRepository;

    AuditorService mockAuditorService;

    @BeforeEach
    void setupMock(){
        this.mockAuditorService = AuditorServiceImpl.builder()
                .userRepository(mockUserRepository)
                .build();
    }

    @Test
    public void shouldGetCurrentAuditor_Success(){
        // Arrange
        String username = "TEST_USERNAME";
        String name = "BRUCE_WAYNE";
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getName()).thenReturn(username);
        SecurityContextHolder.setContext(securityContext);
        User user = User.builder()
                .userName(username)
                .name(name)
                .isUserBlocked(false)
                .isUserActive(true)
                .build();
        lenient().when(mockUserRepository.findByUserName(anyString())).thenReturn(Optional.of(user));
        // Act
        String auditor = mockAuditorService.getCurrentAuditor();
        // Assert
        assertEquals(name, auditor);
    }

    @Test
    public void shouldGetCurrentAuditor_ReturnsNullWhenNameDoesNotExists(){
        // Arrange
        String username = "TEST_USERNAME";
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getName()).thenReturn(username);
        SecurityContextHolder.setContext(securityContext);
        User user = User.builder()
                .userName(username)
                .isUserBlocked(false)
                .isUserActive(true)
                .build();
        lenient().when(mockUserRepository.findByUserName(anyString())).thenReturn(Optional.of(user));
        // Act
        String auditor = mockAuditorService.getCurrentAuditor();
        // Assert
        assertNull(auditor);
    }

    @Test
    public void shouldGetCurrentAuditor_ReturnsNullWhenUserDoesNotExists(){
        // Arrange
        String username = "TEST_USERNAME";
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getName()).thenReturn(username);
        SecurityContextHolder.setContext(securityContext);
        lenient().when(mockUserRepository.findByUserName(anyString())).thenReturn(Optional.empty());
        // Act
        String auditor = mockAuditorService.getCurrentAuditor();
        // Assert
        assertNull(auditor);
    }
}
