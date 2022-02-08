package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.helpers.db.HttpMethodDBHelper;
import com.arbindo.mimock.helpers.db.ResponseContentTypeDBHelper;
import com.arbindo.mimock.manage.mimocks.models.v1.MockRequest;
import com.arbindo.mimock.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;
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
class MockManagementServiceTest {

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

    @org.mockito.Mock
    EntityStatusRepository mockEntityStatusRepository;

    MockManagementService mockManagementService;

    @BeforeEach
    void setupMock() {
        this.mockManagementService = MockManagementServiceImpl.builder()
                .mocksRepository(mockRepository)
                .httpMethodsRepository(mockHttpMethodsRepository)
                .responseContentTypesRepository(mockResponseContentTypesRepository)
                .textualResponseRepository(mockTextualResponseRepository)
                .binaryResponseRepository(mockBinaryResponseRepository)
                .entityStatusRepository(mockEntityStatusRepository)
                .build();
    }

    @Test
    void shouldReturnListOfMocks_WhenDBHasMocks() {
        // Arrange
        List<Mock> mockList = generateListOfMocks();
        lenient().when(mockRepository.findAll()).thenReturn(mockList);

        // Act
        List<Mock> result = mockManagementService.getAllMocks();

        // Assert
        assertIterableEquals(mockList, result);
        assertEquals(mockList.size(), result.size());
    }

    @Test
    void shouldReturnEmptyListOfMocks_WhenDBHasNoMocks() {
        // Arrange
        List<Mock> mockList = new ArrayList<>();
        lenient().when(mockRepository.findAll()).thenReturn(mockList);

        // Act
        List<Mock> result = mockManagementService.getAllMocks();

        // Assert
        assertIterableEquals(mockList, result);
        assertEquals(mockList.size(), result.size());
    }

    @Test
    void shouldReturnNullForListOfMocks_WhenDBNotSynced() {
        // Arrange
        lenient().when(mockRepository.findAll()).thenReturn(null);

        // Act
        List<Mock> result = mockManagementService.getAllMocks();

        // Assert
        assertNull(result);
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNull_WhenMockIdIsNullOrEmpty(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        Mock result = mockManagementService.getMockById(mockId);

        // Assert
        assertNull(result);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnNull_WhenMockIdIsInvalidFormat(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        Mock result = mockManagementService.getMockById(mockId);

        // Assert
        assertNull(result);
    }

    @Test
    void shouldReturnMock_WhenMockIdIsValid() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        Mock result = mockManagementService.getMockById(mock.get().getId().toString());

        // Assert
        assertEquals(mock.get(), result);
    }

    @Test
    void shouldReturnNull_WhenMockDoesNotExists() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
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
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdIsNullOrEmpty(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.softDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdIsInvalidFormat(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.softDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @Test
    void shouldReturnTrue_ForDeleteMockById_WhenMockIdIsValid() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.softDeleteMockById(mock.get().getId().toString());

        // Assert
        assertTrue(result);
        verify(mockRepository, times(0)).delete(mock.get());
        verify(mockEntityStatusRepository, times(1)).findByStatus(anyString());
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @Test
    void shouldReturnFalse_ForDeleteMockById_WhenMockIdDoesNotExist() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        Optional<Mock> emptyMock = Optional.empty();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(emptyMock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.softDeleteMockById(mock.get().getId().toString());

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
        verify(mockEntityStatusRepository, times(0)).findByStatus(anyString());
        verify(mockRepository, times(0)).save(any(Mock.class));
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnFalse_ForForceDeleteMockById_WhenMockIdIsNullOrEmpty(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.hardDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnFalse_ForForceDeleteMockById_WhenMockIdIsInvalidFormat(String mockId) {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.hardDeleteMockById(mockId);

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @Test
    void shouldReturnTrue_ForForceDeleteMockById_WhenMockIdIsValid() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.hardDeleteMockById(mock.get().getId().toString());

        // Assert
        assertTrue(result);
        verify(mockRepository, times(1)).delete(mock.get());
    }

    @Test
    void shouldReturnFalse_ForForceDeleteMockById_WhenMockIdDoesNotExist() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        Optional<Mock> emptyMock = Optional.empty();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(emptyMock);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.hardDeleteMockById(mock.get().getId().toString());

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
    }

    @Test
    void shouldDeleteAllMocks_Success() {
        // Act
        boolean result = mockManagementService.deleteAllMocks();

        // Assert
        assertTrue(result);
        verify(mockRepository, times(1)).deleteAll();
    }

    @Test
    void shouldDeleteAllMocks_ThrowsException() {
        // Arrange
        doThrow(new RuntimeException()).when(mockRepository).deleteAll();

        // Act
        boolean result = mockManagementService.deleteAllMocks();

        // Assert
        assertFalse(result);
    }

    @ParameterizedTest
    @NullSource
    void shouldReturnNull_ForCreateMock_WhenMockRequestIsNull(MockRequest request) {
        // Act
        Mock result = mockManagementService.createMock(request);

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(any(Mock.class));
    }

    @Test
    void shouldReturnMock_ForCreateMock_WhenMockRequestIsValid() {
        // Arrange
        MockRequest request = createMockRequest();
        Mock expectedMock = generateMock(request);
        HttpMethod httpMethod = generateHttpMethod();
        ResponseContentType responseContentType = generateResponseContentType();
        EntityStatus entityStatus = generateDefaultEntityStatus();

        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(entityStatus);
        lenient().when(mockHttpMethodsRepository.findByMethod(anyString())).thenReturn(httpMethod);
        lenient().when(mockResponseContentTypesRepository.findByResponseType(anyString())).thenReturn(responseContentType);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.createMock(request);

        // Assert
        assertEquals(expectedMock, result);
        verify(mockTextualResponseRepository, times(1)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(1)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @ParameterizedTest
    @NullSource
    void shouldReturnNull_ForUpdateMock_WhenMockRequestIsNull(MockRequest request) {
        // Act
        Mock result = mockManagementService.updateMock("mockId", request);

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(any(Mock.class));
    }

    @ParameterizedTest
    @NullSource
    @EmptySource
    void shouldReturnNull_ForUpdateMock_WhenMockIdIsNullOrEmpty(String mockId) {
        // Act
        Mock result = mockManagementService.updateMock(mockId, null);

        // Assert
        assertNull(result);
        verify(mockRepository, times(0)).save(any(Mock.class));
    }

    @Test
    void shouldReturnMock_ForUpdateMock_WhenMockRequestIsValid() {
        // Arrange
        MockRequest request = createMockRequest();
        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());
        Mock expectedMock = optionalMock.get();
        HttpMethod httpMethod = optionalMock.get().getHttpMethod();
        ResponseContentType responseContentType = optionalMock.get().getResponseContentType();
        EntityStatus entityStatus = generateDefaultEntityStatus();

        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockEntityStatusRepository.findByStatus(anyString())).thenReturn(entityStatus);
        lenient().when(mockHttpMethodsRepository.findByMethod(anyString())).thenReturn(httpMethod);
        lenient().when(mockResponseContentTypesRepository.findByResponseType(anyString())).thenReturn(responseContentType);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.updateMock(expectedMock.getId().toString(), request);

        // Assert
        assertNotNull(result);
        assertEquals(expectedMock.getId(), result.getId());
        assertEquals(expectedMock.getRoute(), result.getRoute());
        assertEquals(expectedMock.getHttpMethod().getMethod(), result.getHttpMethod().getMethod());
        assertEquals(expectedMock.getResponseContentType().getResponseType(), result.getResponseContentType().getResponseType());
        assertEquals(expectedMock.getStatusCode(), result.getStatusCode());
        assertEquals(expectedMock.getQueryParams(), result.getQueryParams());
        assertEquals(expectedMock.getTextualResponse(), result.getTextualResponse());
        assertEquals(expectedMock.getBinaryResponse(), result.getBinaryResponse());
        assertEquals(expectedMock.getEntityStatus().getStatus(), result.getEntityStatus().getStatus());
        assertEquals(expectedMock.getCreatedAt(), result.getCreatedAt());
        assertNotEquals(expectedMock.getUpdatedAt(), result.getUpdatedAt());
        verify(mockTextualResponseRepository, times(1)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(1)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

}
