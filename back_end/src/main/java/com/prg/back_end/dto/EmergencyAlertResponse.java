package com.prg.back_end.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class EmergencyAlertResponse {
    private EmergencyAlertResponse.Header header;
    private Integer totalCount;
    private Integer pageNo;
    private List<EmergencyAlertResponse.item> body;

    @Data
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    public static class item {
        // 일련번호
        @JsonProperty("SN")
        private Long sn;

        // 생성일시
        @JsonProperty("CRT_DT")
        private String crt_dt;

        // 메시지내용
        @JsonProperty("MSG_CN")
        private String msg_cn;

        // 수신 지역명
        @JsonProperty("RCPTN_RGN_NM")
        private String rcptn_rgn_nm;

        // 긴급단계명
        @JsonProperty("EMRG_STEP_NM")
        private String emrg_step_nm;

        // 재해구분명
        @JsonProperty("DST_SE_NM")
        private String dst_se_nm;

        // 등록일자
        @JsonProperty("REG_YMD")
        private String reg_ymd;

        // 수정일자
        @JsonProperty("MDFCN_YMD")
        private String mdfcn_ymd;
    }
}