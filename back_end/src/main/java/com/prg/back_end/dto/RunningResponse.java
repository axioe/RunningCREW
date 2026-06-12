package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewPostEntity;
import com.prg.back_end.entity.RunningCourseEntity;
import com.prg.back_end.entity.RunningLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
                .build();
    }
}
