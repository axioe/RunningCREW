package com.prg.back_end.controller;

import com.prg.back_end.dto.PublicParkResponse;
import com.prg.back_end.dto.PublicSafetyResponse;
import com.prg.back_end.service.PublicParkSearchService;
import com.prg.back_end.service.SafetyDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PublicSearchController {
    private final PublicParkSearchService publicParkSearchService;
    private final SafetyDataService safetyDataService;

    public PublicSearchController(PublicParkSearchService publicParkSearchService, SafetyDataService safetyDataService) {
        this.publicParkSearchService = publicParkSearchService;
        this.safetyDataService = safetyDataService;
    }

    @GetMapping("/public_park")
    public PublicParkResponse getPublicParkInfo(
            @RequestParam("pageNo") Integer pageNo,
            @RequestParam("numOfRows") Integer numOfRows,
            @RequestParam("instt_nm") String instt_nm){
        return publicParkSearchService.requestInstitutionNmSearch(pageNo, numOfRows, instt_nm);
    }

    @GetMapping("/public_safety")
    public PublicSafetyResponse getPublicSafetyInfo(
            @RequestParam("pageNo") Integer pageNo,
            @RequestParam("numOfRows") Integer numOfRows) {
        return safetyDataService.requestSafetySearch(pageNo, numOfRows);
    }
}
