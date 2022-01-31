package com.arbindo.mimock.helpers.general;

import org.apache.commons.lang3.RandomStringUtils;

import java.util.Random;
import java.util.UUID;

public class RandomDataGenerator {

    private static final Random random = new Random();

    public static UUID GenerateRandomUUID(){
        return UUID.randomUUID();
    }

    public static String GenerateRandomAlphanumericString(){
        return GenerateRandomAlphanumericString(10);
    }

    public static String GenerateRandomAlphanumericString(int length){
       return RandomStringUtils.randomAlphanumeric(length);
    }

    public static String GenerateRandomAlphabeticString(){
        return GenerateRandomAlphabeticString(10);
    }

    public static String GenerateRandomAlphabeticString(int length){
        return RandomStringUtils.randomAlphabetic(length);
    }

    public static int GenerateRandomNumber(){
        return random.nextInt();
    }


}
