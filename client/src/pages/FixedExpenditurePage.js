import React, { useState } from "react";
import UnderNavigationBar from "../components/UnderNavigationBar";
import UpperNavigationBar from "../components/UpperNavigationBar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./FixedExpenditurePage.css";
import axios from "axios"; // axios 라이브러리 추가
import { useDispatch } from "react-redux";
import { fatchPinnedData } from "../redux/authSlice";
import { useEffect } from "react";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const FixedExpenditurePage = () => {
  const selectedYearAndMonth = useSelector((state) => state.auth.selectedYearAndMonth);
  const upperNavbarName = `${selectedYearAndMonth.split("-")[0]}년 ${selectedYearAndMonth.split("-")[1]}월 고정지출`;
  const dispatch = useDispatch();
  const [useAxios, setUseAxios] = useState(false);

  const fixedExpenditureList = useSelector((state) => state.auth.fixedExpenditureList);

  // 입력 필드와 연결된 state 변수들
  const [todo, setTodo] = useState("");
  const [cost, setCost] = useState(0);
  const [fixed, setFixed] = useState(true);
  const [plus, setPlus] = useState(false);
  const [periodType, setPeriodType] = useState(false);
  const [period, setPeriod] = useState(5);

  useEffect(() => {
    loadData();
  }, [useAxios]);

  const loadData = async () => {
    // 로컬 스토리지에서 엑세스 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");

    // Axios 요청 헤더 설정
    const headers = {
      Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 Bearer 토큰으로 헤더에 추가
    };

    try {
      const response = await axios.get("/api/schedule/pinned", { headers });
      console.log(response.data);
      dispatch(fatchPinnedData(response.data.dataBody));
    } catch (error) {
      console.error(error);
    }
  };

  const createData = async () => {
    // 데이터를 객체로 만들기
    const data = {
      todo: todo,
      cost: cost,
      fixed: fixed,
      plus: plus,
      periodType: periodType,
      period: period,
    };

    // 로컬 스토리지에서 엑세스 토큰 가져오기 (필요한 경우)
    const accessToken = localStorage.getItem("accessToken");

    // Axios 요청 헤더 설정 (필요한 경우)
    const headers = {
      Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 Bearer 토큰으로 헤더에 추가
    };

    try {
      const response = await axios.post("/api/schedule/pinned", data, {
        headers,
      });
      console.log(response);
      setUseAxios(!useAxios);
      // 요청 후 입력 필드 초기화
      setTodo("");
      setCost(0);
      setFixed(true);
      setPlus(false);
      setPeriodType(false);
      setPeriod(5);
    } catch (error) {
      console.error(error);
      console.log(data);
    }
  };

  const deleteData = async (id) => {
    // 로컬 스토리지에서 엑세스 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");

    // Axios 요청 헤더 설정
    const headers = {
      Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 Bearer 토큰으로 헤더에 추가
    };

    try {
      const response = await axios.delete(`/api/schedule/pinned/${id}`, {
        headers,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function setScreenSize() {
    //먼저 뷰포트 높이를 얻고 1%를 곱하여 vh 단위 값을 얻습니다.
    let vh = window.innerHeight * 0.01;
    //그런 다음 --vh 사용자 정의 속성의 값을 문서의 루트로 설정합니다.
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setScreenSize();
  window.addEventListener("resize", setScreenSize);

  return (
    <div className="fixed-page">
      <div className="uppernavbar">
        <UpperNavigationBar props={upperNavbarName} />
      </div>

      <div className="progressive_bar" />

      {/* <div>
        <div>
          <label>Todo:</label>
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        </div>
        <div>
          <label>Cost:</label>
          <input type="number" value={cost} onChange={(e) => setCost(parseFloat(e.target.value))} />
        </div>
        <div>
          <label>Plus:</label>
          <input type="checkbox" checked={plus} onChange={(e) => setPlus(e.target.checked)} />
        </div>
        <div>
          <label>Period Type(체크하면 월 지출):</label>
          <input type="checkbox" checked={periodType} onChange={(e) => setPeriodType(e.target.checked)} />
        </div>
        <div>
          <label>Period:</label>
          <input type="number" value={period} onChange={(e) => setPeriod(parseInt(e.target.value))} />
        </div>
        <button onClick={createData}>고정지출 생성하기</button>
        <hr />
      </div> */}

      <div className="fixed-info-container">
        <div className="balloon">
          <span>
            💡 고정적으로 나가는 지출을 작성해서
            <br />
            현명하게 소비해요!
          </span>
        </div>
      </div>

      <div className="fixed-button-size-container">
        <div className="fixed-button-container">
          <span>
            <strong>작성하기&nbsp;</strong>
          </span>
          <div className="fixed-button-icon-container">
            <div className="fixed-button-icon-flex-container">
              <EditCalendarRoundedIcon sx={{ color: "#0046FF" }} />
            </div>
          </div>
        </div>
      </div>

      <div>
        {fixedExpenditureList.map((item, index) => {
          const handleClose = () => {
            setAnchorEl(null);
          };

          const deleteFutureItem = () => {
            deleteData(item.id);
            setUseAxios(!useAxios);
          };

          return (
            <div className="fixed-item-container">
              <div className="fixed-item-flex-container">
                <div className="fixed-item-main-container">
                  <div className="fixed-item-main-flex-container">
                    <div>{item.todo}</div>
                    <div style={{ fontSize: "0.85rem", color: "#696969" }}>
                      {item.date.split("-")[0]}년 {item.date.split("-")[1]}월 {item.date.split("-")[2]}일
                    </div>
                  </div>
                </div>

                <div className="fixed-item-cost-container">{item.cost}원</div>

                <div className="fixed-item-info-container">
                  <Button id="fade-button" aria-controls={open ? "fade-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                    <MoreVertRoundedIcon sx={{ color: "#696969" }} />
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={deleteFutureItem}>삭제</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>

            // <div>
            //   id: {item.id}|{item.date}|{item.todo}|{item.cost}|{item.plus}
            //   <button
            //     onClick={() => {
            //       deleteData(item.id);
            //       setUseAxios(!useAxios);
            //     }}
            //   >
            //     삭제
            //   </button>
            //   <hr />
            // </div>
          );
        })}
      </div>

      <div className="undernavbar">
        <UnderNavigationBar />
      </div>
    </div>
  );
};

export default FixedExpenditurePage;
