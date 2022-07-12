package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ListMocksService {

    List<Mock> getAllMocks();

    Page<Mock> getMocksAsPageable(Pageable pageable, Status status, String httpMethod, String expectedResponseType);
}
