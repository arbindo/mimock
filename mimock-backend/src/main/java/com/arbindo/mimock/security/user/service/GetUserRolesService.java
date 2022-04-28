package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRoleRepository;
import com.arbindo.mimock.security.exceptions.FailedToFetchUserRolesException;
import com.arbindo.mimock.security.user.mapper.UserRoleMapper;
import com.arbindo.mimock.security.user.models.response.UserRolesResponse;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
@Log4j2
public class GetUserRolesService {
    final UserRoleRepository repository;
    final UserRoleMapper mapper;

    public GetUserRolesService(UserRoleRepository repository, UserRoleMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<UserRolesResponse> getAllUserRoles() {
        log.log(Level.DEBUG, "Fetching all user roles from the Database");

        List<UserRole> userRoles = repository.findAllByDeletedAtIsNull();

        if (CollectionUtils.isEmpty(userRoles)) {
            String errorMessage = "Could not fetch user roles from the Database";
            log.log(Level.ERROR, errorMessage);
            throw new FailedToFetchUserRolesException(errorMessage);
        }

        log.log(Level.DEBUG, "Returning mapped users roles");
        return mapper.mapUserRoleResponse(userRoles);
    }
}
