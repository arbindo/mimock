package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.generic.factory.ResponseFactory;
import com.arbindo.mimock.generic.factory.ResponseFactoryExecutor;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@NoArgsConstructor
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
                .responseContentType(mock.getResponseContentType().getResponseType())
                .statusCode(mock.getStatusCode())
                .responseBody(responseFactory.responseBody())
                .responseType(responseFactory.responseType())
                .build();
    }
}
