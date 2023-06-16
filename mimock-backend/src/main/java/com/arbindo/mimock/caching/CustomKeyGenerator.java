package com.arbindo.mimock.caching;

import com.arbindo.mimock.generic.GenericRequestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

import static org.springframework.cache.interceptor.SimpleKeyGenerator.generateKey;


@Component
@Slf4j
public class CustomKeyGenerator implements KeyGenerator {
    @Override
    public Object generate(Object target, Method method, Object... params) {
        log.info("Generating key for cache");

        GenericRequestModel request = (GenericRequestModel) params[0];

        Object key = generateKey(request.getRoute(),
                request.getHttpMethod(),
                request.getQueryParam(),
                request.getRequestBody(),
                request.getRequestHeaders());

        int hashedKey = key.hashCode();

        log.info("Generated cache key: " + hashedKey);
        return hashedKey;
    }
}
