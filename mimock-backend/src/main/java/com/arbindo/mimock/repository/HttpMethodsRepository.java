package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.HttpMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HttpMethodsRepository extends JpaRepository<HttpMethod, Long> {

    HttpMethod findByMethod(String method);

}
