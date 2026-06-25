package com.prg.back_end.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DocumentDto {
    @JsonProperty("address_name")
    private String addressName;
    @JsonProperty("place_name")
    private String placeName;
    @JsonProperty("phone")
    private String phone;
    //  경도
    @JsonProperty("x")
    private double longitude;
    //  위도
    @JsonProperty("y")
    private double latitude;
    @JsonProperty("distance")
    private String distance;
}
