package com.arbindo.mimock.entities;

import com.arbindo.mimock.manage.mimocks.enums.Status;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "mocks")
public class Mock {

    @Id
    @Column(name = "mock_id", nullable = false)
    @Type(type = "org.hibernate.type.PostgresUUIDType")
    @Schema(description = "Mock Id")
    private UUID id;

    @Column(name = "mock_name", nullable = false)
    @Schema(example = "Weather api mock", description = "Field to set an unique searchable field for mocks")
    private String mockName;

    @Column(name = "description")
    @Schema(example = "This is my new mock!!!", description = "Custom Description of the Mock")
    private String description;

    @Column(name = "route", nullable = false, length = 2048)
    @Schema(example = "/github/v3/pull", description = "Route of the mock")
    private String route;

    @ManyToOne(optional = false)
    @JoinColumn(name = "method_id", nullable = false)
    @Schema(description = "Represents the HTTP method")
    private HttpMethod httpMethod;

    @Column(name = "status_code", nullable = false)
    @Schema(example = "200", description = "Expected status code of the mock")
    private Integer statusCode;

    @ManyToOne(optional = false)
    @JoinColumn(name = "response_content_type_id", nullable = false)
    @Schema(description = "Represents the response content type")
    private ResponseContentType responseContentType;

    @Column(name = "query_params", length = 1024)
    @Schema(example = "name=John&age=10", description = "Associated query params of the mock")
    private String queryParams;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_header_id")
    private RequestHeader requestHeaders;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "response_header_id")
    private ResponseHeader responseHeaders;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_body_id")
    private RequestBodiesForMock requestBodiesForMock;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "textual_response_id")
    @Schema(description = "Represents the expected textual response")
    private TextualResponse textualResponse;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "binary_response_id")
    @Schema(description = "Represents the expected binary response")
    private BinaryResponse binaryResponse;

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

    @ManyToOne(optional = false)
    @JoinColumn(name = "entity_status_id", nullable = false)
    @Schema(description = "Indicates the entity status")
    private EntityStatus entityStatus;

    public boolean isArchived() {
        return Status.valueOf(getEntityStatus().getStatus()) == Status.ARCHIVED;
    }

    public boolean canEditMock() {
        return Status.valueOf(getEntityStatus().getStatus()) != Status.DELETED;
    }

}