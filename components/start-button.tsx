"use client";
import styled from "@emotion/styled";
import Link from "next/link";
import KakaoLogo from "@/public/kakao.svg";

type Label =
  | "시작하기"
  | "카카오로 시작하기"
  | "다른 방법은 아직 준비 중이에요";

interface ButtonProps {
  label: Label;
}

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

// 카카오 API 설정에 등록한 리다이렉트 URI
// "카카오로 시작하기": process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL,
const BUTTON_LINKS = {
  시작하기: "/sign",
  "카카오로 시작하기": `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`,
  "다른 방법은 아직 준비 중이에요": "",
};
const ButtonContainer = ({ label }: ButtonProps) => {
  const linkTo = BUTTON_LINKS[label] || "";

  let bgColor = "";
  let textColor = "";

  switch (label) {
    case "시작하기":
      bgColor = "#651FFF";
      textColor = "white";
      break;
    case "카카오로 시작하기":
      bgColor = "#FEE500";
      textColor = "black";
      break;
    case "다른 방법은 아직 준비 중이에요":
      bgColor = "rgba(0, 0, 0, 0.3);";
      textColor = "rgba(0, 0, 0, 0.75)";
      break;
    default:
      break;
  }

  return (
    <Link href={linkTo}>
      <ButtonWrapper bgColor={bgColor} textColor={textColor} label={label}>
        {label === "카카오로 시작하기" && <KakaoLogoWrapper />}
        <p>{label}</p>
      </ButtonWrapper>
    </Link>
  );
};

export default ButtonContainer;

// 여기부분이 a가 아닌듯
// 여기 trouble shooting -> next hydration 관련한 오류 => react와 next의 렌더링 방식 차이 공부
const ButtonWrapper = styled.button<{
  bgColor: string;
  textColor: string;
  label: Label;
}>`
  border: none;
  margin-bottom: 15px;
  display: inline-block;
  height: 66px;
  width: 100%;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  font-size: 22px;
  font-weight: 500;
  &:hover {
    background-color: ${(props) =>
      props.label === "시작하기"
        ? "indigo"
        : props.label === "카카오로 시작하기"
        ? "#d3be1e"
        : "rgba(0, 0, 0, 0.25);"};
    color: black;
    color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }

  &:active {
    background-color: ${(props) =>
      props.label === "시작하기"
        ? "indigo"
        : props.label === "카카오로 시작하기"
        ? "yellow"
        : "#b1ae9c"};
    color: black;
    background-color: "gray";
    color: rgba(0, 0, 0, 0.75);
  }
`;

const KakaoLogoWrapper = styled(KakaoLogo)`
  margin-right: 14px;
  fill: black;
`;
