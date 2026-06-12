package com.prg.back_end.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPasswordRequest {
    private Long id;
    private String password;
}
