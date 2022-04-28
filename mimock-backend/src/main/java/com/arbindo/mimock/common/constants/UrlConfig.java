package com.arbindo.mimock.common.constants;

public class UrlConfig {

    private UrlConfig() {
    }

    // region BASE
    public static final String API_PATH = "/api/mimock";
    public static final String VERSION = "/v1";
    // endregion

    // common api prefix
    public static final String API_PREFIX = API_PATH + VERSION;
    // end of prefix

    // role based prefix
    public static final String ADMIN = "/admin";
    public static final String MANAGE = "/manage";
    // end role based routes

    // region SWAGGER
    public static final String SWAGGER_API_PATH = "/v3/api-docs";
    public static final String SWAGGER_UI_PATH = "/swagger-ui";
    public static final String SWAGGER_UI_HTML_PATH = "/swagger-ui.html";
    public static final String SWAGGER_BEARER_AUTH_KEY = "bearer-key";
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

    // region PLATFORM_SETTINGS
    public static final String PLATFORM_SETTINGS = "/platform-settings";
    // endregion

    public static final String STATIC_RECORDS_PATH = API_PREFIX + STATIC_RECORDS;
    public static final String MOCKS_PATH = API_PREFIX + MOCKS;
    public static final String PLATFORM_SETTINGS_PATH = API_PREFIX + PLATFORM_SETTINGS;
    // endregion

    // region ADMIN PATH
    public static final String USERS = "/users";
    public static final String USER_PATH = API_PREFIX + ADMIN + USERS;
    public static final String GET_USER_BY_ID = "/user-info";
    // endregion

    // Authentication paths
    public static final String AUTHENTICATE = API_PREFIX + "/user/authenticate";
    public static final String VALIDATE_TOKEN = API_PREFIX + "/auth-token/validate";
    // end of Authentication paths

    // user routes
    public static final String USER_ACTIVATION = USER_PATH + "/update-activation";
    public static final String UPDATE_PASSWORD = USER_PATH + "/update-password";
    public static final String UPDATE_ROLE = USER_PATH + "/update-role";
    public static final String DELETE_USER = USER_PATH + "/delete-user";
    // end of user routes
}
