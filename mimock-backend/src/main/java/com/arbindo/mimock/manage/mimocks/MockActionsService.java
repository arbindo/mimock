package com.arbindo.mimock.manage.mimocks;

import com.arbindo.mimock.entities.Mock;

public interface MockActionsService {

    Mock archiveMock(String mockId);

    Mock unarchiveMock(String mockId);

}
