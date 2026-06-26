package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewRole;
import com.prg.back_end.entity.CrewStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CrewMemberResponse {
    private Long id;
    private Long postId;
    private Long userId;
    private String title;
    private String content;
    private Integer maxPeople;
    private LocalDateTime appliedAt;
    private LocalDateTime createdAt;
    private CrewRole crewRole;
    private CrewStatus crewStatus;
    private String nickName;
}
