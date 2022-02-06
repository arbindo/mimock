package com.arbindo.mimock.staticrecords;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.entities.HttpMethod;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.constants.UrlConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Static Records", description = "Handles static records such as http-methods and response-content-types.")
public class GetStaticRecordsController {

    @Autowired
    GetStaticRecordsService getStaticRecordsService;

    @Operation(summary = "List Http Methods", description = "List all supported HTTP Methods in Mimock Platform.",
            tags = { "Static Records" })
    @GetMapping(value = "/http-methods")
    public ResponseEntity<List<HttpMethod>> listAllSupportedHttpMethods() {
        return ResponseEntity.ok(getStaticRecordsService.listAllSupportedHttpMethods());
    }

    @Operation(summary = "List Response Content Types", description = "List all supported Response Content Types " +
            "in Mimock Platform.", tags = { "Static Records" })
    @GetMapping(value = "/response-content-types")
    public ResponseEntity<List<ResponseContentType>> listAllSupportedResponseContentTypes() {
        return ResponseEntity.ok(getStaticRecordsService.listAllSupportedResponseContentTypes());
    }

    @Operation(summary = "List Entity Status", description = "List all supported Entity Status in Mimock Platform.",
            tags = { "Static Records" })
    @GetMapping(value = "/entity-status")
    public ResponseEntity<List<EntityStatus>> listAllSupportedEntityStatus() {
        return ResponseEntity.ok(getStaticRecordsService.listAllSupportedEntityStatus());
    }
}
