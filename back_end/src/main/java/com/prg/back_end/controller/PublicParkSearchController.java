package com.prg.back_end.controller;

import com.prg.back_end.dto.PublicParkResponse;
import com.prg.back_end.service.PublicParkSearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PublicParkSearchController {
    private final PublicParkSearchService publicParkSearchService;

    public PublicParkSearchController(PublicParkSearchService publicParkSearchService) {
        this.publicParkSearchService = publicParkSearchService;
    }

    @GetMapping("/public_park")
    public PublicParkResponse getPublicParkInfo(
            @RequestParam("pageNo") Integer pageNo,
            @RequestParam("numOfRows") Integer numOfRows,
            @RequestParam("instt_nm") String instt_nm){
        return publicParkSearchService.requestInstitutionNmSearch(pageNo, numOfRows, instt_nm);
    }
}
