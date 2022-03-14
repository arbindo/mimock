package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.utils.JWTUtils;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
public class ValidateAuthTokenService {
    @Autowired
    JWTUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    public Boolean isTokenValid(String authToken) {
        try {
            String username = jwtUtils.extractUsername(authToken);
            Optional<User> user = userRepository.findByUserName(username);
            if (user.isEmpty()) {
                log.log(Level.ERROR, "Auth token is invalid");
                return Boolean.FALSE;
            }
            log.log(Level.INFO, "Auth token is valid");
            return Boolean.TRUE;
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            return Boolean.FALSE;
        }
    }
}
