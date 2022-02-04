package com.arbindo.mimock.interceptor;

import com.arbindo.mimock.generic.GenericMockRequestController;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.generic.model.ResponseType;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Component
@Log4j2
public class DefaultHttpInterceptor implements HandlerInterceptor {
    @Autowired
    GenericMockRequestController genericMockRequestController;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();

        log.log(Level.INFO, "Intercepting request for " + path);

        return checkAndHandleAsMockRequest(request, response, path);
    }

    private boolean checkAndHandleAsMockRequest(HttpServletRequest request, HttpServletResponse response, String path) throws IOException {
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
        setStatusAndMethod(response, matchingMock);

        // TODO: Handle NULL response body
        if (isTextualResponse(matchingMock)) {
            PrintWriter writer = response.getWriter();
            writer.write(matchingMock.getResponseBody().toString());
        } else {
            ServletOutputStream outputStream = response.getOutputStream();
            outputStream.write((byte[]) matchingMock.getResponseBody());
        }
        return false;
    }

    private void setStatusAndMethod(HttpServletResponse response, DomainModelForMock matchingMock) {
        response.setStatus(matchingMock.getStatusCode());
        response.setHeader("content-type", Objects.requireNonNull(matchingMock.getResponseType()).toString());
    }

    private boolean isTextualResponse(DomainModelForMock matchingMock) {
        return matchingMock.getResponseType() == ResponseType.TEXTUAL_RESPONSE;
    }

    private String formattedPath(String path) {
        return path.charAt(0) == '/' ? path : "/" + path;
    }
}
