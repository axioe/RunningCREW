package com.prg.back_end.controller;

import com.prg.back_end.dto.*;
import com.prg.back_end.service.CrewPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@Slf4j
public class CrewPostController {
    private final CrewPostService crewPostService;

    public CrewPostController(CrewPostService crewPostService) {
        this.crewPostService = crewPostService;
    }

    @PostMapping("/")
    public CrewPostResponse create(@RequestBody CrewPostCreateRequest request){
        return crewPostService.create(request);
    }

    @GetMapping("/{id}")
    public CrewPostResponse findById(@PathVariable Long id){
        return crewPostService.findById(id);
    }

    @PutMapping("/{id}")
    public CrewPostResponse update(@PathVariable Long id,
                               @RequestBody CrewPostUpdateRequest request){
        return crewPostService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        crewPostService.delete(id);
        return "OK";
    }

    @GetMapping("/user/{userId}")
    public List<CrewPostMemberResponse> getOrdersSearchUserId(@PathVariable Long userId){
        return crewPostService.getOrdersByUserId(userId);
    }

    @PostMapping("/applied")
    public String applied(@RequestBody CrewPostAppliedRequest request){
        crewPostService.insertPost(request);
        return "OK";
    }
}
