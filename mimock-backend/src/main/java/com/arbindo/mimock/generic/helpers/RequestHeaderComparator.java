package com.arbindo.mimock.generic.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.stereotype.Service;

import java.util.Map;

@Log4j2
@Builder
@AllArgsConstructor
@Service
public class RequestHeaderComparator {
    private final Map<String, Object> headersFromMock;
    private final Map<String, Object> headersFromRequest;

    public Boolean doesMockHaveMatchingHeaders(boolean shouldMatchExact) {
        log.log(Level.INFO, "Comparing request headers");
        log.log(Level.INFO, String.format("\nHeaders from DB : %s\nHeaders from request : %s",
                headersFromMock.toString(),
                headersFromRequest.toString()));

        if (shouldMatchExact) {
            return doHeadersMatch();
        }

        return doHeadersLooselyMatch();
    }

    private boolean doHeadersLooselyMatch() {
        log.log(Level.INFO, "Checking if headers match loosely");
        for (Map.Entry<String, Object> header : headersFromMock.entrySet()) {
            String headerName = header.getKey();
            if (headersFromMock.get(headerName).equals(headersFromRequest.get(headerName))) {
                log.log(Level.INFO, String.format("Matching header found for %s. Returning true.", headerName));
                return true;
            }
        }

        log.log(Level.INFO, "Not even one matching header has been found. Returning false");
        return false;
    }

    private boolean doHeadersMatch() {
        log.log(Level.INFO, "Checking if request headers match exactly");

        if (headersFromRequest.size() != headersFromMock.size()) {
            log.log(Level.INFO, "The headers do not match");
            return false;
        }

        if (headersFromRequest.equals(headersFromMock)) {
            log.log(Level.INFO, "Headers match exactly. Returning true.");
            return true;
        }

        log.log(Level.INFO, "Headers are not the same. Returning false.");
        return false;
    }
}
