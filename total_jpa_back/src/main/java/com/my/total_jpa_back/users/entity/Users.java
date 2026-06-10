package com.my.total_jpa_back.users.entity;

import com.my.total_jpa_back.common.entity.BaseEntity;
import com.my.total_jpa_back.common.entity.Gender;
import com.my.total_jpa_back.orders.entity.UserOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class Users extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String email;
    @Column(name = "like_color")
    private String likeColor;
    // Users 엔티티의 user가 연관관계의 주인이다.
    // @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    // private List<UserOrder> orders = new ArrayList<>();

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", gender=" + gender +
                ", email='" + email + '\'' +
                ", likeColor='" + likeColor + '\'' +
                ", createdAt='" + getCreatedAt() + '\'' +
                ", updatedAt='" + getUpdatedAt() + '\'' +
                '}';
    }
}
