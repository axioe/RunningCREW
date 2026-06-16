package com.prg.back_end.dto;

import com.prg.back_end.entity.RunningLevel;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CrewPostCreateRequest {
    private Long userId;
    private String title;
    private String content;
    private Integer maxPeople;
    private Long courseId;
    private LocalDateTime appliedAt;
}
