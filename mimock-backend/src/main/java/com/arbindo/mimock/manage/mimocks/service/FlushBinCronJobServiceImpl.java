package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.manage.platformsettings.service.PlatformSettingsService;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class FlushBinCronJobServiceImpl implements FlushBinCronJobService {

    @Autowired
    PlatformSettingsService platformSettingsService;

    @Autowired
    DeleteMockService deleteMockService;

    @Override
    @Scheduled(cron = "${flush-bin-cron-expression}")
    public void flushBin() {
        PlatformSettings platformSettings = platformSettingsService.getDefaultPlatformSettings();
        if(!platformSettings.getIsFlushBinCronEnabled()){
            log.log(Level.INFO, "Flush Bin Cron Is Disabled. Skipping CRON scheduler job.");
            return;
        }
        log.log(Level.INFO, "Starting CRON scheduler job.");
        deleteMockService.flushDeletedMocks();
        log.log(Level.INFO, "Completed CRON scheduler job.");
    }
}
