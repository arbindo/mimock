package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.helpers.db.HttpMethodDBHelper;
import com.arbindo.mimock.helpers.db.ResponseContentTypeDBHelper;
import com.arbindo.mimock.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.GenerateListOfMocks;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class MockManagementServiceTest {

    @Autowired
    HttpMethodDBHelper httpMethodsDBHelper;

    @Autowired
    ResponseContentTypeDBHelper responseContentTypeDBHelper;

    @org.mockito.Mock
    MocksRepository mockRepository;

    @org.mockito.Mock
    HttpMethodsRepository mockHttpMethodsRepository;

    @org.mockito.Mock
    ResponseContentTypesRepository mockResponseContentTypesRepository;

    @org.mockito.Mock
    TextualResponseRepository mockTextualResponseRepository;

    @org.mockito.Mock
    BinaryResponseRepository mockBinaryResponseRepository;

    MockManagementService mockManagementService;

    @BeforeEach
    void setupMock(){
        this.mockManagementService = MockManagementServiceImpl.builder()
                .mocksRepository(mockRepository)
                .httpMethodsRepository(mockHttpMethodsRepository)
                .responseContentTypesRepository(mockResponseContentTypesRepository)
                .textualResponseRepository(mockTextualResponseRepository)
                .binaryResponseRepository(mockBinaryResponseRepository)
                .build();
    }

    @Test
    void shouldReturnListOfMocks_WhenDBHasMocks(){
        // Arrange
        List<Mock> mockList = GenerateListOfMocks();
        lenient().when(mockRepository.findAll()).thenReturn(mockList);

        // Act
        List<Mock> result = mockManagementService.getMocks();

        // Assert
        assertIterableEquals(mockList, result);
        assertEquals(mockList.size(), result.size());
    }

    @Test
    void shouldReturnEmptyListOfMocks_WhenDBHasNoMocks(){
        // Arrange
        List<Mock> mockList = new ArrayList<>();
        lenient().when(mockRepository.findAll()).thenReturn(mockList);

        // Act
        List<Mock> result = mockManagementService.getMocks();

        // Assert
        assertIterableEquals(mockList, result);
        assertEquals(mockList.size(), result.size());
    }

    @Test
    void shouldReturnNullForListOfMocks_WhenDBNotSynced(){
        // Arrange
        lenient().when(mockRepository.findAll()).thenReturn(null);

        // Act
        List<Mock> result = mockManagementService.getMocks();

        // Assert
        assertNull(result);
    }

}
