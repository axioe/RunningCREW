package com.prg.back_end.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class KakaoApiResponseDto {
    @JsonProperty("meta")
    private MetaDto metaDto;
    @JsonProperty("documents")
    private List<DocumentDto> documentDtoList;
}
