package com.prg.back_end.controller;

import com.prg.back_end.dto.ResultResponse;
import com.prg.back_end.dto.PageResponse;
import com.prg.back_end.dto.RunningRequest;
import com.prg.back_end.dto.RunningResponse;
import com.prg.back_end.entity.RunningLevel;
import com.prg.back_end.service.RunningService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/running")
public class RunningController {
    private final RunningService runningService;

    public RunningController(RunningService runningService) {
        this.runningService = runningService;
    }

    @PostMapping("/")
    public ResultResponse create(@RequestBody RunningRequest request){
        return runningService.create(request);
    }

    @PutMapping("/{id}")
    public ResultResponse update(@PathVariable Long id, @RequestBody RunningRequest request){
        return runningService.update(id, request);
    }

    @GetMapping("/{id}")
    public RunningResponse findById(@PathVariable Long id){
        return runningService.findById(id);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        runningService.delete(id);
        return "OK";
    }

    @GetMapping("/getSpots")
    public PageResponse<RunningResponse> findById(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam("spot_name") String spotName){

        return runningService.findSpotName(page, size, spotName);
    }

    @GetMapping("/getCourses")
    public PageResponse<RunningResponse> findByAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam (defaultValue = "") String address,
            @RequestParam(defaultValue = "10") int distance,
            @RequestParam (defaultValue = "") String difficulty,
            @RequestParam (defaultValue = "") String sortType){
        return runningService.findByAllFilter(page, size, address, distance, difficulty, sortType);
    }
}
