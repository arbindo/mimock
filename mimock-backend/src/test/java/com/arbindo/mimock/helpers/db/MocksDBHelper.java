package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface MocksDBHelper extends CrudRepository<Mock, UUID> {
    Page<Mock> findAllByEntityStatus(EntityStatus entityStatus, Pageable pageable);
    List<Mock> findAllByEntityStatusAndDeletedAt(EntityStatus entityStatus, ZonedDateTime deletedAt);
}
