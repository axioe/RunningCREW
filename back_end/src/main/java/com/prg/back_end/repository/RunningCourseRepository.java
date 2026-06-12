package com.prg.back_end.repository;

import com.prg.back_end.entity.RunningCourseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningCourseRepository extends JpaRepository<RunningCourseEntity, Long> {
    Page<RunningCourseEntity> findBySpotNameContaining(String keyword, Pageable pageable);
}
