package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.RequestBodyType;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.RequestBodyTypeRepository;
import com.arbindo.mimock.repository.ResponseContentTypesRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;

/**
 * <b>CachedStaticDataSupplier</b> stores the static data fetched from the Database in-memory.
 * The caching happens during application startup and the static data handled by this module never changes
 * in the database.
 * <p>
 * The getter methods are used to fetch the data from the map.
 * If the map has no value for the key, then the actual JPA repository
 * is invoked to fetch the data from the DB.
 */
@Log4j2
@Configuration
public class CachedStaticDataSupplier {
    RequestBodyTypeRepository requestBodyTypeRepository;
    HttpMethodsRepository httpMethodsRepository;
    ResponseContentTypesRepository responseContentTypesRepository;

    HashMap<String, RequestBodyType> requestBodyTypeMap;
    HashMap<String, HttpMethod> httpMethodMap;
    HashMap<String, ResponseContentType> responseContentTypeMap;

    public CachedStaticDataSupplier(RequestBodyTypeRepository requestBodyTypeRepository,
                                    HttpMethodsRepository httpMethodsRepository,
                                    ResponseContentTypesRepository responseContentTypesRepository) {
        this.requestBodyTypeMap = new HashMap<>();
        this.httpMethodMap = new HashMap<>();
        this.responseContentTypeMap = new HashMap<>();

        this.requestBodyTypeRepository = requestBodyTypeRepository;
        this.httpMethodsRepository = httpMethodsRepository;
        this.responseContentTypesRepository = responseContentTypesRepository;
    }

    public RequestBodyType getRequestBodyTypeFor(String type) {
        RequestBodyType requestBodyType = requestBodyTypeMap.get(type);
        if (requestBodyType == null) {
            return requestBodyTypeRepository.findOneByRequestBodyType(type);
        }

        return requestBodyType;
    }

    public HttpMethod getHttpMethodFor(String method) {
        HttpMethod httpMethod = httpMethodMap.get(method);
        if (httpMethod == null) {
            return httpMethodsRepository.findByMethod(method);
        }

        return httpMethod;
    }

    public ResponseContentType getResponseContentTypeFor(String contentType) {
        ResponseContentType responseContentType = responseContentTypeMap.get(contentType);
        if (responseContentType == null) {
            return responseContentTypesRepository.findByContentType(contentType);
        }
        
        return responseContentType;
    }

    @Bean
    public void loadRequestBodyType() {
        List<RequestBodyType> requestBodyTypes = requestBodyTypeRepository.findAll();
        requestBodyTypes.forEach(i -> {
            requestBodyTypeMap.put(i.getRequestBodyType(), i);
        });
    }

    @Bean
    public void loadHttpMethods() {
        List<HttpMethod> httpMethods = httpMethodsRepository.findAll();
        httpMethods.forEach(i -> {
            httpMethodMap.put(i.getMethod(), i);
        });
    }

    @Bean
    public void loadResponseContentTypes() {
        List<ResponseContentType> responseContentTypes = responseContentTypesRepository.findAll();
        responseContentTypes.forEach(i -> {
            responseContentTypeMap.put(i.getContentType(), i);
        });
    }
}
