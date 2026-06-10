package com.my.total_jpa_back.common.exception;

public class UserNotFoundException extends BusinessException{
    public UserNotFoundException() {
        super("회원을 찾을 수 없습니다.");
    }
}
