import { useEffect } from "react";

import Portal from "@/components/common/Modal/Portal";

import { useAppDispatch } from "@/api/hooks";
import { closeModal } from "@/api/modal/modalSlice";

import { modalBackdropStyle, getModalLayoutStyle } from "@/components/common/Modal/Modal.style";

interface modalType {
	children: React.ReactNode;
	isBottomSheet?: boolean;
	isFadeIn?: boolean;
	isBackdropClose?: boolean;
}

const Modal = ({ children, isBottomSheet, isFadeIn, isBackdropClose = true }: modalType) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<Portal elementId="modal">
			<div css={modalBackdropStyle} onClick={() => isBackdropClose && dispatch(closeModal())} />
			<div css={getModalLayoutStyle(isBottomSheet, isFadeIn)}>{children}</div>
		</Portal>
	);
};

export default Modal;
