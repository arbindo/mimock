package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.RequestHeader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestHeadersRepository extends JpaRepository<RequestHeader, Long> {
}
