package com.arbindo.mimock.interceptor;

import com.arbindo.mimock.generic.GenericMockRequestController;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.interceptor.responsehandler.WriterCollection;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Component
@Log4j2
public class DefaultHttpInterceptor implements HandlerInterceptor {
    private final GenericMockRequestController genericMockRequestController;
    private final WriterCollection writerCollection;

    @Autowired
    DefaultHttpInterceptor(GenericMockRequestController genericMockRequestController, WriterCollection writerCollection) {
        this.genericMockRequestController = genericMockRequestController;
        this.writerCollection = writerCollection;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();

        log.log(Level.INFO, "Intercepting request for " + path);

        return checkAndHandleAsMockRequest(request, response, path);
    }

    private boolean checkAndHandleAsMockRequest(HttpServletRequest request, HttpServletResponse response, String path) {
        log.log(Level.INFO, "Routing intercepted request to mock controller");
        Optional<DomainModelForMock> domainModelForMock = genericMockRequestController.serveRequest(
                formattedPath(path),
                request
        );

        if (domainModelForMock.isEmpty()) {
            log.log(Level.WARN, "No matching mock exists. Sending back 404");
            response.setStatus(NOT_FOUND.value());
            return false;
        }

        DomainModelForMock matchingMock = domainModelForMock.get();
        setStatusAndContentType(response, matchingMock);
        setResponseHeaders(response, matchingMock);
        writeResponse(response, matchingMock);

        return false;
    }

    private void setResponseHeaders(HttpServletResponse response, DomainModelForMock matchingMock) {
        log.log(Level.INFO, "Writing response headers");
        if (matchingMock.getResponseHeaders() != null && !matchingMock.getResponseHeaders().isEmpty()) {
            for (Map.Entry<String, Object> item : matchingMock.getResponseHeaders().entrySet()) {
                String key = item.getKey();
                response.setHeader(key, item.getValue().toString());
            }
        }
    }

    private void writeResponse(HttpServletResponse response, DomainModelForMock matchingMock) {
        try {
            log.log(Level.INFO, "Writing response the matching mock");
            writerCollection.getWriterFor(matchingMock.getTypeOfResponse()).write(matchingMock, response);
        } catch (IOException e) {
            log.log(Level.ERROR, "Response writer exited with a failure : {}", e.getMessage());
            log.log(Level.INFO, "Sending back internal server error");
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    private void setStatusAndContentType(HttpServletResponse response, DomainModelForMock matchingMock) {
        response.setStatus(matchingMock.getStatusCode());
        response.setHeader("content-type", Objects.requireNonNull(matchingMock.getResponseContentType()));
    }

    private String formattedPath(String path) {
        return path.charAt(0) == '/' ? path : "/" + path;
    }
}
