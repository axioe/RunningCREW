package com.prg.back_end.controller;

import com.prg.back_end.dto.ResultResponse;
import com.prg.back_end.dto.PageResponse;
import com.prg.back_end.dto.RunningRequest;
import com.prg.back_end.dto.RunningResponse;
import com.prg.back_end.service.RunningService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
}
