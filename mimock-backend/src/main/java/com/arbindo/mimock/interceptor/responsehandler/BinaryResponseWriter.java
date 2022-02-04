package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class BinaryResponseWriter implements ResponseWriter {
    @Override
    public void write(DomainModelForMock matchingMock, HttpServletResponse response) throws IOException {
        log.log(Level.INFO, "Writing binary response body");

        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write((byte[]) matchingMock.getResponseBody());
    }
}
