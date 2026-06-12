package com.prg.back_end.service;

import com.prg.back_end.dto.ResultResponse;
import com.prg.back_end.dto.PageResponse;
import com.prg.back_end.dto.RunningRequest;
import com.prg.back_end.dto.RunningResponse;
import com.prg.back_end.entity.RunningCourseEntity;
import com.prg.back_end.repository.RunningCourseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

@Service
public class RunningService {
    private final RunningCourseRepository runningCourseRepository;

    public RunningService(RunningCourseRepository runningCourseRepository) {
        this.runningCourseRepository = runningCourseRepository;
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

        return RunningResponse.from(courseEntity);
    }

    public void delete(Long id) {
        RunningCourseEntity courseEntity = runningCourseRepository.findById(id).orElse(null);
        if(ObjectUtils.isEmpty(courseEntity))
            return;

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
}
