package com.arbindo.mimock.utils;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class JSONUtilsTest {

    @ParameterizedTest
    @ValueSource(strings = {
            "{ \"id\": 1, \"purpose\": \"Just for testing\", \"enable_auto\": true }",
            "{ \"id\": 1, \"purpose\": \"Just for testing\", \"enable_auto\": true, \"big_array\": [1, 2, 4], \"another_obj\": { \"key\": 12} }",
            "{ \"id\": 1}",
            "{}"
    })
    void shouldConvertJSONStringToMap_WhenValidJSONStringValuesArePassed(String jsonString) {
        Map<String, Object> jsonMap = JSONUtils.convertJSONStringToMap(jsonString);

        assertNotNull(jsonMap);
    }

    @Test
    void shouldConvertJSONStringToMap_WhenValidJSONStringIsPassed() {
        String jsonString = "{ \"id\": 1, \"purpose\": \"Just for testing\", \"enable_auto\": true }";
        Map<String, Object> jsonMap = JSONUtils.convertJSONStringToMap(jsonString);

        assertNotNull(jsonMap);

        assertEquals(1, jsonMap.get("id"));
        assertEquals("Just for testing", jsonMap.get("purpose"));
        assertEquals(true, jsonMap.get("enable_auto"));
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "{ \"id\": 1, \"purpose\": \"Just for testing\", \"enable_auto\": true ",
            "{ \"id\": 1, \"}",
            "{'key': 1}",
            "{\"key\": '1'}",
            "{key: 1}",
            ""
    })
    void shouldReturnNull_onConvertJSONStringToMap_WhenInValidJSONStringValuesArePassed(String jsonString) {
        Map<String, Object> jsonMap = JSONUtils.convertJSONStringToMap(jsonString);

        assertNull(jsonMap);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "{\"id\":1,\"purpose\":\"Just for testing\",\"enable_auto\":true}",
            "{\"id\":1}",
            "{\"id\":null}"
    })
    void shouldConvertMapToJSONString_WhenValidJSONMapsArePassed(String jsonString) {
        Map<String, Object> jsonMap = JSONUtils.convertJSONStringToMap(jsonString);

        String actualJSONString = JSONUtils.convertMapToJSONString(jsonMap);

        assertEquals(jsonString, actualJSONString);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "",
            "{}"
    })
    void shouldReturnNull_onConvertMapToJSONString_WhenInValidJSONMapsArePassed(String jsonString) {
        Map<String, Object> jsonMap = JSONUtils.convertJSONStringToMap(jsonString);

        String actualJSONString = JSONUtils.convertMapToJSONString(jsonMap);

        assertNull(actualJSONString);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "{ \"id\": 1, \"purpose\": \"Just for testing\", \"enable_auto\": true }",
            "{ \"Id\": 1, \"purpose\": \"Just for testing\", \"Enable_auto\": true, \"BIG_ARRAY\": [1, 2, 4], \"another_obj\": { \"key\": 12} }",
            "{ \"id\": 1}",
            "{\"Content-Type\": \"application/json\", \"Accept\": \"application/json\", \"Content-Disposition\": 0}",
            "{}"
    })
    void shouldConvertJSONStringToMapWithLowerCaseKeys_WhenValidJSONStringValuesArePassed(String jsonString) {
        Map<String, Object> jsonMap = JSONUtils.convertJSONStringToMapWithLowerCaseKeys(jsonString);

        assertNotNull(jsonMap);
    }

    @Test
    void shouldConvertJSONStringToMapWithLowerCaseKeys_WhenValidJSONStringIsPassed() {
        String jsonString = "{\"Content-Type\": \"application/json\", \"Accept\": \"application/json\", \"Content-Disposition\": 0}";
        Map<String, Object> jsonMap = JSONUtils.convertJSONStringToMapWithLowerCaseKeys(jsonString);

        assertNotNull(jsonMap);

        assertEquals("application/json", jsonMap.get("content-type"));
        assertEquals("application/json", jsonMap.get("accept"));
        assertEquals(0, jsonMap.get("content-disposition"));
    }
}