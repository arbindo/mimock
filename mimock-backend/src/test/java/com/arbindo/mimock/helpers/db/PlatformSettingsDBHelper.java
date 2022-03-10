package com.arbindo.mimock.helpers.db;

import com.arbindo.mimock.entities.PlatformSettings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatformSettingsDBHelper extends CrudRepository<PlatformSettings, Long> {
}
