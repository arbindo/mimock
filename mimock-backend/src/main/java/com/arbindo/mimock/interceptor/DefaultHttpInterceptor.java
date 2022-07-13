package com.arbindo.mimock.interceptor;

import com.arbindo.mimock.generic.GenericMockRequestController;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.interceptor.responsehandler.WriterCollection;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Component
@Log4j2
public class DefaultHttpInterceptor implements HandlerInterceptor {
    private final GenericMockRequestController genericMockRequestController;
    private final WriterCollection writerCollection;

    @Value("#{'${app.security.cors-config.allowed-origins}'.split(',')}")
    private List<String> corsAllowedOrigins;

    @Value("#{'${app.security.cors-config.allowed-methods}'.split(',')}")
    private List<String> corsAllowedMethods;

    @Value("#{'${app.security.cors-config.allowed-headers}'.split(',')}")
    private List<String> corsAllowedHeaders;

    @Value("#{'${app.security.cors-config.exposed-headers}'.split(',')}")
    private List<String> corsExposedHeaders;

    @Autowired
    DefaultHttpInterceptor(GenericMockRequestController genericMockRequestController, WriterCollection writerCollection) {
        this.genericMockRequestController = genericMockRequestController;
        this.writerCollection = writerCollection;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();

        log.log(Level.INFO, "Intercepting request for " + path);

        if (request.getMethod().equals(HttpMethod.OPTIONS.toString())) {
            log.log(Level.WARN, "Method is {}. Considering as preflight request", request.getMethod());
            handleAsPreflightRequest(request, response);
            return false;
        }

        return checkAndHandleAsMockRequest(request, response, path);
    }

    private String getOrigin(HttpServletRequest request) {
        String requestOrigin = request.getHeader("Origin");
        for (String origin : corsAllowedOrigins) {
            if (origin.equals(requestOrigin)) {
                return origin;
            }
        }
        return "";
    }

    private void handleAsPreflightRequest(HttpServletRequest request, HttpServletResponse response) {
        setPreflightHeaders(response, getOrigin(request));
        response.setStatus(HttpStatus.OK.value());
    }

    private boolean checkAndHandleAsMockRequest(HttpServletRequest request, HttpServletResponse response, String path) {
        log.log(Level.INFO, "Routing intercepted request to mock controller");
        Optional<DomainModelForMock> domainModelForMock = genericMockRequestController.serveRequest(
                formattedPath(path),
                request
        );

        if (domainModelForMock.isEmpty()) {
            log.log(Level.WARN, "No matching mock exists. Sending back 404");
            writeErrorResponse(response);
            return false;
        }

        DomainModelForMock matchingMock = domainModelForMock.get();
        setStatusAndContentType(response, matchingMock);
        setResponseHeaders(request, response, matchingMock);
        writeResponse(response, matchingMock);

        return false;
    }

    private void setResponseHeaders(HttpServletRequest request, HttpServletResponse response, DomainModelForMock matchingMock) {
        log.log(Level.INFO, "Writing response headers");
        if (matchingMock.getResponseHeaders() != null && !matchingMock.getResponseHeaders().isEmpty()) {
            for (Map.Entry<String, Object> item : matchingMock.getResponseHeaders().entrySet()) {
                String key = item.getKey();
                response.setHeader(key, item.getValue().toString());
            }
        }
        setPreflightHeaders(response, getOrigin(request));
    }

    private void setPreflightHeaders(HttpServletResponse response, String origin) {
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Methods", String.join("", corsAllowedMethods));
        response.setHeader("Access-Control-Expose-Headers", String.join("", corsExposedHeaders));
    }

    private void writeResponse(HttpServletResponse response, DomainModelForMock matchingMock) {
        try {
            log.log(Level.INFO, "Writing response for the matching mock");
            writerCollection.getWriterFor(matchingMock.getTypeOfResponse()).write(matchingMock, response);
        } catch (IOException e) {
            log.log(Level.ERROR, "Response writer exited with a failure : {}", e.getMessage());
            log.log(Level.INFO, "Sending back internal server error");
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    private void writeErrorResponse(HttpServletResponse response) {
        try {
            log.log(Level.INFO, "Writing error response");
            PrintWriter writer = response.getWriter();
            response.setStatus(NOT_FOUND.value());
            if (writer == null) {
                return;
            }
            String errorMessage = "<body>" +
                    "<h2>There are no matching mocks available</h2>" +
                    "<p>If you have setup a mock for this endpoint, please check the following,</p>" +
                    "<p>1. Check if query params are correct</p>" +
                    "<p>2. Check if request headers are correct</p>" +
                    "<p>3. Check if request body is correct</p>" +
                    "<p>4. Mock is in ACTIVE state (not ARCHIVED or DELETED)</p>" +
                    "</body>";

            writer.write(errorMessage);
            writer.close();
        } catch (IOException e) {
            log.log(Level.ERROR, "Error response writer exited with a failure : {}", e.getMessage());
            response.setStatus(NOT_FOUND.value());
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
