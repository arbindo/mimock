package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.BinaryResponse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BinaryResponseDBHelper extends CrudRepository<BinaryResponse, Long> {
}
