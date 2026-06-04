package com.my.total_jpa_back.common.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageResponse<T> {
//    검색 한 결과를 담을 DTO List => content
    private List<T> content;
//    현제 페이지
    private int page;
//    페이지당 리스트 수
    private int size;
//    전체 리스트 수
    private Long totalElements;
//    전체 페이지 수
    private int totalPages;
//    다음 페이지 여부
    private boolean hasNext;

//    생성자 (페이지를 통으로 넘겨받아서 DTO로 변환하는 과정)
    public PageResponse(Page<T> page){
        this.content = page.getContent();
        this.page = page.getNumber();
        this.size = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.hasNext = page.hasNext();
    }
}
