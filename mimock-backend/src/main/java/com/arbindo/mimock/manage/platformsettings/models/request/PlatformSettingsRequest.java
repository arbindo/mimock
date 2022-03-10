package com.arbindo.mimock.manage.platformsettings.models.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PlatformSettingsRequest {

    @Schema(example = "true", description = "Export and Import Feature Enabled/Disabled")
    private Boolean isExportImportEnabled;

    @Schema(example = "true", description = "Flush Bin CRON Feature Enabled/Disabled")
    private Boolean isFlushBinCronEnabled;

}
