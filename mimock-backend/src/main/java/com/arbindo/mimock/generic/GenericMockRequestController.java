package com.arbindo.mimock.generic;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;

@RestController
@Log4j2
@AllArgsConstructor
public class GenericMockRequestController {

    @Autowired
    GenericMockRequestService genericMockRequestService;

    @RequestMapping("/{basePath}/**")
    public ResponseEntity<Object> serveRequest(@PathVariable String basePath, HttpServletRequest request) {
        final String path = getPath(request);
        final String bestMatchingPattern = getBestMatchingPattern(request);

        StringBuilder queryParamAndValue = genericMockRequestService.extractQueryParams(request);

        String requestMethod = request.getMethod();
        String pathParams = new AntPathMatcher().extractPathWithinPattern(bestMatchingPattern, path);
        String fullPath = generateFullPath(basePath, pathParams);
        String fullPathWithQueryParams = fullPathWithQueryParams(fullPath, queryParamAndValue.toString());

        log.log(Level.INFO, String.format("Handling mock request for [%s] : %s", requestMethod, fullPathWithQueryParams));

        GenericRequestModel mockRequest = generateMockRequest(requestMethod, fullPath, queryParamAndValue);

        try {
            DomainModelForMock mock = genericMockRequestService.serveMockRequest(mockRequest);
            return ResponseEntity
                    .status(mock.getStatusCode())
                    .contentType(MediaType.valueOf(mock.getResponseContentType()))
                    .body(mock.getResponseBody());
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    private GenericRequestModel generateMockRequest(String requestMethod, String fullPath, StringBuilder queryParamAndValue) {
        return GenericRequestModel.builder()
                .httpMethod(requestMethod)
                .queryParam(queryParamAndValue.toString())
                .route(fullPath)
                .build();
    }

    private String generateFullPath(String basePath, String pathParamMatchingPattern) {
        String fullPath;
        String FORWARD_SLASH = "/";

        if (!pathParamMatchingPattern.isEmpty()) {
            fullPath = FORWARD_SLASH + basePath + FORWARD_SLASH + pathParamMatchingPattern;
        } else {
            fullPath = basePath;
        }

        return fullPath;
    }

    private String fullPathWithQueryParams(String fullPath, String queryParamAndValue) {
        if (queryParamAndValue.length() != 0) {
            fullPath = fullPath + "?" + queryParamAndValue;
        }

        return fullPath;
    }

    private String getBestMatchingPattern(HttpServletRequest request) {
        return request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE).toString();
    }

    private String getPath(HttpServletRequest request) {
        return request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();
    }
}
