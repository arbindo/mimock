package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.ResponseHeader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseHeadersRepository extends JpaRepository<ResponseHeader, Long> {
}
