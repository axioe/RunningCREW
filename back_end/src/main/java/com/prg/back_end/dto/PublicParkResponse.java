package com.prg.back_end.dto;

import lombok.Data;

import java.util.List;

@Data
public class PublicParkResponse {
    private Response response;

    @Data
    public static class Response {
        private Header header;
        private Body body;
    }

    @Data
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    public static class Body {
        private List<Item> items;
        private Integer totalCount;
        private Integer pageNo;
    }

    @Data
    public static class Item {
        //공원명
        private String parkNm;
        //공원구분
        private String parkSe;
        //소재지지번주소
        private String lnmadr;
        //  경도
        private String longitude;
        //  위도
        private String latitude;
        //공원면적
        private String parkAr;
        //공원보유시설(운동시설)
        private String mvmFclty;
        //공원보유시설(유희시설)
        private String amsmtFclty;
        //공원보유시설(편익시설)
        private String cnvnncFclty;
        //공원보유시설(교양시설)
        private String cltrFclty;
        //공원보유시설(기타시설)
        private String etcFclty;
        //전화번호
        private String phoneNumber;
    }
}
