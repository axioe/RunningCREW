package com.prg.back_end.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "image_course")
@NoArgsConstructor
public class CourseImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long courseId;

    private String originalFileName;

    private String storedFileName;

    private String imageUrl;

    public CourseImageEntity(Long courseId, String originalFileName, String storedFileName, String imageUrl) {
        this.courseId = courseId;
        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
        this.imageUrl = imageUrl;
    }
}
