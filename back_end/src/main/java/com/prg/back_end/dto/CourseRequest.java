package com.prg.back_end.dto;

import lombok.Data;

import java.util.List;
@Data
public class CourseRequest {
    private List<Long> ids;
}
