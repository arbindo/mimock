package com.arbindo.mimock.manage.platformsettings.controller;

import com.arbindo.mimock.common.constants.Messages;
import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.common.wrapper.GenericResponseWrapper;
import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.manage.platformsettings.mapper.RequestModelMapper;
import com.arbindo.mimock.manage.platformsettings.models.request.PlatformSettingsRequest;
import com.arbindo.mimock.manage.platformsettings.service.PlatformSettingsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @Operation(summary = "Update Platform Settings", description = "Updates the default platform settings. This API will be extensible in future.",
            tags = {"Platform Settings"})
    @PutMapping
    public ResponseEntity<GenericResponseWrapper<PlatformSettings>> updatePlatformSettings(@RequestBody @Valid PlatformSettingsRequest request) {
        PlatformSettings updatePlatformSettings = platformSettingsService.updatePlatformSettings(RequestModelMapper.map(request));
        if (updatePlatformSettings != null) {
            GenericResponseWrapper<PlatformSettings> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                    Messages.UPDATE_RESOURCE_SUCCESS, updatePlatformSettings);
            return ResponseEntity.ok(genericResponseWrapper);
        }
        GenericResponseWrapper<PlatformSettings> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.UPDATE_RESOURCE_FAILED, null);
        return ResponseEntity.badRequest().body(genericResponseWrapper);
    }

    private GenericResponseWrapper<PlatformSettings> getGenericResponseWrapper(
            HttpStatus httpStatus, String responseMessage, PlatformSettings platformSettings) {
        return GenericResponseWrapper.<PlatformSettings>builder()
                .code(httpStatus.toString())
                .message(responseMessage)
                .data(platformSettings)
                .build();
    }

}
