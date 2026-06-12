package com.prg.back_end.repository;

import com.prg.back_end.dto.CrewPostMemberResponse;
import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.entity.CrewPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CrewPostRepository extends JpaRepository<CrewPostEntity, Long> {
    //  user.id 조회
    @Query("""
           select  new com.prg.back_end.dto.CrewPostMemberResponse(
                p.id,
                p.title,
                p.content,
                p.maxPeople,
                m.crewRole,
                m.status,
                m.appliedAt,
                r.spotName,
                r.latitude,
                r.longitude,
                r.address,
                r.facilityInfo,
                r.runningLevel
                )
           from CrewPostEntity p
              join CrewMemberEntity m
              on p.id = m.postId
              join RunningCourseEntity r
              on r.id = p.courseId
           where m.userId = :userId
              order by p.createdAt desc
            """)
    List<CrewPostMemberResponse> searchByUserId(@Param("userId") Long userId);
}
