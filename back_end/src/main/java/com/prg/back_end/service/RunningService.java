package com.prg.back_end.service;

import com.prg.back_end.dto.*;
import com.prg.back_end.entity.CourseImageEntity;
import com.prg.back_end.entity.RunningCourseEntity;
import com.prg.back_end.entity.RunningLevel;
import com.prg.back_end.repository.CourseImageRepository;
import com.prg.back_end.repository.RunningCourseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class RunningService {
    private final RunningCourseRepository runningCourseRepository;
    private final CourseImageRepository courseImageRepository;

    public RunningService(RunningCourseRepository runningCourseRepository, CourseImageRepository courseImageRepository) {
        this.runningCourseRepository = runningCourseRepository;
        this.courseImageRepository = courseImageRepository;
    }

    @Transactional
    public ResultResponse create(RunningRequest request) {

        RunningCourseEntity courseEntity = new RunningCourseEntity();
        courseEntity.setLongitude(request.getLongitude());
        courseEntity.setLatitude(request.getLatitude());
        courseEntity.setSpotName(request.getSpotName());
        courseEntity.setFacilityInfo(request.getFacilityInfo());
        courseEntity.setRunningLevel(request.getRunningLevel());
        courseEntity.setAddress(request.getAddress());
        courseEntity.setDistance(request.getDistance());
        RunningCourseEntity savedCourseEntity = runningCourseRepository.save(courseEntity);

        return ResultResponse.from(savedCourseEntity.getId(),
                savedCourseEntity.getCreatedAt(),
                savedCourseEntity.getUpdatedAt());
    }

    @Transactional
    public ResultResponse update(Long id, RunningRequest request) {
        RunningCourseEntity courseEntity = runningCourseRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(courseEntity))
            return null;
        courseEntity.setLongitude(request.getLongitude());
        courseEntity.setLatitude(request.getLatitude());
        courseEntity.setSpotName(request.getSpotName());
        courseEntity.setFacilityInfo(request.getFacilityInfo());
        courseEntity.setRunningLevel(request.getRunningLevel());
        courseEntity.setAddress(request.getAddress());
        courseEntity.setDistance(request.getDistance());
        RunningCourseEntity savedCourseEntity = runningCourseRepository.save(courseEntity);

        return ResultResponse.from(savedCourseEntity.getId(),
                savedCourseEntity.getCreatedAt(),
                savedCourseEntity.getUpdatedAt());
    }

    public RunningResponse findById(Long id) {
        RunningCourseEntity courseEntity = runningCourseRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(courseEntity))
            return null;

        String imageUrl = "";
        CourseImageEntity imageEntity = courseImageRepository.findByCourseId(courseEntity.getId());
        if(!ObjectUtils.isEmpty(imageEntity))
            imageUrl = imageEntity.getStoredFileName();

        return RunningResponse.from(courseEntity, imageUrl);
    }

    public void delete(Long id) {
        RunningCourseEntity courseEntity = runningCourseRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(courseEntity))
            return;

        CourseImageEntity imageEntity = courseImageRepository.findByCourseId(courseEntity.getId());
        if(!ObjectUtils.isEmpty(imageEntity))
            courseImageRepository.delete(imageEntity);

        runningCourseRepository.delete(courseEntity);
    }

    public PageResponse<RunningResponse> findSpotName( int page, int size, String keyword){
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Order.desc("createdAt"),
                        Sort.Order.asc("spotName")
                )
        );
        Page<RunningCourseEntity> runningCourse = runningCourseRepository.findBySpotNameContaining(keyword, pageable);
        Page<RunningResponse>  response = runningCourse.map(running -> RunningResponse.from(running));
        return new PageResponse<>(response);
    }

    public PageResponse<RunningResponse> findByAll( int page, int size){
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Order.desc("createdAt"),
                        Sort.Order.asc("spotName")
                )
        );
        Page<RunningCourseEntity> runningCourse = runningCourseRepository.findAll(pageable);
        Page<RunningResponse>  response = runningCourse.map(running -> RunningResponse.from(running));
        return new PageResponse<>(response);
    }

    public PageResponse<RunningResponse> findByAllFilter(
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
            case "name":
                order = Sort.Order.asc("spot_name");
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

        Page<Object[]> runningCourse = runningCourseRepository.findAllRunningCourses(address, distance, difficulty, pageable);

        Page<RunningResponse> response = runningCourse.map(
                post -> RunningResponse.toDto(post));
        return new PageResponse<>(response);
    }

    public List<RunningResponse> getCourseList(CourseRequest request) {
        List<RunningResponse> runningResponseList = new ArrayList<>();
        List<Long> ids = request.getIds();
        for(Long id : ids){
            RunningCourseEntity courseEntity = runningCourseRepository.findById(id).orElse(null);
            if(!ObjectUtils.isEmpty(courseEntity)) {
                String imageUrl = "";
                CourseImageEntity imageEntity = courseImageRepository.findByCourseId(courseEntity.getId());
                if(!ObjectUtils.isEmpty(imageEntity)) {
                    imageUrl = imageEntity.getStoredFileName();
                }
                runningResponseList.add(RunningResponse.from(courseEntity, imageUrl));
            }
        }
        return runningResponseList;
    }

    public PageResponse<RunningResponse> searchKeyword(
            int page,
            int size,
            String keyword) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Order.desc("created_at"),
                        Sort.Order.asc("spot_name")
                )
        );

        Page<Object[]> runningCourse = runningCourseRepository.searchKeyword(keyword, pageable);

        Page<RunningResponse> response = runningCourse.map(
                post -> RunningResponse.toDto(post));
        return new PageResponse<>(response);
    }
}
