package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.ResponseHeader;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseHeadersDBHelper extends CrudRepository<ResponseHeader, Long> {
}
