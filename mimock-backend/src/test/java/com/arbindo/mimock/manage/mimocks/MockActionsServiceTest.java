package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static com.arbindo.mimock.helpers.entities.MocksGenerator.deleteMock;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class MockActionsServiceTest {

    @org.mockito.Mock
    MockManagementService mockManagementService;

    @org.mockito.Mock
    MocksRepository mockRepository;

    @org.mockito.Mock
    EntityStatusRepository mockEntityStatusRepository;

    MockActionsService mockActionsService;

    @BeforeEach
    void setupMock() {
        this.mockActionsService = MockActionsServiceImpl.builder()
                .mockManagementService(mockManagementService)
                .mocksRepository(mockRepository)
                .entityStatusRepository(mockEntityStatusRepository)
                .build();
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNull_ForArchiveMockById_WhenMockIdIsNullOrEmpty(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());

        // Act
        Mock result = mockActionsService.archiveMock(mockId);

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(mock.get());
    }

    @Test
    void shouldReturnMock_ForArchiveMockById_WhenMockIdIsValid() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());
        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(generateArchivedEntityStatus());
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(mock.get());

        // Act
        Mock result = mockActionsService.archiveMock(mock.get().getId().toString());

        // Assert
        assertNotNull(result);
        verify(mockRepository, times(1)).save(mock.get());
    }

    @Test
    void shouldReturnMock_ForArchiveMockById_WhenMockIdIsAlreadyArchived() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());
        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(generateArchivedEntityStatus());
        Mock archivedMock = archiveMock(mock.get());

        // Act
        Mock result = mockActionsService.archiveMock(archivedMock.getId().toString());

        // Assert
        assertNotNull(result);
        verify(mockRepository, times(0)).save(mock.get());
    }

    @Test
    void shouldReturnNull_ForArchiveMockById_WhenMockIdDoesNotExist() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());

        // mock does not exists
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(null);

        // Act
        Mock result = mockActionsService.archiveMock(mock.get().getId().toString());

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(mock.get());
    }

    @Test
    void shouldReturnNull_ForArchiveMockById_WhenMockIdIsAlreadyDeleted() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());
        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(generateArchivedEntityStatus());
        Mock deletedMock = deleteMock(mock.get());

        // Act
        Mock result = mockActionsService.archiveMock(deletedMock.getId().toString());

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(mock.get());
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNull_ForUnarchiveMockById_WhenMockIdIsNullOrEmpty(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());

        // Act
        Mock result = mockActionsService.unarchiveMock(mockId);

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(mock.get());
    }

    @Test
    void shouldReturnMock_ForUnarchiveMockById_WhenMockIdIsValid() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());
        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(generateDefaultEntityStatus());
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(mock.get());

        // Act
        Mock result = mockActionsService.unarchiveMock(mock.get().getId().toString());

        // Assert
        assertNotNull(result);
        verify(mockRepository, times(1)).save(mock.get());
    }

    @Test
    void shouldReturnMock_ForUnarchiveMockById_WhenMockIdIsAlreadyUnarchived() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());
        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(generateDefaultEntityStatus());
        Mock unarchivedMock = unarchiveMock(mock.get());
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(unarchivedMock);

        // Act
        Mock result = mockActionsService.unarchiveMock(unarchivedMock.getId().toString());

        // Assert
        assertNotNull(result);
        verify(mockRepository, times(1)).save(unarchivedMock);
    }

    @Test
    void shouldReturnNull_ForUnarchiveMockById_WhenMockIdDoesNotExist() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());

        // mock does not exists
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(null);

        // Act
        Mock result = mockActionsService.unarchiveMock(mock.get().getId().toString());

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(mock.get());
    }

    @Test
    void shouldReturnNull_ForUnarchiveMockById_WhenMockIdIsAlreadyDeleted() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        assertTrue(mock.isPresent());
        lenient().when(mockManagementService.getMockById(any(String.class))).thenReturn(mock.get());
        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(generateDefaultEntityStatus());
        assertTrue(mock.isPresent());
        Mock deletedMock = deleteMock(mock.get());

        // Act
        Mock result = mockActionsService.unarchiveMock(deletedMock.getId().toString());

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(mock.get());
    }
}
