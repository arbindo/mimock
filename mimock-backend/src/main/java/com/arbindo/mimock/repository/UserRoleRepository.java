package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByRoleName(String roleName);

    List<UserRole> findAllByDeletedAtIsNull();
}
