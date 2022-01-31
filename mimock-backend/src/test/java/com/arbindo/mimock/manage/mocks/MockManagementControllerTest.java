package com.arbindo.mimock.manage.mocks;

import com.arbindo.mimock.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.MockManagementController;
import com.arbindo.mimock.manage.mimocks.MockManagementService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jdbc.support.DatabaseStartupValidator;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.GenerateListOfMocks;
import static com.arbindo.mimock.helpers.general.JsonMapper.ConvertToJson;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@WebMvcTest(value = MockManagementController.class, excludeAutoConfiguration = {SecurityAutoConfiguration.class})
public class MockManagementControllerTest {

    @Autowired
    MockManagementController mockManagementController;

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MockManagementService mockManagementService;

    @MockBean
    DataSource mockDataSource;

    @MockBean
    DatabaseStartupValidator mockDataStartupValidator;

    @BeforeAll
    static void setupDataSource(){

    }

    @Test
    void shouldReturnHttpOk_ListMocksApi_ReturnsEmpty() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;
        String expectedContentType = "application/json";
        String expectedResponseBody = "[]";
        List<Mock> expectedMocks = new ArrayList<Mock>();

        lenient().when(mockManagementService.getMocks()).thenReturn(expectedMocks);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }

    @Test
    void shouldReturnHttpOk_ListMocksApi_ReturnsListOfMocks() throws Exception {
        // Arrange
        String route = UrlConfig.MOCKS_PATH;
        String expectedContentType = "application/json";
        List<Mock> expectedMocks = GenerateListOfMocks();
        String expectedResponseBody = ConvertToJson(expectedMocks);

        lenient().when(mockManagementService.getMocks()).thenReturn(expectedMocks);

        // Act
        MvcResult result = mockMvc.perform(get(route))
                .andExpect(status().isOk())
                .andExpect(content().contentType(expectedContentType))
                .andReturn();

        // Assert
        assertEquals(expectedResponseBody, result.getResponse().getContentAsString());
    }


}
