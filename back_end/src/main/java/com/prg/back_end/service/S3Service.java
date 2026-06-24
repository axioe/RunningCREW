package com.prg.back_end.service;

import com.prg.back_end.entity.ImageEntity;
import com.prg.back_end.entity.CourseImageEntity;
import com.prg.back_end.repository.ImageRepository;
import com.prg.back_end.repository.CourseImageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class S3Service {

    private final S3Client s3Client;
    private final ImageRepository imageRepository;
    private final CourseImageRepository courseImageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public Long upload(Long userId, MultipartFile file) throws IOException {

        String originalFileName = file.getOriginalFilename();
        String folder = "users/";
        String fileName = folder + UUID.randomUUID() + "_" + originalFileName;

        PutObjectRequest request =
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(fileName)
                        .contentType(file.getContentType())
                        .build();

        s3Client.putObject(
                request,
                RequestBody.fromBytes(file.getBytes())
        );

        ImageEntity image = new ImageEntity(
                userId,
                originalFileName,
                fileName,
                getImageUrl(fileName)
        );

        return imageRepository.save(image).getId();
    }

    public Long uploadCourse(Long courseId, MultipartFile file) throws IOException {

        String originalFileName = file.getOriginalFilename();
        String folder = "courses/";
        String fileName = folder + UUID.randomUUID() + "_" + originalFileName;

        PutObjectRequest request =
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(fileName)
                        .contentType(file.getContentType())
                        .build();

        s3Client.putObject(
                request,
                RequestBody.fromBytes(file.getBytes())
        );

        CourseImageEntity image = new CourseImageEntity(
                courseId,
                originalFileName,
                fileName,
                getImageUrl(fileName)
        );

        return courseImageRepository.save(image).getId();
    }

    public String getImageUrl(String fileName) {
        return String.format(
                "https://%s.s3.ap-northeast-2.amazonaws.com/%s",
                bucket,
                fileName
        );
    }

    public byte[] downloadImage(String key) {

        GetObjectRequest getObjectRequest =
                GetObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .build();

        ResponseBytes<GetObjectResponse> objectBytes =
                s3Client.getObjectAsBytes(getObjectRequest);

        return objectBytes.asByteArray();
    }

    public void delete(String fileName) {

        DeleteObjectRequest request =
                DeleteObjectRequest.builder()
                        .bucket(bucket)
                        .key(fileName)
                        .build();

        s3Client.deleteObject(request);
    }
}