package com.arbindo.mimock.generic.helpers;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.util.UriEncoder;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

@Log4j2
@Service
public class QueryParamHelper {
    public StringBuilder extractQueryParams(HttpServletRequest request) {
        StringBuilder queryParamAndValue = new StringBuilder();
        List<String> queryParamsList = getQueryParamsList(request);

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

    private List<String> getQueryParamsList(HttpServletRequest request) {
        Enumeration<String> queryParams = request.getParameterNames();
        List<String> queryParamsList = new ArrayList<>();
        while (queryParams.hasMoreElements()) {
            queryParamsList.add(queryParams.nextElement());
        }
        return queryParamsList;
    }
}
