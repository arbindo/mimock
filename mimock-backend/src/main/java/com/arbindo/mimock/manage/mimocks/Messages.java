package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.constants.ExceptionMessages;

public class Messages {

    private Messages() throws IllegalAccessException {
        throw new IllegalAccessException(ExceptionMessages.ILLEGAL_INSTANTIATION_EXCEPTION_MSG);
    }

    public static String createResourceSuccess(String id) {
        return String.format("Resource created successfully. The resource can be found at %s", id);
    }

    public static final String CREATE_RESOURCE_FAILED = "The resource creation has failed!";

    public static final String GET_RESOURCE_SUCCESS = "Resource found successfully!";

    public static final String GET_RESOURCE_FAILED = "Unable to find the resource!";

    public static final String DELETE_RESOURCE_FAILED = "Unable to delete the resource!";

    public static final String DELETE_ALL_RESOURCES_FAILED = "Unable to delete all the resources!";

    public static final String UPDATE_RESOURCE_SUCCESS = "Resource updated successfully!";

    public static final String UPDATE_RESOURCE_FAILED = "The resource update has failed!";

    public static final String ARCHIVED_RESOURCE_SUCCESS = "Resource archived successfully!";

    public static final String ARCHIVE_RESOURCE_FAILED = "Unable to archive the resource!";

    public static final String UNARCHIVED_RESOURCE_SUCCESS = "Resource unarchived successfully!";

    public static final String UNARCHIVE_RESOURCE_FAILED = "Unable to unarchive the resource!";


}
