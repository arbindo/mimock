package com.arbindo.mimock.security.user.mapper;

import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.security.user.models.response.UserRolesResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserRoleMapper {
    public List<UserRolesResponse> mapUserRoleResponse(List<UserRole> userRoles) {
        List<UserRolesResponse> mappedRoles = new ArrayList<>();

        userRoles.forEach(role -> mappedRoles.add(
                UserRolesResponse.builder()
                        .roleName(role.getRoleName())
                        .roleDescription(role.getRoleDescription())
                        .build()
        ));

        return mappedRoles;
    }
}
