package com.arbindo.mimock.generic;

import com.arbindo.mimock.entities.BinaryResponse;
import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.entities.ResponseContentType;
import com.arbindo.mimock.entities.TextualResponse;
import com.arbindo.mimock.generic.factory.TextualResponseImpl;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DomainModelMapperTest {

    @Autowired
    DomainModelMapper domainModelMapper;

    @Test
    void shouldReturnModelWithTextResponseFactory() {
        ResponseContentType responseContentType = ResponseContentType.builder()
                .responseType("application/json")
                .build();

        TextualResponse textualResponse = TextualResponse.builder()
                .responseBody("{'message': 'Hello World!'}")
                .build();

        Mock testMock = Mock.builder()
                .responseContentType(responseContentType)
                .statusCode(200)
                .textualResponse(textualResponse)
                .binaryResponse(null)
                .build();

        DomainModelForMock mappedModel = domainModelMapper.mappedModel(testMock);

        assertEquals("{'message': 'Hello World!'}", mappedModel.getResponseBody());
        assertEquals(200, mappedModel.getStatusCode());
        assertEquals("application/json", mappedModel.getResponseContentType());
    }

    @Test
    void shouldReturnModelWithBinaryResponseFactory() {
        ResponseContentType responseContentType = ResponseContentType.builder()
                .responseType("application/json")
                .build();

        byte[] bytes = "Test string".getBytes(StandardCharsets.UTF_8);
        BinaryResponse binaryResponse = BinaryResponse.builder()
                .responseFile(bytes)
                .build();

        Mock testMock = Mock.builder()
                .responseContentType(responseContentType)
                .statusCode(200)
                .textualResponse(null)
                .binaryResponse(binaryResponse)
                .build();

        DomainModelForMock mappedModel = domainModelMapper.mappedModel(testMock);

        assertEquals(bytes, mappedModel.getResponseBody());
        assertEquals(200, mappedModel.getStatusCode());
        assertEquals("application/json", mappedModel.getResponseContentType());
    }
}
