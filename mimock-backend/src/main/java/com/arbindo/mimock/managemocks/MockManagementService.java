package com.arbindo.mimock.managemocks;


import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.managemocks.models.v1.MockRequest;

import java.util.List;

public interface MockManagementService {
    List<Mock> getMocks();
    Mock getMockById(String mockId);
    boolean deleteMockById(String mockId);
    Mock createMock(MockRequest request);
    Mock updateMock(String mockId, MockRequest request);
}
