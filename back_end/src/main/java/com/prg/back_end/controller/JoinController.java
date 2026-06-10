package com.prg.back_end.controller;

import com.prg.back_end.dto.UserCreateRequest;
import com.prg.back_end.dto.UserResponse;
import com.prg.back_end.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JoinController {

    private final UserService userService;

    public JoinController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public UserResponse join(@RequestBody UserCreateRequest request){
        return userService.create(request);
    }
}
