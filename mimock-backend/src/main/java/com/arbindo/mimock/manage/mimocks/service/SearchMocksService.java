package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchMocksService {

    Page<Mock> searchMocks(Pageable pageable, String searchColumnString, String searchQuery);
}
