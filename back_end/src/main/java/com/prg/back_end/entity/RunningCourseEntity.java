package com.prg.back_end.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "running_course")
public class RunningCourseEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
    private String spotName;
    @Column(nullable = false)
    private double latitude;
    @Column(nullable = false)
    private double longitude;
    @Column(nullable = false)
    private String address;
    @Column(nullable = true)
    private String facilityInfo;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RunningLevel runningLevel;
    private double distance;
}
