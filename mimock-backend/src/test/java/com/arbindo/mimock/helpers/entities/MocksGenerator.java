package com.arbindo.mimock.helpers.entities;

import com.arbindo.mimock.entities.Mock;

import java.util.ArrayList;
import java.util.List;

import static com.arbindo.mimock.helpers.general.RandomDataGenerator.*;

public class MocksGenerator {

    public static List<Mock> GenerateListOfMocks(){
        return GenerateListOfMocks(10);
    }

    public static List<Mock> GenerateListOfMocks(int count){
        List<Mock> mockList = new ArrayList<>();
        for (int i=0; i<count; i++) {
            mockList.add(GenerateMock());
        }
        return mockList;
    }

    public static Mock GenerateMock(){
        return Mock.builder()
                .id(GenerateRandomUUID())
                .route(GenerateRandomAlphanumericString(10))
                .httpMethod(null)
                .responseContentType(null)
                .queryParams(GenerateRandomAlphanumericString(10))
                .description(GenerateRandomAlphanumericString(10))
                .statusCode(GenerateRandomNumber())
                .textualResponse(null)
                .binaryResponse(null)
                .build();
    }
}
