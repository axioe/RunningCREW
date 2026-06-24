package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewPostEntity;
import com.prg.back_end.entity.CrewStatus;
import com.prg.back_end.entity.RunningCourseEntity;
import com.prg.back_end.entity.RunningLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class RunningResponse {
    private Long id;
    private String spotName;
    private double latitude;
    private double longitude;
    private String address;
    private String facilityInfo;
    private RunningLevel runningLevel;
    private double distance;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageUrl;

    public static RunningResponse from(RunningCourseEntity data){
        return RunningResponse.builder()
                .id(data.getId())
                .spotName(data.getSpotName())
                .latitude(data.getLatitude())
                .longitude(data.getLongitude())
                .address(data.getAddress())
                .facilityInfo(data.getFacilityInfo())
                .runningLevel(data.getRunningLevel())
                .distance(data.getDistance())
                .createdAt(data.getCreatedAt())
                .updatedAt(data.getUpdatedAt())
                .imageUrl("")
                .build();
    }

    public static RunningResponse toDto(Object[] row){
        return new RunningResponse(
                ((Number) row[0]).longValue(),
                (String) row[1],
                ((Number) row[2]).doubleValue(),
                ((Number) row[3]).doubleValue(),
                (String) row[4],
                (String) row[5],
                RunningLevel.valueOf((String) row[6]),
                ((Number) row[7]).doubleValue(),
                ((Timestamp) row[8]).toLocalDateTime(),
                ((Timestamp) row[9]).toLocalDateTime(),
                (String) row[10]
                );
    }
}
