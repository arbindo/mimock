package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.PlatformSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatformSettingsRepository extends JpaRepository<PlatformSettings, Long> {

}
