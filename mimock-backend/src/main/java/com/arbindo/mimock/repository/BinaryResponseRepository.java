package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.BinaryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BinaryResponseRepository extends JpaRepository<BinaryResponse, Long> {
}
