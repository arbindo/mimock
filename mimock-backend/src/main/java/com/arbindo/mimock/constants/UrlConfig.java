package com.arbindo.mimock.constants;

public class UrlConfig {

    private UrlConfig() throws IllegalAccessException {
        throw new IllegalAccessException(ExceptionMessages.ILLEGAL_INSTANTIATION_EXCEPTION_MSG);
    }

    public static final String API_PATH = "/api/mimock";
    public static final String VERSION = "/v1";
    public static final String SWAGGER_API_PATH = "/v3/api-docs";
    public static final String SWAGGER_UI_PATH = "/swagger-ui";
    public static final String SWAGGER_UI_HTML_PATH = "/swagger-ui.html";
    public static final String FORCE_DELETE_ACTION = ":forceDelete";

    // region RESOURCES
    public static final String MANAGE = "/manage";
    public static final String MOCKS = "/mocks";
    public static final String MOCKS_FILTER = "/filter";
    public static final String MOCKS_CSV_EXPORT = "/csv/export";
    public static final String MOCKS_CSV_TEMPLATE_EXPORT = "/csv/template/export";
    // endregion

    // region PATH
    public static final String MANAGE_PATH = API_PATH + VERSION + MANAGE;
    public static final String MOCKS_PATH = API_PATH + VERSION + MOCKS;
    // endregion

}
