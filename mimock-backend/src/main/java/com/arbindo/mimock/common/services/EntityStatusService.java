package com.arbindo.mimock.common.services;

import com.arbindo.mimock.entities.EntityStatus;

public interface EntityStatusService {

    EntityStatus getDefaultMockEntityStatus();
    EntityStatus getDeletedMockEntityStatus();
    EntityStatus getArchivedMockEntityStatus();
    EntityStatus findByEntityStatus(String status);

}
