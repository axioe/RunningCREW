package com.prg.back_end.dto;

import com.prg.back_end.entity.RunningLevel;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CrewPostUpdateRequest {
    private String title;
    private String content;
    private Integer maxPeople;
    private Long courseId;
}
