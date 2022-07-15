package com.arbindo.mimock.utils;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

import java.util.stream.Stream;

@SpringBootTest
public class TimeTokenParserTest {
    private static Stream<Arguments> provideParameters() {
        return Stream.of(
                Arguments.of("2s", 2L),
                Arguments.of("5h", 18000L),
                Arguments.of("55m", 3300L),
                Arguments.of("5hrs", 3600L),
                Arguments.of("32", 3600L),
                Arguments.of("3.2h", 3600L)
        );
    }

    @ParameterizedTest
    @MethodSource("provideParameters")
    public void shouldConvertTokenToDurationInSeconds(String token, long expectedDuration) {
        long convertedTime = TimeTokenParser.durationInSeconds(token);

        assertEquals(expectedDuration, convertedTime);
    }
}
