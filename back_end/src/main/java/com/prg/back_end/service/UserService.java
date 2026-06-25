package com.prg.back_end.service;

import com.prg.back_end.dto.*;
import com.prg.back_end.entity.ImageEntity;
import com.prg.back_end.entity.RoleType;
import com.prg.back_end.entity.UserEntity;
import com.prg.back_end.entity.UserLevel;
import com.prg.back_end.repository.ImageRepository;
import com.prg.back_end.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, ImageRepository imageRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Transactional
    public UserResponse create(UserCreateRequest request) {
        boolean isExist = userRepository.existsByUserId(request.getUserId());
        if(isExist){
            return null;
        }

        UserEntity user = new UserEntity();
        user.setUserId(request.getUserId());
        user.setEmail(request.getEmail());
        user.setNickName(request.getNickName());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setUserRole(RoleType.USER);
        user.setUserLevel(UserLevel.Beginner);
        UserEntity savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }

    public UserResponse findById(Long id) {
        UserEntity user = userRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return null;
        String imageUrl = "";
        ImageEntity imageEntity = imageRepository.findByUserId(user.getId());
        if(!ObjectUtils.isEmpty(imageEntity))
            imageUrl = imageEntity.getStoredFileName();

        return UserResponse.from(user, imageUrl);
    }

    public UserResponse findByUserId(String userId) {
        UserEntity user = userRepository.findByUserId(userId);
        if(ObjectUtils.isEmpty(user))
            return null;

        String imageUrl = "";
        ImageEntity imageEntity = imageRepository.findByUserId(user.getId());
        if(!ObjectUtils.isEmpty(imageEntity))
            imageUrl = imageEntity.getStoredFileName();

        return UserResponse.from(user, imageUrl);
    }

    public void delete(Long id) {
        UserEntity user = userRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return;
        ImageEntity imageEntity = imageRepository.findByUserId(user.getId());
        if(!ObjectUtils.isEmpty(imageEntity))
            imageRepository.delete(imageEntity);
        userRepository.delete(user);
    }

    public UserResponse update(Long id, UserUpdateRequest request) {
        UserEntity user = userRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return null;

        if(!ObjectUtils.isEmpty(request.getUserId()))
            user.setUserId(request.getUserId());
        if(!ObjectUtils.isEmpty(request.getEmail()))
            user.setEmail(request.getEmail());
        if(!ObjectUtils.isEmpty(request.getNickName()))
            user.setNickName(request.getNickName());
        if(!ObjectUtils.isEmpty(request.getUserLevel()))
            user.setUserLevel(request.getUserLevel());
        if(!ObjectUtils.isEmpty(request.getPassword()))
            user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        UserEntity savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }

    @Transactional(readOnly = true)
    public PageResponse<UserResponse> findPage(int page, int size){
        Pageable pageable = PageRequest.of(
                page, size,
                Sort.by("createdAt").descending()
        );
        Page<UserEntity> users = userRepository.findAll(pageable);
        Page<UserResponse>  response = users.map(user -> UserResponse.from(user));
        return new PageResponse<>(response);
    }

    public UserResponse findByUserIdAndEmail(String userId, String email){
        UserEntity user = userRepository.findByUserIdAndEmail(userId, email);
        if(ObjectUtils.isEmpty(user))
            return null;
        return UserResponse.from(user);
    }

    public ResultResponse updatePassword(UserPasswordRequest request) {
        UserEntity user = userRepository.findById(request.getId()).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return null;

        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        UserEntity savedEntity = userRepository.save(user);

        return ResultResponse.from(
                savedEntity.getId(),
                savedEntity.getCreatedAt(),
                savedEntity.getUpdatedAt());
    }
}
