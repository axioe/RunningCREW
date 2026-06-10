package com.my.total_jpa_back.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
// api 처리 중 Exception을 낚아서 처리하는 컨트롤러
public class GlobalExceptionHandler {
    // 어떤 오류를 받을 지
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handlerUserNotFound(
            UserNotFoundException e
    ){
        return ErrorResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(e.getMessage())
                .build();
    }
}
