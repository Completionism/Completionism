import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  userName: null,
  memberId: null,
  isAuthenticated: false,
  selectedYearAndMonth : null,
  fixedExpenditureList : [] , //고정지출
  FutureExpenditureList : [] , //미래소비
  MonthTransactionData : [], //달력에 띄울 수입지출데이터
  MonthHistoryData : [],  //계좌 상세조회
  isDiary : false,
  totalBudgetData : [],
  AiScript:'',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state) => {
      state.isAuthenticated = true
      state.userName = null
      state.memberId = null
    },
    logoutState: (state) => {
      state.userName = null
      state.memberId = null
      state.isAuthenticated = false 
      state.selectedYearAndMonth = null
      state.fixedExpenditureList = [] 
      state.FutureExpenditureList = [] 
      state.MonthTransactionData = [] 
      state.MonthHistoryData = [] 
      state.isDiary = false
      state.totalBudgetData = []
      state.AiScript=null
    },
    setSelectedYearAndMonth: (state,action) => {
      state.selectedYearAndMonth = action.payload
    },
    fatchFutureData: (state,action) => {
      state.FutureExpenditureList = action.payload
    },
    fatchPinnedData: (state,action) => {
      state.fixedExpenditureList = action.payload
    },
    setIsDiary: (state) => {
      state.isDiary = !state.isDiary
    },
    fatchMonthTransactionData: (state,action) => {
      state.MonthTransactionData = action.payload;
    },
    fatchMonthTransactionData500: (state,action) => {
      state.MonthTransactionData = [];
    },
    fatchMonthHistoryData: (state,action) => {
      if (action.payload === null){
        state.MonthHistoryData = []
      }else{
        state.MonthHistoryData = action.payload;
      }
    },
    fatchTotalBudgetData: (state,action) => {
      state.totalBudgetData = action.payload;
    },
    SetAiScript: (state,action) => {
      state.AiScript = action.payload;
    }
  },
});

export const { loginState, logoutState ,setSelectedYearAndMonth ,fatchFutureData ,fatchPinnedData,
  setIsDiary,fatchMonthTransactionData,fatchMonthHistoryData, fatchTotalBudgetData,
  fatchMonthTransactionData500,SetAiScript} = authSlice.actions;

export default authSlice.reducer;
