package com.prg.back_end.dto;

import com.prg.back_end.entity.RunningLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RunningRequest {
    private String spotName;
    private double latitude;
    private double longitude;
    private String address;
    private String facilityInfo;
    private RunningLevel runningLevel;
    private double distance;
}
