package com.arbindo.mimock.interceptor.responsehandler;

import com.arbindo.mimock.generic.model.DomainModelForMock;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface ResponseWriter {
    void write(DomainModelForMock matchingMock, HttpServletResponse response) throws IOException;
}
