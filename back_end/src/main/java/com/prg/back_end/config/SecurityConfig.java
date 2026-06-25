package com.prg.back_end.config;

import com.prg.back_end.myJwt.JWTFilter;
import com.prg.back_end.myJwt.JWTUtil;
import com.prg.back_end.myJwt.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    //  우리가 만든 필터를 등록하는 작업
    private final AuthenticationConfiguration authenticationConfiguration;

    //  토큰 유틸리티를 가져온다.
    private final JWTUtil jwtUtil;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception {
        //  csrf disable
        http
                .csrf((auth) -> auth.disable());
        //  Form Login 방식 -> disable
        http
                .formLogin((auth) -> auth.disable());
        //  http basic 인증 방식 -> disable
        http
                .httpBasic((auth) -> auth.disable());
        //  경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/login", "/join", "/images", "/images_course").permitAll()
                        .requestMatchers("/user", "/post", "/running", "/api", "/member").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .anyRequest().authenticated()
                );

        http
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);

        http.addFilterAt(new LoginFilter(
                        authenticationManager(authenticationConfiguration), jwtUtil),
                UsernamePasswordAuthenticationFilter.class);

        //  Stateless 세션 설정
        http
                .sessionManagement((session) ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        //  cors 설정
        http
                .cors(cors -> cors.configurationSource(request -> {

                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(
                            List.of("http://localhost:3000")
                    );
                    config.setAllowedMethods(
                            List.of("*")
                    );
                    config.setAllowedHeaders(
                            List.of("*")
                    );
                    config.setExposedHeaders(
                            List.of("Authorization")
                    );
                    config.setAllowCredentials(true);
                    return config;
                }));
        return http.build();
    }
}

