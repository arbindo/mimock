package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.mockhandler.entities.ResponseContentType;
import com.arbindo.mimock.mockhandler.entities.TextualResponseBody;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseContentTypeDBHelper extends CrudRepository<ResponseContentType, Long> {
    ResponseContentType findOneByResponseType(String responseType);
}
