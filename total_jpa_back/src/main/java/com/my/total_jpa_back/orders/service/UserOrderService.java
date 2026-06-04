package com.my.total_jpa_back.orders.service;

import com.my.total_jpa_back.common.entity.OrderStatus;
import com.my.total_jpa_back.orders.dto.OrderMultiSearchRequest;
import com.my.total_jpa_back.orders.dto.OrderMultiSearchResponse;
import com.my.total_jpa_back.orders.dto.OrderResponse;
import com.my.total_jpa_back.orders.repository.UserOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserOrderService {
    private final UserOrderRepository userOrderRepository;

    public List<OrderResponse> findByStatus(OrderStatus status) {
        return userOrderRepository.findOrderStatusResponse(status);
    }

    public List<OrderMultiSearchResponse> multiSearch(OrderMultiSearchRequest request) {
        return userOrderRepository.searchOrders(
                request.getStatus(),
                request.getPrice(),
                request.getKeyword()
        );
    }

    public List<OrderResponse> getOrdersByUserId(Long userId) {
        return userOrderRepository.searchByUserId(userId);
    }
}
