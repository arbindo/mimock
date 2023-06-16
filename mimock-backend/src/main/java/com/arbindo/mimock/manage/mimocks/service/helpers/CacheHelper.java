package com.arbindo.mimock.manage.mimocks.service.helpers;

import com.arbindo.mimock.caching.CustomKeyGenerator;
import com.arbindo.mimock.common.constants.CacheNames;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.GenericRequestModel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@NoArgsConstructor
public class CacheHelper {
    private CacheManager cacheManager;

    private CustomKeyGenerator customKeyGenerator;

    @Autowired
    public CacheHelper(CacheManager cacheManager, CustomKeyGenerator customKeyGenerator) {
        this.cacheManager = cacheManager;
        this.customKeyGenerator = customKeyGenerator;
    }

    private String getCacheKey(Mock mock) {
        log.info("Generating cache key");
        GenericRequestModel cacheRequest = GenericRequestModel.builder()
                .route(mock.getRoute())
                .httpMethod(mock.getHttpMethod() == null ? null : mock.getHttpMethod().getMethod())
                .requestHeaders(mock.getRequestHeaders() == null ? null : mock.getRequestHeaders().getRequestHeader())
                .requestBody(mock.getRequestBodiesForMock() == null ? null : mock.getRequestBodiesForMock().getRequestBody())
                .build();

        Object cacheKey = customKeyGenerator.generate(this, this.getClass().getMethods()[0], cacheRequest);

        log.info("Returning generated cache key {}", cacheKey);
        return cacheKey.toString();
    }

    public void putInCache(Mock mock) {
        log.info("Putting mock in cache");

        try {
            String cacheKey = getCacheKey(mock);
            Cache cache = cacheManager.getCache(CacheNames.MOCK_REQUEST_CACHE);

            if (cache == null) {
                log.error("Cache is null");
                return;
            }

            log.info("Caching mock with key: {}", cacheKey);
            cache.putIfAbsent(cacheKey, mock.toDomainModelForMock());
        } catch (Exception e) {
            log.error("Error while putting mock in cache", e);
        }

    }
}
