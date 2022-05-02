package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.audit.AuditorService;
import com.arbindo.mimock.common.services.EntityStatusService;
import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.manage.mimocks.service.exceptions.MockAlreadyExistsException;
import com.arbindo.mimock.manage.mimocks.service.helpers.MockParamBuilder;
import com.arbindo.mimock.repository.BinaryResponseRepository;
import com.arbindo.mimock.repository.MocksRepository;
import com.arbindo.mimock.repository.TextualResponseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;
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

    @org.mockito.Mock
    MocksRepository mockRepository;

    @org.mockito.Mock
    TextualResponseRepository mockTextualResponseRepository;

    @org.mockito.Mock
    BinaryResponseRepository mockBinaryResponseRepository;

    @org.mockito.Mock
    EntityStatusService mockEntityStatusService;

    @org.mockito.Mock
    AuditorService mockAuditorService;

    @org.mockito.Mock
    MockParamBuilder mockParamBuilder;

    MockManagementService mockManagementService;

    @BeforeEach
    void setupMock() {
        this.mockManagementService = MockManagementServiceImpl.builder()
                .mocksRepository(mockRepository)
                .mockParamBuilder(mockParamBuilder)
                .textualResponseRepository(mockTextualResponseRepository)
                .binaryResponseRepository(mockBinaryResponseRepository)
                .entityStatusService(mockEntityStatusService)
                .auditorService(mockAuditorService)
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
        verify(mockRepository, times(1)).findAll();
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
        verify(mockRepository, times(1)).findAll();
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
        verify(mockRepository, times(1)).findAll();
        assertNull(result);
    }

    @Test
    void shouldReturnFilteredListOfMocks_WhenEntityStatusIsValid() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();
        EntityStatus entityStatus = generateDefaultEntityStatus();

        lenient().when(mockRepository.findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class)))
                .thenReturn(pageable);
        lenient().when(mockEntityStatusService.findByEntityStatus(anyString())).thenReturn(entityStatus);

        // Act
        Page<Mock> result = mockManagementService.getMocksAsPageable(Pageable.unpaged(), Status.NONE);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(1)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockEntityStatusService, times(1)).findByEntityStatus(anyString());
    }

    @Test
    void shouldReturnNonFilteredListOfMocks_WhenEntityStatusIsInvalid() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();

        lenient().when(mockRepository.findAll(any(Pageable.class))).thenReturn(pageable);
        lenient().when(mockEntityStatusService.findByEntityStatus(anyString())).thenReturn(null);

        // Act
        Page<Mock> result = mockManagementService.getMocksAsPageable(Pageable.unpaged(), Status.NONE);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAll(any(Pageable.class));
        verify(mockEntityStatusService, times(1)).findByEntityStatus(anyString());
    }

    @Test
    void shouldReturnNonFilteredListOfMocks_WhenStatusParameterIsNull() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();

        lenient().when(mockRepository.findAll(any(Pageable.class))).thenReturn(pageable);

        // Act
        Page<Mock> result = mockManagementService.getMocksAsPageable(Pageable.unpaged(), null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAll(any(Pageable.class));
        verify(mockEntityStatusService, times(0)).findByEntityStatus(anyString());
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
        verify(mockRepository, times(1)).findById(any(UUID.class));
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
        verify(mockRepository, times(1)).findById(any(UUID.class));
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
        verify(mockEntityStatusService, times(1)).getDeletedMockEntityStatus();
        verify(mockRepository, times(1)).save(mock.get());
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
        verify(mockEntityStatusService, times(0)).findByEntityStatus(anyString());
        verify(mockRepository, times(0)).save(mock.get());
    }

    @Test
    void shouldReturnFalse_ForDeleteMockById_WhenMockDeletionThrowsException() {
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);
        lenient().when(mockRepository.save(any(Mock.class))).thenThrow(IllegalArgumentException.class);

        // Act
        assertTrue(mock.isPresent());
        boolean result = mockManagementService.softDeleteMockById(mock.get().getId().toString());

        // Assert
        assertFalse(result);
        verify(mockRepository, times(0)).delete(mock.get());
        verify(mockEntityStatusService, times(0)).findByEntityStatus(anyString());
        verify(mockRepository, times(1)).save(mock.get());
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

    @Test
    void shouldReturnFalse_ForForceDeleteMockById_WhenDeletionFailsWithException() {
        String mockId = UUID.randomUUID().toString();
        // Arrange
        Optional<Mock> mock = generateOptionalMock();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(mock);
        doThrow(IllegalArgumentException.class).when(mockRepository).delete(any(Mock.class));

        // Assert
        assertFalse(mockManagementService.hardDeleteMockById(mockId));
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

    @Test
    void shouldFlushDeletedMocks(){
        // Arrange
        EntityStatus entityStatus = generateDeletedEntityStatus();
        lenient().when(mockEntityStatusService.getDeletedMockEntityStatus()).thenReturn(entityStatus);
        List<Mock> mocks = generateListOfMocks();
        lenient().when(mockRepository.findAllByEntityStatusAndDeletedAt(any(EntityStatus.class),
                any(ZonedDateTime.class))).thenReturn(mocks);
        // Act
        mockManagementService.flushDeletedMocks();
        // Assert
        verify(mockRepository, times(1)).deleteAll(mocks);
    }

    @Test
    void shouldFlushDeletedMocks_ThrowsException(){
        // Arrange
        EntityStatus entityStatus = generateDeletedEntityStatus();
        lenient().when(mockEntityStatusService.getDeletedMockEntityStatus()).thenReturn(entityStatus);
        List<Mock> mocks = generateListOfMocks();
        doThrow(new RuntimeException()).when(mockRepository)
                .findAllByEntityStatusAndDeletedAt(any(EntityStatus.class), any(ZonedDateTime.class));
        // Act
        mockManagementService.flushDeletedMocks();
        // Assert
        verify(mockRepository, times(0)).deleteAll(mocks);
    }

    @Test
    void shouldReturnNull_ForCreateMock_WhenMockNameAlreadyExists() {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        Optional<Mock> existingMock = generateOptionalMock(request);
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(existingMock);

        // Act
        verify(mockRepository, times(0)).save(any(Mock.class));

        // Assert
        assertThrows(MockAlreadyExistsException.class, () -> mockManagementService.createMock(request));
    }

    @Test
    void shouldReturnMock_ForCreateMock_WhenMockRequestIsValid() {
        // Arrange
        ProcessedMockRequest request = createMockRequestWithNullRequestValues();
        Mock expectedMock = generateMock(request);
        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockEntityStatusService.findByEntityStatus(anyString())).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.createMock(request);

        // Assert
        assertEquals(expectedMock, result);
        verify(mockTextualResponseRepository, times(1)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(1)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @Test
    void shouldReturnMock_ForCreateMock_WhenMockRequestIsValidWithRequestHeadersAndBody() {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequestWithHeadersAndBody();
        Mock expectedMock = generateMockWithHeadersAndBody(request);

        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockEntityStatusService.findByEntityStatus(anyString())).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.createMock(request);

        // Assert
        assertEquals(expectedMock, result);
        verify(mockTextualResponseRepository, times(1)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(1)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @Test
    void shouldThrowMockAlreadyExistsException_ForCreateMock_WhenMockAlreadyExists() throws Exception {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());

        doNothing().when(mockParamBuilder).setRequest(request);
        lenient().when(mockParamBuilder.httpMethod())
                .thenReturn(HttpMethod.builder().method(request.getHttpMethod()).build());
        lenient().when(mockParamBuilder.responseContentType(request.getResponseContentType()))
                .thenReturn(ResponseContentType.builder().contentType(request.getResponseContentType()).build());
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(Optional.empty());
        lenient().when(mockRepository.findUniqueMock(
                any(),
                any(),
                any(),
                any(),
                any()
        )).thenReturn(optionalMock);

        assertThrows(MockAlreadyExistsException.class, () -> mockManagementService.createMock(request));
    }

    @Test
    void shouldThrowRuntimeException_ForCreateMock_WhenExecutionFails() {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequestWithHeadersAndBody();

        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockEntityStatusService.findByEntityStatus(anyString())).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenThrow(IllegalArgumentException.class);

        // Assert
        assertThrows(RuntimeException.class, () -> mockManagementService.createMock(request));
    }

    @Test
    void shouldReturnMock_ForUpdateMock_WhenMockRequestIsValidWithTextualResponse() throws Exception {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        request.setBinaryFile(null);

        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());
        Mock expectedMock = optionalMock.get();
        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();

        doNothing().when(mockParamBuilder).setRequest(request);
        lenient().when(mockParamBuilder.httpMethod())
                .thenReturn(HttpMethod.builder().method(request.getHttpMethod()).build());
        lenient().when(mockParamBuilder.responseContentType(request.getResponseContentType()))
                .thenReturn(ResponseContentType.builder().contentType(request.getResponseContentType()).build());
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockRepository.findUniqueMock(
                request.getRoute(),
                HttpMethod.builder().method(request.getHttpMethod()).build(),
                request.getQueryParams(),
                RequestBodiesForMock.builder().requestBody(request.getRequestBody()).build(),
                RequestHeader.builder().requestHeader(request.getRequestHeader()).build()
        )).thenReturn(emptyMock);
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockEntityStatusService.getDefaultMockEntityStatus()).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.updateMock(expectedMock.getId().toString(), request);

        // Assert
        assertNotNull(result);
        assertEquals(expectedMock.getId(), result.getId());
        assertEquals(expectedMock.getRoute(), result.getRoute());
        assertEquals(expectedMock.getHttpMethod().getMethod(), result.getHttpMethod().getMethod());
        assertEquals(expectedMock.getResponseContentType().getContentType(), result.getResponseContentType().getContentType());
        assertEquals(expectedMock.getStatusCode(), result.getStatusCode());
        assertEquals(expectedMock.getQueryParams(), result.getQueryParams());
        assertEquals(expectedMock.getTextualResponse(), result.getTextualResponse());
        assertNull(result.getBinaryResponse());
        assertEquals(expectedMock.getEntityStatus().getStatus(), result.getEntityStatus().getStatus());
        assertEquals(expectedMock.getCreatedAt(), result.getCreatedAt());
        assertNotEquals(expectedMock.getUpdatedAt(), result.getUpdatedAt());
        verify(mockTextualResponseRepository, times(1)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(0)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @Test
    void shouldReturnMock_ForUpdateMock_WhenExistingMockHasNoTextualResponse() throws Exception {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        request.setBinaryFile(null);

        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());

        Mock expectedMock = optionalMock.get();
        expectedMock.setTextualResponse(null);

        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();

        doNothing().when(mockParamBuilder).setRequest(request);
        lenient().when(mockParamBuilder.httpMethod())
                .thenReturn(HttpMethod.builder().method(request.getHttpMethod()).build());
        lenient().when(mockParamBuilder.responseContentType(request.getResponseContentType()))
                .thenReturn(ResponseContentType.builder().contentType(request.getResponseContentType()).build());
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockRepository.findUniqueMock(
                request.getRoute(),
                HttpMethod.builder().method(request.getHttpMethod()).build(),
                request.getQueryParams(),
                RequestBodiesForMock.builder().requestBody(request.getRequestBody()).build(),
                RequestHeader.builder().requestHeader(request.getRequestHeader()).build()
        )).thenReturn(emptyMock);
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockEntityStatusService.getDefaultMockEntityStatus()).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.updateMock(expectedMock.getId().toString(), request);

        // Assert
        assertNotNull(result);
        assertEquals(expectedMock.getId(), result.getId());
        assertEquals(expectedMock.getRoute(), result.getRoute());
        assertEquals(expectedMock.getHttpMethod().getMethod(), result.getHttpMethod().getMethod());
        assertEquals(expectedMock.getResponseContentType().getContentType(), result.getResponseContentType().getContentType());
        assertEquals(expectedMock.getStatusCode(), result.getStatusCode());
        assertEquals(expectedMock.getQueryParams(), result.getQueryParams());
        assertNotNull(result.getTextualResponse());
        assertNull(result.getBinaryResponse());
        assertEquals(expectedMock.getEntityStatus().getStatus(), result.getEntityStatus().getStatus());
        assertEquals(expectedMock.getCreatedAt(), result.getCreatedAt());
        assertNotEquals(expectedMock.getUpdatedAt(), result.getUpdatedAt());
        verify(mockTextualResponseRepository, times(1)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(0)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @Test
    void shouldReturnMock_ForUpdateMock_WhenMockRequestIsValidWithBinaryResponse() throws Exception {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        request.setExpectedTextResponse(null);

        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());
        Mock expectedMock = optionalMock.get();
        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();

        doNothing().when(mockParamBuilder).setRequest(request);
        lenient().when(mockParamBuilder.httpMethod())
                .thenReturn(HttpMethod.builder().method(request.getHttpMethod()).build());
        lenient().when(mockParamBuilder.responseContentType(request.getResponseContentType()))
                .thenReturn(ResponseContentType.builder().contentType(request.getResponseContentType()).build());
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockRepository.findUniqueMock(
                request.getRoute(),
                HttpMethod.builder().method(request.getHttpMethod()).build(),
                request.getQueryParams(),
                RequestBodiesForMock.builder().requestBody(request.getRequestBody()).build(),
                RequestHeader.builder().requestHeader(request.getRequestHeader()).build()
        )).thenReturn(emptyMock);
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockEntityStatusService.getDefaultMockEntityStatus()).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.updateMock(expectedMock.getId().toString(), request);

        // Assert
        assertNotNull(result);
        assertEquals(expectedMock.getId(), result.getId());
        assertEquals(expectedMock.getRoute(), result.getRoute());
        assertEquals(expectedMock.getHttpMethod().getMethod(), result.getHttpMethod().getMethod());
        assertEquals(expectedMock.getResponseContentType().getContentType(), result.getResponseContentType().getContentType());
        assertEquals(expectedMock.getStatusCode(), result.getStatusCode());
        assertEquals(expectedMock.getQueryParams(), result.getQueryParams());
        assertNull(result.getTextualResponse());
        assertEquals(expectedMock.getBinaryResponse(), result.getBinaryResponse());
        assertEquals(expectedMock.getEntityStatus().getStatus(), result.getEntityStatus().getStatus());
        assertEquals(expectedMock.getCreatedAt(), result.getCreatedAt());
        assertNotEquals(expectedMock.getUpdatedAt(), result.getUpdatedAt());
        verify(mockTextualResponseRepository, times(0)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(1)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @Test
    void shouldReturnMock_ForUpdateMock_WhenExistingMockHasNoBinaryResponse() throws Exception {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        request.setExpectedTextResponse(null);

        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());

        Mock expectedMock = optionalMock.get();
        expectedMock.setBinaryResponse(null);

        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();

        doNothing().when(mockParamBuilder).setRequest(request);
        lenient().when(mockParamBuilder.httpMethod())
                .thenReturn(HttpMethod.builder().method(request.getHttpMethod()).build());
        lenient().when(mockParamBuilder.responseContentType(request.getResponseContentType()))
                .thenReturn(ResponseContentType.builder().contentType(request.getResponseContentType()).build());
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockRepository.findUniqueMock(
                request.getRoute(),
                HttpMethod.builder().method(request.getHttpMethod()).build(),
                request.getQueryParams(),
                RequestBodiesForMock.builder().requestBody(request.getRequestBody()).build(),
                RequestHeader.builder().requestHeader(request.getRequestHeader()).build()
        )).thenReturn(emptyMock);
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockEntityStatusService.getDefaultMockEntityStatus()).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenReturn(expectedMock);

        // Act
        Mock result = mockManagementService.updateMock(expectedMock.getId().toString(), request);

        // Assert
        assertNotNull(result);
        assertEquals(expectedMock.getId(), result.getId());
        assertEquals(expectedMock.getRoute(), result.getRoute());
        assertEquals(expectedMock.getHttpMethod().getMethod(), result.getHttpMethod().getMethod());
        assertEquals(expectedMock.getResponseContentType().getContentType(), result.getResponseContentType().getContentType());
        assertEquals(expectedMock.getStatusCode(), result.getStatusCode());
        assertEquals(expectedMock.getQueryParams(), result.getQueryParams());
        assertNull(result.getTextualResponse());
        assertNotNull(result.getBinaryResponse());
        assertEquals(expectedMock.getEntityStatus().getStatus(), result.getEntityStatus().getStatus());
        assertEquals(expectedMock.getCreatedAt(), result.getCreatedAt());
        assertNotEquals(expectedMock.getUpdatedAt(), result.getUpdatedAt());
        verify(mockTextualResponseRepository, times(0)).save(any(TextualResponse.class));
        verify(mockBinaryResponseRepository, times(1)).save(any(BinaryResponse.class));
        verify(mockRepository, times(1)).save(any(Mock.class));
    }

    @Test
    void shouldThrowRuntimeException_ForUpdateMock_WhenMockValidationFails() {
        // Assert when mock from DB is Null
        ProcessedMockRequest request = createProcessedMockRequest();
        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());

        Mock expectedMock = optionalMock.get();
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(null);

        // Assert when mock is not in editable state
        String mockId = expectedMock.getId().toString();
        assertThrows(RuntimeException.class, () -> mockManagementService.updateMock(mockId, request));

        optionalMock.get().setEntityStatus(EntityStatus.builder().status("DELETED").build());
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        assertThrows(RuntimeException.class, () -> mockManagementService.updateMock(mockId, request));
    }

    @Test
    void shouldThrowMockAlreadyExistsExceptionException_ForUpdateMock_WhenMockNameAlreadyExists() {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());

        Mock expectedMock = optionalMock.get();

        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(optionalMock);

        // Assert
        String mockId = expectedMock.getId().toString();
        assertThrows(MockAlreadyExistsException.class, () -> mockManagementService.updateMock(mockId, request));
    }

    @Test
    void shouldThrowMockAlreadyExistsExceptionException_ForUpdateMock_WhenMockAlreadyExists() throws Exception {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());
        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();

        doNothing().when(mockParamBuilder).setRequest(request);
        lenient().when(mockParamBuilder.httpMethod())
                .thenReturn(HttpMethod.builder().method(request.getHttpMethod()).build());
        lenient().when(mockParamBuilder.responseContentType(request.getResponseContentType()))
                .thenReturn(ResponseContentType.builder().contentType(request.getResponseContentType()).build());
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockRepository.findUniqueMock(
                any(),
                any(),
                any(),
                any(),
                any()
        )).thenReturn(optionalMock);
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockEntityStatusService.getDefaultMockEntityStatus()).thenReturn(entityStatus);

        // Assert
        assertThrows(MockAlreadyExistsException.class,
                () -> mockManagementService.updateMock(UUID.randomUUID().toString(), request));
    }

    @Test
    void shouldThrowRuntimeException_ForUpdateMock_WhenExecutionFails() throws Exception {
        // Arrange
        ProcessedMockRequest request = createProcessedMockRequest();
        Optional<Mock> optionalMock = generateOptionalMock(request);
        assertTrue(optionalMock.isPresent());
        EntityStatus entityStatus = generateDefaultEntityStatus();

        Optional<Mock> emptyMock = Optional.empty();

        doNothing().when(mockParamBuilder).setRequest(request);
        lenient().when(mockParamBuilder.httpMethod())
                .thenReturn(HttpMethod.builder().method(request.getHttpMethod()).build());
        lenient().when(mockParamBuilder.responseContentType(request.getResponseContentType()))
                .thenReturn(ResponseContentType.builder().contentType(request.getResponseContentType()).build());
        lenient().when(mockRepository.findOneByMockName(anyString())).thenReturn(emptyMock);
        lenient().when(mockRepository.findUniqueMock(
                any(),
                any(),
                any(),
                any(),
                any()
        )).thenReturn(emptyMock);
        lenient().when(mockRepository.findById(any(UUID.class))).thenReturn(optionalMock);
        lenient().when(mockEntityStatusService.getDefaultMockEntityStatus()).thenReturn(entityStatus);
        lenient().when(mockRepository.save(any(Mock.class))).thenThrow(IllegalArgumentException.class);

        // Assert
        String mockId = optionalMock.get().getId().toString();
        assertThrows(RuntimeException.class, () -> mockManagementService.updateMock(mockId, request));
    }

}
