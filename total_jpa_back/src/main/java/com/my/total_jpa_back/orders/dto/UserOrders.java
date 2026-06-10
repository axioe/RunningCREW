package com.my.total_jpa_back.orders.dto;

import com.my.total_jpa_back.common.entity.OrderStatus;
import com.my.total_jpa_back.users.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

// QueryDSL 검색 결과를 담을 DTO
@Getter
@Setter
public class UserOrders {
    private Long id;
    private Users user;
    private String productName;
    private Integer price; // 나중에 QueryDSL 조건 사용 때문에...
    private OrderStatus status;
}