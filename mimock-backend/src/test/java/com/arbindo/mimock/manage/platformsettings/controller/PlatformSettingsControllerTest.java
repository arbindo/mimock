package com.arbindo.mimock.manage.platformsettings.controller;

import com.arbindo.mimock.common.constants.Messages;
import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.common.wrapper.GenericResponseWrapper;
import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.manage.platformsettings.models.request.PlatformSettingsRequest;
import com.arbindo.mimock.manage.platformsettings.models.request.ProcessedPlatformSettingsRequest;
import com.arbindo.mimock.manage.platformsettings.service.PlatformSettingsService;
import com.arbindo.mimock.security.JwtRequestFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

import static com.arbindo.mimock.helpers.entities.PlatformSettingsGenerator.*;
import static com.arbindo.mimock.helpers.general.JsonMapper.convertObjectToJsonString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = PlatformSettingsController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
public class PlatformSettingsControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    PlatformSettingsService platformSettingsService;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @MockBean
    DefaultHttpInterceptor defaultHttpInterceptor;

    @MockBean
    UserDetailsService userDetailsService;

    @MockBean
    JwtRequestFilter jwtRequestFilter;

    @Test
    void shouldReturnHttpOk_ListPlatformSettingsApi_ReturnsEmpty() throws Exception {
        // Arrange
        String route = UrlConfig.PLATFORM_SETTINGS_PATH;
        String expectedContentType = "application/json";
        List<PlatformSettings> expectedPlatformSettings = new ArrayList<PlatformSettings>();
        String expectedResponseBody = convertObjectToJsonString(expectedPlatformSettings);

        lenient().when(platformSettingsService.listAllSupportedPlatformSettings()).thenReturn(expectedPlatformSettings);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_ListPlatformSettingsApi_ReturnsListOfMocks() throws Exception {
        // Arrange
        String route = UrlConfig.PLATFORM_SETTINGS_PATH;
        String expectedContentType = "application/json";
        List<PlatformSettings> expectedPlatformSettings = generateListOfPlatformSettings();
        String expectedResponseBody = convertObjectToJsonString(expectedPlatformSettings);

        lenient().when(platformSettingsService.listAllSupportedPlatformSettings()).thenReturn(expectedPlatformSettings);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_ListPlatformSettingsApi_ReturnsNull() throws Exception {
        // Arrange
        String route = UrlConfig.PLATFORM_SETTINGS_PATH;

        lenient().when(platformSettingsService.listAllSupportedPlatformSettings()).thenReturn(null);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertEquals("", result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_UpdatePlatformSettingsApi_ReturnsValidPlatformSettingsData() throws Exception {
        // Arrange
        PlatformSettingsRequest request = createPlatformSettingsRequest();
        PlatformSettings platformSettings = generatePlatformSettings(request);
        String route = UrlConfig.PLATFORM_SETTINGS_PATH;

        lenient().when(platformSettingsService.updatePlatformSettings(any(ProcessedPlatformSettingsRequest.class))).thenReturn(platformSettings);

        GenericResponseWrapper<PlatformSettings> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                Messages.UPDATE_RESOURCE_SUCCESS, platformSettings);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";
        String requestJson = convertObjectToJsonString(request);
        assertNotNull(requestJson);

        // Act
        MvcResult result = mockMvc.perform(put(route)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_UpdatePlatformSettingsApi_ReturnsNullPlatformSettingsData() throws Exception {
        // Arrange
        PlatformSettingsRequest request = createPlatformSettingsRequest();
        String route = UrlConfig.PLATFORM_SETTINGS_PATH;

        lenient().when(platformSettingsService.updatePlatformSettings(any(ProcessedPlatformSettingsRequest.class)))
                .thenReturn(null);

        GenericResponseWrapper<PlatformSettings> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.UPDATE_RESOURCE_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);
        String expectedContentType = "application/json";
        String requestJson = convertObjectToJsonString(request);
        assertNotNull(requestJson);

        // Act
        MvcResult result = mockMvc.perform(put(route)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }
}
