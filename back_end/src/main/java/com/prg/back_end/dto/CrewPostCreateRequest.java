package com.prg.back_end.dto;

import com.prg.back_end.entity.RunningLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrewPostCreateRequest {
    private Long userId;
    private String title;
    private String content;
    private Integer maxPeople;
    private String spotName;
    private double latitude;
    private double longitude;
    private String address;
    private String facilityInfo;
    private RunningLevel runningLevel;
}
