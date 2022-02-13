package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.entities.ResponseHeader;
import com.arbindo.mimock.generic.factory.ResponseFactory;
import com.arbindo.mimock.generic.factory.ResponseFactoryExecutor;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class DomainModelMapper {

    private ResponseFactoryExecutor responseFactoryExecutor;

    @Autowired
    public DomainModelMapper(ResponseFactoryExecutor responseFactoryExecutor) {
        this.responseFactoryExecutor = responseFactoryExecutor;
    }

    public DomainModelForMock mappedModel(Mock mock) {
        ResponseFactory responseFactory = responseFactoryExecutor.responseFactory(mock);

        return DomainModelForMock.builder()
                .route(mock.getRoute())
                .responseContentType(getContentType(mock))
                .statusCode(mock.getStatusCode())
                .responseBody(responseFactory.responseBody())
                .typeOfResponse(responseFactory.typeOfResponse())
                .responseHeaders(getResponseHeader(mock))
                .build();
    }

    private String getContentType(Mock mock) {
        ResponseContentType responseContentType = mock.getResponseContentType();
        if (responseContentType == null) {
            return null;
        }
        return responseContentType.getContentType();
    }

    private Map<String, Object> getResponseHeader(Mock mock) {
        ResponseHeader responseHeaders = mock.getResponseHeaders();
        if (responseHeaders == null) {
            return null;
        }
        return responseHeaders.getResponseHeader();
    }
}
