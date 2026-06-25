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
    public ResultResponse create(@RequestBody CrewPostCreateRequest request){
        return crewPostService.create(request);
    }

    @GetMapping("/{id}")
    public ResultResponse findById(@PathVariable Long id){
        return crewPostService.findById(id);
    }

    @PutMapping("/{id}")
    public ResultResponse update(@PathVariable Long id,
                                 @RequestBody CrewPostUpdateRequest request){
        return crewPostService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        crewPostService.delete(id);
        return "OK";
    }

    @GetMapping("/getAllByUserId")
    public List<CrewPostMemberResponse> getOrdersSearchUserId(@RequestParam Long userId){
        return crewPostService.getOrdersByUserId(userId);
    }

    @PostMapping("/applied")
    public String applied(@RequestBody CrewPostAppliedRequest request){
        crewPostService.insertPost(request);
        return "OK";
    }

    @GetMapping("/getByUserId")
    public List<CrewPostMemberResponse> getOrdersSearchUserIdOwner(@RequestParam Long userId){
        return crewPostService.getOrdersByUserIdOwner(userId);
    }

    @GetMapping("/list")
    public PageResponse<CrewPostResponse> findAllCrewPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam String address,
            @RequestParam(defaultValue = "10") int distance,
            @RequestParam String difficulty,
            @RequestParam String sortType){
        return crewPostService.findAllCrewPosts(page,  size, address, distance, difficulty, sortType);
    }

    @GetMapping("/best_list")
    public PageResponse<CrewPostResponse> findBestCrewPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam String address,
            @RequestParam(defaultValue = "10") int distance,
            @RequestParam String difficulty,
            @RequestParam String sortType){
        return crewPostService.findBestCrewPosts(page,  size, address, distance, difficulty, sortType);
    }
}
