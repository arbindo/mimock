package com.arbindo.mimock.generic;

import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Controller
@Log4j2
@NoArgsConstructor
@SpringBootTest
public class GenericMockRequestController {

    GenericMockRequestService genericMockRequestService;

    @Autowired
    public GenericMockRequestController(GenericMockRequestService genericMockRequestService) {
        this.genericMockRequestService = genericMockRequestService;
    }

    public Optional<DomainModelForMock> serveRequest(String basePath, HttpServletRequest request) {
        StringBuilder queryParamAndValue = genericMockRequestService.extractQueryParams(request);
        String requestMethod = request.getMethod();
        String fullPathWithQueryParams = fullPathWithQueryParams(basePath, queryParamAndValue.toString());

        log.log(Level.INFO, String.format("Handling mock request for [%s] : %s", requestMethod, fullPathWithQueryParams));

        GenericRequestModel mockRequest = generateMockRequest(requestMethod, basePath, queryParamAndValue);

        try {
            log.log(Level.INFO, "Returning matching mock to the interceptor");
            return Optional.of(genericMockRequestService.serveMockRequest(mockRequest));
        } catch (Exception e) {
            log.log(Level.ERROR, e.getMessage());
            log.log(Level.INFO, "Returning empty response to the interceptor. Will be considered as a 404 not found error");
            return Optional.empty();
        }
    }

    private GenericRequestModel generateMockRequest(String requestMethod, String fullPath, StringBuilder queryParamAndValue) {
        return GenericRequestModel.builder()
                .httpMethod(requestMethod)
                .queryParam(queryParamAndValue.toString())
                .route(fullPath)
                .build();
    }

    private String fullPathWithQueryParams(String fullPath, String queryParamAndValue) {
        if (queryParamAndValue.length() != 0) {
            fullPath = fullPath + "?" + queryParamAndValue;
        }

        return fullPath;
    }
}
