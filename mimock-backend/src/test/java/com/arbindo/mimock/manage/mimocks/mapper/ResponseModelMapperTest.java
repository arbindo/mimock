package com.arbindo.mimock.manage.mimocks.mapper;

import com.arbindo.mimock.entities.Mock;
import com.arbindo.mimock.manage.mimocks.models.response.ListMocksResponse;
import org.junit.jupiter.api.Test;

import static com.arbindo.mimock.helpers.entities.MocksGenerator.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ResponseModelMapperTest {

    @Test
    void shouldMapMockPageableToListMockResponsePageable(){
        Mock expectedMockFromDB = generateMock();
        ListMocksResponse listMocksResponse = ResponseModelMapper.map(expectedMockFromDB);

        // Assert
        assertEquals(expectedMockFromDB.getId().toString(), listMocksResponse.getId());
        assertEquals(expectedMockFromDB.getMockName(), listMocksResponse.getMockName());
        assertEquals(expectedMockFromDB.getRoute(), listMocksResponse.getRoute());
        assertEquals(expectedMockFromDB.getDescription(), listMocksResponse.getDescription());
        assertEquals(expectedMockFromDB.getHttpMethod().getMethod(), listMocksResponse.getHttpMethod());
    }
}
