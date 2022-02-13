package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.RequestBodiesForMock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestBodiesForMockRepository extends JpaRepository<RequestBodiesForMock, Long> {
}
