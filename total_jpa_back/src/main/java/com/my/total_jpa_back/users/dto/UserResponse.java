package com.my.total_jpa_back.users.dto;

import com.my.total_jpa_back.common.entity.Gender;
import com.my.total_jpa_back.users.entity.Users;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

// Entity -> Dto
@Getter
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private Gender gender;
    private String email;
    private String likeColor;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Users Entity -> UserResponse Dto
    public static UserResponse from(Users users){
        return UserResponse.builder()
                .id(users.getId())
                .name(users.getName())
                .gender(users.getGender())
                .email(users.getEmail())
                .likeColor(users.getLikeColor())
                .createdAt(users.getCreatedAt())
                .updatedAt(users.getUpdatedAt())
                .build();
    }
}
