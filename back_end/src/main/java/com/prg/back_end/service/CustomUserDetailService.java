package com.prg.back_end.service;

import com.prg.back_end.entity.UserEntity;
import com.prg.back_end.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        if(!userRepository.existsByUserId(userId)) return null;

        UserEntity userData = userRepository.findByUserId(userId);
        //  로그인 정보를 이용해서 출입증 만들어 보내기
        return new CustomUserDetails(userData);
    }
}
