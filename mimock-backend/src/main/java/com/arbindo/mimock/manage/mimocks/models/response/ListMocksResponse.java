package com.arbindo.mimock.manage.mimocks.models.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ListMocksResponse {
    private String id;
    private String mockName;
    private String description;
    private String route;
    private String httpMethod;
}
