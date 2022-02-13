package com.arbindo.mimock.helpers.general;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@SuppressWarnings("unchecked")
public class JsonMapper {

    private static final String ZONED_DATE_TIME_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

    public static String convertObjectToJsonString(Object object) {
        ObjectMapper objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule());
        objectMapper.setDateFormat(new SimpleDateFormat(ZONED_DATE_TIME_PATTERN));

        ObjectWriter ow = objectMapper.writer();
        try {
            return ow.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String convertMapToJsonString(Map<String, Object> jsonMap) {
        ObjectMapper objectMapper = new ObjectMapper();

        if (jsonMap == null) {
            return null;
        }

        try {
            return objectMapper.writeValueAsString(jsonMap);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Map<String, Object> convertJSONStringToMap(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();

        if (jsonString == null) {
            return null;
        }

        try {
            return objectMapper.readValue(jsonString, Map.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Map<String, Object> convertJSONStringToMapWithLowerCaseKeys(String jsonString) {
        return changeKeyCaseToLower(Objects.requireNonNull(convertJSONStringToMap(jsonString)));
    }

    private static Map<String, Object> changeKeyCaseToLower(Map<String, Object> jsonMap) {
        Map<String, Object> mapWithChangedCase = new HashMap<>();
        for (Map.Entry<String, Object> header : jsonMap.entrySet()) {
            mapWithChangedCase.put(header.getKey().toLowerCase(), header.getValue());
        }

        return mapWithChangedCase;
    }
}
