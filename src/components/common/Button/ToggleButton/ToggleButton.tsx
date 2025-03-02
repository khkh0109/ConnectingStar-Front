import Toggle from "@/components/common/Button/Toggle/Toggle";

import {
	getLayoutStyle,
	getFlexStyle,
} from "@/components/common/Button/ToggleButton/ToggleButton.style";

interface buttonType {
	title: string;
	subTitle: string;
	alarmTime?: string;
	hasToggle?: boolean;
	isToggle?: boolean;
	isDateText?: boolean;
	isTextVisible?: boolean;
	isPause?: boolean;
	onClick?: () => void;
	onTimeClick?: () => void;
	handleTogglePrev?: () => void;
}

const ToggleButton = ({
	title,
	subTitle,
	alarmTime,
	hasToggle,
	isToggle,
	isDateText,
	isTextVisible,
	isPause,
	onClick,
	onTimeClick,
	handleTogglePrev,
}: buttonType) => {
	return (
		<div css={getLayoutStyle(isDateText, hasToggle)}>
			<div css={getFlexStyle}>
				<h3>
					{title}
					{alarmTime && <span onClick={onTimeClick}>{alarmTime}</span>}
				</h3>

				{hasToggle && (
					<Toggle
						isToggle={isToggle}
						handleTogglePrev={handleTogglePrev}
						onClick={onClick}
						isPause={isPause}
					/>
				)}
			</div>
			{isTextVisible ? isToggle && <h4>{subTitle}</h4> : <h4>{subTitle}</h4>}
		</div>
	);
};

export default ToggleButton;
