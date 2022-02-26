package com.arbindo.mimock.security.user.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

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

    @Override
    public boolean equals(Object o) {
        Users u = (Users) o;
        if (u == null) return false;
        if (this.size() != u.size()) return false;

        HashMap<String, Users> selfMap = new HashMap<>();
        for (UserInfo userInfo : this) {
            selfMap.put(userInfo.getUserId(), this);
        }

        HashMap<String, Users> otherMap = new HashMap<>();
        for (UserInfo userInfo : u) {
            otherMap.put(userInfo.getUserId(), u);
        }

        for (Map.Entry<String, Users> e : selfMap.entrySet()) {
            String key = e.getKey();
            if (otherMap.get(key) == null) return false;
        }
        
        return true;
    }
}
