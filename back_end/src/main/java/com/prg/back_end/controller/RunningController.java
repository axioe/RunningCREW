package com.prg.back_end.controller;

import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.RunningRequest;
import com.prg.back_end.dto.RunningResponse;
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
    public CrewPostResponse create(@RequestBody RunningRequest request){
        return runningService.create(request);
    }

    @PutMapping("/{id}")
    public CrewPostResponse update(@PathVariable Long id, @RequestBody RunningRequest request){
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
}
