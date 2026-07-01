package com.prg.back_end.repository;

import com.prg.back_end.entity.RoleType;
import com.prg.back_end.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByUserId(String userId);
    UserEntity findByUserId(String userId);
    UserEntity findByUserIdAndEmail(String userId, String email);
    List<UserEntity> findByUserRole(RoleType userRole);
}
