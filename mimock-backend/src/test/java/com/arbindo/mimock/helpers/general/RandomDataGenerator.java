package com.arbindo.mimock.helpers.general;

import org.apache.commons.lang3.RandomStringUtils;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

public class RandomDataGenerator {

    private static final Random RANDOM = new Random();

    public static UUID generateRandomUUID() {
        return UUID.randomUUID();
    }

    public static String generateRandomAlphanumericString() {
        return generateRandomAlphanumericString(10);
    }

    public static String generateRandomAlphanumericString(int length) {
        return RandomStringUtils.randomAlphanumeric(length);
    }

    public static String generateRandomAlphabeticString() {
        return generateRandomAlphabeticString(10);
    }

    public static String generateRandomAlphabeticString(int length) {
        return RandomStringUtils.randomAlphabetic(length);
    }

    public static int generateRandomNumber() {
        return RANDOM.nextInt(10000);
    }

    public static int generateRandomNumber(int bound) {
        return RANDOM.nextInt(bound);
    }

    public static String generateUniqueMockName() {
        return "MockName" + "-" + generateRandomAlphanumericString(5) + "-" + Instant.now().toEpochMilli();
    }

    public static Map<String, Object> getRequestHeaders() {
        Map<String, Object> headers = new HashMap<>();

        headers.put("Content-type", "application/json");
        headers.put("Authorization", UUID.randomUUID().toString());

        return headers;
    }

    public static Map<String, Object> getResponseHeaders() {
        Map<String, Object> headers = new HashMap<>();

        headers.put("x-api-trace", UUID.randomUUID().toString());
        headers.put("x-user-token", UUID.randomUUID().toString());

        return headers;
    }
}
