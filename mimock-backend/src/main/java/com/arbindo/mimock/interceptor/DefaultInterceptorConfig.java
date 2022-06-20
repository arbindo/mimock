package com.arbindo.mimock.interceptor;

import com.arbindo.mimock.common.constants.UrlConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class DefaultInterceptorConfig implements WebMvcConfigurer {
    private final DefaultHttpInterceptor defaultHttpInterceptor;

    @Autowired
    public DefaultInterceptorConfig(DefaultHttpInterceptor defaultHttpInterceptor) {
        this.defaultHttpInterceptor = defaultHttpInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(defaultHttpInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(UrlConfig.SWAGGER_API_PATH + "/**")
                .excludePathPatterns(UrlConfig.SWAGGER_UI_PATH + "/**")
                .excludePathPatterns(UrlConfig.SWAGGER_UI_HTML_PATH)
                .excludePathPatterns(UrlConfig.API_PATH + UrlConfig.VERSION + "/**")
                .excludePathPatterns("/")
                .excludePathPatterns(UrlConfig.API_PATH + "/manage/monitoring")
                .excludePathPatterns(UrlConfig.API_PATH + "/manage/monitoring/*")
                .excludePathPatterns("/*.js",
                        "/*.css",
                        "/*.html",
                        "/*.png",
                        "/*.jpg",
                        "/*.jpeg",
                        "/*.gif",
                        "/*.woff",
                        "/*.ttf",
                        "/*.svg",
                        "/*.ico")
                .excludePathPatterns("/mimock-ui/**")
                .excludePathPatterns("index.html")
                .excludePathPatterns("/index.html")
                .excludePathPatterns("favicon.ico")
                .excludePathPatterns("/favicon.ico")
                .excludePathPatterns("/error");
    }
}
