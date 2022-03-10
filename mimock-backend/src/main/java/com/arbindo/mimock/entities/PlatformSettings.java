package com.arbindo.mimock.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "platform_settings")
public class PlatformSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @Schema(example = "1", description = "Platform Settings Id")
    private Long id;

    @Column(name = "is_category_execution_enabled", nullable = false)
    @Schema(example = "false", description = "Category Based Execution Enabled/Disabled")
    private Boolean isCategoryExecutionEnabled = false;

    @Column(name = "is_steps_execution_enabled", nullable = false)
    @Schema(example = "false", description = "Steps Based Execution Enabled/Disabled")
    private Boolean isStepsExecutionEnabled = false;

    @Column(name = "is_export_import_enabled", nullable = false)
    @Schema(example = "true", description = "Export and Import Feature Enabled/Disabled")
    private Boolean isExportImportEnabled = true;

    @Column(name = "is_flush_bin_cron_enabled", nullable = false)
    @Schema(example = "true", description = "Flush Bin CRON Feature Enabled/Disabled")
    private Boolean isFlushBinCronEnabled = true;

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
