import styled from "@emotion/styled";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { activewithdrawform } from "@/recoil/recoilstore";
const WithDrawForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isEmpty, setIsEmpty] = useRecoilState(activewithdrawform);
  const widthdrawTitle = watch("withdraw");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const WitdrawReason = [
    { value: 1, label: "앱이 복잡하고 어려워요." },
    { value: 2, label: "노래를 업로드하는 과정이 어려워요." },
    { value: 3, label: "재미있는 노래가 부족해요." },
    { value: 4, label: "SNS 기능이 부족해요." },
    { value: 5, label: "기타" },
  ];

  useEffect(() => {
    if (widthdrawTitle) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    console.log(watch("withdraw"));
  }, [WitdrawReason]);

  useEffect(() => {
    if (errors.withdrawTitle) {
      alert(errors.withdrawTitle.message);
    }
  }, [errors.withdrawTitle]);

  return (
    <MusicWrapper onSubmit={handleSubmit(onSubmit)}>
      {WitdrawReason.map(({ value, label }) => (
        <CustomRadio key={value}>
          <RadioInput
            id={`option${value}`}
            type="radio"
            {...register("withdraw", {
              required: "탈퇴 사유를 선택해주세요.",
            })}
            value={label}
          />
          <RadioLabel htmlFor={`option${value}`}>{label}</RadioLabel>
          {widthdrawTitle == `${label}` && <img src="/withdrawCheck.png" />}
        </CustomRadio>
      ))}
    </MusicWrapper>
  );
};

export default WithDrawForm;

const MusicWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CustomRadio = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 30px;
`;

const RadioInput = styled.input`
  display: none;
  width: 100%;
  &::after {
    content: "";
    margin-left: 550px;
  }
  &:checked + label {
    color: #651fff;
  }
`;

const RadioLabel = styled.label`
  max-width: 600px;
  padding-left: 30px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
