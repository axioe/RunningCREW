package com.my.total_jpa_back.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
//@RequiredArgsConstructor
public class BusinessException extends RuntimeException{
    private final String message;

    public BusinessException(String message) {
        this.message = message;
    }
}
