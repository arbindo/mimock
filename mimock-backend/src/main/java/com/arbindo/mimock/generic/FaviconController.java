package com.arbindo.mimock.generic;

import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class FaviconController {
    /**
     * To handle request for the favicon.ico which gets fired from the browser.
     * This endpoint ensures that mimock does not consider favicon.ico as a mock request
     */
    @RequestMapping("favicon.ico")
    public void faviconController() {
        log.log(Level.INFO, "Handling favicon.ico request");
    }
}
