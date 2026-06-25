package com.prg.back_end.dto;

import com.prg.back_end.entity.CrewStatus;
import com.prg.back_end.entity.RunningLevel;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.sql.Timestamp;
import java.time.LocalDateTime;
@Getter
@ToString
@AllArgsConstructor
@Builder
public class CrewPostResponse {
    private Long id;
    private String title;
    private String content;
    private Long maxPeople;
    private LocalDateTime createdAt;
    //  작성자 사용자 정보
    //  user -> id
    private Long userId;
    //  user -> user_id
    private String loginId;
    private String nickName;
    private CrewStatus crewStatus;
    //  신청자수
    private Long appliedCnt;
    private String spotName;
    private double latitude;
    private double longitude;
    private String address;
    private String facilityInfo;
    private RunningLevel runningLevel;
    private LocalDateTime appliedAt;
    private double distance;

    public static CrewPostResponse toDto(Object[] row){
        return new CrewPostResponse(
                ((Number) row[0]).longValue(),
                (String) row[1],
                (String) row[2],
                ((Number) row[3]).longValue(),
                ((Timestamp) row[4]).toLocalDateTime(),
                ((Number) row[5]).longValue(),
                (String) row[6],
                (String) row[7],
                CrewStatus.valueOf((String) row[8]),
                ((Number) row[9]).longValue(),
                (String) row[10],
                ((Number) row[11]).doubleValue(),
                ((Number) row[12]).doubleValue(),
                (String) row[13],
                (String) row[14],
                RunningLevel.valueOf((String) row[15]),
                ((Timestamp) row[16]).toLocalDateTime(),
                ((Number) row[17]).longValue());
    }
}
