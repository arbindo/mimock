package com.arbindo.mimock.constants;

public class UrlConfig {

    private UrlConfig() throws IllegalAccessException {
        throw new IllegalAccessException(ExceptionMessages.ILLEGAL_INSTANTIATION_EXCEPTION_MSG);
    }

    // region BASE
    public static final String API_PATH = "/api/mimock";
    public static final String VERSION = "/v1";
    // endregion

    // region SWAGGER
    public static final String SWAGGER_API_PATH = "/v3/api-docs";
    public static final String SWAGGER_UI_PATH = "/swagger-ui";
    public static final String SWAGGER_UI_HTML_PATH = "/swagger-ui.html";
    // endregion

    // region ACTIONS
    public static final String FORCE_DELETE_ACTION = ":forceDelete";
    public static final String ARCHIVE_ACTION = ":archive";
    public static final String UNARCHIVE_ACTION = ":unarchive";
    // endregion

    // region STATIC_RECORDS
    public static final String STATIC_RECORDS = "/static-records";
    public static final String HTTP_METHODS_STATIC_RECORDS = "/http-methods";
    public static final String RESPONSE_CONTENT_TYPE_STATIC_RECORDS = "/response-content-types";
    public static final String ENTITY_STATUS_STATIC_RECORDS = "/entity-status";
    // endregion

    // region MOCKS
    public static final String MOCKS = "/mocks";
    public static final String MOCKS_FILTER = "/filter";
    public static final String MOCKS_CSV_EXPORT = "/csv/export";
    public static final String MOCKS_CSV_TEMPLATE_EXPORT = "/csv/template/export";
    // endregion

    // region PATH
    public static final String MANAGE_PATH = API_PATH + VERSION + STATIC_RECORDS;
    public static final String MOCKS_PATH = API_PATH + VERSION + MOCKS;
    // endregion

}
