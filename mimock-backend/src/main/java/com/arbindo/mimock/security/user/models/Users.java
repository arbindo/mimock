package com.arbindo.mimock.security.user.models;

import java.util.ArrayList;
import java.util.Collection;

public class Users extends ArrayList<UserInfo> {
    @Override
    public boolean addAll(Collection<? extends UserInfo> c) {
        return super.addAll(c);
    }

    @Override
    public boolean add(UserInfo userInfo) {
        return super.add(userInfo);
    }

    @Override
    public boolean isEmpty() {
        return super.isEmpty();
    }
}
