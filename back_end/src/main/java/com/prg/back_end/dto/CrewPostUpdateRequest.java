package com.prg.back_end.dto;

import com.prg.back_end.entity.RunningLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class CrewPostUpdateRequest {
    private String title;
    private String content;
    private Integer maxPeople;
    private Long courseId;
    private LocalDateTime appliedAt;
}
