package com.prg.back_end.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "crew_member")
public class CrewMemberEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long postId;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CrewStatus status;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CrewRole crewRole;
}
