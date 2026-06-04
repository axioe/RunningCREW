package com.my.total_jpa_back.repository;

import com.my.total_jpa_back.common.entity.Gender;
import com.my.total_jpa_back.orders.entity.UserOrder;
import com.my.total_jpa_back.users.entity.Users;
import com.my.total_jpa_back.users.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    //@Test
    //@Transactional
    //@DisplayName("JPQL로 가져오기")
    //void joinTest() {
        // 전체 User 리스트 받아온다.
      //  List<Users> users = userRepository.findAllWithOrders();
        //for (Users user : users) {
         //   log.info("이름 : {}", user.getName());
          //  for (UserOrder order : user.getOrders()) {
           //     log.info("주문번호 : {}, 제품명 : {}", order.getId(), order.getProductName());
          //  }
      //  }
   // }





    // Slice : 무한 스크롤 용으로 자료가 필요할 때
    // 가볍다. 정보를 다음페이지? ..
    @Test
    @DisplayName("회원 Slice로 조회")
    void sliceTest() {
        Pageable pageable = PageRequest.of(0, 20,
                Sort.by("createdAt").descending());
        Slice<Users> result = userRepository.findAll(pageable);
        List<Users> users = result.getContent();
        // 전체 행 수
//        log.info("전체 행 수 : " + result.getTotalElements());
        // 현재 페이지
        log.info("현재 페이지 : " + result.getNumber());
        // 전체 페이지
//        log.info("전체 페이지 : " + result.getTotalPages());
        // 다음 페이지?
        log.info("다음 페이지 : " + result.hasNext());
        // 이전 페이지?
        log.info("이전 페이지 : " + result.hasPrevious());
        users.stream()
                .forEach(x -> log.info("All : {}", x));
    }



    // 페이징 처리에 사용되는 클래스 : Pageable
    // 전체 회원자료를 10개 묶음으로 페이징 처리
    // PageRequest.of

    // 최근 가입한 회원 정보 중 10번째 페이지를 추출
    // 한 페이지 당 30개씩 출력
    @Test
    @DisplayName("최신 가입 회원 정보 출력 - 10번째 페이지")
    void pagingAndSort() {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(9, 30, sort);
        // 결과를 Page 객체로 받기
        Page<Users> result = userRepository.findAll(pageable);
        // Page 객체는 내가 요청한 자료 + 기타 정보
        // Page가 준 내용중 리스트만 뽑아서 리스트로 저장
        List<Users> users = result.getContent();
        // 전체 행 수
        log.info("전체 행 수 : " + result.getTotalElements());
        // 현재 페이지
        log.info("현재 페이지 : " + result.getNumber());
        // 전체 페이지
        log.info("전체 페이지 : " + result.getTotalPages());
        // 다음 페이지?
        log.info("다음 페이지 : " + result.hasNext());
        // 이전 페이지?
        log.info("이전 페이지 : " + result.hasPrevious());
        users.stream()
                .forEach(x -> log.info("All : {}", x));
    }

    @Test
    @DisplayName("회원을 페이지로 가져오기 테스트")
    void pagingTest() {
        Pageable pageable = PageRequest.of(49, 10);
        Page<Users> result = userRepository.findAll(pageable);
        // Page 객체는 내가 요청한 자료 + 기타 정보
        // Page가 준 내용중 리스트만 뽑아서 리스트로 저장
        List<Users> users = result.getContent();
        // 전체 행 수
        log.info("전체 행 수 : " + result.getTotalElements());
        // 현재 페이지
        log.info("현재 페이지 : " + result.getNumber());
        // 전체 페이지
        log.info("전체 페이지 : " + result.getTotalPages());
        // 다음 페이지?
        log.info("다음 페이지 : " + result.hasNext());
        // 이전 페이지?
        log.info("이전 페이지 : " + result.hasPrevious());
        users.stream()
                .forEach(x -> log.info("All : {}", x));
    }

    @Test
    @DisplayName("회원 이름 오름차순 정렬")
    void orderByNameAscTest() {
        // 정렬 기계를 하나 셋팅
        Sort sort = Sort
                .by("name")
                .ascending();
        // 전체 검색 할 때 소트기계를 삽입해서 정렬되도록 처리
        List<Users> users = userRepository.findAll(sort);
        users.stream()
                .limit(5)
                .forEach(x -> log.info("name : {}", x.getName()));
//        for (int i=0; i<5; i++) {
//            log.info("name = {}", users.get(i).getName());
//        }
    }

    //최근 가입 회원 10명 출력(아이디, 이름)
    @Test
    @DisplayName("최근 가입 회원 10명 출력")
    void orderByCreatedAtDescTest(){
        Sort sort = Sort.by("createdAt")
                .descending();
        List<Users> users = userRepository.findAll(sort);

        users.stream()
                .limit(10)
                .forEach(x -> log.info("user_id :  {}, name : {}, 가입일 : {}",
                        x.getId(), x.getName(), x.getCreatedAt()));
    }

    // 색상 오름차순, 같은 색상자료는 이름 내림차순, 상위 100개 출력
    @Test
    @DisplayName("색상 오름차순, 같은 색상자료는 이름 내림차순")
    void multiSortTest() {
        Sort sort = Sort.by("likeColor")
                .ascending()
                .and(
                        Sort.by("name")
                                .descending()
                );
        List<Users> users = userRepository.findAll(sort);
        users.stream()
                .limit(100)
                .forEach(x -> log.info("color : {} name : {}",
                        x.getLikeColor(), x.getName()));
    }



    @Test
    @DisplayName("회원 전체 조회")
    void findAllTest() {
        // given
        // when
        List<Users> users = userRepository.findAll();
        // then
        assertThat(users.size()).isEqualTo(500);
    }

    @Test
    @DisplayName("성별 조회")
    void 성별_조회() {
        List<Users> users = userRepository.findByGender(Gender.Male);
        for (Users user : users) {
           log.info("name = {}, gender = {}", user.getName(), user.getGender());
        }
    }

    @Test
    @DisplayName("이름에 kim 을 포함하는 자료 검색")
    void 킴찾기() {
        List<Users> users = userRepository.findByNameContaining("kim");
        for (Users user : users) {
            log.info("name = {}", user.getName());
        }
    }

    @Test
    @DisplayName("findByLikeColor")
    void findByLikeColor() {
        List<Users> users = userRepository.findByLikeColor("blue");
        for (Users user : users) {
            log.info("name = {}, color = {}", user.getName(), user.getLikeColor());
        }
    }

    @Test
    @DisplayName("findByLikeColorAndGender")
    void findByLikeColorAndGender(){
        List<Users> users = userRepository.findByLikeColorAndGender("blue", Gender.Female);
        for (Users user : users) {
            log.info("name = {}, gender = {}, color = {}",
                    user.getName(), user.getGender() ,user.getLikeColor());
        }
    }
}