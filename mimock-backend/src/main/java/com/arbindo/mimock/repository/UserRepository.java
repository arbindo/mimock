package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUserName(String userName);

    List<User> findAllByDeletedAtIsNullOrderByName();

    Optional<User> findUserById(UUID userId);

    Optional<User> findUserByUserName(String userName);
}
