package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.utils.JWTUtils;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
class ValidateAuthTokenServiceTest {
    @Autowired
    ValidateAuthTokenService service;

    @MockBean
    JWTUtils mockJwtUtils;

    @MockBean
    UserRepository mockUserRepository;

    @Test
    void shouldReturnTrue_WhenTokenIsValid() {
        String authToken = "eyJpYXQiOiJNb24gTWFyIDE0IDIxOjU1OjA1IElTVCAyMDIyIiwi" +
                "YWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVzZXJSb2xlIjoiUk9" +
                "MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0NzI3NjkwNX0.C2DLrDJNQN" +
                "Fy8BJGcz96buD_YZGKNClTMih4CLuW5MA";

        lenient().when(mockJwtUtils.extractUsername(authToken)).thenReturn("mimock_admin");
        lenient().when(mockUserRepository.findByUserName("mimock_admin")).thenReturn(Optional.of(User.builder().build()));

        Boolean isTokenValid = service.isTokenValid(authToken);

        assertTrue(isTokenValid);
    }

    @Test
    void shouldReturnFalse_WhenTokenIsInValid() {
        String authToken = "eyJpYXQiOiJNb25gTWFyIDE0IDIxOjU1OjA1IElTVCAyMDIyIiwi" +
                "YWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVzZXJSb2xlIjoiUk9" +
                "MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0NzI3NjkwNX0.C2DLrDJNQN" +
                "Fy8BJGcz96buD_YZGKNClTMih4CLuW5MA";

        lenient().when(mockJwtUtils.extractUsername(authToken)).thenThrow(ExpiredJwtException.class);

        Boolean isTokenValid = service.isTokenValid(authToken);

        verify(mockJwtUtils, times(1)).extractUsername(authToken);
        verify(mockUserRepository, times(0)).findByUserName(anyString());

        assertFalse(isTokenValid);
    }

    @Test
    void shouldReturnFalse_WhenUserIsNotPresent() {
        String authToken = "eyJpYXQiOiJNb25gTWFyIDE0IDIxOjU1OjA1IElTVCAyMDIyIiwi" +
                "YWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVzZXJSb2xlIjoiUk9" +
                "MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0NzI3NjkwNX0.C2DLrDJNQN" +
                "Fy8BJGcz96buD_YZGKNClTMih4CLuW5MA";

        lenient().when(mockJwtUtils.extractUsername(authToken)).thenReturn("test_admin");
        lenient().when(mockUserRepository.findByUserName("test_admin")).thenReturn(Optional.empty());

        Boolean isTokenValid = service.isTokenValid(authToken);

        verify(mockJwtUtils, times(1)).extractUsername(authToken);
        verify(mockUserRepository, times(1)).findByUserName("test_admin");

        assertFalse(isTokenValid);
    }
}