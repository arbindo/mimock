package com.arbindo.mimock.manage.mimocks.mapper;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.response.ListMocksResponse;

public class ResponseModelMapper {
    private ResponseModelMapper(){

    }

    public static ListMocksResponse map(Mock mock){
        return ListMocksResponse.builder()
                .id(mock.getId().toString())
                .mockName(mock.getMockName())
                .description(mock.getDescription())
                .route(mock.getRoute())
                .httpMethod(mock.getHttpMethod().getMethod())
                .isArchived(mock.isArchived())
                .isDeleted(mock.isDeleted())
                .build();
    }
}
