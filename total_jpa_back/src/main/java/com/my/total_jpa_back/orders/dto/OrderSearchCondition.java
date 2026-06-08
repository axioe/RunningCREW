package com.my.total_jpa_back.orders.dto;

import com.my.total_jpa_back.common.entity.OrderStatus;
import lombok.Getter;
import lombok.Setter;

// QueryDSL에서 사용할 조건에 대한 리스트의 DTO
@Getter
@Setter
public class OrderSearchCondition {
    // 주문 처리로 검색
    private OrderStatus status;
    // 최저가격 검색 용 변수
    // 객체로 사용하는 이유는 null 처리 때문
    private Integer minPrice;
    private Integer maxPrice;
    // 고객 이름 검색 용
    private String userName;
}