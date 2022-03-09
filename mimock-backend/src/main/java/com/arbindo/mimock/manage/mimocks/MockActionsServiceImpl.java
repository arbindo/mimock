package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.v1.Status;
import com.arbindo.mimock.repository.*;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class MockActionsServiceImpl implements MockActionsService {

    @Autowired
    private MockManagementService mockManagementService;

    @Autowired
    private MocksRepository mocksRepository;

    @Autowired
    private EntityStatusRepository entityStatusRepository;


    @Transactional
    @Override
    public Mock archiveMock(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = mockManagementService.getMockById(mockId);
                if (mock != null) {
                    if (mock.isArchived()) {
                        return mock;
                    } else {
                        // Archive the mock i.e. Mark EntityStatus as ARCHIVED
                        if (mock.canEditMock()) {
                            EntityStatus entityStatus = getArchivedMockEntityStatus();
                            mock.setEntityStatus(entityStatus);
                            mock.setUpdatedAt(ZonedDateTime.now());
                            return mocksRepository.save(mock);
                        }
                    }
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return null;
    }

    @Transactional
    @Override
    public Mock unarchiveMock(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = mockManagementService.getMockById(mockId);
                if (mock != null) {
                    // Idempotent behaviour - Unarchive the mock i.e. Mark EntityStatus as NONE
                    if (mock.canEditMock()) {
                        EntityStatus entityStatus = getDefaultMockEntityStatus();
                        mock.setEntityStatus(entityStatus);
                        mock.setUpdatedAt(ZonedDateTime.now());
                        return mocksRepository.save(mock);
                    }
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return null;
    }

    private EntityStatus getDefaultMockEntityStatus() {
        return findByEntityStatus(Status.NONE.name());
    }

    private EntityStatus getDeletedMockEntityStatus() {
        return findByEntityStatus(Status.DELETED.name());
    }

    private EntityStatus getArchivedMockEntityStatus() {
        return findByEntityStatus(Status.ARCHIVED.name());
    }

    private EntityStatus findByEntityStatus(String status) {
        return entityStatusRepository.findByStatus(status);
    }
}
