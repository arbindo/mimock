package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.entities.RequestHeader;
import com.arbindo.mimock.generic.helpers.RequestHeaderComparator;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.MocksRepository;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
@Log4j2
@Builder
public class GenericMockRequestService {
    private DomainModelMapper domainModelMapper;

    private MocksRepository repository;

    private final HttpMethodsRepository httpMethodsRepository;

    @Autowired
    public GenericMockRequestService(DomainModelMapper domainModelMapper,
                                     MocksRepository repository,
                                     HttpMethodsRepository httpMethodsRepository) {
        this.domainModelMapper = domainModelMapper;
        this.repository = repository;
        this.httpMethodsRepository = httpMethodsRepository;
    }

    public DomainModelForMock serveMockRequest(GenericRequestModel request) throws MatchingMockNotFoundException, IOException {
        log.log(Level.INFO, "Fetching matching mock from the DB");

        String route = request.getRoute();
        HttpMethod httpMethod = httpMethod(request.getHttpMethod());
        String queryParam = request.getQueryParam();

        Optional<Mock> resultFromDB = repository.findOneByRouteAndHttpMethodAndQueryParams(
                route,
                httpMethod,
                queryParam
        );

        if (resultFromDB.isEmpty()) {
            log.log(Level.ERROR, "No matching rows returned from DB");
            String errorMessage = "Matching mock does not exist";
            throw new MatchingMockNotFoundException(errorMessage);
        }

        log.log(Level.INFO, "Returning matching mock");
        Mock matchingMock = resultFromDB.get();

        if (shouldValidateRequestHeaders(matchingMock, request)) {
            validateRequestHeaders(request, matchingMock);
        }

        if (shouldValidateRequestBody(matchingMock, request)) {
            validateRequestBody(
                    matchingMock.getRequestBodiesForMock().getRequestBody(),
                    request.getRequestBody()
            );
        }

        return domainModelMapper.mappedModel(matchingMock);
    }

    private HttpMethod httpMethod(String method) {
        log.log(Level.INFO, "Fetching HTTP method from the DB");
        return httpMethodsRepository.findByMethod(method);
    }

    private boolean shouldValidateRequestHeaders(Mock matchingMock, GenericRequestModel request) {
        log.log(Level.INFO, "Checking if request headers need to be validated");
        return ValidationUtil.isArgNotNull(matchingMock.getRequestHeaders()) &&
                !matchingMock.getRequestHeaders().getRequestHeader().isEmpty() &&
                ValidationUtil.isArgNotNull(request.getRequestHeaders()) &&
                !request.getRequestHeaders().isEmpty();
    }

    private boolean shouldValidateRequestBody(Mock matchingMock, GenericRequestModel request) {
        log.log(Level.INFO, "Checking if request body need to be validated");
        return ValidationUtil.isArgNotNull(matchingMock.getRequestBodiesForMock()) &&
                !matchingMock.getRequestBodiesForMock().getRequestBody().isEmpty() &&
                ValidationUtil.isArgNotNull(request.getRequestBody()) &&
                !request.getRequestBody().isEmpty();
    }

    private void validateRequestHeaders(GenericRequestModel request, Mock matchingMock) {
        log.log(Level.INFO, "Checking if the request headers match the headers setup for the mock");
        RequestHeader headersFromMatchingMock = matchingMock.getRequestHeaders();

        Boolean doesMockHaveMatchingHeaders = RequestHeaderComparator
                .builder()
                .headersFromRequest(request.getRequestHeaders())
                .headersFromMock(headersFromMatchingMock.getRequestHeader())
                .build()
                .doesMockHaveMatchingHeaders(headersFromMatchingMock.getMatchExact());

        if (!doesMockHaveMatchingHeaders) {
            log.log(Level.ERROR, "Headers stored for the mock does not match");
            log.log(Level.ERROR, String.format("\nHeaders from request : %s\nHeaders from DB : %s",
                    request.getRequestHeaders(),
                    matchingMock.getRequestHeaders().getRequestHeader()));

            String errorMessage = "Headers does not match";
            throw new MatchingMockNotFoundException(errorMessage);
        }
    }

    private void validateRequestBody(Map<String, Object> requestBodyForMatchingMock, Map<String, Object> requestBody) throws IOException {
        log.log(Level.INFO, "Checking if request bodies match");

        for (Map.Entry<String, Object> item : requestBodyForMatchingMock.entrySet()) {
            String key = item.getKey();
            if (!requestBodyForMatchingMock.get(key).equals(requestBody.get(key))) {
                log.log(Level.ERROR, "Request body for the mock and the actual request body does not match");
                log.log(Level.ERROR, String.format("Request body from DB : {%s} : {%s}", key, requestBodyForMatchingMock.get(key)));
                log.log(Level.ERROR, String.format("Request body : {%s} : {%s}", key, requestBody.get(key)));
                log.log(Level.ERROR, String.format("\nRequest body received : %s\nRequest body from DB : %s",
                        requestBody,
                        requestBodyForMatchingMock));

                String errorMessage = "The request body does not match";
                throw new MatchingMockNotFoundException(errorMessage);
            }
        }
    }
}
