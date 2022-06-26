package com.arbindo.mimock.security;

import com.arbindo.mimock.security.exceptions.UserNotPermittedException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.MockedStatic;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.mockito.Mockito.mockStatic;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserPermissionValidatorTest {
    private static UserPermissionValidator userPermissionValidator;

    @BeforeAll
    static void setUserPermissionValidator() {
        userPermissionValidator = new UserPermissionValidator();
    }

    static class SecurityContextForAdminStub implements SecurityContext {
        @Override
        public Authentication getAuthentication() {
            return new AuthenticationForAdminStub();
        }

        @Override
        public void setAuthentication(Authentication authentication) {
        }
    }

    static class AuthenticationForAdminStub implements Authentication {
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            List<GrantedAuthority> authorityList = new ArrayList<>();
            authorityList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

            return authorityList;
        }

        @Override
        public Object getCredentials() {
            return null;
        }

        @Override
        public Object getDetails() {
            return null;
        }

        @Override
        public Object getPrincipal() {
            return "test_user";
        }

        @Override
        public boolean isAuthenticated() {
            return false;
        }

        @Override
        public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        }

        @Override
        public String getName() {
            return null;
        }
    }

    static class SecurityContextForNonAdminStub implements SecurityContext {
        @Override
        public Authentication getAuthentication() {
            return new AuthenticationForNonAdminStub();
        }

        @Override
        public void setAuthentication(Authentication authentication) {
        }
    }

    static class UserDetailsStub implements UserDetails {
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
        }

        @Override
        public String getPassword() {
            return null;
        }

        @Override
        public String getUsername() {
            return "admin_user";
        }

        @Override
        public boolean isAccountNonExpired() {
            return false;
        }

        @Override
        public boolean isAccountNonLocked() {
            return false;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return false;
        }

        @Override
        public boolean isEnabled() {
            return false;
        }
    }

    static class AuthenticationForNonAdminStub implements Authentication {
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            List<GrantedAuthority> authorityList = new ArrayList<>();
            authorityList.add(new SimpleGrantedAuthority("ROLE_MANAGER"));

            return authorityList;
        }

        @Override
        public Object getCredentials() {
            return null;
        }

        @Override
        public Object getDetails() {
            return null;
        }

        @Override
        public Object getPrincipal() {
            return new UserDetailsStub();
        }

        @Override
        public boolean isAuthenticated() {
            return false;
        }

        @Override
        public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        }

        @Override
        public String getName() {
            return null;
        }
    }

    @Test
    void shouldValidateIfUserIsAllowedToPerformAction() {
        String userName = "test_user";

        MockedStatic<SecurityContextHolder> mockedSecurityContext = mockStatic(SecurityContextHolder.class);
        SecurityContextForAdminStub securityContextForAdminStub = new SecurityContextForAdminStub();
        mockedSecurityContext.when(SecurityContextHolder::getContext).thenReturn(securityContextForAdminStub);

        Assertions.assertDoesNotThrow(() -> userPermissionValidator.isUserAllowedToPerformAction(userName));

        mockedSecurityContext.close();
    }

    @Test
    void shouldThrowUserNotPermittedException_WhenUserIsNotPermitted() {
        String userName = "new_user";

        MockedStatic<SecurityContextHolder> mockedSecurityContext = mockStatic(SecurityContextHolder.class);
        SecurityContextForNonAdminStub securityContextForNonAdminStub = new SecurityContextForNonAdminStub();
        mockedSecurityContext.when(SecurityContextHolder::getContext).thenReturn(securityContextForNonAdminStub);


        Assertions.assertThrows(UserNotPermittedException.class, () -> userPermissionValidator.isUserAllowedToPerformAction(userName));

        mockedSecurityContext.close();
    }
}