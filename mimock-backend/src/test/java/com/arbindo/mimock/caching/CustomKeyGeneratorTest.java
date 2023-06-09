package com.arbindo.mimock.caching;

import com.arbindo.mimock.generic.GenericRequestModel;
import org.junit.jupiter.api.Test;
import org.springframework.cache.interceptor.KeyGenerator;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class CustomKeyGeneratorTest {
    @Test
    public void shouldGenerateCustomKeyFromRequest() throws NoSuchMethodException {
        GenericRequestModel request = GenericRequestModel.builder()
                .route("/test")
                .httpMethod("GET")
                .queryParam("version=1.0")
                .requestBody(Map.of("key", "value"))
                .requestHeaders(Map.of("Content-Type", "application/json"))
                .build();

        KeyGenerator customKeyGenerator = new CustomKeyGenerator();
        Object key = customKeyGenerator.generate(this,
                this.getClass().getMethod("shouldGenerateCustomKeyFromRequest"),
                request);

        assertNotNull(key);
        assertEquals(1493827934, key);
    }
}
