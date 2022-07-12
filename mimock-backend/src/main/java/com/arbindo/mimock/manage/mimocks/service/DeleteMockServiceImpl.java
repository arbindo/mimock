package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.common.services.EntityStatusService;
import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.repository.MocksRepository;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class DeleteMockServiceImpl implements DeleteMockService {

    @Autowired
    private MocksRepository mocksRepository;

    @Autowired
    private EntityStatusService entityStatusService;

    @Autowired
    private MockManagementService mockManagementService;

    @Override
    public boolean hardDeleteMockById(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = mockManagementService.getMockById(mockId);
                if (mock != null) {
                    mocksRepository.delete(mock);
                    return true;
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
                return false;
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return false;
    }

    @Transactional
    @Override
    public boolean softDeleteMockById(String mockId) {
        if (ValidationUtil.isNotNullOrEmpty(mockId)) {
            try {
                Mock mock = mockManagementService.getMockById(mockId);
                if (mock != null) {
                    // Perform only soft delete i.e. Mark EntityStatus as DELETED
                    EntityStatus entityStatus = entityStatusService.getDeletedMockEntityStatus();
                    mock.setEntityStatus(entityStatus);
                    mock.setDeletedAt(ZonedDateTime.now());
                    mocksRepository.save(mock);
                    return true;
                }
            } catch (Exception e) {
                log.log(Level.DEBUG, e.getMessage());
                return false;
            }
        }
        log.log(Level.DEBUG, "Invalid Mock Id!");
        return false;
    }

    @Override
    public boolean deleteAllMocks() {
        try {
            mocksRepository.deleteAll();
            return true;
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
        }
        log.log(Level.DEBUG, "Unable to delete all mocks!");
        return false;
    }

    @Override
    public void flushDeletedMocks() {
        try {
            EntityStatus entityStatus = entityStatusService.getDeletedMockEntityStatus();
            ZonedDateTime thirtyDaysAgo = ZonedDateTime.now().minusDays(30);
            List<Mock> deletedMocks = mocksRepository.findAllByEntityStatusAndDeletedAt(entityStatus, thirtyDaysAgo);
            mocksRepository.deleteAll(deletedMocks);
            log.log(Level.INFO, "Flushed " + deletedMocks.size() + " mock(s)!");
            return;
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
        }
        log.log(Level.DEBUG, "Unable to flush deleted mocks!");
    }
}
