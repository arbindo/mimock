package com.arbindo.mimock.manage.mimocks.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.time.Duration;

import static org.awaitility.Awaitility.await;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class FlushBinCronJobServiceTest {

    @SpyBean
    private FlushBinCronJobService flushBinCronJobService;

    @Test
    public void shouldCallFlushBin(){
        await().atMost(Duration.ofSeconds(4)).untilAsserted(() ->
                verify(flushBinCronJobService, times(1)).flushBin());
    }

    @Test
    public void shouldNotCallFlushBin(){
        await().atMost(Duration.ofSeconds(1)).untilAsserted(() ->
                verify(flushBinCronJobService, times(0)).flushBin());
    }
}
