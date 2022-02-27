package com.arbindo.mimock.constants;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Roles {
    ADMIN,
    MANAGER,
    VIEWER;

    @Override
    public String toString() {
        return this.name();
    }

    @JsonCreator
    public static Roles enumFromText(String text) {
        for (Roles r : Roles.values()) {
            if (r.toString().equals(text)) {
                return r;
            }
        }

        throw new IllegalArgumentException("Role does not exist");
    }
}
