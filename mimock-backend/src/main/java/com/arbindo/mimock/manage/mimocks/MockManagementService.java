package com.arbindo.mimock.manage.mimocks;


import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;

import java.util.List;

public interface MockManagementService {
    List<Mock> getMocks();
    Mock getMockById(String mockId);
    boolean hardDeleteMockById(String mockId);
    boolean softDeleteMockById(String mockId);
    boolean deleteAllMocks();
    Mock createMock(MockRequest request);
    Mock updateMock(String mockId, MockRequest request);
}
