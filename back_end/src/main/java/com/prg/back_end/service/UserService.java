package com.prg.back_end.service;

import com.prg.back_end.dto.PageResponse;
import com.prg.back_end.dto.UserCreateRequest;
import com.prg.back_end.dto.UserResponse;
import com.prg.back_end.dto.UserUpdateRequest;
import com.prg.back_end.entity.RoleType;
import com.prg.back_end.entity.UserEntity;
import com.prg.back_end.entity.UserLevel;
import com.prg.back_end.repository.UserRepository;
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
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
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
        return UserResponse.from(user);
    }

    public UserResponse findByUserId(String userId) {
        UserEntity user = userRepository.findByUserId(userId);
        if(ObjectUtils.isEmpty(user))
            return null;
        return UserResponse.from(user);
    }

    public void delete(Long id) {
        UserEntity user = userRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return;
        userRepository.delete(user);
    }

    public UserResponse update(Long id, UserUpdateRequest request) {
        UserEntity user = userRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return null;

        user.setUserId(request.getUserId());
        user.setEmail(request.getEmail());
        user.setNickName(request.getNickName());
        user.setUserLevel(request.getUserLevel());
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
}
