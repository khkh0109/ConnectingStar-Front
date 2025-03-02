import { useState } from "react";

import { css } from "@emotion/react";

import FooterBtn from "@/components/common/FooterBtn/FooterBtn";
import Modal from "@/components/common/Modal/Modal";

import { useAppDispatch } from "@/api/hooks";
import { closeModal } from "@/api/modal/modalSlice";

import { theme } from "@/styles/theme";

import type { HabitRequestV2Type } from "@/types/habit";

interface BehaviorModalProps {
	behavior: string;
	prevValue?: number | null;
	prevUnit?: string;
	progress?: number;
	addprogress?: () => void;
	updateInputValue?: <Key extends keyof HabitRequestV2Type>(
		key: Key,
		value: HabitRequestV2Type[Key],
	) => void;
}

function BehaviorModal({
	behavior,
	prevValue,
	prevUnit,
	progress,
	addprogress,
	updateInputValue,
}: BehaviorModalProps) {
	const dispatch = useAppDispatch();

	const [value, setValue] = useState<number | null>(prevValue ?? null);
	const [unit, setUnit] = useState<string>(prevUnit ?? "");

	const confirmSelectedTag = () => {
		progress === 6 && addprogress && addprogress();

		if (value && unit) {
			if (updateInputValue) {
				updateInputValue("value", value);
				updateInputValue("unit", unit);
			}

			dispatch(closeModal());
		}
	};
	return (
		<Modal isBottomSheet>
			<div css={container}>
				<h1>얼마나 실천할지 입력해 주세요</h1>
				<div css={wrap}>
					<div>
						<h3>무엇을</h3>
						<div>{behavior}</div>
					</div>
					<div>
						<h3>얼마나</h3>
						<form>
							<input
								type="search"
								inputMode="decimal"
								placeholder="숫자 입력"
								autoFocus
								value={value || ""}
								onChange={(e) => setValue(Number(e.target.value))}
							/>
							<input
								type="search"
								placeholder="단위 입력 (예: 페이지)"
								value={unit}
								onChange={(e) => setUnit(e.target.value)}
							/>
						</form>
					</div>
				</div>
			</div>
			<FooterBtn
				text="확인"
				isSquare
				handleBtnClick={confirmSelectedTag}
				disabled={!unit || !value}
			/>
		</Modal>
	);
}

export default BehaviorModal;

const container = css`
	height: 19.375rem;
	border-radius: 15px 15px 0 0;
	padding: 1.125rem 1.5rem 3.438rem;
	${theme.font.body_a}
	color: ${theme.color.font_black};
	background-color: #fff;
	h1 {
		${theme.font.header}
		height: 1.813rem;
		margin-bottom: 1.688rem;
	}
`;

const wrap = css`
	display: flex;
	flex-direction: column;
	gap: 20px;
	h3 {
		${theme.font.head_c};
		color: ${theme.color.font_gray};
		margin-bottom: 0.75rem;
	}

	form {
		display: flex;
		gap: 6px;
		height: 3.438rem;

		& > input {
			all: unset;
			border-radius: 15px;
			background-color: ${theme.color.bg};
			color: ${theme.color.font_black};
			padding: 1rem;
			::placeholder {
				color: ${theme.color.button_deactivated};
			}

			::-webkit-search-decoration,
			::-webkit-search-cancel-button,
			::-webkit-search-results-button,
			::-webkit-search-results-decoration {
				display: none;
			}
		}

		& :first-of-type {
			width: 6.25rem;
		}

		& :last-of-type {
			width: 100%;
		}
	}
`;
