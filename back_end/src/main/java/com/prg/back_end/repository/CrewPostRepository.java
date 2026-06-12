package com.prg.back_end.repository;

import com.prg.back_end.dto.CrewPostMemberResponse;
import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.entity.CrewPostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = """
           select p.id,
                p.title,
                p.content,
                p.max_people as maxPeople,
                p.created_at as createdAt,
                u.id as userKey,
                u.user_id as userId,
                u.nick_name as nickName,
                m.status,
                (
                    select count(m1.id)
                     from crew_post p1
                     join crew_member m1
                     on p1.id = m1.post_id
                     where p.id = p1.id
                ) as appliedCnt,
                r.spot_name as spotName,
                r.latitude,
                r.longitude,
                r.address,
                r.facility_info as facilityInfo,
                r.running_level as runningLevel
           from crew_post p
              join crew_member m
              on p.id = m.post_id
              join running_course r
              on r.id = p.course_id
              join user u
              on m.user_id = u.id
             where m.crew_role = 'OWNER'
            """,
            nativeQuery = true)
    Page<Object[]> findAllCrewPosts(Pageable pageable);
}
