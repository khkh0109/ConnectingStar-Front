import { css } from "@emotion/react";

import { theme } from "@/styles/theme";

export const layoutStyle = css`
	background-color: ${theme.color.bg};
	width: 100%;
`;

export const innerBoxStyle = css`
	width: 22.5rem;
	padding: 2.5rem 1.5rem calc(6rem + env(safe-area-inset-bottom));
	margin: 0 auto;
`;

export const chartSectionStyle = css`
	margin-top: 2.5rem;

	& > h1 {
		${theme.font.head_a}

		& > span {
			color: ${theme.color.main_blue};
		}
	}
`;

export const chartBoxStyle = css`
	margin-top: 1.25rem;
	padding: 1.25rem 1rem;
	border: 2px solid ${theme.color.line};
	border-radius: 15px;
	background-color: #fff;
`;

export const dividerStyle = css`
	border-bottom: 1px solid ${theme.color.line};
	margin-top: -0.875rem;
`;

export const chartTextStyle = css`
	display: flex;
	justify-content: space-between;
	${theme.font.body_xs};
	color: ${theme.color.font_black};
`;

export const infoBoxStyle = css`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 1.25rem;

	& .divider {
		width: 1.25rem;
		border-bottom: 1px dashed #ffbb00;
	}

	& > span {
		${theme.font.body_b};
		color: ${theme.color.font_black};
	}
`;

export const headerLayoutStyle = css`
	display: flex;
	align-items: center;
	gap: 16px;

	& > svg {
		width: 20px;
		height: 20px;
	}
`;

export const headerBoxStyle = css`
	display: flex;
	align-items: center;
	text-align: center;

	& > h1 {
		${theme.font.head_a}
		width: 56px;
	}

	& > p {
		${theme.font.body_xs}
		width: 46px;
		text-align: center;
	}
`;

export const dateBoxStyle = css`
	display: flex;
	flex-wrap: wrap;
`;

export const dayStyle = (inMonthDay?: boolean, isWeek?: boolean, color?: string) => {
	return css`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		color: ${inMonthDay ? theme.color.font_black : theme.color.button_deactivated};
		${isWeek ? theme.font.body_b : theme.font.body_b_bold}

		& > p {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 1.75rem;
			height: 1.75rem;
			border-radius: 50%;
			background-color: ${color};
		}
	`;
};

export const calendarSectionStyle = css`
	display: flex;
	flex-direction: column;
	gap: 20px;

	& > h2 {
		${theme.font.head_a}

		& > span {
			color: ${theme.color.main_blue};
		}
	}
`;

export const calendarBoxStyle = css`
	background-color: #fff;
	border-radius: 15px;
	border: 2px solid ${theme.color.line};
	padding: 1rem 0.875rem;

	& .divider {
		width: 100%;
		border-bottom: 1px solid ${theme.color.line};
		margin: 1rem 0;
	}
`;

export const iconListBoxStyle = css`
	display: flex;
	align-items: center;
	gap: 30px;

	& .iconBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;

		& > p {
			color: ${theme.color.font_black};
			${theme.font.header};
		}
	}
`;
