package com.arbindo.mimock.utils;

public class ValidationUtil {

    public static boolean IsNotNullOrEmpty(String str) {
        return (str != null && !str.trim().isEmpty());
    }

    public static boolean IsNullOrEmpty(String str) {
        return (str == null || str.trim().isEmpty());
    }

    public static boolean IsArgNull(Object obj) {
        return obj == null;
    }

    public static boolean isArgNotNull(Object obj) {
        return obj != null;
    }
}
