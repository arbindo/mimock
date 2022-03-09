package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.common.constants.Errors;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.repository.UserRoleRepository;
import com.arbindo.mimock.security.user.models.request.UpdateUserRoleRequest;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
public class UpdateUserRoleService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    public User updateUserRole(UpdateUserRoleRequest request) {
        Optional<User> userFromDB = userRepository.findByUserName(request.getUserName());
        if (userFromDB.isEmpty()) {
            log.log(Level.ERROR, Errors.USERNAME_NOT_FOUND_ERROR);
            throw new UsernameNotFoundException(Errors.USERNAME_NOT_FOUND_ERROR);
        }

        UserRole role = userRoleRepository.findByRoleName(request.getUserRole());
        if (role == null) {
            log.log(Level.ERROR, "User role {} is invalid", request.getUserRole());
            throw new IllegalArgumentException("User role is not valid");
        }

        User user = userFromDB.get();
        user.setUserRoles(role);

        log.log(Level.INFO, "Updating user role to {}", request.getUserRole());
        return userRepository.save(user);
    }
}
