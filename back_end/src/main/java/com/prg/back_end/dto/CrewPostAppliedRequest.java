package com.prg.back_end.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrewPostAppliedRequest {
    private Long postId;
    private Long UserId;
}
