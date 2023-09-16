import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import UnderNavigationBar from "../components/UnderNavigationBar";
import UpperNavigationBar from "../components/UpperNavigationBar";
import "./AccountBookDetailPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fatchMonthHistoryData } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { colors } from "@mui/material";
import { blue } from "@mui/material/colors";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

const emotions = [
  "ANGER",
  "JOY",
  "DESIRE",
  "GRATITUDE",
  "GRIEF",
  "DISGUST",
  "FEAR",
  "CURIOSITY",
  "NEUTRAL",
];

// 모달 스타일을 설정합니다.
const modalStyle = {
  content: {
    position: "absolute",
    // bottom: "0",
    // left: "0",
    // right: "0",
    // width: "100%",
    // height: "15rem",
    // padding: "0",
    // borderRadius: "1rem 1rem 0 0",
    // boxShadow: 20,
    // textAlign: "center",
    // overflowY: "auto", // 스크롤바 추가
    // outline: "none",
    // backdropFilter: "blur(5px)",
    top: "35rem",
    left: "0px",
    right: "0px",
    bottom: "0px",
    // border: '1px solid #ccc',
    //   width:"100%",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "1rem",
    outline: "none",
    padding: "1rem",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
};

const AccoutBookDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const upperNavbarName = `${id}일 가계부`;
  const MonthHistoryData = useSelector((state) => state.auth.MonthHistoryData);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [diaryContent, setDiaryContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("NEUTRAL");
  const [useAxios, setUseAxios] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setTransaction] = useState(-1);

  useEffect(() => {
    loadData();
  }, [useAxios]);

  const loadData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await axios.get(
        `/api/history?date=${id.slice(0, 4) + "-" + id.slice(4, 6) + "-" + id.slice(6, 9)}`,
        {
          headers,
        }
      );
      dispatch(fatchMonthHistoryData(response.data.dataBody));
      console.log(id.slice(0, 4) + "-" + id.slice(4, 6) + "-" + id.slice(6, 9));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createDiary = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const data = {
      feel: selectedEmotion,
      diary: diaryContent,
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      const response = await axios.post(`/api/transaction/${id}/diary`, data, {
        headers,
      });
      console.log(response.data);
      setUseAxios(!useAxios);
      setIsModalOpen(false); // 일기 작성이 완료되면 모달을 닫습니다.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="account-detail-page">
      <div className="uppernavbar">
        <UpperNavigationBar props={upperNavbarName} />
      </div>

      <div className="progressive_bar"></div>

      <div className="account-detail-page_top_box">
        <div className="main-header-info-text-container ">
          총 소비금액: {}원
          <div style={{ marginBottom: "0.3rem", marginTop: "0.3rem" }}>
            <SmartToyOutlinedIcon sx={{ fontSize: "2.3rem", color: "#60f14f" }} />
          </div>
          AI의 조언: {}
        </div>
      </div>

      {/*<div className="body">this is AccountBookDetailPage</div>*/}

      <div className="account-detail-manual">
        😀 가계부에 이모지와 함께 한 줄 일기를 작성해보세요! 😉
      </div>

      <div>
        {MonthHistoryData.map((item, index) => {
          return (
            <div key={item.transactionId}>
              {item.diary === "" ? (
                //   일기 없음
                <div className="transaction-item-container">
                  <div className="transaction-item-flex-container">
                    <div style={{ flex: "1", textAlign: "left", paddingLeft: "1rem" }}>
                      <div>{item.place}</div>
                      <div className="transaction-item-date">
                        {item.time} | {item.category}
                      </div>
                    </div>
                    <div style={{ width: "7rem", textAlign: "right" }}>
                      {item.plus ? (
                        <span style={{ color: "green" }}>
                          {item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>
                          -{item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                        </span>
                      )}
                    </div>
                    <div style={{ width: "3.5rem" }}>
                      <button
                        onClick={() => {
                          setSelectedItemIndex(index);
                          setIsModalOpen(true); // 모달 열기
                          setDiaryContent("");
                          setSelectedEmotion("NEUTRAL");
                          setTransaction(item.transactionId);
                        }}
                        style={{ borderStyle: "none", background: "white" }}
                      >
                        <div>
                          <EditCalendarIcon sx={{ fontSize: "2rem", color: "#0046FF" }} />
                        </div>
                      </button>
                    </div>
                    <div visible={isModalOpen} className="modal-overlay" />
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={() => setIsModalOpen(false)} // 모달 닫기
                      style={modalStyle}
                      contentLabel="일기 작성 모달"
                    >
                      <h2>일기 작성</h2>
                      <select
                        value={selectedEmotion}
                        onChange={(e) => setSelectedEmotion(e.target.value)}
                      >
                        {emotions.map((emotion) => (
                          <option key={emotion} value={emotion}>
                            {emotion}
                          </option>
                        ))}
                      </select>
                      <input
                        placeholder="일기를 입력하세요"
                        value={diaryContent}
                        onChange={(e) => setDiaryContent(e.target.value)}
                      />
                      <button onClick={() => createDiary(item.transactionId)}>작성완료</button>
                      <button onClick={() => setIsModalOpen(false)}>취소</button>
                    </Modal>
                  </div>
                </div>
              ) : (
                //   일기 있음
                <div className="transaction-item-container-contain-diary">
                  <div>
                    <div className="transaction-item-flex-container-show-diary">
                      <div style={{ flex: "1", textAlign: "left", paddingLeft: "1rem" }}>
                        <div>{item.place}</div>
                        <div className="transaction-item-date">
                          {item.time} | {item.category}
                        </div>
                      </div>
                      <div style={{ width: "7rem", textAlign: "right" }}>
                        {item.plus ? (
                          <span style={{ color: "green" }}>
                            {item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            -{item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                          </span>
                        )}
                      </div>
                      <div style={{ width: "3.5rem" }}>
                        <button
                          onClick={() => {
                            setSelectedItemIndex(index);
                            setIsModalOpen(true); // 모달 열기
                            setDiaryContent("");
                            setSelectedEmotion("NEUTRAL");
                            setTransaction(item.transactionId);
                          }}
                          style={{ borderStyle: "none", background: "white" }}
                        >
                          <div>
                            <EditCalendarIcon sx={{ fontSize: "2rem", color: "#0046FF" }} />
                          </div>
                        </button>
                      </div>
                      <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)} // 모달 닫기
                        style={modalStyle}
                        contentLabel="일기 작성 모달"
                        overlayClassName="modal-overlay"
                      >
                        <h2>한 줄 일기 작성</h2>
                        {/*<button style={{}} className="writeDiaryPageBtn" onClick={() => setIsModalOpen(false)}>*/}
                        {/*  취소*/}
                        {/*</button>*/}
                        <div className="modal-flex-container">
                          <div style={{ flex: "3" }}>
                            기분을 선택하세요
                            <select
                              style={{ marginLeft: "0.3rem", fontSize: "1.5rem" }}
                              value={selectedEmotion}
                              onChange={(e) => setSelectedEmotion(e.target.value)}
                            >
                              {emotions.map((emotion) => (
                                <option key={emotion} value={emotion}>
                                  {
                                    {
                                      DESIRE: <span>😍</span>,
                                      GRATITUDE: <span>🙏</span>,
                                      JOY: <span>😃</span>,
                                      ANGER: <span>😡</span>,
                                      DISGUST: <span>🤮</span>,
                                      FEAR: <span>😨</span>,
                                      GRIEF: <span>😰</span>,
                                      CURIOSITY: <span>🤔</span>,
                                      SURPRISE: <span>😲</span>,
                                      NEUTRAL: <span>😶</span>,
                                    }[emotion]
                                  }
                                </option>
                              ))}
                            </select>
                          </div>
                          <div style={{ flex: "1" }}>
                            <button
                              className="writeDiaryPageBtn"
                              onClick={() => createDiary(transactionId)}
                            >
                              작성완료
                            </button>
                          </div>
                        </div>
                        <br />
                          <div style={{ width: "100%", textAlign: "center" }}>
                              <input
                                  placeholder="한 줄 일기를 작성해보세요!"
                                  value={diaryContent}
                                  style={{display:"inline-block", width:"95%",fontSize:"1rem",padding:"0.4rem", borderStyle:"solid",}}
                                  onChange={(e) => setDiaryContent(e.target.value)}
                              />
                          </div>

                      </Modal>
                    </div>
                  </div>
                  <hr
                    style={{
                      borderColor: "#bbbbbb",
                      borderWidth: "1px 0 0 0",
                      borderStyle: "dotted",
                    }}
                  />
                  <div>
                    <div className="transaction-item-flex-container">
                      {
                        {
                          DESIRE: <span style={{ fontSize: "3rem", width: "4rem" }}>😍</span>,
                          GRATITUDE: <span style={{ fontSize: "3rem", width: "4rem" }}>🙏</span>,
                          JOY: <span style={{ fontSize: "3rem", width: "4rem" }}>😃</span>,
                          ANGER: <span style={{ fontSize: "3rem", width: "4rem" }}>😡</span>,
                          DISGUST: <span style={{ fontSize: "3rem", width: "4rem" }}>🤮</span>,
                          FEAR: <span style={{ fontSize: "3rem", width: "4rem" }}>😨</span>,
                          GRIEF: <span style={{ fontSize: "3rem", width: "4rem" }}>😰</span>,
                          CURIOSITY: <span style={{ fontSize: "3rem", width: "4rem" }}>🤔</span>,
                          SURPRISE: <span style={{ fontSize: "3rem", width: "4rem" }}>😲</span>,
                          NEUTRAL: <span style={{ fontSize: "3rem", width: "4rem" }}>😶</span>,
                        }[item.feel]
                      }
                      <div style={{ flex: "1", textAlign: "left", paddingLeft: "1rem" }}>
                        | {item.diary}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="undernavbar">
        <UnderNavigationBar />
      </div>
    </div>
  );
};

export default AccoutBookDetailPage;
