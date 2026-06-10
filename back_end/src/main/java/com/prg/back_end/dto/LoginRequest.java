package com.prg.back_end.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {
    private String userId;
    private String password;
}
