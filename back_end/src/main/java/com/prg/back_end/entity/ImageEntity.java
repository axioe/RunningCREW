package com.prg.back_end.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "image")
@NoArgsConstructor
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String originalFileName;

    private String storedFileName;

    private String imageUrl;

    public ImageEntity(Long userId, String originalFileName, String storedFileName, String imageUrl) {
        this.userId = userId;
        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
        this.imageUrl = imageUrl;
    }
}
