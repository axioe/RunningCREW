package com.prg.back_end.repository;

import com.prg.back_end.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    ImageEntity findByUserId(Long userId);
}
