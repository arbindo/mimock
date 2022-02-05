package com.arbindo.mimock.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "textual_responses")
public class TextualResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @Schema(example = "1", description = "Textual Response Id")
    private Long id;

    @Column(name = "response_body", nullable = false)
    @Schema(description = "Expected response body")
    private String responseBody;

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
