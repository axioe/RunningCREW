package com.prg.back_end.service;

import com.prg.back_end.dto.CrewMemberResponse;
import com.prg.back_end.dto.ResultResponse;
import com.prg.back_end.entity.CrewMemberEntity;
import com.prg.back_end.entity.CrewPostEntity;
import com.prg.back_end.repository.CrewMemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
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
}
