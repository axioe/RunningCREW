package com.my.total_jpa_back.repository;

import com.my.total_jpa_back.common.entity.OrderStatus;
import com.my.total_jpa_back.orders.dto.OrderResponse;
import com.my.total_jpa_back.orders.entity.UserOrder;
import com.my.total_jpa_back.orders.repository.UserOrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class UserOrderRepositoryTest {
    @Autowired
    UserOrderRepository userOrderRepository;

    @Test
    @Transactional
    @DisplayName("DTO로 결과 받기")
    void dtoResultTest(){
        List<OrderResponse> result =
                userOrderRepository.findOrderResponse();
        result.stream().limit(100)
                .forEach(x -> log.info("주문번호:{}, 제품명:{}, 고객명:{}",
                        x.getOrderId(), x.getProductName(), x.getUserName()));
    }

    // ManyToOne Test
    @Test
    @DisplayName("주문 조회 / 조회 후 회원정보 확인")
    @Transactional
    void findOrderAndUserTest() {
        UserOrder order = userOrderRepository.findById(1L)
                .orElseThrow();
        log.info("orderId = {}", order.getId());
        log.info("제품명 = {}", order.getProductName());
        log.info("가격 = {}", order.getPrice());
        log.info("배송상태 = {}", order.getStatus());
        // User 정보 출력
        log.info("주문고객 : {}", order.getUser().getName());
        log.info("이메일 : {}", order.getUser().getEmail());
    }

    // 주문상태에 따른 오름차순 정렬, 제품명에 내림차순, 주문일의 내림차순
    // 상위 100개만 출력
    @Test
    @DisplayName("주문상태에 따른 정렬")
    void multiConditionSortTest() {
        Sort sort = Sort.by("status").ascending()
                .and(
                        Sort.by("productName")
                                .descending()
                                .and(
                                        Sort.by("createdAt")
                                                .descending()
                                )
                );
        List<UserOrder> orders = userOrderRepository.findAll(sort);
        orders.stream()
                .limit(1000)
                .forEach(x -> log.info("status : {}, product : {}, date : {}",
                        x.getStatus(), x.getProductName(), x.getCreatedAt()));
    }

    @Test
    @DisplayName("전체주문조회")
    void findAll(){
        // given
        // when
        List<UserOrder> orders = userOrderRepository.findAll();
        // then
        assertThat(orders.size()).isEqualTo(5000);
    }

    @Test
    @DisplayName("findByStatus")
    void findByStatus(){
        List<UserOrder> orders = userOrderRepository
                .findByStatus(OrderStatus.COMPLETE);
        for(UserOrder order : orders){
            log.info("orderId = {}, status = {}", order.getId(), order.getStatus());
        }
    }

    @Test
    @DisplayName("findByProductNameContaining")
    void findByProductNameContaining(){
        List<UserOrder> orders = userOrderRepository
                .findByProductNameContaining("Dunk");
        for(UserOrder order : orders){
            log.info("orderId = {}, productName = {}",
                        order.getId(), order.getProductName());
        }
    }
    @Test
    @DisplayName("findByPriceGreaterThanEqual")
    void findByPriceGreaterThanEqual(){
        List<UserOrder> orders = userOrderRepository
                .findByPriceGreaterThanEqual(300000);
        for(UserOrder order : orders){
            log.info("orderId = {}, price = {}",
                    order.getId(), order.getPrice());
        }
    }

//    @Test
//    @DisplayName("findByUserId")
//    void findByUserId(){
//        List<UserOrder> orders = userOrderRepository
//                .findByUserId(1L);
//        for(UserOrder order : orders){
//            log.info("userId = {}, productName = {}",
//                    order.getUserId(), order.getProductName());
//        }
//    }

//    @Test
//    @DisplayName("findByUserIdAndStatus")
//    void findByUserIdAndStatus(){
//        List<UserOrder> orders = userOrderRepository
//                .findByUserIdAndStatus(10L, OrderStatus.COMPLETE);
//        for(UserOrder order : orders){
//            log.info("userId = {}, status = {}",
//                    order.getUserId(), order.getStatus());
//        }
//    }

    @Test
    @DisplayName("findByPriceBetween")
    void findByPriceBetween(){
        List<UserOrder> orders = userOrderRepository
                .findByPriceBetween(290000, 300000);
        for(UserOrder order : orders){
            log.info("productName = {}, price = {}",
                    order.getProductName(), order.getPrice());
        }
    }

    @Test
    @DisplayName("findAllByOrderByPriceDesc")
    void findAllByOrderByPriceDesc(){
        List<UserOrder> orders = userOrderRepository
                .findAllByOrderByPriceDesc();
        for(int i = 0; i < 5; i ++){
            log.info("productName = {}, price = {}",
                    orders.get(i).getProductName(),
                    orders.get(i).getPrice());
        }
    }

    @Test
    @DisplayName("findTop5ByOrderByCreatedAtDesc")
    void findTop5ByOrderByCreatedAtDesc(){
        List<UserOrder> orders = userOrderRepository
                .findTop5ByOrderByCreatedAtDesc();
        for(UserOrder order : orders){
            log.info("productName = {}, createdAt = {}",
                    order.getProductName(), order.getCreatedAt());
        }
    }

    @Test
    @DisplayName("findByStatusIn")
    void findByStatusIn(){
        List<OrderStatus> orderStatusList = new ArrayList<>(
                List.of(OrderStatus.READY, OrderStatus.SHIPPING)
        );
//        orderStatusList.add(OrderStatus.READY);
//        orderStatusList.add(OrderStatus.SHIPPING);
        List<UserOrder> orders = userOrderRepository
                .findByStatusIn(orderStatusList);
        for(UserOrder order : orders){
            log.info("orderId = {}, status = {}",
                    order.getId(), order.getStatus());
        }
    }
}