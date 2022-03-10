package com.arbindo.mimock.manage.platformsettings.service;

import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.manage.platformsettings.models.request.ProcessedPlatformSettingsRequest;
import com.arbindo.mimock.repository.PlatformSettingsRepository;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class PlatformSettingsServiceImpl implements PlatformSettingsService {

    @Autowired
    PlatformSettingsRepository platformSettingsRepository;

    @Override
    public List<PlatformSettings> listAllSupportedPlatformSettings() {
        return platformSettingsRepository.findAll();
    }

    @Transactional
    @Override
    public PlatformSettings updatePlatformSettings(ProcessedPlatformSettingsRequest request) {
        if (ValidationUtil.isArgNull(request)) {
            log.log(Level.DEBUG, "PlatformSettingsRequest is null!");
            return null;
        }
        // Now we update single default entry. In the future, this service will be extensible for each user
        try{
            PlatformSettings defaultPlatformSettings = platformSettingsRepository.findAll().get(0);
            defaultPlatformSettings.setIsExportImportEnabled(request.getIsExportImportEnabled());
            defaultPlatformSettings.setIsFlushBinCronEnabled(request.getIsFlushBinCronEnabled());
            defaultPlatformSettings.setUpdatedAt(ZonedDateTime.now());
            platformSettingsRepository.save(defaultPlatformSettings);
            return defaultPlatformSettings;
        } catch (Exception e){
            log.log(Level.DEBUG, e.getMessage());
        }
        return null;
    }
}
