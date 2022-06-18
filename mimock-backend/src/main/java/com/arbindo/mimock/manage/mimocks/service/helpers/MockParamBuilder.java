package com.arbindo.mimock.manage.mimocks.service.helpers;

import com.arbindo.mimock.entities.*;
import com.arbindo.mimock.manage.mimocks.models.request.ProcessedMockRequest;
import com.arbindo.mimock.repository.*;
import com.arbindo.mimock.utils.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
@NoArgsConstructor
@AllArgsConstructor
public class MockParamBuilder {
    private RequestHeadersRepository requestHeadersRepository;
    private ResponseHeadersRepository responseHeadersRepository;
    private RequestBodyTypeRepository requestBodyTypeRepository;
    private RequestBodiesForMockRepository requestBodiesForMockRepository;
    private HttpMethodsRepository httpMethodsRepository;
    private ResponseContentTypesRepository responseContentTypesRepository;

    @Setter
    private ProcessedMockRequest request;

    @Autowired
    public MockParamBuilder(RequestHeadersRepository requestHeadersRepository,
                            ResponseHeadersRepository responseHeadersRepository,
                            RequestBodyTypeRepository requestBodyTypeRepository,
                            RequestBodiesForMockRepository requestBodiesForMockRepository,
                            HttpMethodsRepository httpMethodsRepository,
                            ResponseContentTypesRepository responseContentTypesRepository) {
        this.requestHeadersRepository = requestHeadersRepository;
        this.responseHeadersRepository = responseHeadersRepository;
        this.requestBodyTypeRepository = requestBodyTypeRepository;
        this.requestBodiesForMockRepository = requestBodiesForMockRepository;
        this.httpMethodsRepository = httpMethodsRepository;
        this.responseContentTypesRepository = responseContentTypesRepository;
    }

    public RequestBodiesForMock requestBody() {
        if (request.getRequestBody() != null && !request.getRequestBody().isEmpty()) {
            RequestBodyType requestBodyType = requestBodyTypeRepository.findOneByRequestBodyType(request.getRequestBodyType());
            RequestBodiesForMock requestBodiesForMock = RequestBodiesForMock.builder()
                    .requestBodyType(requestBodyType)
                    .requestBody(request.getRequestBody())
                    .build();

            try {
                log.log(Level.INFO, "Checking if request body exists to store it to Database");
                Optional<RequestBodiesForMock> requestBodyFromDB = requestBodiesForMockRepository
                        .findRequestBodiesForMockByRequestBodyAndDeletedAtIsNull(request.getRequestBody());

                return requestBodyFromDB.orElseGet(() -> requestBodiesForMockRepository.save(requestBodiesForMock));
            } catch (Exception e) {
                log.log(Level.ERROR, "Failed to store request body : " + e.getMessage());
                return null;
            }
        }
        return null;
    }

    public RequestHeader requestHeaders() {
        if (request.getRequestHeader() != null && !request.getRequestHeader().isEmpty()) {
            RequestHeader requestHeader = RequestHeader.builder()
                    .requestHeader(request.getRequestHeader())
                    .matchExact(request.getShouldDoExactHeaderMatching())
                    .build();

            try {
                log.log(Level.INFO, "Checking if request header exists to store it to Database");
                Optional<RequestHeader> requestHeaderFromDB = requestHeadersRepository
                        .findRequestHeaderByRequestHeaderAndDeletedAtIsNull(request.getRequestHeader());
                return requestHeaderFromDB.orElseGet(() -> requestHeadersRepository.save(requestHeader));
            } catch (Exception e) {
                log.log(Level.ERROR, "Failed to store request headers : " + e.getMessage());
                return null;
            }
        }
        return null;
    }

    public ResponseHeader responseHeaders() {
        if (request.getResponseHeaders() != null && !request.getResponseHeaders().isEmpty()) {
            ResponseHeader responseHeader = ResponseHeader.builder()
                    .responseHeader(request.getResponseHeaders())
                    .build();

            try {
                log.log(Level.INFO, "Saving request headers to Database");
                return responseHeadersRepository.save(responseHeader);
            } catch (Exception e) {
                log.log(Level.ERROR, "Failed to store request headers : " + e.getMessage());
                return null;
            }
        }
        return null;
    }

    public HttpMethod findHttpMethodFromQueryString(String httpMethod) {
        try{
            return findHttpMethodInternal(httpMethod);
        } catch (Exception e){
            return null;
        }
    }

    public HttpMethod httpMethod() throws Exception {
        String httpMethod = request.getHttpMethod();
        return findHttpMethodInternal(httpMethod);
    }

    private HttpMethod findHttpMethodInternal(String httpMethod) throws Exception {
        if (ValidationUtil.isNotNullOrEmpty(httpMethod)) {
            return httpMethodsRepository.findByMethod(httpMethod);
        }
        throw new Exception(String.format("Unable to extract HTTP Method!! Invalid method: %s", httpMethod));
    }

    public ResponseContentType responseContentType(String responseContentTypeString) throws Exception {
        if (ValidationUtil.isNotNullOrEmpty(responseContentTypeString)) {
            return responseContentTypesRepository.findByContentType(responseContentTypeString);
        }
        throw new Exception(String.format("Unable to extract Response Content Type!! Invalid responseContentType: %s",
                responseContentTypeString));
    }
}
