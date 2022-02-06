package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.EntityStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntityStatusDBHelper extends CrudRepository<EntityStatus, Long> {
    EntityStatus findByStatus(String status);
}
