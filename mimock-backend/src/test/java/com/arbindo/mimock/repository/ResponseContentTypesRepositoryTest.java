package com.arbindo.mimock.repository;

import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.generic.model.TypeOfResponse;
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
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(applicationResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(applicationResponseType, responseType.getContentType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"application/EDI-X12", "application/EDIFACT", "application/javascript", "application/xhtm,xml",
            "application/l,json", "application/excel", "application/x-www-form-urlencoded"})
    void shouldReturnNullForInvalidApplicationType(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"audio/mpeg", "audio/ogg", "audio/opus", "audio/wav", "audio/webm"})
    void shouldReturnResponseContentTypeForValidAudioType(String audioResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(audioResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(audioResponseType, responseType.getContentType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"audio/x-ms-wma", "audio/vnd.rn-realaudio", "audio/x-wav"})
    void shouldReturnNullForInvalidAudioType(String audioResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(audioResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"image/gif", "image/jpeg", "image/png", "image/svg+xml"})
    void shouldReturnResponseContentTypeForValidImageType(String imageResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(imageResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(imageResponseType, responseType.getContentType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"image/vnd.microsoft.icon ", "image/x-icon", "image/vnd.djvu"})
    void shouldReturnNullForInvalidImageType(String imageResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(imageResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"video/mpeg", "video/mp4", "video/x-msvideo", "video/webm"})
    void shouldReturnResponseContentTypeForValidVideoType(String videoResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(videoResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(videoResponseType, responseType.getContentType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"video/quicktime", "video/x-ms-wmv", "video/x-flv"})
    void shouldReturnNullForInvalidVideoType(String videoResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(videoResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"text/css", "text/csv", "text/html", "text/javascript", "text/plain"})
    void shouldReturnResponseContentTypeForValidTextType(String textResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(textResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(textResponseType, responseType.getContentType());
    }

    @ParameterizedTest
    @ValueSource(strings = {"text/xml"})
    void shouldReturnNullForInvalidTextType(String textResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(textResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"multipart/mixed", "multipart/alternative", "multipart/related", "multipart/form-data"})
    void shouldReturnNullForInvalidMultipartType(String multiPartResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(multiPartResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @EmptySource
    @NullSource
    void shouldReturnNullForInvalidApplicationTypeWhenEmptyOrNull(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"application/json OR 1=1", "text/css; DROP TABLE mocks;"})
    void shouldReturnNullForCaseSensitiveResponseTypeStrings(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {"application/json OR 1=1", "text/css; DROP TABLE mocks;"})
    void shouldReturnNullForSqlInjectionStrings(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(applicationResponseType);
        // Assert
        assertNull(responseType);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "text/css",
            "text/csv",
            "text/html",
            "text/calendar",
            "text/javascript",
            "application/json",
            "application/ld+json",
            "text/plain",
            "application/xhtml+xml",
            "application/xml",
            "application/vnd.mozilla.xul+xml"
    })
    void shouldReturnResponseContentTypeForTextualResponseContentTypes(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(applicationResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(applicationResponseType, responseType.getContentType());
        assertEquals(TypeOfResponse.TEXTUAL_RESPONSE, responseType.getResponseType().getName());
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "audio/aac",
            "application/x-abiword",
            "application/x-freearc",
            "video/x-msvideo",
            "application/vnd.amazon.ebook",
            "application/octet-stream",
            "image/bmp",
            "application/x-bzip",
            "application/x-bzip2",
            "application/x-cdf",
            "application/x-csh",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-fontobject",
            "application/epub+zip",
            "application/gzip",
            "image/gif",
            "image/vnd.microsoft.icon",
            "application/java-archive",
            "image/jpeg",
            "audio/midi",
            "audio/x-midi",
            "audio/mpeg",
            "video/mp4",
            "video/mpeg",
            "application/vnd.apple.installer+xml",
            "application/vnd.oasis.opendocument.presentation",
            "application/vnd.oasis.opendocument.spreadsheet",
            "application/vnd.oasis.opendocument.text",
            "audio/ogg",
            "video/ogg",
            "application/ogg",
            "audio/opus",
            "font/otf",
            "image/png",
            "application/pdf",
            "application/x-httpd-php",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.rar",
            "application/rtf",
            "application/x-sh",
            "image/svg+xml",
            "application/x-shockwave-flash",
            "application/x-tar",
            "image/tiff",
            "video/mp2t",
            "font/ttf",
            "application/vnd.visio",
            "audio/wav",
            "audio/webm",
            "video/webm",
            "image/webp",
            "font/woff",
            "font/woff2",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/zip",
            "video/3gpp",
            "audio/3gpp",
            "video/3gpp2",
            "audio/3gpp2",
            "application/x-7z-compressed"
    })
    void shouldReturnResponseContentTypeForBinaryResponseContentTypes(String applicationResponseType) {
        // Act
        ResponseContentType responseType = responseContentTypesRepository.findByContentType(applicationResponseType);
        // Assert
        assertNotNull(responseType);
        assertEquals(applicationResponseType, responseType.getContentType());
        assertEquals(TypeOfResponse.BINARY_RESPONSE, responseType.getResponseType().getName());
    }
}
