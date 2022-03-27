package com.arbindo.mimock.generic;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class UIRouteFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest servletRequest = (HttpServletRequest) request;
        String requestURI = servletRequest.getRequestURI();

        if (requestURI.startsWith("/mimock-ui")) {
            request.getRequestDispatcher("/").forward(request, response);
            return;
        }

        chain.doFilter(request, response);
    }
}
