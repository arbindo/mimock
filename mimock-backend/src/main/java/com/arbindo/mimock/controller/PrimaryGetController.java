package com.arbindo.mimock.controller;

import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;
import org.yaml.snakeyaml.util.UriEncoder;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

// TODO: [EXPERIMENTAL] Remove this code once proper generic controller is ready
@RestController
@Log4j2
@ComponentScan
public class PrimaryGetController {
    @RequestMapping("/{basePath}/**")
    public String serveRequest(@PathVariable String basePath, HttpServletRequest request) {
        final String path =
                request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();
        final String bestMatchingPattern =
                request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE).toString();

        StringBuilder queryParamAndValue = extractQueryParams(request);

        String arguments = new AntPathMatcher().extractPathWithinPattern(bestMatchingPattern, path);
        String requestMethod = request.getMethod();

        String moduleName;
        if (!arguments.isEmpty()) {
            moduleName = basePath + '/' + arguments;
        } else {
            moduleName = basePath;
        }

        if (queryParamAndValue.length() != 0) {
            moduleName = moduleName + "?" + queryParamAndValue;
        }

        log.log(Level.INFO, requestMethod + " : " + requestMethod + " : " + moduleName);

        return null;
    }

    private StringBuilder extractQueryParams(HttpServletRequest request) {
        StringBuilder queryParamAndValue = new StringBuilder();

        Enumeration<String> queryParams = request.getParameterNames();
        List<String> queryParamsList = new ArrayList<>();
        while (queryParams.hasMoreElements()) {
            queryParamsList.add(queryParams.nextElement());
        }
        int counter = 0;

        while (counter < queryParamsList.size()) {
            String queryParamName = queryParamsList.get(counter);
            queryParamAndValue.append(queryParamName);

            String[] queryParamValues = request.getParameterValues(queryParamName);
            for (String queryParamValue : queryParamValues) {
                queryParamAndValue.append("=");
                queryParamAndValue.append(UriEncoder.encode(queryParamValue));
            }

            if (counter != queryParamsList.size() - 1) {
                queryParamAndValue.append("&");
            }
            counter++;
        }
        return queryParamAndValue;
    }
}
