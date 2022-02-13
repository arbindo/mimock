package com.arbindo.mimock.generic.helpers;

import com.arbindo.mimock.utils.JSONUtils;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

@Log4j2
@Service
public class RequestBodyParser {

    public static Map<String, Object> getRequestBody(HttpServletRequest request) throws IOException {
        log.log(Level.INFO, "Extracting request body as string from servlet request");

        try (BufferedReader bufferedReader = new BufferedReader(request.getReader())) {
            StringBuilder requestBody = new StringBuilder();
            log.log(Level.INFO, "Reading request body from buffered stream");

            String str;
            while ((str = bufferedReader.readLine()) != null) {
                requestBody.append(str);
            }

            if (requestBody.toString().isBlank()) {
                log.log(Level.INFO, "Request body is empty. Returning null");
                return null;
            }

            log.log(Level.INFO, "Returning request body string");

            return JSONUtils.convertJSONStringToMap(requestBody.toString());
        } catch (Exception e) {
            log.log(Level.ERROR, "Error occurred while reading request body : " + e.getMessage());
            return null;
        }
    }
}
