package com.prg.back_end.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateRequest {
    private String userId;
    private String email;
    private String password;
    private String nickName;
}
