package com.arbindo.mimock.common.services;

import com.arbindo.mimock.entities.EntityStatus;
import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.arbindo.mimock.repository.EntityStatusRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.lenient;

@SpringBootTest
class EntityStatusServiceImplTest {
    @Autowired
    EntityStatusServiceImpl service;

    @MockBean
    EntityStatusRepository mockEntityStatusRepository;

    @Test
    void shouldGetEntityStatus() {
        lenient().when(mockEntityStatusRepository.findByStatus(Status.NONE.name()))
                .thenReturn(EntityStatus.builder().status(Status.NONE.name()).build());
        lenient().when(mockEntityStatusRepository.findByStatus(Status.DELETED.name()))
                .thenReturn(EntityStatus.builder().status(Status.DELETED.name()).build());
        lenient().when(mockEntityStatusRepository.findByStatus(Status.ARCHIVED.name()))
                .thenReturn(EntityStatus.builder().status(Status.ARCHIVED.name()).build());

        EntityStatus defaultEntityStatus = service.getDefaultMockEntityStatus();
        assertEquals(Status.NONE.name(), defaultEntityStatus.getStatus());

        EntityStatus archivedEntityStatus = service.getArchivedMockEntityStatus();
        assertEquals(Status.ARCHIVED.name(), archivedEntityStatus.getStatus());

        EntityStatus deletedEntityStatus = service.getDeletedMockEntityStatus();
        assertEquals(Status.DELETED.name(), deletedEntityStatus.getStatus());

        EntityStatus invalidEntityStatus = service.findByEntityStatus(null);
        assertNull(invalidEntityStatus);
    }
}