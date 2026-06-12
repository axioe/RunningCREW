package com.prg.back_end.controller;

import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.UserCreateRequest;
import com.prg.back_end.dto.UserResponse;
import com.prg.back_end.dto.UserUpdateRequest;
import com.prg.back_end.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserResponse findById(@PathVariable Long id){
        return userService.findById(id);
    }

    @GetMapping("/user_id/{userId}")
    public UserResponse findByUserId(@PathVariable String userId){
        return userService.findByUserId(userId);
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
}
