package com.prg.back_end.service;

import com.prg.back_end.dto.PublicParkResponse;
import com.prg.back_end.dto.PublicSafetyResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@Slf4j
public class SafetyDataService {
    private final RestTemplate restTemplate;

    private final static String DATA_LOCAL_URL = "https://www.safetydata.go.kr/V2/api/DSSP-IF-00183";

    @Value("${safety.rest.api.key}")
    private String safetyRestApiKey;

    public SafetyDataService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    //  pageNo : 페이지 번호 (1부터 시작)
    //  numOfRows : 한 페이지 결과 수
    //  returnType : XML/JSON 여부
    public PublicSafetyResponse requestSafetySearch(Integer pageNo, Integer numOfRows){
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(DATA_LOCAL_URL);
        uriBuilder.queryParam("serviceKey", safetyRestApiKey);
        uriBuilder.queryParam("pageNo", pageNo);
        uriBuilder.queryParam("numOfRows", numOfRows);
        uriBuilder.queryParam("returnType", "JSON");

        URI uri = uriBuilder.build().encode().toUri();

        log.info("url : " + uri.toString());

        return restTemplate
                .exchange(
                        uri,
                        HttpMethod.GET,
                        null,
                        PublicSafetyResponse.class
                ).getBody();
    }
}

