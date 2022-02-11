package com.arbindo.mimock.generic.helpers;

import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Service
@Log4j2
public class RequestHeaderParser {

    public static Map<String, Object> getHeaderMap(HttpServletRequest request) {
        Enumeration<String> headerNames = request.getHeaderNames();
        Map<String, Object> headerMap = new HashMap<>();

        if (headerNames == null || !headerNames.hasMoreElements()) {
            log.log(Level.INFO, "Request has no headers");
            return null;
        }

        log.log(Level.INFO, "Request has headers. Mapping headers to new map");
        while (headerNames.hasMoreElements()) {
            String header = headerNames.nextElement();
            headerMap.put(header, request.getHeader(header));
        }

        log.log(Level.INFO, "Returning sorted headers");
        return new TreeMap<>(headerMap);
    }

}
