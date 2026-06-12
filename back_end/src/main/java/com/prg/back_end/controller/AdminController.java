package com.prg.back_end.controller;

import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.PageResponse;
import com.prg.back_end.dto.UserResponse;
import com.prg.back_end.service.CrewPostService;
import com.prg.back_end.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final CrewPostService crewPostService;

    public AdminController(UserService userService, CrewPostService crewPostService) {
        this.userService = userService;
        this.crewPostService = crewPostService;
    }

    @GetMapping("/users")
    public PageResponse<UserResponse> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        return userService.findPage(page, size);
    }

    @GetMapping("posts")
    public PageResponse<CrewPostResponse> findAllCrewPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
         return crewPostService.findAllCrewPosts(page,  size);
    }


}
