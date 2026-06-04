package com.my.total_jpa_back.orders.entity;

import com.my.total_jpa_back.common.entity.BaseEntity;
import com.my.total_jpa_back.common.entity.OrderStatus;
import com.my.total_jpa_back.users.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_order")
public class UserOrder extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Column(name = "user_id")
//    private Long userId; // Users 테이블의 외래키 역할
    // Users 객체 자체를 포함.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "product_name")
    private String productName;
    private Integer price; // 나중에 QueryDSL 조건 사용 때문에...
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
