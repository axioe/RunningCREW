package com.prg.back_end.service;

import com.prg.back_end.dto.CrewActionResponse;
import com.prg.back_end.dto.CrewMemberResponse;
import com.prg.back_end.entity.CrewMemberEntity;
import com.prg.back_end.entity.CrewRole;
import com.prg.back_end.entity.CrewStatus;
import com.prg.back_end.repository.CrewMemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
@AllArgsConstructor
public class CrewMemberService {
    private final CrewMemberRepository crewMemberRepository;

    public List<CrewMemberResponse> findByPostId(Long postId) {
        return crewMemberRepository.findByPostId(postId);
    }

    public void delete(Long id) {
        CrewMemberEntity member = crewMemberRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(member))
            return;
        crewMemberRepository.delete(member);
    }

    @Transactional
    public CrewActionResponse approve(Long memberId, Long requesterId) {
        return changeStatus(memberId, requesterId, CrewStatus.APPROVED);
    }

    @Transactional
    public CrewActionResponse reject(Long memberId, Long requesterId) {
        return changeStatus(memberId, requesterId, CrewStatus.CANCELLED);
    }

    private CrewActionResponse changeStatus(Long memberId, Long requesterId, CrewStatus newStatus) {
        //  1. 대상 신청 멤버 조회
        CrewMemberEntity target = crewMemberRepository.findById(memberId).orElse(null);
        if (ObjectUtils.isEmpty(target))
            return CrewActionResponse.notFound();

        //  2. 요청자가 해당 모집글의 방장(Owner)인지 확인
        CrewMemberEntity owner = crewMemberRepository
                .findByPostIdAndUserId(target.getPostId(), requesterId)
                .orElse(null);
        if (ObjectUtils.isEmpty(owner) || owner.getCrewRole() != CrewRole.Owner)
            return CrewActionResponse.forbidden();

        //  3. 상태 변경
        target.setStatus(newStatus);
        crewMemberRepository.save(target);

        return CrewActionResponse.ok(newStatus);
    }
}
