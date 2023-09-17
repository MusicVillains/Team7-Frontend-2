import styled from "@emotion/styled";
import DeleteFeed from "@/api/deleteFeed";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ETC from "@/api/etc";
interface StyledComponentProps {
  background?: string; // background 속성을 정의합니다.
}

export interface WriteEvaluationProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  musicname?: string;
  musician?: string;
}
const ModalForm = (
  // 원래 이 타입
  // React.Dispatch<React.SetStateAction<boolean>>
  { setModalIsOpen, musicname, musician }: WriteEvaluationProps
) => {
  const { logout } = ETC();
  const router = useRouter();
  const handleLogoutAndRedirect = () => {
    logout(() => {
      router.push("/main?value=전체"); // 특정 조건이 만족하는 경우에만 화면 이동
    });
  };
  const path = usePathname();
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const { deletes } = DeleteFeed();
  return (
    <ModalBox>
      {lastPart === "mypage" ? (
        <ModalFlex>
          <ModalWordWrap>로그아웃 하시겠어요?</ModalWordWrap>
          <ModalWordSubWrap>언제든지 다시 로그인할 수 있어요.</ModalWordSubWrap>
          <ModalButtonFlex>
            <ModalButton background="rgba(151, 148, 148, 0.04)">
              <ModalButtonWord
                color="rgba(0, 0, 0, 0.60);"
                onClick={() => setModalIsOpen(false)}
              >
                아니오
              </ModalButtonWord>
            </ModalButton>
            <ModalButton background="#651FFF">
              <ModalButtonWord
                color="#FFF;"
                onClick={() => {
                  handleLogoutAndRedirect();
                  setModalIsOpen(false);
                }}
              >
                네
              </ModalButtonWord>
            </ModalButton>
          </ModalButtonFlex>
        </ModalFlex>
      ) : (
        <ModalFlex>
          <ModalWordWrap>
            {musicname} - {musician}
          </ModalWordWrap>
          <ModalWordWrap>노래를 삭제하시겠어요?</ModalWordWrap>
          <ModalWordSubWrap>삭제된 노래는 복구할 수 없어요.</ModalWordSubWrap>
          <ModalButtonFlex>
            <ModalButton background="rgba(0, 0, 0, 0.04)">
              <ModalButtonWord
                color="rgba(0, 0, 0, 0.60);"
                onClick={() => setModalIsOpen(false)}
              >
                아니오
              </ModalButtonWord>
            </ModalButton>
            <ModalButton background="#651FFF">
              <ModalButtonWord
                color="#FFF;"
                onClick={() => {
                  deletes();
                  setModalIsOpen(false);
                }}
              >
                네, 삭제할게요
              </ModalButtonWord>
            </ModalButton>
          </ModalButtonFlex>
        </ModalFlex>
      )}
    </ModalBox>
  );
};

export default ModalForm;
const ModalBox = styled.div`
  width: 311px;
  height: 171px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;
`;
const ModalFlex = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalWordWrap = styled.div`
  color: #000;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 10px 16px 0px 16px;
`;

const ModalWordSubWrap = styled.div`
  color: rgba(0, 0, 0, 0.6);

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 16px;
`;

const ModalButtonFlex = styled.div`
  display: flex;
`;
const ModalButton = styled.div<StyledComponentProps>`
  width: 135px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${(props) => props.background};

  margin: 10px;
`;

const ModalButtonWord = styled.div`
  color: ${(props) => props.color};
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 3;
`;

// function logout(arg0: () => void) {
//   throw new Error("Function not implemented.");
// }
// // function logout(arg0: () => void) {
// //   throw new Error("Function not implemented.");
// // }
