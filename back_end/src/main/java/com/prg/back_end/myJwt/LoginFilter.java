package com.prg.back_end.myJwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prg.back_end.dto.LoginRequest;
import com.prg.back_end.service.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    //  토큰 만료 시간을 상수로 지정 -> 30분
//    public static final long ACCESS_TOKEN_EXPIRE = 1000L * 60 * 30;
    //  1일
    public static final long ACCESS_TOKEN_EXPIRE = 1000L * 60 * 60 * 24;

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            LoginRequest loginRequest = objectMapper.readValue(
                    request.getInputStream(), LoginRequest.class
            );
            String userId = loginRequest.getUserId();
            System.out.println("userId : " + userId);

            String password = loginRequest.getPassword();
            UsernamePasswordAuthenticationToken authToken = new
                    UsernamePasswordAuthenticationToken(userId, password, null);
            return authenticationManager.authenticate(authToken);
        }catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    //  로그인 성공 되면 토큰 발급하기
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication) throws IOException, ServletException {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String userId = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();
        String token = jwtUtil.createJwt(userId, role, ACCESS_TOKEN_EXPIRE);
        System.out.println("===============");
        System.out.println("생성된 토큰");
        System.out.println(token);
        System.out.println("===============");

        response.addHeader("Authorization", "Bearer " + token);
    }

    //  로그인 실패 시 처리
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        System.out.println("Fail!!");
        //  로그인 실패 시 401 응답 코드 반환
        response.setStatus(401);
    }
}
