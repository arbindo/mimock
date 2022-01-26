package com.arbindo.mimock.mockhandler.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "mocks")
public class Mocks {
    @Id
    @Column(name = "mock_id", nullable = false)
    @Type(type = "org.hibernate.type.PostgresUUIDType")
    private UUID id;

    @Column(name = "route", nullable = false)
    private String route;

    @ManyToOne(optional = false)
    @JoinColumn(name = "method_id", nullable = false)
    private HttpMethod httpMethod;

    @ManyToOne(optional = false)
    @JoinColumn(name = "response_content_type_id", nullable = false)
    private ResponseContentType responseContentType;

    @Column(name = "status_code", nullable = false)
    private Integer statusCode;

    @Column(name = "query_params")
    private String queryParams;

    @ManyToOne
    @JoinColumn(name = "textual_response_id")
    private TextualResponseBody textualResponse;

    @ManyToOne
    @JoinColumn(name = "binary_response_id")
    private BinaryResponseBody binaryResponse;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private Instant createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Instant updatedAt;

    @Column(name = "deleted_at")
    private Instant deletedAt;
}