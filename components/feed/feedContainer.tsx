"use client";
import styled from "@emotion/styled";
import { useState } from "react";
import CustomAudio from "../audioPlayer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "../modal";
import ModalForm from "../modalform";
import { getStorage, isLoginStorage, setStorage } from "@/util/loginStorage";
import Interection from "@/api/Interection";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Feed from "@/api/Feed";
import Reactquery from "../../util/reactquery";

// const FeedCounter = ({data} : any) =>{
//   data.map((data: any)=>{
//     const [interactionCount, setInteractionCount] = useState(
//       data.interactionCount
//     )
//     return(interactionCount
//   )
//   }
//  )

//   return{
//     setInteractionCount
//   }
// }

const FeedContainer = ({ data }: any) => {
  // const interactionCounts = data?.map((data: any) => {
  //   const [interactionCount, setInteractionCount] = useState(
  //     data.interactionCount
  //   );
  //   return { interactionCount, setInteractionCount };
  // });

  function padWithZeros(num: number, length: number) {
    let numString = num?.toString();
    while (numString?.length < length) {
      numString = "0" + numString;
    }
    return numString;
  }
  const feed = Feed();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value") || "";
  const interection = Interection();
  const { Interection_click } = Interection();
  const isLogin = isLoginStorage();
  const { myclapfeed } = Reactquery();
  const router = useRouter();
  const [modalData, setModalData] = useState<any>([]);
  const path = usePathname();
  const memberId = getStorage("member")?.replace(/\"/gi, "");
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLike, SetisLike] = useState(false);

  const [querycontent, setQuerycontent] = useState([
    "2px solid #651fff;",
    "white",
    "👏",
  ]);

  const handleClickMypage = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      router.push("/sign");
    }
  };

  //optimistic update를 위한 usemutate =>박수관련 interaction

  const { mutate: updateLikeMutate } = useMutation(
    () => interection.Interection_check(),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["myclapfeed"]);
        const previousProjectCount = queryClient.getQueryData(["myclapfeed"]);
        queryClient.setQueryData(["myclapfeed"], () => {
          isLike
            ? setQuerycontent(["2px solid #651fff;", "white", "👏"])
            : setQuerycontent(["", "#EAED70", "박수"]);
        });
        return { previousProjectCount };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(["myclapfeed"], context?.previousProjectCount);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["myclapfeed"]);
      },
    }
  );

  const { mutate: updateCountMutate } = useMutation(
    () => feed.all(searchValue),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["feed", searchValue]);
        const previousProjectLike = queryClient.getQueryData([
          "feed",
          searchValue,
        ]);
        queryClient.setQueryData(["feed", searchValue], () => {});
        return { previousProjectLike };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(
          ["feed", searchValue],
          context?.previousProjectLike
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(["feed", searchValue]);
      },
    }
  );
  const My_Calp_data =
    data &&
    isLoginStorage() &&
    myclapfeed?.map((data: any) => {
      return data.feedId;
    });

  const Clap_count_data = data?.map((data: any) => {
    return data.interactionCount;
  });
  const [clicked, setClicked] = useState<boolean>(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };
  // console.log(My_Calp_data);

  return (
    <>
      {data &&
        data?.map((data: any, index: number) => {
          let countLike = data.interactionCount;

          return (
            <FeedBox key={data.feedId}>
              <BoxWrap>
                <BoxWrap2>
                  <WordWrap>
                    {data.musicName} - {data.musicianName}
                  </WordWrap>
                  <VillanType>#{data.feedType}</VillanType>
                </BoxWrap2>
                {lastPart === "mysong" ? (
                  <>
                    <ModifyFlex>
                      <ModifyWrap
                        onClick={() => {
                          router.push("/reupload");
                          setStorage("modify", data.feedId);
                          setModalData([data.musicName, data.musicianName]);
                        }}
                      >
                        수정
                      </ModifyWrap>
                      <DeleteWrap
                        onClick={() => {
                          setModalIsOpen(true);
                          setStorage("delete", data.feedId);
                          setModalData([data.musicName, data.musicianName]);
                        }}
                      >
                        삭제
                      </DeleteWrap>
                    </ModifyFlex>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                    >
                      <ModalForm
                        setModalIsOpen={setModalIsOpen}
                        musicname={modalData[0]}
                        musician={modalData[1]}
                      ></ModalForm>
                    </Modal>
                  </>
                ) : isLoginStorage() && My_Calp_data?.includes(data.feedId) ? (
                  <ClapWrapper
                    onClick={() => {
                      updateLikeMutate();
                      updateCountMutate();
                      SetisLike(!isLike);
                      handleClickMypage();
                      handleButtonClick();
                      Interection_click({
                        feedId: data.feedId,
                        memberId: memberId,
                      });
                      // queryClient.invalidateQueries(["myclapfeed"]);
                    }}
                    clicked={false}
                    border="2px solid #651fff;"
                    // BackgroundColor={querycontent[1]}
                    // border={querycontent[0]}
                  >
                    {/* {querycontent[2]} */}
                    👏
                  </ClapWrapper>
                ) : (
                  <ClapWrapper
                    onClick={() => {
                      updateLikeMutate();
                      updateCountMutate();
                      SetisLike(!isLike);
                      handleClickMypage();
                      handleButtonClick();
                      Interection_click({
                        feedId: data.feedId,
                        memberId: memberId,
                      });
                      // queryClient.invalidateQueries(["myclapfeed"]);

                      // refetch();
                    }}
                    clicked={false}
                    BackgroundColor={"#EAED70"}
                    // BackgroundColor={querycontent[1]}
                    // border={querycontent[0]}
                    fontsize="14px"
                  >
                    {/* {querycontent[2]} */}
                    박수
                  </ClapWrapper>
                )}
              </BoxWrap>
              {lastPart === "upload" ? (
                <CustomAudio index={1}></CustomAudio>
              ) : (
                <CustomAudio
                  key={data.feedId}
                  //데이터 잘 들어감
                  music_data={data.recordRawData}
                  index={data.feedId}
                />
              )}

              <NickName>닉네임 : {data.ownerName}</NickName>
              <WordBottomWrap>
                {data.createdAt.split(" ")[0]}
                <IMGFlex>
                  <img
                    src="/play-arrow.png"
                    alt="Play"
                    width="17px"
                    height="17px"
                  />
                  {padWithZeros(data.viewCount, 3)}
                </IMGFlex>
                박수
                {/* {padWithZeros(data.interactionCount, 3)} */}
                {padWithZeros(countLike, 3)}
              </WordBottomWrap>
            </FeedBox>
          );
        })}
    </>
  );
};

export default FeedContainer;

const IMGFlex = styled.div`
  display: flex;
  width: 60px;
  justify-content: center;
`;
const ModifyFlex = styled.div`
  max-width: 200px;
  display: flex;
`;
const ModifyWrap = styled.div`
  margin-right: 16px;
  margin-top: 13px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;
const DeleteWrap = styled.div`
  margin-right: 16px;
  margin-top: 13px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;
const NickName = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 10px;
  margin-top: 10px;
`;
const FeedBox = styled.div`
  width: 327px;
  height: 188px;
  border-radius: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer, Edge */
  ::-webkit-scrollbar {
    width: 0.5em; /* Chrome, Safari, Opera */
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BoxWrap2 = styled.div`
  display: flex;
  flex-direction: column;
`;
//노래제목 / 빌런 사이 간격
const WordWrap = styled.div`
  max-width: 150px;
  display: block;
  font-size: 16px;
  margin: 10px 10px 2px 10px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 700;
`;
const VillanType = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin-left: 10px;
  margin-bottom: 6px;
`;
const WordBottomWrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  color: rgba(0, 0, 0, 0.6);
  margin-left: 10px;
  margin-top: 8px;
`;

const ClapWrapper = styled.div<{
  clicked: boolean;
  BackgroundColor?: any;
  border?: string;
  fontsize?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  /* border: 2px solid #651fff; */
  border: ${(props) => props.border || "none"};
  font-size: ${(props) => props.fontsize || "20px"};
  width: 60px;
  height: 34px;
  flex-shrink: 0;
  text-align: center;

  /* font-size: 20px; */
  margin: 10px;
  background-color: ${(props) =>
    props.BackgroundColor || "transparent"}; /* 기본값은 투명으로 설정 */
  &:active {
    cursor: pointer;
    background-color: #651fff;
  }

  @media (min-width: 768px) {
    &:hover {
      cursor: pointer;
      background-color: #651fff;
    }
  }
`;
