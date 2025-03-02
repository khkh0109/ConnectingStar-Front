import { useState, useEffect, useRef } from "react";

import CheckIcon from "@/assets/icon/ic-check-blue.svg?react";

import FooterBtn from "@/components/common/FooterBtn/FooterBtn";
import Header from "@/components/common/Header/Header";
import {
	container,
	contents,
	locationListStyle,
	locationInputStyle,
	scrollable,
} from "@/components/common/Modal/CommonModal/LocationModal/LocationModalStyle";

import { useAppDispatch } from "@/api/hooks";
import { closeModal } from "@/api/modal/modalSlice";

import { locationModalData } from "@/constants/locationModalConstants";

import type { HabitRequestV2Type } from "@/types/habit";

interface LocationModalType {
	progress?: number;
	addprogress?: () => void;
	prevValue: string;
	updateInputValue?: <Key extends keyof HabitRequestV2Type>(
		key: Key,
		value: HabitRequestV2Type[Key],
	) => void;
}

const INITIAL_MODAL_HEIGHT = "100dvh";
const INITIAL_MODAL_BOTTOM = "0";

function LocationModal({ progress, addprogress, prevValue, updateInputValue }: LocationModalType) {
	const dispatch = useAppDispatch();

	const [place, setPlace] = useState(prevValue ?? "");
	const [isInputFocus, setIsInputFocus] = useState(false);

	const modalRef = useRef<HTMLDivElement | null>(null);
	const modalContentsRef = useRef<HTMLDivElement | null>(null);

	const confirmSelectedTag = () => {
		progress === 5 && addprogress && addprogress();

		updateInputValue && updateInputValue("place", place);

		dispatch(closeModal());
	};

	useEffect(() => {
		document.documentElement.style.overflow = "hidden"; // NOTE: iOS PWA 환경에서 필요
		document.body.style.overflow = "hidden";

		const updateModalPosition = () => {
			const visualViewport = window.visualViewport;

			if (!visualViewport || !modalRef.current || !modalContentsRef.current) return;

			const isKeyboardOpen = visualViewport.height < window.innerHeight;

			if (isKeyboardOpen) {
				// NOTE: iOS 사파리에서 키보드 등장 시 innerHeight 값이 바뀌어서 bottom 위치가 제대로 계산 되지 않는 문제 대응
				const isInnerHeightDifferent = window.innerHeight !== document.documentElement.clientHeight;
				const calculatedBottom =
					window.innerHeight - visualViewport.height - visualViewport.offsetTop;
				const modalBottom = isInnerHeightDifferent
					? window.innerHeight - visualViewport.height
					: calculatedBottom;

				// NOTE: state로 관리 시 안드로이드 크롬에서 가상 키보드 등장할 때 스타일이 즉각 반영되지 않아 버벅대는 문제 대응
				modalRef.current.style.height = `${visualViewport.height}px`;
				modalRef.current.style.bottom = `${modalBottom}px`;

				const scrollHeight = modalContentsRef.current.scrollHeight;
				const scrollTop = scrollHeight - visualViewport.height;
				modalContentsRef.current?.scrollTo(0, scrollTop);
			}
		};

		window.visualViewport?.addEventListener("resize", updateModalPosition);
		window.visualViewport?.addEventListener("scroll", updateModalPosition);

		return () => {
			document.documentElement.style.overflow = "auto";
			document.body.style.overflow = "auto";
			window.visualViewport?.removeEventListener("resize", updateModalPosition);
			window.visualViewport?.removeEventListener("scroll", updateModalPosition);
		};
	}, []);

	return (
		<div css={container} ref={modalRef}>
			<Header>
				<Header.CloseButton onClick={() => dispatch(closeModal())} />
			</Header>

			<div css={contents} ref={modalContentsRef}>
				<h1>장소를 입력해 주세요</h1>
				<ul css={locationListStyle}>
					<p>예시</p>
					{locationModalData.map((example) => (
						<li key={example}>
							<CheckIcon />
							{example}
						</li>
					))}
				</ul>
				<input
					css={locationInputStyle}
					type="search"
					placeholder="직접입력"
					maxLength={10}
					value={place}
					onFocus={() => setIsInputFocus(true)}
					onBlur={() => {
						setIsInputFocus(false);
						// NOTE: iOS 사파리에서 주소창이 하단에 위치하는 경우 resize 이벤트가 지연되어 UI 업데이트가 느린 문제 해결을 위해 Ref를 사용하여 스타일 즉각 업데이트
						if (modalRef.current) {
							modalRef.current.style.height = INITIAL_MODAL_HEIGHT;
							modalRef.current.style.bottom = INITIAL_MODAL_BOTTOM;
						}
					}}
					onChange={(e) => setPlace(e.target.value)}
				/>
			</div>
			<div css={scrollable}></div>

			<FooterBtn
				text="확인"
				isSquare={isInputFocus}
				disabled={!place}
				handleBtnClick={() => {
					isInputFocus ? setIsInputFocus(false) : confirmSelectedTag();
				}}
			/>
		</div>
	);
}

export default LocationModal;
