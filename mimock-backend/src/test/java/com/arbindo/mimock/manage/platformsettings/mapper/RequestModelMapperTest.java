package com.arbindo.mimock.manage.platformsettings.mapper;

import com.arbindo.mimock.helpers.entities.PlatformSettingsGenerator;
import com.arbindo.mimock.manage.platformsettings.models.request.PlatformSettingsRequest;
import com.arbindo.mimock.manage.platformsettings.models.request.ProcessedPlatformSettingsRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RequestModelMapperTest {

    @Test
    void shouldMapRequestModelToProcessedRequestModal() {
        PlatformSettingsRequest request = PlatformSettingsGenerator.createPlatformSettingsRequest();

        PlatformSettingsRequest requestToBeMapped = PlatformSettingsRequest.builder()
                .isExportImportEnabled(request.getIsExportImportEnabled())
                .isFlushBinCronEnabled(request.getIsFlushBinCronEnabled())
                .build();

        ProcessedPlatformSettingsRequest expectedRequest = ProcessedPlatformSettingsRequest.builder()
                .isExportImportEnabled(request.getIsExportImportEnabled())
                .isFlushBinCronEnabled(request.getIsFlushBinCronEnabled())
                .build();

        ProcessedPlatformSettingsRequest mappedRequest = RequestModelMapper.map(requestToBeMapped);

        assertEquals(expectedRequest.getIsExportImportEnabled(), mappedRequest.getIsExportImportEnabled());
        assertEquals(expectedRequest.getIsFlushBinCronEnabled(), mappedRequest.getIsFlushBinCronEnabled());
    }
}