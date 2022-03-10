package com.arbindo.mimock.manage.platformsettings.models.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProcessedPlatformSettingsRequest {
    private Boolean isExportImportEnabled;
    private Boolean isFlushBinCronEnabled;
}
