package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.entities.RequestBodiesForMock;
import com.arbindo.mimock.entities.RequestHeader;
import com.arbindo.mimock.generic.helpers.RequestHeaderComparator;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.MocksRepository;
import com.arbindo.mimock.repository.RequestBodiesForMockRepository;
import com.arbindo.mimock.repository.RequestHeadersRepository;
import com.google.common.base.Splitter;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@Builder
public class GenericMockRequestService {
    private DomainModelMapper domainModelMapper;
    private RequestBodiesForMockRepository requestBodiesForMockRepository;
    private RequestHeadersRepository requestHeadersRepository;
    private MocksRepository repository;
    private final HttpMethodsRepository httpMethodsRepository;

    @Autowired
    public GenericMockRequestService(DomainModelMapper domainModelMapper,
                                     RequestBodiesForMockRepository requestBodiesForMockRepository,
                                     RequestHeadersRepository requestHeadersRepository,
                                     MocksRepository repository,
                                     HttpMethodsRepository httpMethodsRepository
    ) {
        this.domainModelMapper = domainModelMapper;
        this.requestBodiesForMockRepository = requestBodiesForMockRepository;
        this.requestHeadersRepository = requestHeadersRepository;
        this.repository = repository;
        this.httpMethodsRepository = httpMethodsRepository;
    }

    public DomainModelForMock serveMockRequest(GenericRequestModel request) throws MatchingMockNotFoundException {
        log.log(Level.INFO, "Fetching matching mock from the DB");

        String route = request.getRoute();
        HttpMethod httpMethod = httpMethod(request.getHttpMethod());
        String queryParam = request.getQueryParam();

        Optional<RequestBodiesForMock> requestBody = requestBodiesForMockRepository
                .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(request.getRequestBody());

        List<Mock> resultFromDB;
        resultFromDB = repository.findUniqueMock(
                route,
                httpMethod,
                buildQueryParamMap(queryParam),
                requestBody.orElse(null)
        );

        if (CollectionUtils.isEmpty(resultFromDB)) {
            log.log(Level.ERROR, "No matching rows returned from DB");
            String errorMessage = "Matching mock does not exist";
            throw new MatchingMockNotFoundException(errorMessage);
        }

        log.log(Level.INFO, "Returning matching mock");

        List<Mock> matchingMock = resultFromDB.stream().filter(mock -> {
            if (mock.getRequestHeaders() == null) {
                log.log(Level.INFO, "Matching mock from DB has no headers. Skipping header validation");
                return true;
            }

            if (validateRequestHeaders(request, mock)) {
                log.log(Level.INFO, "Request headers are matching. Returning matching mock");
                return true;
            }

            return false;
        }).collect(Collectors.toList());


        if (matchingMock.isEmpty()) {
            String errorMessage = "Mocks returned from the DB does not have same headers";
            log.log(Level.ERROR, errorMessage);
            throw new MatchingMockNotFoundException(errorMessage);
        }

        return domainModelMapper.mappedModel(matchingMock.get(0));
    }

    private HttpMethod httpMethod(String method) {
        log.log(Level.INFO, "Fetching HTTP method from the DB");
        return httpMethodsRepository.findByMethod(method);
    }

    private Boolean validateRequestHeaders(GenericRequestModel request, Mock matchingMock) {
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
            log.log(Level.ERROR, errorMessage);
            return Boolean.FALSE;
        }

        return Boolean.TRUE;
    }

    private Map<String, Object> buildQueryParamMap(String queryParams) {
        Map<String, Object> queryParamValues = new HashMap<>();

        try {
            Map<String, String> splitMap = Splitter.on("&").trimResults()
                    .withKeyValueSeparator('=')
                    .split(queryParams);

            splitMap.entrySet().stream().forEach(i -> {
                queryParamValues.put(i.getKey(), i.getValue());
            });
        } catch (Exception e) {
            log.log(Level.ERROR, "Query params {} is not valid", queryParams);
        }

        return queryParamValues;
    }
}
