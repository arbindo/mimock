package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.repository.MocksRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.generateMocksPageable;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class SearchMocksServiceTest {

    @org.mockito.Mock
    MocksRepository mockRepository;

    SearchMocksService searchMocksService;

    @BeforeEach
    void setupMock(){
        this.searchMocksService = SearchMocksServiceImpl.builder()
                .mocksRepository(mockRepository)
                .build();
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNull_WhenSearchColumnStringIsNullOrEmpty(String searchColumnString) {
        // Act
        Page<Mock> result = searchMocksService.searchMocks(Pageable.unpaged(), searchColumnString, "randomQuery");

        // Assert
        assertNull(result);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Test", "UUID", "RandomString"})
    void shouldReturnNull_WhenSearchColumnIsInvalid(String searchColumnString) {
        // Act
        Page<Mock> result = searchMocksService.searchMocks(Pageable.unpaged(), searchColumnString, "randomQuery");

        // Assert
        assertNull(result);
    }

    @ParameterizedTest
    @ValueSource(strings = {"NAME", "DESCRIPTION", "ROUTE"})
    void shouldReturnNull_WhenSearchColumnIsValid_ReturnMocksAsPageable(String searchColumnString) {
        // Arrange
        Page<Mock> expectedMocksFromDB = generateMocksPageable();
        lenient().when(mockRepository.findAllByMockNameIgnoreCaseContaining(anyString(), any(Pageable.class)))
                .thenReturn(expectedMocksFromDB);
        lenient().when(mockRepository.findAllByDescriptionIgnoreCaseContaining(anyString(), any(Pageable.class)))
                .thenReturn(expectedMocksFromDB);
        lenient().when(mockRepository.findAllByRouteIgnoreCaseContaining(anyString(), any(Pageable.class)))
                .thenReturn(expectedMocksFromDB);

        // Act
        Page<Mock> result = searchMocksService.searchMocks(Pageable.unpaged(), searchColumnString, "randomQuery");

        // Assert
        assertNotNull(result);
        assertEquals(expectedMocksFromDB, result);
    }
}
