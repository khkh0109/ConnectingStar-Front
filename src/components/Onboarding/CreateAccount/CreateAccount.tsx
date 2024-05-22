import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import ArrowDownIcon from "@/assets/icon/ic-arrow-down.svg?react";

import FooterBtn from "@/components/common/FooterBtn/FooterBtn";
import Header from "@/components/common/Header/Header";
import ChangeNicknameModal from "@/components/common/Modal/CommonModal/ChangeNicknameModal";
import SelectAgeModal from "@/components/common/Modal/CommonModal/SelectAgeModal";
import SelectGenderModal from "@/components/common/Modal/CommonModal/SelectGenderModal/SelectGenderModal";

import { useAppDispatch, useAppSelector } from "@/api/hooks";
import { openModal } from "@/api/modal/modalSlice";
import { updateBasicUserData } from "@/api/user/userSlice";
import { getIsOnboarding } from "@/api/user/userThunk";

import { modalType } from "@/constants/modalConstants";
import { ageRangeTypeList, genderTypeList } from "@/constants/onboarding";

import { theme } from "@/styles/theme";

function CreateAccount({ onNext }: { onNext: () => void }) {
	const dispatch = useAppDispatch();

	const { modal } = useAppSelector((state) => state.modal);
	const { isOnboarding } = useAppSelector((state) => state.user);

	const navigate = useNavigate();

	const [nickname, setNickname] = useState<string>("");
	const [genderType, setGenderType] = useState<string>("");
	const [ageRangeType, setAgeRangeType] = useState<string>("");

	const accountInputData = [
		{
			state: nickname,
			title: "닉네임",
			content: "닉네임을 입력해 주세요",
			modalType: modalType.CHANGE_NICKNAME,
		},
		{
			state: genderType,
			title: "성별",
			content: "성별을 선택해 주세요",
			modalType: modalType.SELECT_GENDERTYPE,
		},
		{
			state: ageRangeType,
			title: "나이대",
			content: "나이대를 선택해 주세요",
			modalType: modalType.SELECT_AGERANGETYPE,
		},
	];

	const confirmBasicUserData = () => {
		dispatch(
			updateBasicUserData({
				nickname,
				genderType: genderTypeList.find((item) => item.text === genderType)?.code || "",
				ageRangeType: ageRangeTypeList.find((item) => item.text === ageRangeType)?.code || "",
			}),
		);
		onNext();
	};

	useEffect(() => {
		dispatch(getIsOnboarding());
	}, []);

	useEffect(() => {
		isOnboarding && navigate("/");
	}, [isOnboarding]);

	return (
		<>
			<Header>
				<Header.PrevButton />
			</Header>

			<div css={container}>
				<h1>내 정보 입력을 완료해 주세요</h1>
				<ul css={wrap}>
					{accountInputData.map((item) => (
						<li key={item.title}>
							<h2>{item.title}</h2>
							<div
								style={{ color: item.state && "black" }}
								onClick={() => {
									dispatch(openModal(item.modalType));
								}}
							>
								{item.state === "" ? item.content : item.state}
								{item.title !== "닉네임" && <ArrowDownIcon />}
							</div>
						</li>
					))}
				</ul>
			</div>

			<FooterBtn
				text="다음"
				isTransparent
				disabled={!nickname || !genderType || !ageRangeType}
				handleBtnClick={confirmBasicUserData}
			/>

			{modal === modalType.CHANGE_NICKNAME && <ChangeNicknameModal changeNickname={setNickname} />}
			{modal === modalType.SELECT_GENDERTYPE && <SelectGenderModal changeGender={setGenderType} />}
			{modal === modalType.SELECT_AGERANGETYPE && <SelectAgeModal changeAge={setAgeRangeType} />}
		</>
	);
}

export default CreateAccount;

const container = css`
	width: 22.5rem;
	margin: 0 auto;
	padding: 4.75rem 1.5rem;

	& > h1 {
		${theme.font.head_a}
		margin-bottom: 2.5rem;
	}
`;

const wrap = css`
	& > li {
		margin-bottom: 1.25rem;
		& > h2 {
			${theme.font.head_c}
			color: ${theme.color.font_gray};
			margin-bottom: 0.75rem;
		}
		& > div {
			display: flex;
			justify-content: space-between;
			height: 3.438rem;
			background-color: ${theme.color.bg};
			color: ${theme.color.button_deactivated};
			align-items: center;
			${theme.font.body_a};
			border-radius: 15px;
			padding: 1rem;
		}
	}
`;
