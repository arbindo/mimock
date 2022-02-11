package com.arbindo.mimock.generic.helpers;

import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

@Log4j2
@Service
public class RequestBodyParser {

    public static String getRequestBody(HttpServletRequest request) throws IOException {
        log.log(Level.INFO, "Extracting request body as string from servlet request");
        BufferedReader bufferedReader = null;

        try {
            log.log(Level.INFO, "Reading request body from buffered stream");
            bufferedReader = request.getReader();
            String requestBody = bufferedReader.readLine();

            log.log(Level.INFO, "Returning request body string");
            return requestBody;
        } catch (Exception e) {
            log.log(Level.ERROR, "Error occurred while reading request body : " + e.getMessage());
            return null;
        } finally {
            if (bufferedReader != null) bufferedReader.close();
        }
    }
}
