package com.prg.back_end.controller;

import com.prg.back_end.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PostMapping("/images")
    public ResponseEntity<Long> upload(
            @RequestParam("user_id") Long userId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        Long imageId = imageService.upload(userId, file);

        return ResponseEntity.ok(imageId);
    }
}
