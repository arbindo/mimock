package com.arbindo.mimock.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@SuppressWarnings("unchecked")
@Log4j2
public class JSONUtils {

    public static Map<String, Object> convertJSONStringToMap(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();

        if (jsonString == null || jsonString.isBlank()) {
            log.log(Level.ERROR, "JSON string is blank");
            return null;
        }

        try {
            log.log(Level.INFO, "Generating map from JSON string");
            return objectMapper.readValue(jsonString, Map.class);
        } catch (JsonProcessingException e) {
            log.log(Level.ERROR, "Error occurred while parsing JSON string : " + e.getMessage());
            return null;
        }
    }

    public static String convertMapToJSONString(Map<String, Object> jsonMap) {
        ObjectMapper objectMapper = new ObjectMapper();

        if (jsonMap == null || jsonMap.isEmpty()) {
            log.log(Level.ERROR, "JSON map is empty");
            return null;
        }

        try {
            log.log(Level.INFO, "Generating json string from map");
            return objectMapper.writeValueAsString(jsonMap);
        } catch (JsonProcessingException e) {
            log.log(Level.ERROR, "Error occurred while converting json map to string : " + e.getMessage());
            return null;
        }
    }

    public static Map<String, Object> convertJSONStringToMapWithLowerCaseKeys(String jsonString) {
        if (jsonString == null || jsonString.isBlank()) {
            log.log(Level.ERROR, "JSON string is blank");
            return null;
        }

        return changeKeyCaseToLower(Objects.requireNonNull(convertJSONStringToMap(jsonString)));
    }

    private static Map<String, Object> changeKeyCaseToLower(Map<String, Object> jsonMap) {
        log.log(Level.INFO, "Converting map keys to lower case");
        Map<String, Object> mapWithChangedCase = new HashMap<>();
        for (Map.Entry<String, Object> header : jsonMap.entrySet()) {
            mapWithChangedCase.put(header.getKey().toLowerCase(), header.getValue());
        }

        return mapWithChangedCase;
    }
}
