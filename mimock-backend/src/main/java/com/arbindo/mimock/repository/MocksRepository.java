package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MocksRepository extends JpaRepository<Mock, UUID> {
    Optional<Mock> findOneByRouteAndHttpMethodAndQueryParams(String route, HttpMethod httpMethod, String queryParams);

    Page<Mock> findAllByEntityStatus(EntityStatus entityStatus, Pageable pageable);

    Optional<Mock> findOneByMockName(String mockName);

    Optional<Mock> findOneByRouteAndHttpMethodAndQueryParamsAndRequestBodiesForMockAndRequestHeadersAndDeletedAtIsNull
            (String route,
             HttpMethod httpMethod,
             String queryParams,
             RequestBodiesForMock requestBodiesForMock,
             RequestHeader requestHeaders);

    List<Mock> findOneByRouteAndHttpMethodAndQueryParamsAndRequestBodiesForMockAndDeletedAtIsNull
            (String route,
             HttpMethod httpMethod,
             String queryParams,
             RequestBodiesForMock requestBodiesForMock);

    List<Mock> findOneByRouteAndHttpMethodAndRequestBodiesForMockAndDeletedAtIsNull
            (String route,
             HttpMethod httpMethod,
             RequestBodiesForMock requestBodiesForMock);


    default Optional<Mock> findUniqueMock(String route,
                                          HttpMethod httpMethod,
                                          String queryParams,
                                          RequestBodiesForMock requestBodiesForMock,
                                          RequestHeader requestHeaders) {
        return findOneByRouteAndHttpMethodAndQueryParamsAndRequestBodiesForMockAndRequestHeadersAndDeletedAtIsNull(route,
                httpMethod,
                queryParams,
                requestBodiesForMock,
                requestHeaders);
    }

    default List<Mock> findUniqueMock(String route,
                                      HttpMethod httpMethod,
                                      String queryParams,
                                      RequestBodiesForMock requestBodiesForMock) {
        return findOneByRouteAndHttpMethodAndQueryParamsAndRequestBodiesForMockAndDeletedAtIsNull(
                route,
                httpMethod,
                queryParams,
                requestBodiesForMock
        );
    }

    default List<Mock> findUniqueMock(String route,
                                      HttpMethod httpMethod,
                                      RequestBodiesForMock requestBodiesForMock) {
        return findOneByRouteAndHttpMethodAndRequestBodiesForMockAndDeletedAtIsNull(
                route,
                httpMethod,
                requestBodiesForMock
        );
    }
}
