package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.HttpMethod;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HttpMethodDBHelper extends CrudRepository<HttpMethod, Long> {
    HttpMethod getHttpMethodByMethod(String method);
}
