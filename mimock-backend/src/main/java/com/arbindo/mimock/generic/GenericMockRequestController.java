package com.arbindo.mimock.generic;

import com.arbindo.mimock.generic.helpers.QueryParamHelper;
import com.arbindo.mimock.generic.helpers.RequestBodyParser;
import com.arbindo.mimock.generic.helpers.RequestHeaderParser;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@Controller
@Log4j2
@SpringBootTest
public class GenericMockRequestController {

    GenericMockRequestService genericMockRequestService;

    @Autowired
    public GenericMockRequestController(GenericMockRequestService genericMockRequestService) {
        this.genericMockRequestService = genericMockRequestService;
    }

    public Optional<DomainModelForMock> serveRequest(String basePath, HttpServletRequest request) {
        StringBuilder queryParamAndValue = QueryParamHelper.extractQueryParams(request);
        String requestMethod = request.getMethod();
        String fullPathWithQueryParams = fullPathWithQueryParams(basePath, queryParamAndValue.toString());

        log.log(Level.INFO, String.format("Handling mock request for [%s] : %s", requestMethod, fullPathWithQueryParams));

        try {
            log.log(Level.INFO, "Returning matching mock to the interceptor");
            String requestBody = RequestBodyParser.getRequestBody(request);
            Map<String, Object> headerMap = RequestHeaderParser.getHeaderMap(request);

            GenericRequestModel mockRequest = generateMockRequest(basePath,
                    queryParamAndValue,
                    requestMethod,
                    headerMap,
                    requestBody);

            log.log(Level.INFO, "Invoking service to fetch matching mock from DB");
            return Optional.of(genericMockRequestService.serveMockRequest(mockRequest));
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            log.log(Level.INFO, "Returning empty response to the interceptor. Will be considered as a 404 not found error");
            return Optional.empty();
        }
    }

    private GenericRequestModel generateMockRequest(String basePath,
                                                    StringBuilder queryParamAndValue,
                                                    String requestMethod,
                                                    Map<String, Object> headerMap,
                                                    String requestBody) {
        return GenericRequestModel.builder()
                .httpMethod(requestMethod)
                .queryParam(queryParamAndValue.toString())
                .route(basePath)
                .requestHeaders(headerMap)
                .requestBody(requestBody)
                .build();
    }

    private String fullPathWithQueryParams(String fullPath, String queryParamAndValue) {
        if (queryParamAndValue.length() != 0) {
            fullPath = fullPath + "?" + queryParamAndValue;
        }

        return fullPath;
    }
}
