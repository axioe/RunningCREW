package com.my.total_jpa_back.users.repository;

import com.my.total_jpa_back.common.entity.Gender;
import com.my.total_jpa_back.users.entity.Users;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<Users, Long> {

    // JPQL(자바기반의 SQL) : fetch join ...
    //@Query("""
    //    select distinct u
    //        from Users u
    //            join fetch u.orders
    //""")
    //List<Users> findAllWithOrders();


    Slice<Users> findAllBy(Pageable pageable);

    // 1. 성별조회
    List<Users> findByGender(Gender gender);

    // 2. 이름에 특정문장을 포함하는 검색 : Containing
    List<Users> findByNameContaining(String keyword);

    // 3. 좋아하는 색상 일치 자료 검색
    List<Users> findByLikeColor(String color);

    // 4. 색상과 성별로 검색하기
    // Select * from users Where like_color='red' and gender='female'
    List<Users> findByLikeColorAndGender(String color, Gender gender);

    // 5. email 중 특정 사이트 포함 이메일 계정 찾기(gmail, google)
    List<Users> findByEmailContaining(String keyword);
}
