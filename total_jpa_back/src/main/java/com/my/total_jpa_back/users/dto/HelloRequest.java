package com.my.total_jpa_back.users.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HelloRequest {
    // api 요청 시 전달되는 매개변수들을 받는 DTO
    // POST Mapping 요청용으로 사용
    private String name;
    private int age;
}
