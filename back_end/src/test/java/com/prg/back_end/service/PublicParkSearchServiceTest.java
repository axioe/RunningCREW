package com.prg.back_end.service;

import com.prg.back_end.dto.PublicParkResponse;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class PublicParkSearchServiceTest {
    @Autowired
    PublicParkSearchService publicParkSearchService;

    @Test
    @DisplayName("전국도시공원정보표준데이터 OpenAPI")
    public void publicSearchTest() {
        PublicParkResponse response = publicParkSearchService.requestInstitutionNmSearch(0, 10, "경기도 고양시");
        if(!ObjectUtils.isEmpty(response))
            log.info(response.toString());
    }
}