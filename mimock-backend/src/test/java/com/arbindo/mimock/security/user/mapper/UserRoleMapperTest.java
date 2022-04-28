package com.arbindo.mimock.security.user.mapper;

import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.security.user.models.response.UserRolesResponse;
import io.jsonwebtoken.lang.Collections;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class UserRoleMapperTest {

    @Autowired
    private UserRoleMapper userRoleMapper;

    @Test
    void shouldMapUserRolesListToUserRolesResponseList() {
        List<UserRole> userRoles = new ArrayList<>(Collections.arrayToList(
                new UserRole[]{
                        UserRole.builder()
                                .id(1L)
                                .roleName("ADMIN")
                                .roleDescription("Admin")
                                .createdAt(ZonedDateTime.now())
                                .updatedAt(ZonedDateTime.now())
                                .build(),
                        UserRole.builder()
                                .id(2L)
                                .roleName("MANAGER")
                                .roleDescription("Manager")
                                .createdAt(ZonedDateTime.now())
                                .updatedAt(ZonedDateTime.now())
                                .build()
                }
        ));

        List<UserRolesResponse> expectedResponse = new ArrayList<>(Collections.arrayToList(
                new UserRolesResponse[]{
                        UserRolesResponse.builder()
                                .roleName("ADMIN")
                                .roleDescription("Admin")
                                .build(),
                        UserRolesResponse.builder()
                                .roleName("MANAGER")
                                .roleDescription("Manager")
                                .build()
                }
        ));


        List<UserRolesResponse> mappedResponse = userRoleMapper.mapUserRoleResponse(userRoles);

        assertEquals(2, mappedResponse.size());
        assertEquals(expectedResponse.size(), mappedResponse.size());

        assertEquals(expectedResponse.get(0).getRoleName(), mappedResponse.get(0).getRoleName());
        assertEquals(expectedResponse.get(0).getRoleDescription(), mappedResponse.get(0).getRoleDescription());

        assertEquals(expectedResponse.get(1).getRoleName(), mappedResponse.get(1).getRoleName());
        assertEquals(expectedResponse.get(1).getRoleDescription(), mappedResponse.get(1).getRoleDescription());
    }
}