package com.arbindo.mimock.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {
    @Id
    @Column(name = "user_id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "user_name", nullable = false, length = 128)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "is_user_active", nullable = false)
    private Boolean isUserActive = false;

    @Column(name = "is_user_blocked", nullable = false)
    private Boolean isUserBlocked = false;

    @Column(name = "is_session_active", nullable = false)
    private Boolean isSessionActive = false;

    @Column(name = "last_login_at")
    private ZonedDateTime lastLoginAt;

    @Column(name = "password_updated_at")
    private ZonedDateTime passwordUpdatedAt;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private UserRole userRoles;

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