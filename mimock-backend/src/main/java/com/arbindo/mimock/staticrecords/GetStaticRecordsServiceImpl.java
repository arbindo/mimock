package com.arbindo.mimock.staticrecords;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.ResponseContentTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetStaticRecordsServiceImpl implements GetStaticRecordsService {
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
