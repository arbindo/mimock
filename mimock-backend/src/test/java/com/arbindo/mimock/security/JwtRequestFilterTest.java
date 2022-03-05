package com.arbindo.mimock.security;

import com.arbindo.mimock.entities.User;
import com.arbindo.mimock.entities.UserRole;
import com.arbindo.mimock.security.user.MimockUserDetailsService;
import com.arbindo.mimock.security.user.models.MimockUserDetails;
import com.arbindo.mimock.security.utils.JWTUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.servlet.ServletException;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class JwtRequestFilterTest {
    @Autowired
    JwtRequestFilter jwtRequestFilter;

    @MockBean
    JWTUtils jwtUtils;

    @MockBean
    MimockUserDetailsService userDetailsService;

    @Test
    public void shouldRespondWithStatusOK_WhenUserIsPresent() throws ServletException, IOException {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        String token = "eyJpYXQiOiJTYXQgTWFyIDA1IDIyOjE4OjEyIElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJ0ZXN0YWRtaW4iLCJleHAiOjE2NDY1MDA5MTF9.bzx58OY0Jj7vrlxv5gUIJI1pg_iW17W_cWNqGDZAY1E";
        mockHttpServletRequest.addHeader("Authorization", "Bearer " + token);

        MockHttpServletResponse mockHttpServletResponse = new MockHttpServletResponse();
        MockFilterChain mockFilterChain = new MockFilterChain();

        MimockUserDetails userDetails = new MimockUserDetails(
                User.builder()
                        .userName("testadmin")
                        .password("Password@007")
                        .userRoles(UserRole.builder().roleName("ADMIN").build())
                        .build()
        );

        lenient().when(jwtUtils.extractUsername(token)).thenReturn("testadmin");
        lenient().when(userDetailsService.loadUserByUsername("testadmin")).thenReturn(userDetails);
        lenient().when(jwtUtils.validateToken(token, userDetails)).thenReturn(true);

        jwtRequestFilter.doFilterInternal(mockHttpServletRequest, mockHttpServletResponse, mockFilterChain);

        assertEquals(200, mockHttpServletResponse.getStatus());
    }

    @Test
    public void shouldRespondWithStatusUnAuthorized_WhenTokenIsInValid() throws ServletException, IOException {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        String token = "exxyJpYXQiOiJTYXQgTWFyIDA1IDIyOjE4OjEyIElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJ0ZXN0YWRtaW4iLCJleHAiOjE2NDY1MDA5MTF9.bzx58OY0Jj7vrlxv5gUIJI1pg_iW17W_cWNqGDZAY1E";
        mockHttpServletRequest.addHeader("Authorization", "Bearer " + token);

        MockHttpServletResponse mockHttpServletResponse = new MockHttpServletResponse();
        MockFilterChain mockFilterChain = new MockFilterChain();

        MimockUserDetails userDetails = new MimockUserDetails(
                User.builder()
                        .userName("testadmin")
                        .password("Password@007")
                        .userRoles(UserRole.builder().roleName("ADMIN").build())
                        .build()
        );

        lenient().when(jwtUtils.extractUsername(token)).thenReturn("testadmin");
        lenient().when(userDetailsService.loadUserByUsername("testadmin")).thenReturn(userDetails);
        lenient().when(jwtUtils.validateToken(token, userDetails)).thenReturn(false);

        jwtRequestFilter.doFilterInternal(mockHttpServletRequest, mockHttpServletResponse, mockFilterChain);

        assertEquals(401, mockHttpServletResponse.getStatus());
    }

    @Test
    public void shouldRespondWithStatusUnAuthorized_WhenUserIsNotPresent() throws ServletException, IOException {
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        String token = "eyJpYXQiOiJTYXQgTWFyIDA1IDIyOjE4OjEyIElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJ0ZXN0YWRtaW4iLCJleHAiOjE2NDY1MDA5MTF9.bzx58OY0Jj7vrlxv5gUIJI1pg_iW17W_cWNqGDZAY1E";
        mockHttpServletRequest.addHeader("Authorization", "Bearer " + token);

        MockHttpServletResponse mockHttpServletResponse = new MockHttpServletResponse();
        MockFilterChain mockFilterChain = new MockFilterChain();

        MimockUserDetails userDetails = new MimockUserDetails(
                User.builder()
                        .userName("testadmin")
                        .password("Password@007")
                        .userRoles(UserRole.builder().roleName("ADMIN").build())
                        .build()
        );

        lenient().when(jwtUtils.extractUsername(token)).thenReturn("testadmin");
        lenient().when(userDetailsService.loadUserByUsername("testadmin")).thenThrow(UsernameNotFoundException.class);

        jwtRequestFilter.doFilterInternal(mockHttpServletRequest, mockHttpServletResponse, mockFilterChain);

        assertEquals(401, mockHttpServletResponse.getStatus());
    }
}