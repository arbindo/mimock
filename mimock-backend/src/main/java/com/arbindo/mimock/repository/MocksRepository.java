package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MocksRepository extends JpaRepository<Mock, UUID> {
    Optional<Mock> findOneByRouteAndHttpMethodAndQueryParams(String route, HttpMethod httpMethod, String queryParams);
}
