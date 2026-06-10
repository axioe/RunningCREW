package com.my.total_jpa_back.orders.dto;

import com.my.total_jpa_back.common.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderMultiSearchResponse {
    private Long orderId;
    private String productName;
    private Integer price;
    private OrderStatus status;
    private String userName;
    private String email;
}
