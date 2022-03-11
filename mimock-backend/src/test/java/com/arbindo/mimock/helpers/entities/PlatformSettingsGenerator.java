package com.arbindo.mimock.helpers.entities;

import com.arbindo.mimock.common.wrapper.GenericResponseWrapper;
import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.platformsettings.mapper.RequestModelMapper;
import com.arbindo.mimock.manage.platformsettings.models.request.PlatformSettingsRequest;
import com.arbindo.mimock.manage.platformsettings.models.request.ProcessedPlatformSettingsRequest;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;
import java.util.List;

public class PlatformSettingsGenerator {

    public static List<PlatformSettings> generateListOfPlatformSettings() {
        PlatformSettings defaultPlatformSetting = generatePlatformSettings();
        return List.of(defaultPlatformSetting);
    }

    public static PlatformSettings generatePlatformSettings(){
        return PlatformSettings.builder()
                .isCategoryExecutionEnabled(false)
                .isStepsExecutionEnabled(false)
                .isExportImportEnabled(true)
                .isFlushBinCronEnabled(true)
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static PlatformSettings generatePlatformSettings(PlatformSettingsRequest request) {
        return PlatformSettings.builder()
                .isCategoryExecutionEnabled(false)
                .isStepsExecutionEnabled(false)
                .isExportImportEnabled(request.getIsExportImportEnabled())
                .isFlushBinCronEnabled(request.getIsFlushBinCronEnabled())
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public static PlatformSettingsRequest createPlatformSettingsRequest() {
        return PlatformSettingsRequest.builder()
                .isExportImportEnabled(true)
                .isFlushBinCronEnabled(false)
                .build();
    }

    public static ProcessedPlatformSettingsRequest createProcessedPlatformSettingsRequest() {
        return RequestModelMapper.map(createPlatformSettingsRequest());
    }

    public static GenericResponseWrapper<PlatformSettings> getGenericResponseWrapper(
            HttpStatus httpStatus, String responseMessage, PlatformSettings platformSettings) {
        return GenericResponseWrapper.<PlatformSettings>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(platformSettings)
                .build();
    }
}
