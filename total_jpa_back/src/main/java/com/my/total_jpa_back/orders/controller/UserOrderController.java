package com.my.total_jpa_back.orders.controller;

import com.my.total_jpa_back.common.entity.OrderStatus;
import com.my.total_jpa_back.orders.dto.OrderMultiSearchRequest;
import com.my.total_jpa_back.orders.dto.OrderMultiSearchResponse;
import com.my.total_jpa_back.orders.dto.OrderResponse;
import com.my.total_jpa_back.orders.service.UserOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserOrderController {
    private final UserOrderService userOrderService;

    @GetMapping("/status")
    public List<OrderResponse> getStatusOrder(@RequestParam OrderStatus status){
        return userOrderService.findByStatus(status);
    }

    @PostMapping("/multi-search")
    public List<OrderMultiSearchResponse> multiSearch(
            @RequestBody OrderMultiSearchRequest request){
        return userOrderService.multiSearch(request);
    }

    @GetMapping("/users/{userId}/orders")
    public List<OrderResponse> getOrdersSearchUserId(
            @PathVariable Long userId
    ){
        return userOrderService.getOrdersByUserId(userId);
    }
}
