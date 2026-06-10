package com.prg.back_end.repository;

import com.prg.back_end.entity.CrewPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewPostRepository extends JpaRepository<CrewPostEntity, Long> {
}
