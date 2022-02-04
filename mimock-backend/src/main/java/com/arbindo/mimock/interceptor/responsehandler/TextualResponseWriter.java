package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Log4j2
public class TextualResponseWriter implements ResponseWriter {
    @Override
    public void write(DomainModelForMock matchingMock, HttpServletResponse response) throws IOException {
        log.log(Level.INFO, "Writing textual response body");

        PrintWriter writer = response.getWriter();
        writer.write(matchingMock.getResponseBody().toString());
    }
}
