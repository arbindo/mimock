package com.arbindo.mimock.managemocks;

public class Messages {

    public static String CREATE_RESOURCE_SUCCESS(String id){
        return String.format("Resource created successfully. The resource can be found at %s", id);
    }

    public static final String CREATE_RESOURCE_FAILED = "The resource creation has failed!";

    public static final String GET_RESOURCE_SUCCESS = "Resource found successfully!";

    public static final String GET_RESOURCE_FAILED = "Unable to find the resource!";

    public static final String DELETE_RESOURCE_FAILED = "Unable to delete the resource!";


}
