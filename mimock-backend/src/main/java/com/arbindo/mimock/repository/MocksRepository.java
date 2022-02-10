package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MocksRepository extends JpaRepository<Mock, UUID> {
    Optional<Mock> findOneByRouteAndHttpMethodAndQueryParams(String route, HttpMethod httpMethod, String queryParams);
    Page<Mock> findAllByEntityStatus(EntityStatus entityStatus, Pageable pageable);
    Optional<Mock> findOneByMockName(String mockName);
}
