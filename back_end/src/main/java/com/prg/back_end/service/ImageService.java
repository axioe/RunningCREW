package com.prg.back_end.service;

import com.prg.back_end.entity.ImageEntity;
import com.prg.back_end.repository.ImageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ImageService {
    @Value("${file.upload-path}")
    private String uploadPath;

    private final ImageRepository imageRepository;

    public Long upload(Long userId, MultipartFile file) throws IOException {

        String originalFileName = file.getOriginalFilename();

        String storedFileName =
                UUID.randomUUID() + "_" + originalFileName;

        Path directory = Paths.get(uploadPath);

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        Path target = directory.resolve(storedFileName);

        file.transferTo(target);

        ImageEntity image = new ImageEntity(
                userId,
                originalFileName,
                storedFileName,
                "/images/" + storedFileName
        );

        return imageRepository.save(image).getId();
    }
}
