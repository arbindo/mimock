package com.arbindo.mimock.generic.helpers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class RequestHeaderComparatorTest {

    @Test
    void shouldReturnTrue_WhenExactMatchSwitchIsTrue_And_HeadersMatchExactly() {
        Map<String, Object> header1 = new HashMap<>();
        header1.put("Content-type", "application/json");
        header1.put("x-api-trace", "sc2ecsdcsd");
        header1.put("x-promotion-id", 123);
        header1.put("x-is-user-authorised", false);

        Map<String, Object> header2 = new HashMap<>();
        header2.put("x-promotion-id", 123);
        header2.put("Content-type", "application/json");
        header2.put("x-is-user-authorised", false);
        header2.put("x-api-trace", "sc2ecsdcsd");

        RequestHeaderComparator requestHeaderComparator = RequestHeaderComparator.builder()
                .headersFromMock(header1)
                .headersFromRequest(header2)
                .build();

        Boolean doesMockHaveMatchingHeaders = requestHeaderComparator.doesMockHaveMatchingHeaders(true);

        assertTrue(doesMockHaveMatchingHeaders);
    }

    @Test
    void shouldReturnFalse_WhenExactMatchSwitchIsTrue_And_HeadersDoNotMatchExactly() {
        Map<String, Object> header1 = new HashMap<>();
        header1.put("Content-type", "application/json");
        header1.put("x-api-trace", "sc2ecsdcsd");
        header1.put("x-promotion-id", 123);
        header1.put("x-is-user-authorised", true);

        Map<String, Object> header2 = new HashMap<>();
        header2.put("x-promotion-id", 123);
        header2.put("Content-type", "application/json");
        header2.put("x-is-user-authorised", false);
        header2.put("x-api-trace", "sc2ecsdcsd");

        RequestHeaderComparator requestHeaderComparator = RequestHeaderComparator.builder()
                .headersFromMock(header1)
                .headersFromRequest(header2)
                .build();

        Boolean doesMockHaveMatchingHeaders = requestHeaderComparator.doesMockHaveMatchingHeaders(true);

        assertFalse(doesMockHaveMatchingHeaders);
    }

    @Test
    void shouldReturnFalse_WhenExactMatchSwitchIsTrue_And_HeadersDoNotHaveSameHeaders() {
        Map<String, Object> header1 = new HashMap<>();
        header1.put("x-some-header", "test");
        header1.put("x-is-user-available", true);

        Map<String, Object> header2 = new HashMap<>();
        header2.put("x-promotion-id", 123);
        header2.put("Content-type", "application/json");
        header2.put("x-is-user-authorised", false);
        header2.put("x-api-trace", "sc2ecsdcsd");

        RequestHeaderComparator requestHeaderComparator = RequestHeaderComparator.builder()
                .headersFromMock(header1)
                .headersFromRequest(header2)
                .build();

        Boolean doesMockHaveMatchingHeaders = requestHeaderComparator.doesMockHaveMatchingHeaders(true);

        assertFalse(doesMockHaveMatchingHeaders);
    }

    @Test
    void shouldReturnTrue_WhenExactMatchSwitchIsFalse_And_HeadersHaveAtLeastOneMatchingHeader() {
        Map<String, Object> header1 = new HashMap<>();
        header1.put("x-promotion-id", 123);

        Map<String, Object> header2 = new HashMap<>();
        header2.put("Content-type", "application/json");
        header2.put("x-is-user-authorised", false);
        header2.put("x-api-trace", "sc2ecsdcsd");
        header2.put("x-promotion-id", 123);

        RequestHeaderComparator requestHeaderComparator = RequestHeaderComparator.builder()
                .headersFromMock(header1)
                .headersFromRequest(header2)
                .build();

        Boolean doesMockHaveMatchingHeaders = requestHeaderComparator.doesMockHaveMatchingHeaders(false);

        assertTrue(doesMockHaveMatchingHeaders);
    }

    @Test
    void shouldReturnTrue_WhenExactMatchSwitchIsFalse_And_HeadersHaveNoMatchingFields() {
        Map<String, Object> header1 = new HashMap<>();
        header1.put("x-promotion-id", 123);

        Map<String, Object> header2 = new HashMap<>();
        header2.put("Content-type", "application/json");
        header2.put("x-is-user-authorised", false);
        header2.put("x-api-trace", "sc2ecsdcsd");

        RequestHeaderComparator requestHeaderComparator = RequestHeaderComparator.builder()
                .headersFromMock(header1)
                .headersFromRequest(header2)
                .build();

        Boolean doesMockHaveMatchingHeaders = requestHeaderComparator.doesMockHaveMatchingHeaders(false);

        assertFalse(doesMockHaveMatchingHeaders);
    }
}