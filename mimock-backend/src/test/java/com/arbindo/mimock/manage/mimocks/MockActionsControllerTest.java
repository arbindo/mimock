package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.interceptor.DefaultHttpInterceptor;
import com.arbindo.mimock.manage.mimocks.models.v1.GenericResponseWrapper;
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
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.sql.DataSource;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static com.arbindo.mimock.helpers.entities.MocksGenerator.generateMock;
import static com.arbindo.mimock.helpers.general.JsonMapper.convertObjectToJsonString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = MockActionsController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class,
})
@AutoConfigureMockMvc(addFilters = false)
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, JpaRepositoriesAutoConfiguration.class})
public class MockActionsControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MockActionsService mockActionsService;

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
    void shouldReturnHttpOk_ArchiveMockByIdApi_ReturnsArchivedMock() throws Exception {
        // Arrange
        Mock mock = generateMock();
        String mockId = mock.getId().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId + UrlConfig.ARCHIVE_ACTION;

        Mock archivedMock = archiveMock(mock);
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                Messages.ARCHIVED_RESOURCE_SUCCESS, archivedMock);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);

        lenient().when(mockActionsService.archiveMock(mockId)).thenReturn(archivedMock);

        // Act
        MvcResult result = mockMvc.perform(post(route))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_ArchiveMockByIdApi_ReturnsNull() throws Exception {
        // Arrange
        Mock mock = generateMock();
        String mockId = mock.getId().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId + UrlConfig.ARCHIVE_ACTION;

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.ARCHIVE_RESOURCE_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);

        lenient().when(mockActionsService.archiveMock(mockId)).thenReturn(null);

        // Act
        MvcResult result = mockMvc.perform(post(route))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_UnarchiveMockByIdApi_ReturnsUnarchivedMock() throws Exception {
        // Arrange
        Mock mock = generateMock();
        String mockId = mock.getId().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId + UrlConfig.UNARCHIVE_ACTION;

        Mock unarchivedMock = unarchiveMock(mock);
        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.OK,
                Messages.UNARCHIVED_RESOURCE_SUCCESS, unarchivedMock);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);

        lenient().when(mockActionsService.unarchiveMock(mockId)).thenReturn(unarchivedMock);

        // Act
        MvcResult result = mockMvc.perform(post(route))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpBadRequest_UnarchiveMockByIdApi_ReturnsNull() throws Exception {
        // Arrange
        Mock mock = generateMock();
        String mockId = mock.getId().toString();
        String route = UrlConfig.MOCKS_PATH + "/" + mockId + UrlConfig.UNARCHIVE_ACTION;

        GenericResponseWrapper<Mock> genericResponseWrapper = getGenericResponseWrapper(HttpStatus.BAD_REQUEST,
                Messages.UNARCHIVE_RESOURCE_FAILED, null);
        String expectedResponseBody = convertObjectToJsonString(genericResponseWrapper);

        lenient().when(mockActionsService.unarchiveMock(mockId)).thenReturn(null);

        // Act
        MvcResult result = mockMvc.perform(post(route))
                .andExpect(status().isBadRequest())
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }
}
