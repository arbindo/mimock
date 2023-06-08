package com.arbindo.mimock.entities;

import com.arbindo.mimock.utils.JSONUtils;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Map;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "request_headers")
public class RequestHeader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "request_header", nullable = false)
    @Type(type = "json")
    @Schema(description = "Headers passed while invoking the mock endpoint")
    private Map<String, Object> requestHeader;

    @Column(name = "match_exact", nullable = false)
    @Schema(description = "Flag to denote if header matching should be done loosely or strictly")
    private Boolean matchExact;

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

    @Override
    public String toString() {
        return JSONUtils.convertMapToJSONString(requestHeader);
    }
}
