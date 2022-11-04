package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.repository.UserRepository;
import com.arbindo.mimock.security.user.mapper.UserResponseMapper;
import com.arbindo.mimock.security.user.models.UserInfo;
import com.arbindo.mimock.security.user.models.Users;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Log4j2
public class GetUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserResponseMapper mapper;

    public Users getAllUsers() {
        log.log(Level.INFO, "Fetching all users from Database");
        List<User> allUsers = userRepository.findAllByDeletedAtIsNullOrderByName();

        if (CollectionUtils.isEmpty(allUsers)) {
            log.log(Level.INFO, "No users currently exist in the Database");
            return null;
        }

        log.log(Level.INFO, "Returning users fetched from DB");
        return mapper.mappedUserResponse(allUsers);
    }

    public UserInfo getUserById(UUID userId) {
        log.log(Level.INFO, "Getting info for user with ID : {}", userId);
        Optional<User> user = userRepository.findUserById(userId);

        if (user.isEmpty()) {
            log.log(Level.ERROR, "User with the ID - {} does not exist", userId);
            throw new UsernameNotFoundException("User does not exist");
        }

        log.log(Level.DEBUG, "Returning info for the user");
        return mapper.mappedUserResponse(user.get());
    }

    public UserInfo getUserByUserName(String userName) {
        log.log(Level.INFO, "Getting info for user with userName : {}", userName);
        Optional<User> user = userRepository.findUserByUserName(userName);

        if (user.isEmpty()) {
            log.log(Level.ERROR, "User with the username - {} does not exist", userName);
            throw new UsernameNotFoundException("User does not exist");
        }

        log.log(Level.DEBUG, "Returning info for the user");
        return mapper.mappedUserResponse(user.get());
    }
}
