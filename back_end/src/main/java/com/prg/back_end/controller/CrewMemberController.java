package com.prg.back_end.controller;

import com.prg.back_end.dto.CrewMemberResponse;
import com.prg.back_end.dto.CrewPostMemberResponse;
import com.prg.back_end.dto.ResultResponse;
import com.prg.back_end.service.CrewMemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@AllArgsConstructor
@Slf4j
public class CrewMemberController {
    private final CrewMemberService crewMemberService;

    @GetMapping("/getList")
    public List<CrewMemberResponse> findById(@RequestParam Long postId){
        return crewMemberService.findByPostId(postId);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        crewMemberService.delete(id);
        return "OK";
    }
}
