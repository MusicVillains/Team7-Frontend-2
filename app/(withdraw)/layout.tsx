"use client";
import styled from "@emotion/styled";
import "../globals.css";
// import type { Metadata } from "next";
import { Providers } from "../providers";
import { RecoilRoot } from "recoil";
import ReactQueryProvider from "../ReactQueryProvider";
// export const metadata: Metadata = {
//   title: "빌런 노래방",
//   description: "Generated by create next app",
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BodyStyle>
      <BgStyle>
        <Providers>{children}</Providers>
      </BgStyle>
    </BodyStyle>
  );
};

export default RootLayout;

const BodyStyle = styled.body``;

const BgStyle = styled.div`
  background-color: #fff;
  min-height: calc(100vh * 1);
`;
