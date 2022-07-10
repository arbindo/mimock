package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MocksRepository extends JpaRepository<Mock, UUID> {
    Optional<Mock> findOneByRouteAndHttpMethodAndQueryParams(String route, HttpMethod httpMethod, String queryParams);

    Page<Mock> findAllByEntityStatus(EntityStatus entityStatus, Pageable pageable);

    Page<Mock> findAllByHttpMethod(HttpMethod httpMethod, Pageable pageable);

    Page<Mock> findAllByEntityStatusAndHttpMethod(EntityStatus entityStatus, HttpMethod httpMethod, Pageable pageable);

    List<Mock> findAllByEntityStatusAndDeletedAt(EntityStatus entityStatus, ZonedDateTime deletedAt);

    Optional<Mock> findOneByMockName(String mockName);

    Optional<Mock> findOneByRouteAndHttpMethodAndQueryParamValuesAndRequestBodiesForMockAndRequestHeadersAndDeletedAtIsNull
            (String route,
             HttpMethod httpMethod,
             Map<String, Object> queryParamValue,
             RequestBodiesForMock requestBodiesForMock,
             RequestHeader requestHeaders);

    List<Mock> findOneByRouteAndHttpMethodAndQueryParamValuesAndRequestBodiesForMockAndDeletedAtIsNull
            (String route,
             HttpMethod httpMethod,
             Map<String, Object> queryParamValue,
             RequestBodiesForMock requestBodiesForMock);

    List<Mock> findOneByRouteAndHttpMethodAndRequestBodiesForMockAndDeletedAtIsNull
            (String route,
             HttpMethod httpMethod,
             RequestBodiesForMock requestBodiesForMock);


    default Optional<Mock> findUniqueMock(String route,
                                          HttpMethod httpMethod,
                                          Map<String, Object> queryParamValue,
                                          RequestBodiesForMock requestBodiesForMock,
                                          RequestHeader requestHeaders) {
        return findOneByRouteAndHttpMethodAndQueryParamValuesAndRequestBodiesForMockAndRequestHeadersAndDeletedAtIsNull(route,
                httpMethod,
                queryParamValue,
                requestBodiesForMock,
                requestHeaders);
    }

    default List<Mock> findUniqueMock(String route,
                                      HttpMethod httpMethod,
                                      Map<String, Object> queryParams,
                                      RequestBodiesForMock requestBodiesForMock) {
        return findOneByRouteAndHttpMethodAndQueryParamValuesAndRequestBodiesForMockAndDeletedAtIsNull(
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
