package com.arbindo.mimock.helpers.general;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.text.SimpleDateFormat;

public class JsonMapper {

    private static final String ZONED_DATE_TIME_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

    public static String convertObjectToJsonString(Object object){
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
}
