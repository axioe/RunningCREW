package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewPostEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CrewPostResponse {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CrewPostResponse from(CrewPostEntity data){
        return CrewPostResponse.builder()
                .id(data.getId())
                .createdAt(data.getCreatedAt())
                .updatedAt(data.getUpdatedAt())
                .build();
    }

    public static CrewPostResponse from(Long id, LocalDateTime createAt, LocalDateTime updatedAt){
        return CrewPostResponse.builder()
                .id(id)
                .createdAt(createAt)
                .updatedAt(updatedAt)
                .build();
    }
}
