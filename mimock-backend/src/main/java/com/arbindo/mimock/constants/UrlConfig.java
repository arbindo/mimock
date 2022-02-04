package com.arbindo.mimock.constants;

public class UrlConfig {

    public static final String API_PATH = "/api/mimock";
    public static final String VERSION = "/v1";

    // region RESOURCES
    public static final String MANAGE = "/manage";
    public static final String MOCKS = "/mocks";
    public static final String MOCKS_CSV_EXPORT = "/csv/export";
    public static final String MOCKS_CSV_TEMPLATE_EXPORT = "/csv/template/export";
    // endregion

    // region PATH
    public static final String MANAGE_PATH = API_PATH + VERSION + MANAGE;
    public static final String MOCKS_PATH = API_PATH + VERSION + MOCKS;
    // endregion

}
