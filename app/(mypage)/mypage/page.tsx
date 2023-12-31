"use client";
import styled from "@emotion/styled";
import UploadHeader from "@/components/upload_header";
import ETC from "@/api/etc";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import FrontIcon from "@/public/chevron-right.svg";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import ModalForm from "@/components/modalform";

import Reactquery from "@/util/reactquery";
// import CustomAudio2 from "@/components/audioPlayer2";

const Mypage = () => {
  const { myfeed, myclapfeed } = Reactquery();

  const { logout } = ETC();
  const methods = useForm();
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // console.log(myfeed);
  const handleLogoutAndRedirect = () => {
    logout(() => {
      router.push("/main?value=전체"); // 특정 조건이 만족하는 경우에만 화면 이동
    });
  };
  // useEffect(() => {
  //   console.log(token);
  // }, []);
  return (
    <FormProvider {...methods}>
      <MainPageWrapper>
        <MainPageContainer>
          <UploadHeader name="마이페이지" type="hidden"></UploadHeader>
          <ContentWrapper onClick={() => router.push("/rename")}>
            <NicknameWrapper>닉네임</NicknameWrapper>
            <EditWrapper>
              <WordWrapper>수정하기</WordWrapper>
              <LogoLink>
                <FrontIcon />
              </LogoLink>
            </EditWrapper>
          </ContentWrapper>

          <ContentWrapper onClick={() => router.push("/mysong")}>
            <NicknameWrapper>내 노래</NicknameWrapper>
            <EditWrapper>
              <WordWrapper>
                {myfeed == undefined ? 0 : myfeed?.length}곡
              </WordWrapper>
              <LogoLink>
                <FrontIcon />
              </LogoLink>
            </EditWrapper>
          </ContentWrapper>
          <ContentWrapper onClick={() => router.push("/myclapsong")}>
            <NicknameWrapper> 박수 친 노래</NicknameWrapper>
            <EditWrapper>
              <WordWrapper>
                {myclapfeed == undefined ? 0 : myclapfeed?.length}곡
              </WordWrapper>
              <LogoLink>
                <FrontIcon />
              </LogoLink>
            </EditWrapper>
          </ContentWrapper>
          {/* <ContentWrapper onClick={() => handleLogoutAndRedirect()}> */}
          <ContentWrapper
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            로그아웃
            <LogoLink>
              <FrontIcon />
            </LogoLink>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
            >
              <ModalForm setModalIsOpen={setModalIsOpen}></ModalForm>
            </Modal>
          </ContentWrapper>
          <ContentWrapper onClick={() => router.push("/withdraw")}>
            탈퇴하기
            <LogoLink>
              <FrontIcon />
            </LogoLink>
          </ContentWrapper>
        </MainPageContainer>
      </MainPageWrapper>
    </FormProvider>
  );
};

export default Mypage;
const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 56px;
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* line-height: 3.5; */
  cursor: pointer;
`;
const MainPageWrapper = styled.div`
  width: 100%;
  position: flex;
  top: 0;
  bottom: 0;
  height: 100%;
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 117px);
  align-items: center;
  justify-content: center;
`;

const LogoLink = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  /* line-height: 4; */
  margin-right: 14px;
`;

const WordWrapper = styled.div`
  margin-right: 10px;
  /* line-height: 3.2; */
  color: rgba(0, 0, 0, 0.6);
`;

const NicknameWrapper = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  margin-right: 10px; /* "수정하기"와 간격 주기 */
`;
