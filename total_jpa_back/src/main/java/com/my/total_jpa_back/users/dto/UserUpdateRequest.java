package com.my.total_jpa_back.users.dto;

import com.my.total_jpa_back.common.entity.Gender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {
    private String name;
    private Gender gender;
    private String email;
    private String likeColor;
}
