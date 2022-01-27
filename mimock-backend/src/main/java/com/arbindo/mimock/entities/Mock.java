package com.arbindo.mimock.entities;

import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "mocks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Mock {

    @Id
    @Column(name = "mock_id", nullable = false)
    private UUID id;

    @Lob
    @Column(name = "route", nullable = false, length = 2048)
    private String route;

    @ManyToOne(optional = false)
    @JoinColumn(name = "method_id", nullable = false)
    private HttpMethod method;

    @ManyToOne(optional = false)
    @JoinColumn(name = "response_content_type_id", nullable = false)
    private ResponseContentType responseContentType;

    @Column(name = "status_code", nullable = false)
    private Integer statusCode;

    @Column(name = "query_params", length = 1024)
    private String queryParams;

    @ManyToOne
    @JoinColumn(name = "textual_response_id")
    private TextualResponse textualResponse;

    @ManyToOne
    @JoinColumn(name = "binary_response_id")
    private BinaryResponse binaryResponse;

    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;
}