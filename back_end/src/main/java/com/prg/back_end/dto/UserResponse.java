package com.prg.back_end.dto;

import com.prg.back_end.entity.UserEntity;
import com.prg.back_end.entity.UserLevel;
import com.prg.back_end.service.UserLevelService;
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
    private String userLevelLabel;   // 한글 등급명: 씨앗/새싹/가지/나무/숲
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageUrl;

    public static UserResponse from(UserEntity user){
        return UserResponse.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickName(user.getNickName())
                .userLevel(user.getUserLevel())
                .userLevelLabel(UserLevelService.toKorean(user.getUserLevel()))
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
                .userLevelLabel(UserLevelService.toKorean(user.getUserLevel()))
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .imageUrl(imageUrl)
                .build();
    }
}
