package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.ResponseContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseContentTypesRepository extends JpaRepository<ResponseContentType, Long> {

    ResponseContentType findByContentType(String responseType);

}
