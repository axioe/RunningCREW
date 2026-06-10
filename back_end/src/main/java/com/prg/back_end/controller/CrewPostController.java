package com.prg.back_end.controller;

import com.prg.back_end.dto.CrewPostCreateRequest;
import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.CrewPostUpdateRequest;
import com.prg.back_end.service.CrewPostService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class CrewPostController {
    private final CrewPostService crewPostService;

    public CrewPostController(CrewPostService crewPostService) {
        this.crewPostService = crewPostService;
    }

    @PostMapping("")
    public CrewPostResponse create(@RequestBody CrewPostCreateRequest request){
        return crewPostService.createPost(request);
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
}
