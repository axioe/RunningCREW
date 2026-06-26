package com.prg.back_end.repository;

import com.prg.back_end.entity.CourseImageEntity;
import com.prg.back_end.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseImageRepository extends JpaRepository<CourseImageEntity, Long> {
    CourseImageEntity findByCourseId(Long courseId);
}
