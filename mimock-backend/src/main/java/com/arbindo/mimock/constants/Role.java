package com.arbindo.mimock.constants;

public enum Role {
    ADMIN,
    MANAGER,
    VIEWER;

    @Override
    public String toString() {
        return this.name();
    }

    public static Role enumFromText(String text) {
        for (Role r : Role.values()) {
            if (r.toString().equals(text)) {
                return r;
            }
        }

        throw new IllegalArgumentException("Role does not exist");
    }
}
