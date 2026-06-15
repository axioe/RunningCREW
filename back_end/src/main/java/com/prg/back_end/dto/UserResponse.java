package com.prg.back_end.dto;

import com.prg.back_end.entity.UserEntity;
import com.prg.back_end.entity.UserLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponse {
    private Long id;
    private String userId;
    private String email;
    private String nickName;
    private UserLevel userLevel;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageUrl;

    //  Users Entity -> UserResponse Dto
    public static UserResponse from(UserEntity user){
        return UserResponse.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickName(user.getNickName())
                .userLevel(user.getUserLevel())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public static UserResponse from(UserEntity user, String imageUrl){
        return UserResponse.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickName(user.getNickName())
                .userLevel(user.getUserLevel())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .imageUrl(imageUrl)
                .build();
    }
}
