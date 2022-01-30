package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.TextualResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextualResponseRepository extends JpaRepository<TextualResponse, Long> {
}
