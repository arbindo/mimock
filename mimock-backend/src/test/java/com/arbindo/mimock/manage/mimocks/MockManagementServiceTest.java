package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.helpers.db.HttpMethodDBHelper;
import com.arbindo.mimock.helpers.db.ResponseContentTypeDBHelper;
import com.arbindo.mimock.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


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

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNull_WhenMockIdIsNullOrEmpty(String mockId){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        Mock result = mockManagementService.getMockById(mockId);

        // Assert
        assertNull(result);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnNull_WhenMockIdIsInvalidFormat(String mockId){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        Mock result = mockManagementService.getMockById(mockId);

        // Assert
        assertNull(result);
    }

    @Test
    void shouldReturnMock_WhenMockIdIsValid(){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        Mock result = mockManagementService.getMockById(mock.get().getId().toString());

        // Assert
        assertEquals(mock.get(), result);
    }

    @Test
    void shouldReturnNull_WhenMockDoesNotExists(){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        Optional<Mock> emptyMock = Optional.empty();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(emptyMock);

        // Act
        assertTrue(mock.isPresent());
        Mock result = mockManagementService.getMockById(mock.get().getId().toString());

        // Assert
        assertNull(result);
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdIsNullOrEmpty(String mockId){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.deleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdIsInvalidFormat(String mockId){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.deleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @Test
    void shouldReturnTrue_ForDeleteMockById_WhenMockIdIsValid(){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.deleteMockById(mock.get().getId().toString());

        // Assert
        assertTrue(result);
        verify(mockRepository, times(1)).delete(mock.get());
    }

    @Test
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdDoesNotExist(){
        // Arrange
        Optional<Mock> mock = GenerateOptionalMock();
        Optional<Mock> emptyMock = Optional.empty();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(emptyMock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.deleteMockById(mock.get().getId().toString());

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @Test
    void shouldDeleteAllMocks_Success(){
        // Act
        boolean result = mockManagementService.deleteAllMocks();

        // Assert
        assertTrue(result);
        verify(mockRepository, times(1)).deleteAll();
    }

    @Test
    void shouldDeleteAllMocks_ThrowsException(){
        // Arrange
        doThrow(new RuntimeException()).when(mockRepository).deleteAll();

        // Act
        boolean result = mockManagementService.deleteAllMocks();

        // Assert
        assertFalse(result);
    }



}
