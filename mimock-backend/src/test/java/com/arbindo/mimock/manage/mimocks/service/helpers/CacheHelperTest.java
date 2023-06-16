package com.arbindo.mimock.manage.mimocks.service.helpers;

import com.arbindo.mimock.caching.CustomKeyGenerator;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class CacheHelperTest {
    @MockBean
    CacheManager cacheManager;

    @MockBean
    CustomKeyGenerator customKeyGenerator;

    @Test
    void shouldPutNewItemInCacheWhenCacheIsValid() {
        DomainModelForMock domainModelForMock = DomainModelForMock.builder()
                .route("/mock")
                .build();

        CaffeineCache cache = new CaffeineCache("mockRequestCache", Caffeine.newBuilder().build());
        cache.put("mockKey", domainModelForMock);

        lenient().when(customKeyGenerator.generate(any(), any(), any())).thenReturn("mockKey");
        lenient().when(cacheManager.getCache("mockRequestCache")).thenReturn(cache);

        Mock mock = Mock.builder()
                .route("/mock1")
                .httpMethod(HttpMethod.builder().method("GET").build())
                .build();

        CacheHelper cacheHelper = new CacheHelper(this.cacheManager, this.customKeyGenerator);
        cacheHelper.putInCache(mock);

        DomainModelForMock cacheItem = cache.get("mockKey", DomainModelForMock.class);

        assertNotNull(cacheItem);
        assertEquals("/mock", cacheItem.getRoute());
    }

    @Test
    void shouldNotPutNewItemInCacheWhenCacheIsNull() {
        lenient().when(customKeyGenerator.generate(any(), any(), any())).thenReturn("mockKey");
        lenient().when(cacheManager.getCache("mockRequestCache")).thenReturn(null);

        Mock mock = Mock.builder()
                .route("/mock1")
                .httpMethod(HttpMethod.builder().method("GET").build())
                .build();

        CacheHelper cacheHelper = new CacheHelper(this.cacheManager, this.customKeyGenerator);
        cacheHelper.putInCache(mock);

        CaffeineCache cache = new CaffeineCache("mockRequestCache", Caffeine.newBuilder().build());

        assertNull(cache.get("mockKey", DomainModelForMock.class));
    }
}
