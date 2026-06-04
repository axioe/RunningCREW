package com.my.total_jpa_back.users.dto;

import com.my.total_jpa_back.common.entity.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
// 외부에서 이거 저장해 주세요... 정보가 있는 DTO
public class UserCreateRequest {
    private String name;
    private Gender gender;
    private String email;
    private String likeColor;
}
