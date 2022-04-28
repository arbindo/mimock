package com.arbindo.mimock.security.user.service;

import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.repository.UserRoleRepository;
import com.arbindo.mimock.security.exceptions.FailedToFetchUserRolesException;
import com.arbindo.mimock.security.user.models.response.UserRolesResponse;
import io.jsonwebtoken.lang.Collections;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class GetUserRolesServiceTest {

    @Autowired
    GetUserRolesService service;

    @MockBean
    UserRoleRepository repository;

    @Test
    void shouldReturnMappedUserRoles_WhenUserRolesArePresentInTheDB() {
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

        List<UserRolesResponse> expectedUserRoles = new ArrayList<>(Collections.arrayToList(
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

        lenient().when(repository.findAllByDeletedAtIsNull()).thenReturn(userRoles);

        List<UserRolesResponse> actualUserRoles = service.getAllUserRoles();

        assertEquals(2, actualUserRoles.size());
        assertEquals(expectedUserRoles.size(), actualUserRoles.size());

        assertEquals(expectedUserRoles.get(0).getRoleName(), actualUserRoles.get(0).getRoleName());
        assertEquals(expectedUserRoles.get(0).getRoleDescription(), actualUserRoles.get(0).getRoleDescription());

        assertEquals(expectedUserRoles.get(1).getRoleName(), actualUserRoles.get(1).getRoleName());
        assertEquals(expectedUserRoles.get(1).getRoleDescription(), actualUserRoles.get(1).getRoleDescription());
    }

    @Test
    void shouldThrowFailedToFetchUserRolesException_WhenDBReturnsEmptyUserRoles() {
        lenient().when(repository.findAllByDeletedAtIsNull()).thenReturn(new ArrayList<>());

        assertThrows(FailedToFetchUserRolesException.class, () -> service.getAllUserRoles());
    }
}