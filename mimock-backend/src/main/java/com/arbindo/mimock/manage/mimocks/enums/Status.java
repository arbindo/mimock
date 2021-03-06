package com.arbindo.mimock.manage.mimocks.enums;

public enum Status {

    // By default, all entities have status as NONE
    NONE,

    // When entity is archived, status is changed to ARCHIVE.
    // Status transition to DELETED or NONE is allowed.
    ARCHIVED,

    // When entity is deleted, status is changed to DELETE.
    // No status transition is allowed.
    DELETED
}
