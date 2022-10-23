package com.arbindo.mimock.security;

import com.arbindo.mimock.security.user.MimockUserDetailsService;
import com.arbindo.mimock.security.utils.JWTUtils;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Log4j2
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    MimockUserDetailsService userDetailsService;

    @Autowired
    JWTUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (isNotAMimockEndpoint(request)) {
            log.log(Level.DEBUG, "Filter invoked for a mock request. Skipping JWT filter");
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String authToken = null;
        String userName = null;

        try {
            if (isAuthHeaderValid(authHeader)) {
                log.log(Level.DEBUG, "Reading auth token from header");
                authToken = authHeader.substring(7);
                userName = jwtUtils.extractUsername(authToken);
            }

            if (shouldProceedWithTokenValidation(userName)) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);
                if (!jwtUtils.validateToken(authToken, userDetails)) {
                    String errorMessage = "Auth token is invalid";
                    log.log(Level.DEBUG, errorMessage);
                    setErrorResponse(response, new Exception(errorMessage));
                }

                UsernamePasswordAuthenticationToken token = getTokenForUser(userDetails);
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        } catch (Exception e) {
            log.log(Level.DEBUG, e.getMessage());
            setErrorResponse(response, e);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private static boolean isNotAMimockEndpoint(HttpServletRequest request) {
        return !request.getRequestURL().toString().contains("/api/mimock");
    }


    private boolean isAuthHeaderValid(String authHeader) {
        return authHeader != null && authHeader.startsWith("Bearer ");
    }

    private boolean shouldProceedWithTokenValidation(String userName) {
        return userName != null && SecurityContextHolder.getContext().getAuthentication() == null;
    }

    private UsernamePasswordAuthenticationToken getTokenForUser(UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }

    private void setErrorResponse(HttpServletResponse response, Exception e) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(String.format("{\"authenticationError\": \"%s\"}", e.getMessage()));
    }
}
