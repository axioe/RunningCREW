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
    public ResultResponse create(CrewPostCreateRequest request) {
        //  1. userId -> id 조회
        UserEntity user = userRepository.findById(request.getUserId()).orElse(null);
        if (ObjectUtils.isEmpty(user))
            return null;
        //  2. running_course id 조회
        RunningCourseEntity courseEntity = runningCourseRepository.findById(request.getCourseId()).orElse(null);
        if (ObjectUtils.isEmpty(courseEntity))
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
        if (ObjectUtils.isEmpty(postEntity))
            return null;

        return ResultResponse.from(postEntity);
    }

    public ResultResponse update(Long id, CrewPostUpdateRequest request) {
        CrewPostEntity postEntity = crewPostRepository.findById(id).orElse(null);
        if (ObjectUtils.isEmpty(postEntity))
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
        if (ObjectUtils.isEmpty(postEntity))
            return;

        crewPostRepository.delete(postEntity);
    }

    public List<CrewPostMemberResponse> getOrdersByUserId(Long userId) {
        return crewPostRepository.searchByUserId(userId);
    }

    @Transactional
    public CrewJoinResponse insertPost(CrewPostAppliedRequest request) {
        //  1. 모집글 존재 여부 확인
        CrewPostEntity postEntity = crewPostRepository.findById(request.getPostId()).orElse(null);
        if (ObjectUtils.isEmpty(postEntity))
            return CrewJoinResponse.postNotFound();

        //  2. 기존 신청 기록 확인
        CrewMemberEntity existing = crewMemberRepository
                .findByPostIdAndUserId(request.getPostId(), request.getUserId())
                .orElse(null);

        if (!ObjectUtils.isEmpty(existing)) {
            //  대기중이거나 이미 승인된 경우는 중복 신청으로 차단
            if (existing.getStatus() == CrewStatus.PENDING || existing.getStatus() == CrewStatus.APPROVED) {
                return CrewJoinResponse.alreadyApplied();
            }
            //  거절(CANCELLED)된 기록은 재사용하여 다시 대기 상태로 신청
            existing.setStatus(CrewStatus.PENDING);
            crewMemberRepository.save(existing);
            return CrewJoinResponse.ok();
        }

        //  3. crew_member insert (승인 대기 상태로 신청)
        CrewMemberEntity memberEntity = new CrewMemberEntity();
        memberEntity.setPostId(request.getPostId());
        memberEntity.setUserId(request.getUserId());
        memberEntity.setCrewRole(CrewRole.Member);
        memberEntity.setStatus(CrewStatus.PENDING);
        crewMemberRepository.save(memberEntity);

        return CrewJoinResponse.ok();
    }

    public PageResponse<CrewPostResponse> findAllCrewPosts(
            int page,
            int size,
            String address,
            int distance,
            String difficulty,
            String sortType) {

        Sort.Order order;
        switch (sortType) {
            case "latest":
                order = Sort.Order.desc("created_at");
                break;
            case "best":
                order = Sort.Order.desc("member_count");
                break;
            default:
                order = Sort.Order.desc("created_at");
        }
        Sort sort = Sort.by(order);
        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );
        if(ObjectUtils.isEmpty(address))
            address = null;
        if(difficulty.equals("새싹"))
            difficulty = "LOW";
        else if(difficulty.equals("나무"))
            difficulty = "MEDIUM";
        else if(difficulty.equals("숲"))
            difficulty = "HIGH";
        else
            difficulty = null;

        Page<Object[]> posts = crewPostRepository.findAllCrewPosts(address, distance, difficulty, pageable);

        Page<CrewPostResponse> response = posts.map(
                post -> CrewPostResponse.toDto(post));

        return new PageResponse<>(response);
    }

    public List<CrewPostMemberResponse> getOrdersByUserIdOwner(Long userId) {
        return crewPostRepository.searchByUserIdOwner(userId);
    }

    public PageResponse<CrewPostResponse> findBestCrewPosts(
            int page,
            int size,
            String address,
            int distance,
            String difficulty,
            String sortType) {

        Sort.Order order;
        switch (sortType) {
            case "latest":
                order = Sort.Order.desc("created_at");
                break;
            case "best":
                order = Sort.Order.desc("member_count");
                break;
            default:
                order = Sort.Order.desc("member_count");
        }
        Sort sort = Sort.by(order);
        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );
        if(ObjectUtils.isEmpty(address))
            address = null;
        if(difficulty.equals("새싹"))
            difficulty = "LOW";
        else if(difficulty.equals("나무"))
            difficulty = "MEDIUM";
        else if(difficulty.equals("숲"))
            difficulty = "HIGH";
        else
            difficulty = null;
        Page<Object[]> posts = crewPostRepository.findBestCrewPosts(address, distance, difficulty, pageable);

        Page<CrewPostResponse> response = posts.map(
                post -> CrewPostResponse.toDto(post));

        return new PageResponse<>(response);
    }
}
