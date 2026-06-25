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
                p.appliedAt,
                r.spotName,
                r.latitude,
                r.longitude,
                r.address,
                r.facilityInfo,
                r.runningLevel,
                r.distance
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

    @Query("""
           select  new com.prg.back_end.dto.CrewPostMemberResponse(
                p.id,
                p.title,
                p.content,
                p.maxPeople,
                m.crewRole,
                m.status,
                p.appliedAt,
                r.spotName,
                r.latitude,
                r.longitude,
                r.address,
                r.facilityInfo,
                r.runningLevel,
                r.distance
                )
           from CrewPostEntity p
              join CrewMemberEntity m
              on p.id = m.postId
              join RunningCourseEntity r
              on r.id = p.courseId
           where m.userId = :userId
              and  m.crewRole = 'OWNER'
              order by p.createdAt desc
            """)
    List<CrewPostMemberResponse> searchByUserIdOwner(@Param("userId") Long userId);

    @Query(value = """
               select
                    p.id,
                    p.title,
                    p.content,
                    p.max_people,
                    p.created_at,
                    u.id as user_pk,
                    u.user_id,
                    u.nick_name,
                    m.status,
                    count(cm.id) as member_count,
                    r.spot_name,
                    r.latitude,
                    r.longitude,
                    r.address,
                    r.facility_info,
                    r.running_level,
                    p.applied_at,
                    r.distance,
                    p.course_id
                from crew_post p
                join crew_member m
                    on p.id = m.post_id
                join running_course r
                    on r.id = p.course_id
                join `user` u
                    on m.user_id = u.id
                left join crew_member cm
                    on cm.post_id = p.id
                where m.crew_role = 'OWNER'
                  AND (:distance IS NULL OR distance <= :distance)
                  AND (:difficulty IS NULL OR running_level = :difficulty)
                  AND (:address IS NULL OR address LIKE CONCAT('%', :address, '%'))
                group by
                    p.id,
                    p.title,
                    p.content,
                    p.max_people,
                    p.created_at,
                    u.id,
                    u.user_id,
                    u.nick_name,
                    m.status,
                    r.spot_name,
                    r.latitude,
                    r.longitude,
                    r.address,
                    r.facility_info,
                    r.running_level,
                    p.applied_at
               """,
            nativeQuery = true)

    Page<Object[]> findAllCrewPosts(
            @Param("address") String address,
            @Param("distance") int distance,
            @Param("difficulty") String difficulty,
            Pageable pageable);

    @Query(value = """
            select
               p.id,
               p.title,
               p.content,
               p.max_people,
               p.created_at,
               u.id as user_pk,
               u.user_id,
               u.nick_name,
               m.status,
               count(cm.id) as member_count,
               r.spot_name,
               r.latitude,
               r.longitude,
               r.address,
               r.facility_info,
               r.running_level,
               p.applied_at,
               r.distance,
               p.course_id
           from crew_post p
           join crew_member m
               on p.id = m.post_id
           join running_course r
               on r.id = p.course_id
           join `user` u
               on m.user_id = u.id
           left join crew_member cm
               on cm.post_id = p.id
           where m.crew_role = 'OWNER'
              AND (:distance IS NULL OR r.distance <= :distance)
              AND (:difficulty IS NULL OR r.running_level = :difficulty)
              AND (:address IS NULL OR r.address LIKE CONCAT('%', :address, '%'))
           group by
               p.id,
               p.title,
               p.content,
               p.max_people,
               p.created_at,
               u.id,
               u.user_id,
               u.nick_name,
               m.status,
               r.spot_name,
               r.latitude,
               r.longitude,
               r.address,
               r.facility_info,
               r.running_level,
               p.applied_at
           """,
            nativeQuery = true)

    Page<Object[]> findBestCrewPosts(
            @Param("address") String address,
            @Param("distance") int distance,
            @Param("difficulty") String difficulty,
            Pageable pageable);
}
