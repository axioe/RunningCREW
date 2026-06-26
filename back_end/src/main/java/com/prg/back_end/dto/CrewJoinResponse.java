package com.prg.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CrewJoinResponse {
    private boolean success;
    private String code;   // OK, ALREADY_APPLIED, POST_NOT_FOUND
    private String message;

    public static CrewJoinResponse ok() {
        return CrewJoinResponse.builder()
                .success(true)
                .code("OK")
                .message("신청이 완료되었습니다.")
                .build();
    }

    public static CrewJoinResponse alreadyApplied() {
        return CrewJoinResponse.builder()
                .success(false)
                .code("ALREADY_APPLIED")
                .message("이미 참여한 크루입니다.")
                .build();
    }

    public static CrewJoinResponse postNotFound() {
        return CrewJoinResponse.builder()
                .success(false)
                .code("POST_NOT_FOUND")
                .message("존재하지 않는 모집글입니다.")
                .build();
    }
}
