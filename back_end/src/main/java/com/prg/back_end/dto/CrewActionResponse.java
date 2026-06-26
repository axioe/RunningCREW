package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CrewActionResponse {
    private boolean success;
    private String code;   // OK, FORBIDDEN, NOT_FOUND
    private String message;
    private CrewStatus crewStatus;

    public static CrewActionResponse ok(CrewStatus crewStatus) {
        return CrewActionResponse.builder()
                .success(true)
                .code("OK")
                .message("처리되었습니다.")
                .crewStatus(crewStatus)
                .build();
    }

    public static CrewActionResponse forbidden() {
        return CrewActionResponse.builder()
                .success(false)
                .code("FORBIDDEN")
                .message("방장만 처리할 수 있습니다.")
                .build();
    }

    public static CrewActionResponse notFound() {
        return CrewActionResponse.builder()
                .success(false)
                .code("NOT_FOUND")
                .message("대상을 찾을 수 없습니다.")
                .build();
    }
}
