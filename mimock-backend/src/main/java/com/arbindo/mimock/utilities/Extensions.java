package com.arbindo.mimock.utilities;

public class Extensions {

    public static boolean IsNotNullOrEmpty(String str){
        return (str != null && !str.trim().isEmpty());
    }

    public static boolean IsArgNotNull(Object obj){
        return obj != null;
    }

    public static boolean IsArgNull(Object obj){
        return obj == null;
    }
}
