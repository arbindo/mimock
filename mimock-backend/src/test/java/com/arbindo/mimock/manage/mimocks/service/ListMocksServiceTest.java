package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.common.services.EntityStatusService;
import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.arbindo.mimock.manage.mimocks.service.helpers.MockParamBuilder;
import com.arbindo.mimock.repository.MocksRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static com.arbindo.mimock.helpers.entities.MocksGenerator.generateHttpMethod;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class ListMocksServiceTest {

    @org.mockito.Mock
    MocksRepository mockRepository;

    @org.mockito.Mock
    EntityStatusService mockEntityStatusService;

    @org.mockito.Mock
    MockParamBuilder mockParamBuilder;

    ListMocksService listMocksService;

    @BeforeEach
    void setupMock() {
        this.listMocksService = ListMocksServiceImpl.builder()
                .mocksRepository(mockRepository)
                .mockParamBuilder(mockParamBuilder)
                .entityStatusService(mockEntityStatusService)
                .build();
    }

    @Test
    void shouldReturnListOfMocks_WhenDBHasMocks() {
        // Arrange
        List<Mock> mockList = generateListOfMocks();
        lenient().when(mockRepository.findAll()).thenReturn(mockList);

        // Act
        List<Mock> result = listMocksService.getAllMocks();

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
        List<Mock> result = listMocksService.getAllMocks();

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
        List<Mock> result = listMocksService.getAllMocks();

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
        Page<Mock> result = listMocksService.getMocksAsPageable(Pageable.unpaged(), Status.NONE, null, null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(1)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class));
        verify(mockEntityStatusService, times(1)).findByEntityStatus(anyString());
    }

    @Test
    void shouldReturnNonFilteredListOfMocks_WhenEntityStatusIsInvalid() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();

        lenient().when(mockRepository.findAll(any(Pageable.class))).thenReturn(pageable);
        lenient().when(mockEntityStatusService.findByEntityStatus(anyString())).thenReturn(null);

        // Act
        Page<Mock> result = listMocksService.getMocksAsPageable(Pageable.unpaged(), Status.NONE, null, null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAll(any(Pageable.class));
        verify(mockEntityStatusService, times(1)).findByEntityStatus(anyString());
    }

    @Test
    void shouldReturnNonFilteredListOfMocks_WhenStatusParameterIsNull() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();

        lenient().when(mockRepository.findAll(any(Pageable.class))).thenReturn(pageable);

        // Act
        Page<Mock> result = listMocksService.getMocksAsPageable(Pageable.unpaged(), null, null, null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAll(any(Pageable.class));
        verify(mockEntityStatusService, times(0)).findByEntityStatus(anyString());
    }

    @Test
    void shouldReturnFilteredListOfMocks_WhenHttpMethodIsValid() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();
        HttpMethod httpMethod = generateHttpMethod();

        lenient().when(mockRepository.findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class)))
                .thenReturn(pageable);
        lenient().when(mockParamBuilder.findHttpMethodFromQueryString(anyString())).thenReturn(httpMethod);

        // Act
        Page<Mock> result = listMocksService.getMocksAsPageable(Pageable.unpaged(), Status.NONE, "GET", null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class));
        verify(mockParamBuilder, times(1)).findHttpMethodFromQueryString(anyString());
    }

    @Test
    void shouldReturnNonFilteredListOfMocks_WhenHttpMethodIsInvalid() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();

        lenient().when(mockRepository.findAll(any(Pageable.class))).thenReturn(pageable);
        lenient().when(mockParamBuilder.findHttpMethodFromQueryString(anyString())).thenReturn(null);

        // Act
        Page<Mock> result = listMocksService.getMocksAsPageable(Pageable.unpaged(), Status.NONE, "GET", null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAll(any(Pageable.class));
        verify(mockParamBuilder, times(1)).findHttpMethodFromQueryString(anyString());
    }

    @Test
    void shouldReturnNonFilteredListOfMocks_WhenStatusHttpMethodAndExpectedResponseTypeParametersAreNull() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();

        lenient().when(mockRepository.findAll(any(Pageable.class))).thenReturn(pageable);

        // Act
        Page<Mock> result = listMocksService.getMocksAsPageable(Pageable.unpaged(), null, null, null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAll(any(Pageable.class));
        verify(mockEntityStatusService, times(0)).findByEntityStatus(anyString());
        verify(mockParamBuilder, times(0)).findHttpMethodFromQueryString(anyString());
    }

    @Test
    void shouldReturnFilteredListOfMocks_WhenStatusAndHttpMethodIsValid() {
        // Arrange
        Page<Mock> pageable = generateMocksPageable();
        EntityStatus entityStatus = generateDefaultEntityStatus();
        HttpMethod httpMethod = generateHttpMethod();

        lenient().when(mockRepository.findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class)))
                .thenReturn(pageable);
        lenient().when(mockEntityStatusService.findByEntityStatus(anyString())).thenReturn(entityStatus);
        lenient().when(mockParamBuilder.findHttpMethodFromQueryString(anyString())).thenReturn(httpMethod);

        // Act
        Page<Mock> result = listMocksService.getMocksAsPageable(Pageable.unpaged(), Status.NONE, "GET", null);

        // Assert
        assertEquals(pageable.getTotalElements(), result.getTotalElements());

        verify(mockRepository, times(0)).findAllByEntityStatus(any(EntityStatus.class), any(Pageable.class));
        verify(mockRepository, times(0)).findAllByHttpMethod(any(HttpMethod.class), any(Pageable.class));
        verify(mockRepository, times(1)).findAllByEntityStatusAndHttpMethod(any(EntityStatus.class), any(HttpMethod.class), any(Pageable.class));
        verify(mockEntityStatusService, times(1)).findByEntityStatus(anyString());
        verify(mockParamBuilder, times(1)).findHttpMethodFromQueryString(anyString());
    }
}
