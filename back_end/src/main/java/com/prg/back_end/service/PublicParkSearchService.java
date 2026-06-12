package com.prg.back_end.service;

import com.prg.back_end.dto.PublicParkResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@Slf4j
public class PublicParkSearchService {
    private final RestTemplate restTemplate;

    private final static String DATA_LOCAL_URL = "https://api.data.go.kr/openapi/tn_pubr_public_cty_park_info_api";

    @Value("${data.rest.api.key}")
    private String dataRestApiKey;

    public PublicParkSearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    //  pageNo : 페이지 번호 (0부터 시작)
    //  numOfRows : 한 페이지 결과 수 (최대 값 : 1000)
    //  type : XML/JSON 여부
    //  instt_nm : 제공기관기관명
    public PublicParkResponse requestInstitutionNmSearch(Integer pageNo, Integer numOfRows, String instt_nm){
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(DATA_LOCAL_URL);
        uriBuilder.queryParam("serviceKey", dataRestApiKey);
        uriBuilder.queryParam("pageNo", pageNo);
        uriBuilder.queryParam("numOfRows", numOfRows);
        uriBuilder.queryParam("type", "JSON");
        if(!ObjectUtils.isEmpty(instt_nm))
            uriBuilder.queryParam("instt_nm", instt_nm);

        URI uri = uriBuilder.build().encode().toUri();

        return restTemplate
                .exchange(
                        uri,
                        HttpMethod.GET,
                        null,
                        PublicParkResponse.class
                ).getBody();
    }
}
