"use client";
import styled from "@emotion/styled";
import Logo from "@/public/logo.svg";
import Notification from "@/public/notification.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLoginStorage } from "@/util/loginStorage";

const Header = () => {
  // const pathname = usePathname();
  const router = useRouter();
  const isLogin = isLoginStorage();
  const handleClickNotice = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      router.push("/sign");
    } else {
      router.push("/notice");
    }
  };
  return (
    <HeaderWrapper>
      <div>
        <HeaderTop>
          <Link href="/main?value=전체">
            <LogoLink>
              <Logo width={115} height={24} />
            </LogoLink>
          </Link>
          <NotificationIcon onClick={handleClickNotice}>
            <Notification />
          </NotificationIcon>
        </HeaderTop>
      </div>
      <WhiteBackground />
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: white;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  /* margin: 0 20px; */
  border-bottom: 1px solid #e2e8f0;
`;

const LogoLink = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

const NotificationIcon = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const WhiteBackground = styled.div`
  height: 115px;
  background-color: white;
  position: absolute;
  top: 0;
`;
