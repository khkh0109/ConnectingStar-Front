import { css } from "@emotion/react";

import Gnb from "@/components/common/Gnb/Gnb";
import StarButton from "@/components/StarPage/StarMain/StarButton";
import StarCardLink from "@/components/StarPage/StarMain/StarCardLink";
import StarInfo from "@/components/StarPage/StarMain/StarInfo";

import { theme } from "@/styles/theme";

export default function StarMainPage() {
	return (
		<div css={containerStyle}>
			<div className="container">
				<StarInfo starCount={114} starCardId={1} />
				<div className="wrapper">
					<StarButton />
					<StarCardLink />
				</div>
			</div>
			<div css={starMainPageGnbStyle}>
				<Gnb />
			</div>
		</div>
	);
}

const containerStyle = css`
	height: 100vh;
	background: linear-gradient(
		#0b0a0b 2%,
		#192771 38%,
		#3e53b3 63%,
		#4166b7 76%,
		#6b8acb 84%,
		#6d68d4 98%
	);

	.container {
		padding: 1.25rem 1.5rem;
	}

	.wrapper {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
	}
`;

const starMainPageGnbStyle = css`
	background-color: ${theme.color.font_black};
	opacity: 0.5;
`;
