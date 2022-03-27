package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.RequestHeader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Map;
import java.util.Optional;

public interface RequestHeadersRepository extends JpaRepository<RequestHeader, Long> {
    Optional<RequestHeader> findRequestHeaderByRequestHeaderAndDeletedAtIsNull(Map<String, Object> requestHeader);
}
