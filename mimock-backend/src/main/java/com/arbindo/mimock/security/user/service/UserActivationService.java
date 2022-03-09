package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.common.constants.Errors;
import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.user.models.request.UserActivationRequest;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
public class UserActivationService {
    @Autowired
    UserRepository userRepository;

    public User updateUserActivationStatus(UserActivationRequest userActivationRequest) {
        Optional<User> userFromDB = userRepository.findByUserName(userActivationRequest.getUserName());
        if (userFromDB.isEmpty()) {
            log.log(Level.ERROR, Errors.USERNAME_NOT_FOUND_ERROR);
            throw new UsernameNotFoundException(Errors.USERNAME_NOT_FOUND_ERROR);
        }

        User user = userFromDB.get();
        user.setIsUserActive(userActivationRequest.getIsUserActive());

        User updatedUser = userRepository.save(user);
        log.log(Level.INFO, "User activation status has been updated to - {}", updatedUser.getIsUserActive());
        return updatedUser;
    }
}
