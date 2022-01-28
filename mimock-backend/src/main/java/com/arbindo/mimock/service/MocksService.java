package com.arbindo.mimock.service;


import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.models.v1.CreateMockRequest;

import java.util.List;

public interface MocksService {

    List<Mock> getMocks();
    Mock getMockById(String mockId);
    boolean deleteMockById(String mockId);
    Mock createMock(CreateMockRequest request);
}
