package com.arbindo.mimock.managemocks;

public class ValidationUtil {

    public static boolean IsNotNullOrEmpty(String str){
        return (str != null && !str.trim().isEmpty());
    }

    public static boolean IsArgNull(Object obj){
        return obj == null;
    }
}
