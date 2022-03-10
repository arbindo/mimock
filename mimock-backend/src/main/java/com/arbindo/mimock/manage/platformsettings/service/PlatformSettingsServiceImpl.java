package com.arbindo.mimock.manage.platformsettings.service;

import com.arbindo.mimock.entities.PlatformSettings;
import com.arbindo.mimock.repository.PlatformSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PlatformSettingsServiceImpl implements PlatformSettingsService {

    @Autowired
    PlatformSettingsRepository platformSettingsRepository;

    @Override
    public List<PlatformSettings> listAllSupportedPlatformSettings() {
        return platformSettingsRepository.findAll();
    }

    @Transactional
    @Override
    public PlatformSettings updatePlatformSettings() {
        return null;
    }
}
