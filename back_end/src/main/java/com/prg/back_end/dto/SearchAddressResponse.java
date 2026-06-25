package com.prg.back_end.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.prg.back_end.entity.RunningCourseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchAddressResponse {
    private String addressName;
    private String placeName;
    private String phone;
    //  경도
    private double longitude;
    //  위도
    private double latitude;
    private String distance;

    public static SearchAddressResponse from(DocumentDto data){
        return SearchAddressResponse.builder()
                .addressName(data.getAddressName())
                .placeName(data.getPlaceName())
                .phone(data.getPhone())
                .longitude(data.getLongitude())
                .latitude(data.getLatitude())
                .distance(data.getDistance())
                .build();
    }
}
