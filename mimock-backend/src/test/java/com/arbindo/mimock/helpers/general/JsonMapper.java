package com.arbindo.mimock.helpers.general;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class JsonMapper {
    public static String convertObjectToJsonString(Object object){
        ObjectWriter ow = new ObjectMapper().writer();
        try {
            return ow.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
