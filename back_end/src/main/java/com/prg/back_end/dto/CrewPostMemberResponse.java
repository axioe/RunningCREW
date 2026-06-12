package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewRole;
import com.prg.back_end.entity.CrewStatus;
import com.prg.back_end.entity.RunningLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CrewPostMemberResponse {
    private Long id;
    private String title;
    private String content;
    private Integer maxPeople;
    private CrewRole crewRole;
    private CrewStatus crewStatus;
    private LocalDateTime appliedAt;
    private String spotName;
    private double latitude;
    private double longitude;
    private String address;
    private String facilityInfo;
    private RunningLevel runningLevel;
}
