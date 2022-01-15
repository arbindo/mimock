package com.arbindo.mimock.service;

import com.arbindo.mimock.repository.GetMocksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetMocksService {
    @Autowired
    GetMocksRepository getMocksRepository;

    public String getMocks(String path, String requestMethod) {
        return getMocksRepository.getMocks(path, requestMethod);
    }
}
