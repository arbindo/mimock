package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class EmptyResponseWriter implements ResponseWriter {
    @Override
    public void write(DomainModelForMock matchingMock, HttpServletResponse response) throws IOException {
        log.log(Level.INFO, "Skipping response writing stage and closing response writer");

        response.getWriter().close();
    }
}
