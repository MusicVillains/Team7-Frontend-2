"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";
import Reactquery from "@/util/reactquery";
import Category from "@/components/category";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import FeedData from "@/components/feed/feedData";

interface BackgroundImages {
  [key: string]: string;
}

const backgroundImages: BackgroundImages = {
  전체: "/background-all.svg",
  고음괴물: "/background-1.svg",
  화음귀신: "/background-2.svg",
  힙합전사: "/background-3.svg",
  하이라이트도둑: "/background-4.svg",
  소몰이대장: "/background-5.svg",
  삑사리요정: "/background-6.svg",
  기타: "/background-all.svg",
};
const Main = () => {
  const [clicked, setClicked] = useState(false);
  const token = useRecoilValue(tokenState);
  const handleButtonClick = () => {
    setClicked(!clicked);
  };
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value") || "";
  const { all } = Reactquery();
  useEffect(() => {
    console.log(token);
  }, []);
  return (
    <MainPageWrapper background={backgroundImages[searchValue]}>
      <Header />
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
      <MainPageContainer>
        <FeedWrap>
          <FeedData data={all}></FeedData>
        </FeedWrap>
        <Footer />
      </MainPageContainer>
    </MainPageWrapper>
  );
};

export default Main;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const FeedWrap = styled.div`
  margin-top: 80px;
  overflow-y: scroll; /* This hides horizontal scroll */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer, Edge */
  ::-webkit-scrollbar {
    width: 0.5em; /* Chrome, Safari, Opera */
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  /* @media (max-height: 968px) {
    height: 500px;
  } */
`;

const MainPageWrapper = styled.div<{ background: string }>`
  width: 100%;
  /* position: flex; */
  top: 0;
  bottom: 0;
  height: 100vh;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-position: center;
  background-size: auto;
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 186px);
  align-items: center;
`;
