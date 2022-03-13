package com.arbindo.mimock.common.services;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.arbindo.mimock.repository.EntityStatusRepository;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class EntityStatusServiceImpl implements EntityStatusService {

    @Autowired
    private EntityStatusRepository entityStatusRepository;

    public EntityStatus getDefaultMockEntityStatus() {
        return findByEntityStatus(Status.NONE.name());
    }

    public EntityStatus getDeletedMockEntityStatus() {
        return findByEntityStatus(Status.DELETED.name());
    }

    public EntityStatus getArchivedMockEntityStatus() {
        return findByEntityStatus(Status.ARCHIVED.name());
    }

    public EntityStatus findByEntityStatus(String status) {
        if (ValidationUtil.isNotNullOrEmpty(status)) {
            return entityStatusRepository.findByStatus(status);
        }
        return null;
    }
}
