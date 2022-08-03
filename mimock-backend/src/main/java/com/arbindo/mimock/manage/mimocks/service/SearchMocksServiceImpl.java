package com.arbindo.mimock.manage.mimocks.service;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.enums.SearchColumn;
import com.arbindo.mimock.repository.MocksRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@Builder
@AllArgsConstructor
public class SearchMocksServiceImpl implements SearchMocksService{

    @Autowired
    private MocksRepository mocksRepository;

    @Override
    public Page<Mock> searchMocks(Pageable pageable, String searchColumnString, String searchQuery) {
        try {
            SearchColumn searchColumn = SearchColumn.valueOf(searchColumnString);
            String sanitizedSearchQuery = searchQuery
                    .replaceAll("\n", "")
                    .replaceAll("\r", "")
                    .trim();
            switch (searchColumn){
                case NAME:
                    return mocksRepository.findAllByMockNameIgnoreCaseContaining(sanitizedSearchQuery, pageable);
                case DESCRIPTION:
                    return mocksRepository.findAllByDescriptionIgnoreCaseContaining(sanitizedSearchQuery, pageable);
                case ROUTE:
                    return mocksRepository.findAllByRouteIgnoreCaseContaining(sanitizedSearchQuery, pageable);
                default:
                    return mocksRepository.findAll(pageable);
            }
        } catch(Exception e) {
            log.log(Level.DEBUG, e.getMessage());
        }
        return null;
    }

}
