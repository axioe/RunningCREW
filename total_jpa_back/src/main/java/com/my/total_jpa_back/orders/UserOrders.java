package com.my.total_jpa_back.orders;

import com.my.total_jpa_back.common.entity.OrderStatus;
import com.my.total_jpa_back.users.entity.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


// QueryDSL 검색 결과를 담을 DTO
@Getter
@Setter
@ToString
public class UserOrders {
    private Long id;
    private Users user;
    private String productName;
    private Integer price;
    private OrderStatus status;
}
