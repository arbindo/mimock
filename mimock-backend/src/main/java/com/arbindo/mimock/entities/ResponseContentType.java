package com.arbindo.mimock.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "response_content_types")
public class ResponseContentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @Schema(example = "1", description = "Response Content Type Id")
    private Long id;

    @Column(name = "content_type", nullable = false)
    @Schema(example = "application/json", description = "Name of the Response Content Type")
    private String contentType;

    @Column(name = "description", nullable = false)
    @Schema(example = "Json response type", description = "Custom Description of the Response Content type")
    private String description;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    @Schema(description = "Creation Timestamp")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    @Schema(description = "Update Timestamp")
    private ZonedDateTime updateAt;

    @Column(name = "deleted_at")
    @Schema(description = "Delete Timestamp")
    private ZonedDateTime deletedAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "response_type_id", nullable = false)
    private ResponseType responseType;

    @Override
    public String toString() {
        return contentType;
    }
}
