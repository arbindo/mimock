package com.arbindo.mimock.managemocks;


import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.managemocks.models.v1.CreateMockRequest;

import java.util.List;

public interface MockManagementService {
    List<Mock> getMocks();
    Mock getMockById(String mockId);
    boolean deleteMockById(String mockId);
    Mock createMock(CreateMockRequest request);
    Mock updateMock(String mockId, CreateMockRequest request);
}
