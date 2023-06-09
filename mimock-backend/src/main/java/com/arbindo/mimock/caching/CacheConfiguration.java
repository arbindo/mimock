package com.arbindo.mimock.caching;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfiguration {
    @Value("${spring.cache.caffeine.expiryInMinutes}")
    private String expiryInMinutes = "60";

    @Value("${spring.cache.caffeine.maximumSize}")
    private String maximumSize = "1000";

    @Bean
    public Caffeine caffeineConfig() {
        return Caffeine.
                newBuilder().
                expireAfterAccess(Long.parseLong(expiryInMinutes), TimeUnit.MINUTES).
                maximumSize(Long.parseLong(maximumSize));
    }

    @Bean
    public CacheManager cacheManager(Caffeine caffeine) {
        CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager();
        caffeineCacheManager.setCaffeine(caffeine);
        return caffeineCacheManager;
    }

    @Bean("mockKeyGenerator")
    public KeyGenerator mockKeyGenerator() {
        return new CustomKeyGenerator();
    }
}
