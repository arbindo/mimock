package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.RequestHeader;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestHeadersDBHelper extends CrudRepository<RequestHeader, Long> {
}
