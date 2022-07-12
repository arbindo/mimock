package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;

public interface MockManagementService {

    Mock getMockById(String mockId);

    boolean hardDeleteMockById(String mockId);

    boolean softDeleteMockById(String mockId);

    boolean deleteAllMocks();

    void flushDeletedMocks();

    Mock createMock(ProcessedMockRequest request);

    Mock updateMock(String mockId, ProcessedMockRequest request);
}
