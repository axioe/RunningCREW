package com.prg.back_end.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private Long id;
    private String roleType;

    public static LoginResponse from(Long id, String roleType){
        return LoginResponse.builder()
                .id(id)
                .roleType(roleType)
                .build();
    }
}
