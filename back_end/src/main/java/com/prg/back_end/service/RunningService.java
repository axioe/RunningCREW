package com.prg.back_end.service;

import com.prg.back_end.dto.CrewPostResponse;
import com.prg.back_end.dto.RunningRequest;
import com.prg.back_end.dto.RunningResponse;
import com.prg.back_end.entity.RunningCourseEntity;
import com.prg.back_end.repository.RunningCourseRepository;
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
    public CrewPostResponse create(RunningRequest request) {

        RunningCourseEntity courseEntity = new RunningCourseEntity();
        courseEntity.setLongitude(request.getLongitude());
        courseEntity.setLatitude(request.getLatitude());
        courseEntity.setSpotName(request.getSpotName());
        courseEntity.setFacilityInfo(request.getFacilityInfo());
        courseEntity.setRunningLevel(request.getRunningLevel());
        courseEntity.setAddress(request.getAddress());
        courseEntity.setDistance(request.getDistance());
        RunningCourseEntity savedCourseEntity = runningCourseRepository.save(courseEntity);

        return CrewPostResponse.from(savedCourseEntity.getId(),
                savedCourseEntity.getCreatedAt(),
                savedCourseEntity.getUpdatedAt());
    }

    @Transactional
    public CrewPostResponse update(Long id, RunningRequest request) {
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

        return CrewPostResponse.from(savedCourseEntity.getId(),
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
}
