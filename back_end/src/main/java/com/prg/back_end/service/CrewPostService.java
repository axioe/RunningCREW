package com.prg.back_end.service;

import com.prg.back_end.dto.*;
import com.prg.back_end.entity.*;
import com.prg.back_end.repository.CrewMemberRepository;
import com.prg.back_end.repository.CrewPostRepository;
import com.prg.back_end.repository.RunningCourseRepository;
import com.prg.back_end.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.List;

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
    public ResultResponse create(CrewPostCreateRequest request){
        //  1. userId -> id 조회
        UserEntity user = userRepository.findById(request.getUserId()).orElse(null);
        if(ObjectUtils.isEmpty(user))
            return null;
        //  2. running_course id 조회
        RunningCourseEntity courseEntity = runningCourseRepository.findById(request.getCourseId()).orElse(null);
        if(ObjectUtils.isEmpty(courseEntity))
            return null;
        //  3. crew_post insert
        CrewPostEntity postEntity = new CrewPostEntity();
        postEntity.setCourseId(courseEntity.getId());
        postEntity.setContent(request.getContent());
        postEntity.setTitle(request.getTitle());
        postEntity.setMaxPeople(request.getMaxPeople());
        postEntity.setAppliedAt(request.getAppliedAt());
        CrewPostEntity savedPostEntity = crewPostRepository.save(postEntity);

        //  4. crew_member insert
        CrewMemberEntity memberEntity = new CrewMemberEntity();
        memberEntity.setPostId(savedPostEntity.getId());
        memberEntity.setUserId(user.getId());
        memberEntity.setCrewRole(CrewRole.Owner);
        memberEntity.setStatus(CrewStatus.APPROVED);
        crewMemberRepository.save(memberEntity);

        return ResultResponse.from(savedPostEntity);
    }

    public ResultResponse findById(Long id) {
        CrewPostEntity postEntity = crewPostRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(postEntity))
            return null;

        return ResultResponse.from(postEntity);
    }

    public ResultResponse update(Long id, CrewPostUpdateRequest request) {
        CrewPostEntity postEntity = crewPostRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(postEntity))
            return null;
        postEntity.setTitle(request.getTitle());
        postEntity.setContent(request.getContent());
        postEntity.setMaxPeople(request.getMaxPeople());
        postEntity.setAppliedAt(request.getAppliedAt());
        crewPostRepository.save(postEntity);

        return ResultResponse.from(postEntity);
    }

    public void delete(Long id) {
        CrewPostEntity postEntity = crewPostRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(postEntity))
            return;

        crewPostRepository.delete(postEntity);
    }

    public List<CrewPostMemberResponse> getOrdersByUserId(Long userId) {
        return crewPostRepository.searchByUserId(userId);
    }

    public void insertPost(CrewPostAppliedRequest request) {
        //  crew_member insert
        CrewMemberEntity memberEntity = new CrewMemberEntity();
        memberEntity.setPostId(request.getPostId());
        memberEntity.setUserId(request.getUserId());
        memberEntity.setCrewRole(CrewRole.Member);
        memberEntity.setStatus(CrewStatus.PENDING);
        crewMemberRepository.save(memberEntity);
    }

    public PageResponse<CrewPostResponse> findAllCrewPosts(int page, int size){
        Pageable pageable = PageRequest.of(
                page, size,
                Sort.by("created_at").descending()
        );
        Page<Object[]> posts = crewPostRepository.findAllCrewPosts(pageable);

        Page<CrewPostResponse> response = posts.map(
                post -> CrewPostResponse.toDto(post));

        return new PageResponse<>(response);
    }
}
