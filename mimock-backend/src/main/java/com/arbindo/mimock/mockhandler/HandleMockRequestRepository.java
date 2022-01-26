package com.arbindo.mimock.mockhandler;

import com.arbindo.mimock.mockhandler.entities.HttpMethod;
import com.arbindo.mimock.mockhandler.entities.Mocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HandleMockRequestRepository extends JpaRepository<Mocks, UUID> {
    Mocks findOneByRouteAndHttpMethodAndQueryParams(String route, HttpMethod httpMethod, String queryParams);
}
