package com.arbindo.mimock.utils;

import com.arbindo.mimock.common.constants.ExceptionMessages;

public class ValidationUtil {

    private ValidationUtil() throws IllegalAccessException {
        throw new IllegalAccessException(ExceptionMessages.ILLEGAL_INSTANTIATION_EXCEPTION_MSG);
    }

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
