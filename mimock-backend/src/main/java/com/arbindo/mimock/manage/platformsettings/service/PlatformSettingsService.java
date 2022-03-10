package com.arbindo.mimock.manage.platformsettings.service;

import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.manage.platformsettings.models.request.ProcessedPlatformSettingsRequest;

import java.util.List;

public interface PlatformSettingsService {

    List<PlatformSettings> listAllSupportedPlatformSettings();

    PlatformSettings updatePlatformSettings(ProcessedPlatformSettingsRequest request);
}
