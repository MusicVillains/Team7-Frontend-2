"use client";
import styled from "@emotion/styled";
import "../globals.css";
import { Providers } from "../providers";
import { useSearchParams } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  interface BackgroundImages {
    [key: string]: string;
  }

  const backgroundImages: BackgroundImages = {
    전체: "#F5F5F5",
    고음괴물: "#E40C0C",
    화음귀신: "#E4F0F5",
    힙합전사: "#15B28D",
    하이라이트도둑: "#2962FF",
    소몰이대장: "#795548",
    삑사리요정: "#FF5CBE",
    기타: "#F5F5F5",
  };
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value") || "";
  return (
    <BodyStyle>
      <BgStyle background={backgroundImages[searchValue]}>
        <Providers>{children}</Providers>
      </BgStyle>
    </BodyStyle>
  );
};

export default RootLayout;

const BodyStyle = styled.body``;

const BgStyle = styled.div<{ background: string }>`
  /* background-color: #fff; */
  background-color: ${(props) => props.background};

  min-height: calc(100vh * 1);
  overflow-y: hidden;
`;
