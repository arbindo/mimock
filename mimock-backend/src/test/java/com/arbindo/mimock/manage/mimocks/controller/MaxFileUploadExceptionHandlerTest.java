package com.arbindo.mimock.manage.mimocks.controller;

import org.junit.jupiter.api.Test;
import org.springdoc.api.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.ModelAndView;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MaxFileUploadExceptionHandlerTest {

    @Autowired
    MaxFileUploadExceptionHandler maxFileUploadExceptionHandler;

    @Test
    void shouldRespondWithError_WhenMaxUploadSizeExceededExceptionIsEncountered() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();


        ModelAndView modelAndView = maxFileUploadExceptionHandler.resolveException(
                request,
                response,
                null,
                new MaxUploadSizeExceededException(1L)
        );

        String expectedError = "Maximum multipart file size limit violated";

        assertNotNull(modelAndView);
        ErrorMessage error = (ErrorMessage) modelAndView.getModel().get("errorMessage");
        assertNotNull(error);

        assertNotNull(modelAndView.getStatus());
        assertEquals(500, modelAndView.getStatus().value());
        assertEquals(expectedError, error.getMessage());
    }

    @Test
    void shouldReturnNull_WhenNoMaxUploadSizeExceededExceptionIsEncountered() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();


        ModelAndView modelAndView = maxFileUploadExceptionHandler.resolveException(
                request,
                response,
                null,
                new IllegalArgumentException()
        );

        assertNull(modelAndView);
    }
}