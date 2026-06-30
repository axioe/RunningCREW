package com.prg.back_end.repository;

import com.prg.back_end.dto.CrewMemberResponse;
import com.prg.back_end.dto.CrewPostMemberResponse;
import com.prg.back_end.entity.CrewMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CrewMemberRepository extends JpaRepository<CrewMemberEntity, Long> {
    @Query("""
           select  new com.prg.back_end.dto.CrewMemberResponse(
                m.id,
                m.postId,
                m.userId,
                p.title,
                p.content,
                p.maxPeople,
                p.appliedAt,
                m.createdAt,
                m.crewRole,
                m.status,
                u.nickName,
                r.spotName,
                r.address,
                r.runningLevel
                )
           from CrewMemberEntity m
              left join CrewPostEntity p
              on p.id = m.postId
              left join RunningCourseEntity r
              on r.id = p.courseId
              join UserEntity u
              on u.id = m.userId
           where m.postId = :postId
              order by m.createdAt
           """)
    List<CrewMemberResponse> findByPostId(@Param("postId") Long postId);

    java.util.Optional<CrewMemberEntity> findByPostIdAndUserId(Long postId, Long userId);

    void deleteByPostId(Long postId);
}
