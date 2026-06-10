package com.prg.back_end.repository;

import com.prg.back_end.entity.CrewMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewMemberRepository extends JpaRepository<CrewMemberEntity, Long> {
}
