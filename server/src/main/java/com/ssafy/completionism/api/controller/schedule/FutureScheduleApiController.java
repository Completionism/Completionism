package com.ssafy.completionism.api.controller.schedule;

import com.ssafy.completionism.api.ApiResult;
import com.ssafy.completionism.api.controller.schedule.request.CreateFutureScheduleRequest;
import com.ssafy.completionism.api.service.schedule.FutureScheduleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@Api(tags = {"미래 예상 소비"})
@RequestMapping("/api/transaction/pinned")
public class FutureScheduleApiController {

    private final FutureScheduleService futureScheduleService;

    @ApiOperation(value = "미래 예상 소비 등록")
    @PostMapping
    public ApiResult<Void> createFutureSchedule(@RequestBody CreateFutureScheduleRequest request) {
        return null;
    }
}