import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import FooterBtn from "@/components/common/FooterBtn/FooterBtn";
import Modal from "@/components/common/Modal/Modal";

import { logOut } from "@/api/auth/authThunk";
import { useAppDispatch } from "@/api/hooks";
import { closeModal } from "@/api/modal/modalSlice";

import { ACCESS_TOKEN_KEY } from "@/constants/api";
import { PATH } from "@/constants/path";

import { useToast } from "@/hooks/useToast";

import { theme } from "@/styles/theme";

const LogoutModal = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const { createToast } = useToast();

	const handleLogout = async () => {
		try {
			await dispatch(logOut()).unwrap();
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			dispatch(closeModal());
			createToast("로그아웃! 나중에 다시 만나요 😊");
			navigate(PATH.SIGN_UP);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal>
			<div css={layoutStyle}>
				<h1>로그아웃 할까요?</h1>

				<FooterBtn
					text="로그아웃"
					leftText="취소"
					handleLeftBtnClick={() => dispatch(closeModal())}
					handleBtnClick={handleLogout}
					isPositionStatic
				/>
			</div>
		</Modal>
	);
};

export default LogoutModal;

export const layoutStyle = css`
	width: 18rem;
	height: 9.625rem;
	padding: 1rem;
	border-radius: 15px;
	background-color: #fff;
	color: ${theme.color.font_black};
	display: flex;
	flex-direction: column;
	gap: 40px;

	& > h1 {
		font-size: 1.125rem;
		font-weight: 700;
	}
`;
