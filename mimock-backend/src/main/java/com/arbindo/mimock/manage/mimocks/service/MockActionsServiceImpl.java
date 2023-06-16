package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.common.constants.CacheNames;
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
import org.springframework.cache.annotation.CacheEvict;
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
    private EntityStatusService entityStatusService;


    @Transactional
    @Override
    @CacheEvict(value = CacheNames.MOCK_REQUEST_CACHE, allEntries = true)
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
                            EntityStatus entityStatus = entityStatusService.getArchivedMockEntityStatus();
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
                        EntityStatus entityStatus = entityStatusService.getDefaultMockEntityStatus();
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

}
