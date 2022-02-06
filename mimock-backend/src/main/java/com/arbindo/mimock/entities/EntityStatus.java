package com.arbindo.mimock.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "entity_status")
public class EntityStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @Schema(description = "Entity Status Id")
    private Long id;

    @Column(name = "status", nullable = false, length = 16)
    @Schema(description = "Indicates status of the entity")
    private String status;

    @Column(name = "created_at", nullable = false)
    @Schema(description = "Creation Timestamp")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    @Schema(description = "Update Timestamp")
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    @Schema(description = "Delete Timestamp")
    private ZonedDateTime deletedAt;
}