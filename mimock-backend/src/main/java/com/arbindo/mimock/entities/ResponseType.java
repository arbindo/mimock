package com.arbindo.mimock.entities;

import com.arbindo.mimock.generic.model.TypeOfResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Getter
@Entity
@Table(name = "response_types")
public class ResponseType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 20)
    @Schema(example = "Response type name", description = "Field to indicate the type of a response field")
    @Enumerated(EnumType.STRING)
    private TypeOfResponse name;


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