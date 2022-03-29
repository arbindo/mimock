package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.user.mapper.UserResponseMapper;
import com.arbindo.mimock.security.user.models.Users;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
@Log4j2
public class GetUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserResponseMapper mapper;

    public Users getAllUsers() {
        log.log(Level.INFO, "Fetching all users from Database");
        List<User> allUsers = userRepository.findAllByDeletedAtIsNull();

        if (CollectionUtils.isEmpty(allUsers)) {
            log.log(Level.INFO, "No users currently exist in the Database");
            return null;
        }

        log.log(Level.INFO, "Returning users fetched from DB");
        return mapper.mappedUserResponse(allUsers);
    }
}
