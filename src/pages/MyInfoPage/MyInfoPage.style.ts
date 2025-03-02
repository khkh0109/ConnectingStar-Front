import { css } from "@emotion/react";

import { theme } from "@/styles/theme";

export const layoutStyle = css`
	width: 22.5rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const mainBoxStyle = css`
	display: flex;
	flex-direction: column;
	gap: 40px;
	align-items: center;
	width: 100%;
	padding: calc(4.75rem + env(safe-area-inset-top)) 1.5rem 0;
`;

export const characterBoxStyle = css`
	width: 19.5rem;
	height: 19.5rem;
	border-radius: 15px;
	background-color: #d9d9d9;
	position: relative;

	& > img {
		width: 100%;
		height: 100%;
		border-radius: 15px;
	}

	& > button {
		width: 7.75rem;
		height: 3.4375rem;
		border-radius: 15px;
		border: 2px solid ${theme.color.main_blue};
		background-color: #fff;
		position: absolute;
		left: 5.875rem;
		bottom: 1.125rem;

		& > p {
			color: ${theme.color.main_blue};
			${theme.font.button_big};
			line-height: 24px;
		}
	}
`;

export const buttonBoxStyle = css`
	display: flex;
	flex-direction: column;
	gap: 12px;

	& > h3 {
		color: ${theme.color.font_gray};
		${theme.font.body_b_bold};
	}
`;

export const dividerStyle = css`
	width: 22.5rem;
	height: 0.5rem;
	background-color: ${theme.color.line};
	margin-top: 2.5rem;
`;

export const withdrawalButtonStyle = css`
	height: calc(3.625rem + env(safe-area-inset-bottom));
	color: ${theme.color.error};
	padding-bottom: env(safe-area-inset-bottom);
`;
