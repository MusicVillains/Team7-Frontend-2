import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import { activenicknameform } from "@/recoil/recoilstore";
import { useRecoilState } from "recoil";
const RenameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useFormContext();


  const onSubmit = (data: any) => {
    // 제출 버튼을 클릭했을 때 실행되는 함수
    console.log(data); // 폼 데이터 출력
  };

  const [NicknameisEmpty, setNicknameIsEmpty] =
    useRecoilState(activenicknameform);
  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setNicknameIsEmpty(false) : setNicknameIsEmpty(true);
  };
  // /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/
  return (
    <RenameWrapper onSubmit={handleSubmit(onSubmit)}>
      <RenameInput
        {...register("rename", {
          required: "1글자 이상 적어주세요",
          pattern: {
            value: /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
            message:
              "닉네임에는 특수문자가 들어가면 안되고 첫글자가 숫자면 안됩니다",
          },
          
        })}
        placeholder="닉네임을 입력해주세요"
        onChange={(e) => onChangeNickName(e)}
      />

      {errors.rename && (
        <span className="error-message">{errors.rename.message as String}</span>
      )}
    </RenameWrapper>
  );
};

export default RenameForm;

const RenameWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RenameInput = styled.input`
  width: 327px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 8px;
  border: none;
`;
