package com.arbindo.mimock.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "binary_responses")
public class BinaryResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @Schema(example = "1", description = "Binary Response Id")
    private Long id;

    @Lob
    @Column(name = "response_file", nullable = false)
    @Type(type = "org.hibernate.type.BinaryType")
    @Schema(description = "Expected response file in bytes")
    private byte[] responseFile;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    @Schema(description = "Creation Timestamp")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    @Schema(description = "Update Timestamp")
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    @Schema(description = "Delete Timestamp")
    private ZonedDateTime deletedAt;
}
