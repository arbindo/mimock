package com.arbindo.mimock.staticrecords;

import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.constants.UrlConfig;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping(UrlConfig.MANAGE_PATH)
public class GetStaticRecordsController {

    @Autowired
    GetStaticRecordsService getStaticRecordsService;

    @GetMapping(value = "/http-methods")
    public ResponseEntity<List<HttpMethod>> listAllSupportedHttpMethods() {
        return ResponseEntity.ok(getStaticRecordsService.listAllSupportedHttpMethods());
    }

    @GetMapping(value = "/response-content-types")
    public ResponseEntity<List<ResponseContentType>> listAllSupportedResponseContentTypes() {
        return ResponseEntity.ok(getStaticRecordsService.listAllSupportedResponseContentTypes());
    }
}
