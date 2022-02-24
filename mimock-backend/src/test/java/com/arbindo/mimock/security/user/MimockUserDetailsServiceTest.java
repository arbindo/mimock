package com.arbindo.mimock.security.user;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class MimockUserDetailsServiceTest {

    @MockBean
    UserRepository userRepository;

    @Autowired
    MimockUserDetailsService userDetailsService;

    @Test
    void shouldReturnStoredUserDetails_WhenUserExists() {
        String username = "admin";

        UserRole userRole = UserRole.builder()
                .roleName("ADMIN")
                .build();

        Optional<User> user = Optional.of(
                User.builder()
                        .id(UUID.randomUUID())
                        .userName(username)
                        .password("$2a$12$xQ6KO0MicjoJcBGBQfE62e7JuoyAB2JOOE578suh0QXLzx091K3Ca")
                        .userRoles(userRole)
                        .isUserBlocked(false)
                        .isUserActive(true)
                        .build()
        );
        User expectedUser = user.get();

        lenient().when(userRepository.findByUserName(username)).thenReturn(user);

        UserDetails actualUserDetails = userDetailsService.loadUserByUsername(username);

        List<String> roleList = actualUserDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        assertEquals(expectedUser.getUserName(), actualUserDetails.getUsername());
        assertEquals(expectedUser.getPassword(), actualUserDetails.getPassword());
        assertEquals("ROLE_ADMIN", roleList.get(0));
        assertTrue(actualUserDetails.isAccountNonExpired());
        assertTrue(actualUserDetails.isAccountNonLocked());
        assertTrue(actualUserDetails.isCredentialsNonExpired());
        assertTrue(actualUserDetails.isEnabled());
    }

    @Test
    void shouldThrowUsernameNotFoundException_WhenUserDoesNotExist() {
        String username = "admin";

        lenient().when(userRepository.findByUserName(username)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userDetailsService.loadUserByUsername(username));
    }

}