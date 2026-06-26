package com.prg.back_end.repository;

import com.prg.back_end.entity.RunningCourseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RunningCourseRepository extends JpaRepository<RunningCourseEntity, Long> {
    Page<RunningCourseEntity> findBySpotNameContaining(String keyword, Pageable pageable);
    @Query(value = """
           select c.id,
                spot_name,
                latitude,
                longitude,
                address,
                facility_info,
                running_level,
                distance,
                created_at,
                updated_at,
                i.stored_file_name
            from running_course c
            left join image_course i
              on c.id = i.course_id
              where (:distance IS NULL OR distance <= :distance)
              AND (:difficulty IS NULL OR running_level = :difficulty)
              AND (:address IS NULL OR address LIKE CONCAT('%', :address, '%'))
            """,
            nativeQuery = true)

    Page<Object[]> findAllRunningCourses(
            @Param("address") String address,
            @Param("distance") int distance,
            @Param("difficulty") String difficulty,
            Pageable pageable);

    @Query(value = """
           select c.id,
                spot_name,
                latitude,
                longitude,
                address,
                facility_info,
                running_level,
                distance,
                created_at,
                updated_at,
                i.stored_file_name
            from running_course c
            left join image_course i
              on c.id = i.course_id
              where
                  (:keyword IS NULL OR address LIKE CONCAT('%', :keyword, '%'))
                  OR
                  (:keyword IS NULL OR spot_name LIKE CONCAT('%', :keyword, '%'))
            """,
            nativeQuery = true)

    Page<Object[]> searchKeyword(
            @Param("keyword") String keyword,
            Pageable pageable);
}
