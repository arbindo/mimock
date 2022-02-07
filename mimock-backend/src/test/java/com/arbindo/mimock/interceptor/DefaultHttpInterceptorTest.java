package com.arbindo.mimock.interceptor;

import com.arbindo.mimock.generic.GenericMockRequestController;
import com.arbindo.mimock.generic.model.DomainModelForMock;
import com.arbindo.mimock.generic.model.TypeOfResponse;
import com.arbindo.mimock.interceptor.responsehandler.TextualResponseWriter;
import com.arbindo.mimock.interceptor.responsehandler.WriterCollection;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = {DefaultHttpInterceptor.class})
class DefaultHttpInterceptorTest {

    @Autowired
    DefaultHttpInterceptor defaultHttpInterceptor;

    @Mock
    HttpServletResponse mockHttpServletResponse;

    @MockBean
    GenericMockRequestController genericMockRequestController;

    @MockBean
    WriterCollection mockWriterCollection;

    @MockBean
    TextualResponseWriter mockTextualResponseWriter;

    @Test
    void shouldRespondWithProperResponseAndStatus_WhenMockValidMockIsReturnedByTheController() throws Exception {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        String requestURI = "api/test/v1";
        String expectedURI = "/api/test/v1";
        String expectedContentType = "application/json";
        String expectedResponseBody = "{'message': 'Hello World!'}";
        int expectedStatus = 200;

        mockHttpServletRequest.setRequestURI(requestURI);
        mockHttpServletRequest.setQueryString("active=true&type=test");
        mockHttpServletRequest.setAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, requestURI);

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .responseContentType(expectedContentType)
                .statusCode(expectedStatus)
                .responseBody(expectedResponseBody)
                .typeOfResponse(TypeOfResponse.TEXTUAL_RESPONSE)
                .build();

        lenient().when(genericMockRequestController.serveRequest(expectedURI, mockHttpServletRequest)).thenReturn(Optional.of(expectedMock));
        lenient().when(mockWriterCollection.getWriterFor(TypeOfResponse.TEXTUAL_RESPONSE)).thenReturn(mockTextualResponseWriter);

        boolean interceptorStatus = defaultHttpInterceptor.preHandle(mockHttpServletRequest, mockHttpServletResponse, new Object());

        verify(genericMockRequestController, times(1)).serveRequest(expectedURI, mockHttpServletRequest);
        verify(mockHttpServletResponse, times(1)).setStatus(expectedStatus);
        verify(mockHttpServletResponse, times(1)).setHeader("content-type", expectedContentType);
        verify(mockWriterCollection, times(1)).getWriterFor(TypeOfResponse.TEXTUAL_RESPONSE);
        verify(mockTextualResponseWriter, times(1)).write(expectedMock, mockHttpServletResponse);

        assertFalse(interceptorStatus);
    }

    @Test
    void shouldRespondWith404_WhenGenericControllerReturnsEmptyMock() throws Exception {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        String requestURI = "api/test/v1";
        String expectedURI = "/api/test/v1";
        int expectedStatus = 404;

        mockHttpServletRequest.setRequestURI(requestURI);
        mockHttpServletRequest.setQueryString("active=true&type=test");
        mockHttpServletRequest.setAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, requestURI);

        lenient().when(genericMockRequestController.serveRequest(expectedURI, mockHttpServletRequest)).thenReturn(Optional.empty());

        boolean interceptorStatus = defaultHttpInterceptor.preHandle(mockHttpServletRequest, mockHttpServletResponse, new Object());

        verify(genericMockRequestController, times(1)).serveRequest(expectedURI, mockHttpServletRequest);
        verify(mockHttpServletResponse, times(1)).setStatus(expectedStatus);

        assertFalse(interceptorStatus);
    }

    @Test
    void shouldRespondWith500_WhenWriterThrowsAnException() throws Exception {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        String requestURI = "api/test/v1";
        String expectedURI = "/api/test/v1";
        String expectedContentType = "application/json";
        int expectedStatus = 500;

        mockHttpServletRequest.setRequestURI(requestURI);
        mockHttpServletRequest.setQueryString("active=true&type=test");
        mockHttpServletRequest.setAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, requestURI);

        DomainModelForMock expectedMock = DomainModelForMock.builder()
                .statusCode(200)
                .responseContentType(expectedContentType)
                .typeOfResponse(TypeOfResponse.TEXTUAL_RESPONSE)
                .build();

        lenient().when(genericMockRequestController.serveRequest(expectedURI, mockHttpServletRequest)).thenReturn(Optional.of(expectedMock));
        lenient().when(mockWriterCollection.getWriterFor(TypeOfResponse.TEXTUAL_RESPONSE)).thenReturn(mockTextualResponseWriter);
        doThrow(IOException.class).when(mockTextualResponseWriter).write(expectedMock, mockHttpServletResponse);

        boolean interceptorStatus = defaultHttpInterceptor.preHandle(mockHttpServletRequest, mockHttpServletResponse, new Object());

        verify(genericMockRequestController, times(1)).serveRequest(expectedURI, mockHttpServletRequest);
        verify(mockHttpServletResponse, times(1)).setStatus(expectedStatus);
        verify(mockHttpServletResponse, times(1)).setHeader("content-type", expectedContentType);

        assertFalse(interceptorStatus);
    }
}
