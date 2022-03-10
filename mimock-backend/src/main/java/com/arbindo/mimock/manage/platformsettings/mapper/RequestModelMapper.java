package com.arbindo.mimock.manage.platformsettings.mapper;

import com.arbindo.mimock.manage.platformsettings.models.request.PlatformSettingsRequest;
import com.arbindo.mimock.manage.platformsettings.models.request.ProcessedPlatformSettingsRequest;

public class RequestModelMapper {
    public static ProcessedPlatformSettingsRequest map(PlatformSettingsRequest request){
        return ProcessedPlatformSettingsRequest.builder()
                .isExportImportEnabled(request.getIsExportImportEnabled())
                .isFlushBinCronEnabled(request.getIsFlushBinCronEnabled())
                .build();
    }
}
