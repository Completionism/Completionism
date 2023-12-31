package com.ssafy.completionism.api.controller.transaction;

import com.ssafy.completionism.api.ApiResponse;
import com.ssafy.completionism.api.controller.transaction.response.HistoryListResponse;
import com.ssafy.completionism.api.controller.transaction.response.TransactionResponse;
import com.ssafy.completionism.api.service.transaction.HistoryService;
import com.ssafy.completionism.domain.transaction.repository.HistoryPeriodSearchCond;
import com.ssafy.completionism.global.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/history")
@Slf4j
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    public ApiResponse<List<TransactionResponse>> getTransactionList(@RequestParam String date) {
        String loginId = SecurityUtils.getCurrentLoginId();

        String[] day = date.split("-");
        LocalDate searchDay = LocalDate.of(Integer.parseInt(day[0]), Integer.parseInt(day[1]), Integer.parseInt(day[2]));

        List<TransactionResponse> responses = historyService.getTransactionList(loginId, searchDay);

        if (responses.size() == 0) {
            return ApiResponse.ok(null);
        }
        return ApiResponse.ok(responses);
    }

    /**
     * @param period
     * @return
     */
    @GetMapping("/{period}")
    public ApiResponse<HistoryListResponse> getHistoryListForPeriod(@PathVariable String period) {
        String loginId = SecurityUtils.getCurrentLoginId();

        HistoryPeriodSearchCond cond = getSearchCond(period);

        HistoryListResponse response = historyService.getHistoryListUsingPeriod(loginId, cond);

        if(response.getDay().size() > 0) {
            log.debug("[기간별 +- 조회] Controller. res = {}", response.getDay().get(0).getDay());
        }
        return ApiResponse.ok(response);
    }

    private static HistoryPeriodSearchCond getSearchCond(String period) {
        String[] days = period.split("_");
        String[] start = days[0].split("-");
        String[] end = days[1].split("-");
        log.debug("[기간별 +- 조회] start => {}, {}, {}", start[0], start[1], start[2]);
        log.debug("[기간별 +- 조회] end => {}, {}, {}", end[0], end[1], end[2]);
        LocalDate startDay = LocalDate.of(Integer.parseInt(start[0]), Integer.parseInt(start[1]), Integer.parseInt(start[2]));
        LocalDate endDay = LocalDate.of(Integer.parseInt(end[0]), Integer.parseInt(end[1]), Integer.parseInt(end[2]));
        return HistoryPeriodSearchCond.builder()
                .startDay(startDay)
                .endDay(endDay)
                .build();
    }
}
