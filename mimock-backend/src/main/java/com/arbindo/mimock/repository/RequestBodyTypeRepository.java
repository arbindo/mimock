package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.RequestBodyType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestBodyTypeRepository extends JpaRepository<RequestBodyType, Long> {
    public RequestBodyType findOneByRequestBodyType(String type);
}
