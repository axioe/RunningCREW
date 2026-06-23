package com.prg.back_end.controller;

import com.prg.back_end.service.ImageService;
import com.prg.back_end.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;
    private final S3Service s3Service;
/*
    @PostMapping("/images")
    public ResponseEntity<Long> upload(
            @RequestParam("user_id") Long userId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        Long imageId = imageService.upload(userId, file);
        return ResponseEntity.ok(imageId);
    }*/
    @PostMapping("/images")
    public ResponseEntity<Long> uploadS3(
            @RequestParam("user_id") Long userId,
            @RequestParam MultipartFile file
    ) throws IOException {

        Long imageId = s3Service.upload(userId, file);
        return ResponseEntity.ok(imageId);
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<byte[]> download(
            @PathVariable String fileName) {

        byte[] imageBytes = s3Service.downloadImage(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
    }
}
