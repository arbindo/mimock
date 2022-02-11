package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.RequestBodiesForMock;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestBodiesForMockDBHelper extends CrudRepository<RequestBodiesForMock, Long> {
}
