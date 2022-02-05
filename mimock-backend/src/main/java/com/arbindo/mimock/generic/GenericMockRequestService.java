package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.helpers.QueryParamHelper;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.repository.HttpMethodsRepository;
import com.arbindo.mimock.repository.MocksRepository;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@Log4j2
@Builder
public class GenericMockRequestService {
    private QueryParamHelper queryParamHelper;

    private DomainModelMapper domainModelMapper;

    private MocksRepository repository;

    private final HttpMethodsRepository httpMethodsRepository;

    @Autowired
    public GenericMockRequestService(QueryParamHelper queryParamHelper,
                                     DomainModelMapper domainModelMapper,
                                     MocksRepository repository,
                                     HttpMethodsRepository httpMethodsRepository) {
        this.queryParamHelper = queryParamHelper;
        this.domainModelMapper = domainModelMapper;
        this.repository = repository;
        this.httpMethodsRepository = httpMethodsRepository;
    }


    public StringBuilder extractQueryParams(HttpServletRequest request) {
        log.log(Level.INFO, "Extracting query params from request path");
        return queryParamHelper.extractQueryParams(request);
    }

    public DomainModelForMock serveMockRequest(GenericRequestModel request) throws MatchingMockNotFoundException {
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
        return domainModelMapper.mappedModel(matchingMock);
    }

    private HttpMethod httpMethod(String method) {
        log.log(Level.INFO, "Fetching HTTP method from the DB");
        return httpMethodsRepository.findByMethod(method);
    }
}
