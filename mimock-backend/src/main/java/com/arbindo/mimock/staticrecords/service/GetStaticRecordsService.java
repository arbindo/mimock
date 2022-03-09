package com.arbindo.mimock.staticrecords.service;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;

import java.util.List;

public interface GetStaticRecordsService {

    List<HttpMethod> listAllSupportedHttpMethods();

    List<ResponseContentType> listAllSupportedResponseContentTypes();

    List<EntityStatus> listAllSupportedEntityStatus();
}
