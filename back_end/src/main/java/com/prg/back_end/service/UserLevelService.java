package com.prg.back_end.service;

import com.prg.back_end.entity.CrewStatus;
import com.prg.back_end.entity.UserEntity;
import com.prg.back_end.entity.UserLevel;
import com.prg.back_end.repository.CrewMemberRepository;
import com.prg.back_end.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

@Service
@AllArgsConstructor
public class UserLevelService {

    private final CrewMemberRepository crewMemberRepository;
    private final UserRepository userRepository;

    /**
     * APPROVED 횟수를 기준으로 등급을 계산합니다.
     *   0회       → SEED   (씨앗)
     *   1 ~ 4회  → SPROUT (새싹)
     *   5 ~ 9회  → BRANCH (가지)
     *   10 ~ 19회 → TREE   (나무)
     *   20회 +   → FOREST (숲)
     */
    public UserLevel calculateLevel(long approvedCount) {
        if (approvedCount >= 20) return UserLevel.FOREST;
        if (approvedCount >= 10) return UserLevel.TREE;
        if (approvedCount >= 5)  return UserLevel.BRANCH;
        if (approvedCount >= 1)  return UserLevel.SPROUT;
        return UserLevel.SEED;
    }

    /**
     * userId(PK)를 기반으로 등급을 재계산하고 DB에 저장합니다.
     * 승인 처리 후, 또는 프로필 조회 시 호출합니다.
     */
    @Transactional
    public UserLevel refreshLevel(Long userId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        if (ObjectUtils.isEmpty(user)) return UserLevel.SEED;

        long approvedCount = crewMemberRepository
                .countByUserIdAndStatus(userId, CrewStatus.APPROVED);

        UserLevel newLevel = calculateLevel(approvedCount);
        user.setUserLevel(newLevel);
        userRepository.save(user);

        return newLevel;
    }

    /**
     * UserLevel enum 값을 한글 라벨로 변환합니다.
     */
    public static String toKorean(UserLevel level) {
        if (level == null) return "씨앗";
        return switch (level) {
            case SEED   -> "씨앗";
            case SPROUT -> "새싹";
            case BRANCH -> "가지";
            case TREE   -> "나무";
            case FOREST -> "숲";
        };
    }
}
