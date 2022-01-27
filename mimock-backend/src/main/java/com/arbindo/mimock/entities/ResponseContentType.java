package com.arbindo.mimock.entities;

import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "response_content_types")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseContentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "response_type", nullable = false)
    private String responseType;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updateAt;

    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;
}
