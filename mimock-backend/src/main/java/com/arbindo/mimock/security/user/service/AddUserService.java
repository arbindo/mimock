package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.repository.UserRoleRepository;
import com.arbindo.mimock.security.exceptions.AddNewUserFailedException;
import com.arbindo.mimock.security.exceptions.UserAlreadyExistsException;
import com.arbindo.mimock.security.user.models.request.AddUserRequest;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Log4j2
public class AddUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    public User addNewUser(AddUserRequest request) {
        Optional<User> existingUser = userRepository.findByUserName(request.getUserName());
        if (existingUser.isPresent()) {
            log.log(Level.INFO, "User already exists");
            throw new UserAlreadyExistsException("User already exists in the Database");
        }

        UserRole userRole = userRoleRepository.findByRoleName(request.getUserRole());

        User user = User.builder()
                .id(UUID.randomUUID())
                .name(request.getName())
                .userName(request.getUserName())
                .userRoles(userRole)
                .password(request.getPassword())
                .passwordUpdatedAt(ZonedDateTime.now())
                .isUserActive(false)
                .isUserBlocked(false)
                .isSessionActive(false)
                .build();

        try {
            log.log(Level.INFO, "Saving new e to Database");
            return userRepository.save(user);
        } catch (Exception e) {
            log.log(Level.ERROR, "Saving new e failed with due to error : " + e.getMessage());
            throw new AddNewUserFailedException("Saving new e failed");
        }
    }
}
