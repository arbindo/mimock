package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.common.services.EntityStatusService;
import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.repository.MocksRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class DeleteMockServiceTest {

    @org.mockito.Mock
    MocksRepository mockRepository;

    @org.mockito.Mock
    EntityStatusService mockEntityStatusService;

    @org.mockito.Mock
    MockManagementService mockManagementService;

    DeleteMockService deleteMockService;

    @BeforeEach
    void setupMock() {
        this.deleteMockService = DeleteMockServiceImpl.builder()
                .mocksRepository(mockRepository)
                .entityStatusService(mockEntityStatusService)
                .mockManagementService(mockManagementService)
                .build();
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdIsNullOrEmpty(String mockId) {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(mock);

        // Act
        boolean result = deleteMockService.softDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdIsInvalidFormat(String mockId) {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(null);

        // Act
        boolean result = deleteMockService.softDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock);
    }

    @Test
    void shouldReturnTrue_ForDeleteMockById_WhenMockIdIsValid() {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(mock);

        // Act
        boolean result = deleteMockService.softDeleteMockById(mock.getId().toString());

        // Assert
        assertTrue(result);
        verify(mockRepository, times(0)).delete(mock);
        verify(mockEntityStatusService, times(1)).getDeletedMockEntityStatus();
        verify(mockRepository, times(1)).save(mock);
    }

    @Test
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdDoesNotExist() {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(null);

        // Act
        boolean result = deleteMockService.softDeleteMockById(mock.getId().toString());

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock);
        verify(mockEntityStatusService, times(0)).findByEntityStatus(anyString());
        verify(mockRepository, times(0)).save(mock);
    }

    @Test
    void shouldReturnFalse_ForDeleteMockById_WhenMockDeletionThrowsException() {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(mock);
        lenient().when(mockRepository.save(any(Mock.class))).thenThrow(IllegalArgumentException.class);

        // Act
        boolean result = deleteMockService.softDeleteMockById(mock.getId().toString());

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock);
        verify(mockEntityStatusService, times(0)).findByEntityStatus(anyString());
        verify(mockRepository, times(1)).save(mock);
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnFalse_ForForceDeleteMockById_WhenMockIdIsNullOrEmpty(String mockId) {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(mock);

        // Act
        boolean result = deleteMockService.hardDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock);
    }

    @Test
    void shouldReturnFalse_ForForceDeleteMockById_WhenDeletionFailsWithException() {
        String mockId = UUID.randomUUID().toString();
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(mock);
        doThrow(IllegalArgumentException.class).when(mockRepository).delete(any(Mock.class));

        // Assert
        assertFalse(deleteMockService.hardDeleteMockById(mockId));
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnFalse_ForForceDeleteMockById_WhenMockIdIsInvalidFormat(String mockId) {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(null);

        // Act
        boolean result = deleteMockService.hardDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock);
    }

    @Test
    void shouldReturnTrue_ForForceDeleteMockById_WhenMockIdIsValid() {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(mock);

        // Act
        boolean result = deleteMockService.hardDeleteMockById(mock.getId().toString());

        // Assert
        assertTrue(result);
        verify(mockRepository, times(1)).delete(mock);
    }

    @Test
    void shouldReturnFalse_ForForceDeleteMockById_WhenMockIdDoesNotExist() {
        // Arrange
        Mock mock = generateMock();
        lenient().when(mockManagementService.getMockById(anyString())).thenReturn(null);

        // Act
        boolean result = deleteMockService.hardDeleteMockById(mock.getId().toString());

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock);
    }

    @Test
    void shouldDeleteAllMocks_Success() {
        // Act
        boolean result = deleteMockService.deleteAllMocks();

        // Assert
        assertTrue(result);
        verify(mockRepository, times(1)).deleteAll();
    }

    @Test
    void shouldDeleteAllMocks_ThrowsException() {
        // Arrange
        doThrow(new RuntimeException()).when(mockRepository).deleteAll();

        // Act
        boolean result = deleteMockService.deleteAllMocks();

        // Assert
        assertFalse(result);
    }

    @Test
    void shouldFlushDeletedMocks() {
        // Arrange
        EntityStatus entityStatus = generateDeletedEntityStatus();
        lenient().when(mockEntityStatusService.getDeletedMockEntityStatus()).thenReturn(entityStatus);
        List<Mock> mocks = generateListOfMocks();
        lenient().when(mockRepository.findAllByEntityStatusAndDeletedAt(any(EntityStatus.class),
                any(ZonedDateTime.class))).thenReturn(mocks);
        // Act
        deleteMockService.flushDeletedMocks();
        // Assert
        verify(mockRepository, times(1)).deleteAll(mocks);
    }

    @Test
    void shouldFlushDeletedMocks_ThrowsException() {
        // Arrange
        EntityStatus entityStatus = generateDeletedEntityStatus();
        lenient().when(mockEntityStatusService.getDeletedMockEntityStatus()).thenReturn(entityStatus);
        List<Mock> mocks = generateListOfMocks();
        doThrow(new RuntimeException()).when(mockRepository)
                .findAllByEntityStatusAndDeletedAt(any(EntityStatus.class), any(ZonedDateTime.class));
        // Act
        deleteMockService.flushDeletedMocks();
        // Assert
        verify(mockRepository, times(0)).deleteAll(mocks);
    }
}
