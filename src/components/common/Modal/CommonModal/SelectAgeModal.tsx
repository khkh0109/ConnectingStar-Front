import { useState } from "react";

import CheckIcon from "@/assets/icon/ic-check.svg?react";

import FooterBtn from "@/components/common/FooterBtn/FooterBtn";
import Modal from "@/components/common/Modal/Modal";

import { useAppDispatch } from "@/api/hooks";
import { closeModal } from "@/api/modal/modalSlice";
import { editAge } from "@/api/user/userThunk";

import { ageRangeTypeList } from "@/constants/onboarding";

import { generateAge } from "@/utils/generateRangeType";

import {
	layoutStyle,
	getCheckBoxLabelStyle,
} from "@/components/common/Modal/CommonModal/SelectGenderModal/SelectGenderModal.style";

interface SelectAgeModalProps {
	prevAgeRange?: string;
	changeAgeRange?: (age: string) => void;
}

const SelectAgeModal = ({ prevAgeRange, changeAgeRange }: SelectAgeModalProps) => {
	const dispatch = useAppDispatch();

	const [checkItem, setCheckItem] = useState(prevAgeRange ?? "");

	const handleCheckClick = () => {
		changeAgeRange && changeAgeRange(checkItem);
		dispatch(closeModal());
	};

	const handleChangeAge = () => {
		dispatch(editAge(generateAge(checkItem)));
		dispatch(closeModal());
	};

	return (
		<Modal isBottomSheet>
			<div css={layoutStyle()}>
				<h1>나이대를 선택해 주세요</h1>
				<ul>
					{ageRangeTypeList.map((data) => (
						<li key={data.text}>
							<input type="checkbox" id={data.text} onChange={() => setCheckItem(data.text)} />
							<label htmlFor={data.text} css={getCheckBoxLabelStyle(checkItem === data.text)}>
								{checkItem === data.text && <CheckIcon />}
							</label>
							<p>{data.text}</p>
						</li>
					))}
				</ul>

				<FooterBtn
					text="확인"
					leftText="취소"
					handleBtnClick={prevAgeRange ? handleChangeAge : handleCheckClick}
					handleLeftBtnClick={() => dispatch(closeModal())}
					isPositionStatic
				/>
			</div>
		</Modal>
	);
};

export default SelectAgeModal;
