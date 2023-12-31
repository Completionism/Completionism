package com.ssafy.completionism.api.service.budget;

import com.ssafy.completionism.api.controller.budget.response.BudgetResponse;
import com.ssafy.completionism.api.controller.budget.response.MonthBudgetResponse;
import com.ssafy.completionism.api.service.budget.dto.AddBudgetDto;
import com.ssafy.completionism.api.service.budget.dto.ModifyBudgetDto;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface BudgetService {

    public Long addBudget(String loginId, AddBudgetDto dto);

    public List<MonthBudgetResponse> searchMonthAll(String loginId);

    public List<MonthBudgetResponse> searchMonth(String loginId, LocalDate startMonth, LocalDate endMonth);

    public BudgetResponse searchMonthDetail(String loginId, String day);

    public void modifyBudget(String loginId, ModifyBudgetDto dto);

    public void deleteBudget(String loginId, String yearMonth);
}
