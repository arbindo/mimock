package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.EntityStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntityStatusRepository extends JpaRepository<EntityStatus, Long> {

    EntityStatus findByStatus(String status);

}
