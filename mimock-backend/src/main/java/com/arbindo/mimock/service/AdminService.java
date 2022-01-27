package com.arbindo.mimock.service;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;

import java.util.List;

public interface AdminService {

    List<HttpMethod> listAllSupportedHttpMethods();

    List<ResponseContentType> listAllSupportedResponseContentTypes();
}
