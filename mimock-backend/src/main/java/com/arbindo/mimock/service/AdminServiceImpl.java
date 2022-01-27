package com.arbindo.mimock.service;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.ResponseContentTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    HttpMethodsRepository httpMethodsRepository;

    @Autowired
    ResponseContentTypesRepository responseContentTypesRepository;

    @Override
    public List<HttpMethod> listAllSupportedHttpMethods() {
        return httpMethodsRepository.findAll();
    }

    @Override
    public List<ResponseContentType> listAllSupportedResponseContentTypes() {
        return responseContentTypesRepository.findAll();
    }
}
