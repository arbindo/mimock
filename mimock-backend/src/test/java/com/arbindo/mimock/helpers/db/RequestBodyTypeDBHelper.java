package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.RequestBodyType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestBodyTypeDBHelper extends CrudRepository<RequestBodyType, Long> {
    RequestBodyType findOneByRequestBodyType(String type);
}
