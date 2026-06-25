package com.prg.back_end.controller;

import com.prg.back_end.dto.*;
import com.prg.back_end.service.EmergencyAlertService;
import com.prg.back_end.service.KakaoAddressSearchService;
import com.prg.back_end.service.PublicParkSearchService;
import com.prg.back_end.service.SafetyDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class PublicSearchController {
    private final PublicParkSearchService publicParkSearchService;
    private final SafetyDataService safetyDataService;
    private final EmergencyAlertService emergencyAlertService;
    private final KakaoAddressSearchService kakaoAddressSearchService;

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
    @GetMapping("/emergency_alert")
    public EmergencyAlertResponse getEmergencyAlertInfo(
            @RequestParam("pageNo") Integer pageNo,
            @RequestParam("numOfRows") Integer numOfRows){
        return emergencyAlertService.requestEmergencyAlertSearch(pageNo,numOfRows);
    }
    @GetMapping("/search")
    public SearchAddressResponse searchAddress(@RequestParam("address") String address){
        KakaoApiResponseDto kakaoApiResponseDto = kakaoAddressSearchService.requestAddressSearch(address);
        DocumentDto documentDto = kakaoApiResponseDto.getDocumentDtoList().get(0);
        log.info("도큐먼트만 출력 : " + documentDto);

        return SearchAddressResponse.from(documentDto);
    }
}
