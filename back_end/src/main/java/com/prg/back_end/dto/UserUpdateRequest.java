package com.prg.back_end.dto;

import com.prg.back_end.entity.UserLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {
    private String userId;
    private String email;
    private String nickName;
    private UserLevel userLevel;
    private String password;
}
