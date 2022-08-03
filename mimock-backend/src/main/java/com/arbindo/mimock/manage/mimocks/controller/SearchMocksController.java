package com.arbindo.mimock.manage.mimocks.controller;

import com.arbindo.mimock.common.constants.UrlConfig;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.mapper.ResponseModelMapper;
import com.arbindo.mimock.manage.mimocks.models.response.ListMocksResponse;
import com.arbindo.mimock.manage.mimocks.service.SearchMocksService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MOCKS_PATH)
@SecurityRequirement(name = UrlConfig.SWAGGER_BEARER_AUTH_KEY)
@Tag(name = "Mock Management", description = "Handles operations related to mock resource.")
public class SearchMocksController {

    @Autowired
    private SearchMocksService searchMocksService;

    @Operation(summary = "Search and List Mocks As Pageable", description = "Searches for mocks and lists them in " +
            "pageable format based on the search query provided", tags = {"Mock Management"})
    @GetMapping(UrlConfig.MOCKS_SEARCH)
    public ResponseEntity<Page<ListMocksResponse>> searchMocks(@SortDefault(sort = "createdAt",
            direction = Sort.Direction.DESC) Pageable pageable, @RequestParam(required = true) String searchColumnString,
                                                               @RequestParam(required = true) String searchQuery) {
        Page<Mock> mockPageable = searchMocksService.searchMocks(pageable, searchColumnString, searchQuery);
        if(mockPageable == null){
            return ResponseEntity.badRequest().build();
        }
        Page<ListMocksResponse> responsePage = mockPageable.map(ResponseModelMapper::map);
        return ResponseEntity.ok(responsePage);
    }
}
