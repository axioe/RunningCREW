package com.prg.back_end.service;

import com.prg.back_end.dto.EmergencyAlertResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value; // Lombok 대신 Spring의 Value 임포트
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@Slf4j
public class EmergencyAlertService {

    private final RestTemplate restTemplate;

    private final static String DATA_LOCAL_URL = "https://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg3List";

    @Value("${emergency.rest.api.key}")
    private String emergencyrestapikey;

    public EmergencyAlertService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public EmergencyAlertResponse requestEmergencyAlertSearch(Integer pageNo, Integer numOfRows) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromUriString(DATA_LOCAL_URL)
                .queryParam("serviceKey", emergencyrestapikey)
                .queryParam("pageNo", pageNo)
                .queryParam("numOfRows", numOfRows)
                .queryParam("type", "json"); /

        URI uri = urlBuilder.build().encode().toUri();

        log.info("공공데이터 API 요청 URI: {}", uri);

        try {
            EmergencyAlertResponse response = restTemplate.getForObject(uri, EmergencyAlertResponse.class);
            return response;

        } catch (Exception e) {
            log.error("재난문자 API 호출 중 에러 발생: {}", e.getMessage(), e);
            throw new RuntimeException("공공데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }
}