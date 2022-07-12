package com.arbindo.mimock.manage.mimocks.service;

public interface DeleteMockService {

    boolean hardDeleteMockById(String mockId);

    boolean softDeleteMockById(String mockId);

    boolean deleteAllMocks();

    void flushDeletedMocks();
}
