package com.arbindo.mimock.caching;

import com.arbindo.mimock.generic.GenericRequestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.interceptor.KeyGenerator;

import java.lang.reflect.Method;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.cache.interceptor.SimpleKeyGenerator.generateKey;


@Slf4j
public class CustomKeyGenerator implements KeyGenerator {
    @Override
    public Object generate(Object target, Method method, Object... params) {
        log.info("Generating key for cache");

        GenericRequestModel request = (GenericRequestModel) params[0];
        List<String> headers = request.getRequestHeaders().entrySet().stream()
                .map(e -> e.getKey() + e.getValue())
                .collect(Collectors.toList());

        Object key = generateKey(request.getRoute(),
                request.getHttpMethod(),
                request.getQueryParam(),
                request.getRequestBody(),
                headers);

        int hashedKey = key.hashCode();

        log.info("Generated cache key: " + hashedKey);
        return hashedKey;
    }
}
