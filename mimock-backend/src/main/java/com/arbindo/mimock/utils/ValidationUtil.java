package com.arbindo.mimock.utils;

public class ValidationUtil {

    public static boolean isNotNullOrEmpty(String str) {
        return (str != null && !str.trim().isEmpty());
    }

    public static boolean isNullOrEmpty(String str) {
        return (str == null || str.trim().isEmpty());
    }

    public static boolean isArgNull(Object obj) {
        return obj == null;
    }

    public static boolean isArgNotNull(Object obj) {
        return obj != null;
    }
}
