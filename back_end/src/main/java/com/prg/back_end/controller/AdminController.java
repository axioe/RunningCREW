package com.prg.back_end.controller;

import com.prg.back_end.dto.CrewActionResponse;
import com.prg.back_end.dto.PageResponse;
import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.UserResponse;
import com.prg.back_end.dto.UserUpdateRequest;
import com.prg.back_end.entity.RoleType;
import com.prg.back_end.service.CrewPostService;
import com.prg.back_end.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private final UserService userService;
    private final CrewPostService crewPostService;

    // ── 유저 목록 (페이징) ──
    @GetMapping("/users")
    public PageResponse<UserResponse> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return userService.findPage(page, size);
    }

    // ── 관리자 계정 목록 ──
    @GetMapping("/admins")
    public List<UserResponse> findAdmins() {
        return userService.findAdmins();
    }

    // ── 권한 변경 (일반 유저 → 관리자 / 관리자 → 일반 유저) ──
    @PatchMapping("/users/{id}/role")
    public UserResponse changeRole(
            @PathVariable Long id,
            @RequestParam String role) {
        UserUpdateRequest req = new UserUpdateRequest();
        try {
            req.setUserRole(RoleType.valueOf(role));
        } catch (IllegalArgumentException e) {
            return null;
        }
        return userService.update(id, req);
    }

    // ── 크루 모집글 목록 (페이징) ──
    @GetMapping("/posts")
    public PageResponse<CrewPostResponse> findAllCrewPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String address,
            @RequestParam(defaultValue = "10") int distance,
            @RequestParam(defaultValue = "") String difficulty,
            @RequestParam(defaultValue = "") String sortType) {
        return crewPostService.findAllCrewPosts(page, size, address, distance, difficulty, sortType);
    }

    // ── 크루 모집글 삭제 (관리자 권한 — 방장 체크 없이) ──
    @DeleteMapping("/posts/{id}")
    public CrewActionResponse deletePost(@PathVariable Long id) {
        return crewPostService.adminDelete(id);
    }
}
