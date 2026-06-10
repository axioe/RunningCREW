package com.prg.back_end.repository;

import com.prg.back_end.entity.RunningCourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunningCourseRepository extends JpaRepository<RunningCourseEntity, Long> {
}
