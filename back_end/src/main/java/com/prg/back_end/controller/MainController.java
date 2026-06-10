package com.prg.back_end.controller;

import com.prg.back_end.service.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @GetMapping("/")
    public String mainProc() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {

            return "로그인 필요";
        }

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        String userId = userDetails.getUsername();

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_NONE");

        return "Main Controller : userId = "
                + userId
                + ", role = "
                + role;
    }
}
