package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.RequestBodiesForMock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Map;
import java.util.Optional;

public interface RequestBodiesForMockRepository extends JpaRepository<RequestBodiesForMock, Long> {
    Optional<RequestBodiesForMock> findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(Map<String, Object> requestBody);
}
