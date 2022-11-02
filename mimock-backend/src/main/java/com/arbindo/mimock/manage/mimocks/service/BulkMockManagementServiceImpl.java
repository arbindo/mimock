package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.mimocks.service.exceptions.MockAlreadyExistsException;
import com.arbindo.mimock.repository.MocksRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class BulkMockManagementServiceImpl implements BulkMockManagementService {

    @Autowired
    private MockManagementService mockManagementService;

    @Autowired
    private MocksRepository mocksRepository;

    @Transactional(rollbackOn = {Exception.class, RuntimeException.class, MockAlreadyExistsException.class})
    @Override
    public List<Mock> bulkCreateMocks(List<ProcessedMockRequest> processedMockRequestList) {
        return processedMockRequestList.stream().map((mockRequest) ->
                mockManagementService.createMock(mockRequest))
                .collect(Collectors.toList());
    }

    @Transactional(rollbackOn = {Exception.class, RuntimeException.class, MockAlreadyExistsException.class})
    @Override
    public List<Mock> bulkUpdateMocks(HashMap<String, ProcessedMockRequest> processedMockRequestList) {
        return null;
    }

    @Transactional(rollbackOn = {Exception.class, RuntimeException.class, MockAlreadyExistsException.class})
    @Override
    public List<Mock> saveAllMocks(List<Mock> mocks) {
        log.log(Level.INFO, "Saving all new mocks to repository. Total saved = " + mocks.size());
        return mocksRepository.saveAll(mocks);
    }
}
