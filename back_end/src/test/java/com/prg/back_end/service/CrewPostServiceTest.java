package com.prg.back_end.service;

import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.PageResponse;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Slf4j
class CrewPostServiceTest {
    @Autowired
    CrewPostService crewPostService;
    @Test
    @DisplayName("모집글전체목록조회")
    void findAllCrewPosts() {
        PageResponse<CrewPostResponse> posts = crewPostService.findAllCrewPosts(0, 10, "안양천", 10, "", "");
        for (CrewPostResponse post : posts.getContent()) {
            log.info(post.toString());
        }
    }
}