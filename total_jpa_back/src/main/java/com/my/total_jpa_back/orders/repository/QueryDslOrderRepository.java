package com.my.total_jpa_back.orders.repository;

import com.my.total_jpa_back.orders.dto.OrderSearchCondition;
import com.my.total_jpa_back.orders.dto.UserOrders;
import com.my.total_jpa_back.orders.entity.QUserOrder;
import com.my.total_jpa_back.orders.entity.UserOrder;
import com.my.total_jpa_back.users.entity.QUsers;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class QueryDslOrderRepository {
    private final JPAQueryFactory queryFactory;

    // 조건을 검색하는 메서드를 생성
    public List<UserOrder> search(OrderSearchCondition condition) {
        QUserOrder userOrder = QUserOrder.userOrder;
        QUsers users = QUsers.users;

        BooleanBuilder builder = new BooleanBuilder();
        // 주문상태 체크용
        if (condition.getStatus() != null) {
            // 상태 조건이 채워져 있으면 Where 구문 만들어줘
            builder.and(
                    userOrder.status.eq(condition.getStatus())
            );
        }

        // 최소 금액 이상인 자료 검색
        if (condition.getMinPrice() != null) {
            builder.and(
                    userOrder.price.goe(
                            condition.getMinPrice()
                    )
            );
        }
        // 최대 금액 이하인 자료 검색
        if (condition.getMaxPrice() != null) {
            builder.and(
                    userOrder.price.loe(
                            condition.getMaxPrice()
                    )
            );
        }
        // 회원 이름으로 검색
        // ObjectUtils.isEmpty : 널 또는 공백 두가지 모두 검증
        if (! ObjectUtils.isEmpty(condition.getUserName())) {
            builder.and(
                    users.name.contains(condition.getUserName())
            );
        }
        // 쿼리를 동적으로 생성해서 리턴
        return queryFactory
                .selectFrom(userOrder)
                .join(userOrder.user, users)
                .fetchJoin() // 두 테이블 조인해서 한방에 가져오기
                .where(builder)
                .fetch();
    }
}