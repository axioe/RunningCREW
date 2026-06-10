package com.prg.back_end.service;

import com.prg.back_end.dto.CrewPostCreateRequest;
import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.CrewPostUpdateRequest;
import com.prg.back_end.dto.UserResponse;
import com.prg.back_end.entity.*;
import com.prg.back_end.repository.CrewMemberRepository;
import com.prg.back_end.repository.CrewPostRepository;
import com.prg.back_end.repository.RunningCourseRepository;
import com.prg.back_end.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;

@Service
public class CrewPostService {
    private final UserRepository userRepository;
    private final CrewPostRepository crewPostRepository;
    private final CrewMemberRepository crewMemberRepository;
    private final RunningCourseRepository runningCourseRepository;

    public CrewPostService(UserRepository userRepository, CrewPostRepository crewPostRepository, CrewMemberRepository crewMemberRepository, RunningCourseRepository runningCourseRepository) {
        this.userRepository = userRepository;
        this.crewPostRepository = crewPostRepository;
        this.crewMemberRepository = crewMemberRepository;
        this.runningCourseRepository = runningCourseRepository;
    }

    @Transactional
    public CrewPostResponse createPost(CrewPostCreateRequest request){
        //  1. userId -> id 조회
        UserEntity user = userRepository.findById(request.getUserId()).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return null;
        //  2. running_course insert
        RunningCourseEntity courseEntity = new RunningCourseEntity();
        courseEntity.setLongitude(request.getLongitude());
        courseEntity.setLatitude(request.getLatitude());
        courseEntity.setSpotName(request.getSpotName());
        courseEntity.setFacilityInfo(request.getFacilityInfo());
        courseEntity.setRunningLevel(request.getRunningLevel());
        courseEntity.setAddress(request.getAddress());
        RunningCourseEntity savedCourseEntity = runningCourseRepository.save(courseEntity);

        //  3. crew_post insert
        CrewPostEntity postEntity = new CrewPostEntity();
        postEntity.setCourseId(savedCourseEntity.getId());
        postEntity.setContent(request.getContent());
        postEntity.setTitle(request.getTitle());
        postEntity.setMaxPeople(request.getMaxPeople());
        CrewPostEntity savedPostEntity = crewPostRepository.save(postEntity);

        //  4. crew_member insert
        CrewMemberEntity memberEntity = new CrewMemberEntity();
        memberEntity.setPostId(savedPostEntity.getId());
        memberEntity.setUserId(user.getId());
        memberEntity.setCrewRole(CrewRole.Owner);
        memberEntity.setStatus(CrewStatus.PENDING);
        memberEntity.setAppliedAt(LocalDateTime.now());
        crewMemberRepository.save(memberEntity);

        return CrewPostResponse.from(savedPostEntity);
    }

    public CrewPostResponse findById(Long id) {
        CrewPostEntity postEntity = crewPostRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(postEntity))
            return null;

        return CrewPostResponse.from(postEntity);
    }

    public CrewPostResponse update(Long id, CrewPostUpdateRequest request) {
        CrewPostEntity postEntity = crewPostRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(postEntity))
            return null;

        postEntity.setContent(request.getContent());
        postEntity.setTitle(request.getTitle());
        postEntity.setMaxPeople(request.getMaxPeople());
        crewPostRepository.save(postEntity);

        return CrewPostResponse.from(postEntity);
    }

    public void delete(Long id) {
        CrewPostEntity postEntity = crewPostRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(postEntity))
            return;

        crewPostRepository.delete(postEntity);
    }
}
