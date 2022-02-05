package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.ResponseContentType;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ResponseContentTypesRepositoryTest {

    @Autowired
    ResponseContentTypesRepository responseContentTypesRepository;

    @ParameterizedTest
    @ValueSource(strings = {"application/java-archive", "application/octet-stream", "application/ogg", "application/pdf",
            "application/x-shockwave-flash", "application/json", "application/xml", "application/zip"})
    void shouldReturnResponseContentTypeForValidApplicationType(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(applicationResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(applicationResponseType, responseType.getResponseType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"application/EDI-X12", "application/EDIFACT", "application/javascript", "application/xhtm,xml",
            "application/l,json", "application/excel", "application/x-www-form-urlencoded"})
    void shouldReturnNullForInvalidApplicationType(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"audio/mpeg", "audio/ogg", "audio/opus", "audio/wav", "audio/webm"})
    void shouldReturnResponseContentTypeForValidAudioType(String audioResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(audioResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(audioResponseType, responseType.getResponseType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"audio/x-ms-wma", "audio/vnd.rn-realaudio", "audio/x-wav"})
    void shouldReturnNullForInvalidAudioType(String audioResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(audioResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"image/gif", "image/jpeg", "image/png", "image/svg+xml"})
    void shouldReturnResponseContentTypeForValidImageType(String imageResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(imageResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(imageResponseType, responseType.getResponseType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"image/vnd.microsoft.icon ", "image/x-icon", "image/vnd.djvu"})
    void shouldReturnNullForInvalidImageType(String imageResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(imageResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"video/mpeg", "video/mp4", "video/x-msvideo", "video/webm"})
    void shouldReturnResponseContentTypeForValidVideoType(String videoResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(videoResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(videoResponseType, responseType.getResponseType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"video/quicktime", "video/x-ms-wmv", "video/x-flv"})
    void shouldReturnNullForInvalidVideoType(String videoResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(videoResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"text/css", "text/csv", "text/html", "text/javascript", "text/plain"})
    void shouldReturnResponseContentTypeForValidTextType(String textResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(textResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(textResponseType, responseType.getResponseType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"text/xml"})
    void shouldReturnNullForInvalidTextType(String textResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(textResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"multipart/mixed", "multipart/alternative", "multipart/related", "multipart/form-data"})
    void shouldReturnNullForInvalidMultipartType(String multiPartResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(multiPartResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNullForInvalidApplicationTypeWhenEmptyOrNull(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"application/json OR 1=1", "text/css; DROP TABLE mocks;"})
    void shouldReturnNullForCaseSensitiveResponseTypeStrings(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"application/json OR 1=1", "text/css; DROP TABLE mocks;"})
    void shouldReturnNullForSqlInjectionStrings(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByResponseType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }
}
