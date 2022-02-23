package com.arbindo.mimock.constants;

public enum Roles {
    ADMIN,
    MANAGER,
    VIEWER;

    @Override
    public String toString() {
        return this.name();
    }
}
