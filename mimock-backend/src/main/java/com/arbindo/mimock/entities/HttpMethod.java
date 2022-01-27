package com.arbindo.mimock.entities;

import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "http_methods")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HttpMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "method", nullable = false, length = 10)
    private String method;

    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;

}