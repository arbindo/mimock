package com.arbindo.mimock.manage.platformsettings.service;

import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.manage.platformsettings.models.request.PlatformSettingsRequest;
import com.arbindo.mimock.manage.platformsettings.models.request.ProcessedPlatformSettingsRequest;
import com.arbindo.mimock.repository.PlatformSettingsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static com.arbindo.mimock.helpers.entities.PlatformSettingsGenerator.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class PlatformSettingsServiceTest {

    @org.mockito.Mock
    PlatformSettingsRepository platformSettingsRepository;

    PlatformSettingsService platformSettingsService;

    @BeforeEach
    void setupMock() {
        this.platformSettingsService = PlatformSettingsServiceImpl.builder()
                .platformSettingsRepository(platformSettingsRepository)
                .build();
    }

    @Test
    void shouldReturnListOfPlatformSettings_WhenDBHasPlatformSettings() {
        // Arrange
        List<PlatformSettings> platformSettingsList = generateListOfPlatformSettings();
        lenient().when(platformSettingsRepository.findAll()).thenReturn(platformSettingsList);

        // Act
        List<PlatformSettings> result = platformSettingsService.listAllSupportedPlatformSettings();

        // Assert
        verify(platformSettingsRepository, times(1)).findAll();
        assertIterableEquals(platformSettingsList, result);
        assertEquals(platformSettingsList.size(), result.size());
    }

    @Test
    void shouldReturnEmptyListOfMocks_WhenDBHasNoPlatformSettings() {
        // Arrange
        List<PlatformSettings> platformSettingsList = new ArrayList<>();
        lenient().when(platformSettingsRepository.findAll()).thenReturn(platformSettingsList);

        // Act
        List<PlatformSettings> result = platformSettingsService.listAllSupportedPlatformSettings();

        // Assert
        verify(platformSettingsRepository, times(1)).findAll();
        assertIterableEquals(platformSettingsList, result);
        assertEquals(platformSettingsList.size(), result.size());
    }

    @Test
    void shouldReturnNullForListOfPlatformSettings_WhenDBNotSynced() {
        // Arrange
        lenient().when(platformSettingsRepository.findAll()).thenReturn(null);

        // Act
        List<PlatformSettings> result = platformSettingsService.listAllSupportedPlatformSettings();

        // Assert
        verify(platformSettingsRepository, times(1)).findAll();
        assertNull(result);
    }

    @ParameterizedTest
    @NullSource
    void shouldReturnNull_ForUpdatePlatformSettings_WhenPlatformSettingsRequestIsNull(ProcessedPlatformSettingsRequest request) {
        // Act
        PlatformSettings result = platformSettingsService.updatePlatformSettings(request);

        // Assert
        assertNull(result);
        verify(platformSettingsRepository, times(0)).save(any(PlatformSettings.class));
    }

    @Test
    void shouldReturnPlatformSettings_ForUpdatePlatformSettings_WhenPlatformSettingsRequestIsValid(){
        // Arrange
        List<PlatformSettings> platformSettingsList = generateListOfPlatformSettings();
        ProcessedPlatformSettingsRequest request = createProcessedPlatformSettingsRequest();
        lenient().when(platformSettingsRepository.findAll()).thenReturn(platformSettingsList);

        // Act
        PlatformSettings result = platformSettingsService.updatePlatformSettings(request);

        // Assert
        assertNotNull(result);
        assertEquals(request.getIsExportImportEnabled(), result.getIsExportImportEnabled());
        assertEquals(request.getIsFlushBinCronEnabled(), result.getIsFlushBinCronEnabled());
        verify(platformSettingsRepository, times(1)).save(any(PlatformSettings.class));
    }

}
