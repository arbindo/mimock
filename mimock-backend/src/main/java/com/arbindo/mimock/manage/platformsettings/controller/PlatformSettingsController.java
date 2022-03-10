package com.arbindo.mimock.manage.platformsettings.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.manage.platformsettings.service.PlatformSettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping(UrlConfig.PLATFORM_SETTINGS_PATH)
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "Platform Settings", description = "Handles operations related to platform settings.")
public class PlatformSettingsController {

    @Autowired
    PlatformSettingsService platformSettingsService;

    @Operation(summary = "List Platform Settings", description = "List all supported platform settings in Mimock Platform.",
            tags = {"Platform Settings"})
    @GetMapping
    public ResponseEntity<List<PlatformSettings>> listAllSupportedPlatformSettings() {
        return ResponseEntity.ok(platformSettingsService.listAllSupportedPlatformSettings());
    }

}
