package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewPostEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ResultResponse {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ResultResponse from(CrewPostEntity data){
        return ResultResponse.builder()
                .id(data.getId())
                .createdAt(data.getCreatedAt())
                .updatedAt(data.getUpdatedAt())
                .build();
    }

    public static ResultResponse from(Long id, LocalDateTime createAt, LocalDateTime updatedAt){
        return ResultResponse.builder()
                .id(id)
                .createdAt(createAt)
                .updatedAt(updatedAt)
                .build();
    }
}
