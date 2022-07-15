package com.arbindo.mimock.utils;

import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;

@Log4j2
public class TimeTokenParser {
    private static final long DEFAULT_DURATION = 3600L;

    private enum TimeMetrics {
        YEAR('y', 365 * 24),
        MONTH('M', 30 * 24),
        WEEK('w', 7 * 24),
        DAY('d', 24),
        HOUR('h', 1),
        MINUTE('m', 1.0 / 60.0),
        SECOND('s', 1.0 / 3600.0);

        char token;
        double hourValue;

        TimeMetrics(char token, double hourValue) {
            this.token = token;
            this.hourValue = hourValue;
        }
    }

    public static long durationInSeconds(String timeToken) {
        try {
            char token = timeToken.charAt(timeToken.length() - 1);
            long convertedDuration = Long.parseLong(getDurationFrom(timeToken));

            for (TimeMetrics timeMetric : TimeMetrics.values()) {
                if (timeMetric.token == token) {
                    return (long) (convertedDuration * timeMetric.hourValue * 3600);
                }
            }
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
        }

        return DEFAULT_DURATION;
    }

    private static String getDurationFrom(String timeToken) {
        return timeToken.substring(0, timeToken.length() - 1);
    }
}
