package com.arbindo.mimock.security;

import com.arbindo.mimock.security.exceptions.UserNotPermittedException;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
@Log4j2
public class UserPermissionValidator {
    public void isUserAllowedToPerformAction(String userName) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String currentRole = getCurrentRole();

        log.log(Level.INFO, "Validating if user {} is allowed to perform action", userName);
        
        if (currentRole != null && currentRole.equals("ROLE_ADMIN")) {
            log.log(Level.INFO, "User is an ADMIN user and allowed to perform all actions");
            return;
        }

        String currentUserName = getCurrentUserName(principal);
        if (!currentUserName.equals(userName)) {
            log.log(Level.ERROR, "User {} is not permitted to perform the action for current user {}", userName, currentUserName);
            throw new UserNotPermittedException("User is not permitted to perform action");
        }
    }

    private String getCurrentRole() {
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        Optional<? extends GrantedAuthority> authority = authorities.stream().findFirst();
        String currentRole = null;
        if (authority.isPresent()) {
            currentRole = authority.get().toString();
        }
        return currentRole;
    }

    private String getCurrentUserName(Object principal) {
        String currentUser;
        if (principal instanceof UserDetails) {
            currentUser = ((UserDetails) principal).getUsername();
        } else {
            currentUser = principal.toString();
        }

        return currentUser;
    }
}
