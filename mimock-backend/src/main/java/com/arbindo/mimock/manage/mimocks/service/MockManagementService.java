package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;

public interface MockManagementService {

    Mock getMockById(String mockId);

    Mock createMock(ProcessedMockRequest request);

    Mock updateMock(String mockId, ProcessedMockRequest request);

    Mock saveMock(Mock mock);
}
