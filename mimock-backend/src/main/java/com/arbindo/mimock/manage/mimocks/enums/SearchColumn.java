package com.arbindo.mimock.manage.mimocks.enums;

public enum SearchColumn {
    NAME("NAME"),
    DESCRIPTION("DESCRIPTION"),
    ROUTE("ROUTE");

    public final String value;

    private SearchColumn(String value) {
        this.value = value;
    }
}
