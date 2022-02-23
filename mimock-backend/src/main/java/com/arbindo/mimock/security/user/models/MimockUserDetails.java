package com.arbindo.mimock.security.user.models;

import com.arbindo.mimock.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class MimockUserDetails implements UserDetails {
    private final String userName;
    private final String password;
    private final List<GrantedAuthority> userRole;
    private final Boolean isActive;
    private final Boolean isUserLocked;

    public MimockUserDetails(User user) {
        List<GrantedAuthority> userRole = new ArrayList<>();
        userRole.add(new SimpleGrantedAuthority("ROLE_" + user.getUserRoles().getRoleName()));

        this.userRole = userRole;
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.isActive = user.getIsUserActive();
        this.isUserLocked = user.getIsUserBlocked();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userRole;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isUserLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !isUserLocked && isActive;
    }
}
