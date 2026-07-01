package com.prg.back_end.controller;

import com.prg.back_end.dto.ResultResponse;
import com.prg.back_end.dto.UserPasswordRequest;
import com.prg.back_end.dto.UserResponse;
import com.prg.back_end.dto.UserUpdateRequest;
import com.prg.back_end.service.UserLevelService;
import com.prg.back_end.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserLevelService userLevelService;

    @GetMapping("/{id}")
    public UserResponse findById(@PathVariable Long id){
        // 프로필 조회 시 등급을 최신 상태로 갱신
        userLevelService.refreshLevel(id);
        return userService.findById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        userService.delete(id);
        return "OK";
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id,
                               @RequestBody UserUpdateRequest request){
        return userService.update(id, request);
    }

    @GetMapping("/getUser")
    public UserResponse findByUserId(@RequestParam("user_id") String userId){
        return userService.findByUserId(userId);
    }

    @GetMapping("/checkUser")
    public UserResponse findByUserIdAndEmail(
            @RequestParam("user_id") String userId,
            @RequestParam("email") String email){
        return userService.findByUserIdAndEmail(userId, email);
    }

    @PostMapping("updatePassword")
    public ResultResponse updatePassword(@RequestBody UserPasswordRequest request){
        return userService.updatePassword(request);
    }
}
