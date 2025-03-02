import { useEffect } from "react";

import Gnb from "@/components/common/Gnb/Gnb";
import CharacterUnlockModal from "@/components/StarPage/Modal/CharacterUnlockModal";
import SelectStarButton from "@/components/StarPage/StarMain/SelectStarButton";
import StarBackground from "@/components/StarPage/StarMain/StarBackground";
import StarButton from "@/components/StarPage/StarMain/StarButton";
import StarCardLink from "@/components/StarPage/StarMain/StarCardLink";
import StarCharacter from "@/components/StarPage/StarMain/StarCharacter";
import StarInfo from "@/components/StarPage/StarMain/StarInfo";

import { useAppDispatch, useAppSelector } from "@/api/hooks";
import { openModal, closeModal } from "@/api/modal/modalSlice";
import { getStarMain } from "@/api/star/starThunk";
import { addStar } from "@/api/user/userThunk";

import { modalType } from "@/constants/modalConstants";

import { useToast } from "@/hooks/useToast";

import { containerStyle, starMainPageGnbStyle } from "@/pages/StarMainPage/StarMainPage.style";

export default function StarMainPage() {
	const dispatch = useAppDispatch();
	const { starMain, addStarResult } = useAppSelector((state) => state.star);
	const { modal } = useAppSelector((state) => state.modal);
	const { createToast } = useToast();

	const handleStarButtonClick = () => {
		if (starMain.starCount <= 0) {
			return createToast("보유하고 있는 별이 없어요🥲");
		}

		dispatch(addStar());
	};

	useEffect(() => {
		dispatch(getStarMain());
	}, []);

	useEffect(() => {
		let timer: number;

		if (addStarResult.isRegistered) {
			timer = setTimeout(() => {
				dispatch(openModal(modalType.CHARACTER_UNLOCK));
			}, 3000);
		} else {
			dispatch(closeModal());
		}

		return () => clearTimeout(timer);
	}, [addStarResult.isRegistered]);

	return (
		<div css={containerStyle}>
			<StarBackground />
			<StarInfo
				isProgress={starMain.isProgress}
				starCount={starMain.starCount}
				starName={starMain.name}
				starCardId={starMain.constellationId}
			/>

			{starMain.isProgress ? (
				<StarCharacter svgData={starMain.svg} image={addStarResult.mainImage} />
			) : (
				<SelectStarButton />
			)}

			<div className="wrapper">
				{starMain.isProgress && (
					<StarButton onClick={handleStarButtonClick} disabled={addStarResult.isRegistered} />
				)}
				<StarCardLink />
			</div>

			<div css={starMainPageGnbStyle}>
				<Gnb />
			</div>

			{modal === modalType.CHARACTER_UNLOCK && (
				<CharacterUnlockModal
					id={starMain.constellationId}
					name={starMain.name}
					image={addStarResult.characterImage}
				/>
			)}
		</div>
	);
}
