package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.TextualResponse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextualResponseDBHelper extends CrudRepository<TextualResponse, Long> {
}
