package com.prg.back_end.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PublicSafetyResponse {
    private PublicSafetyResponse.Header header;
    private Integer totalCount;
    private Integer pageNo;
    private List<PublicSafetyResponse.Item> body;

    @Data
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    public static class Item {
        //시군구명
        @JsonProperty("SGG_NM")
        private String sggNm;

        //하늘상태
        @JsonProperty("SKY_STTS")
        private String skyStts;

        //1시간강수량
        @JsonProperty("N1HR_RN")
        private String n1hrRn;

        //습도
        @JsonProperty("HMTY_")
        private Integer hmty;

        //현황기준시각
        @JsonProperty("PRCON_CRTR_TM")
        private String prconCrtrTm;

        //강수확률
        @JsonProperty("POR")
        private Integer por;

        //Y지도좌표
        @JsonProperty("YMAP_CRTS")
        private Long ymapCrts;

        //법정동시군구코드
        @JsonProperty("STDG_SGG_CD")
        private String stdgSggCd;

        //3시간기온
        @JsonProperty("N3HS_AIRTP")
        private String n3hsAirtp;

        //강수형태
        @JsonProperty("PCPTTN_SHP")
        private String pcpttnShp;

        //현재기온
        @JsonProperty("NOW_AIRTP")
        private String nowAirtp;

        //예보기준시각
        @JsonProperty("FRCST_CRTR_TM")
        private String frcstCrtrTm;

        //X지도좌표
        @JsonProperty("XMAP_CRTS")
        private Long xmapCrts;
    }
}

