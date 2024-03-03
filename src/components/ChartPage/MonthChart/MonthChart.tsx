import { useState, useCallback } from "react";

import { addMonths, subMonths } from "date-fns";

import Calendar from "@/components/ChartPage/MonthChart/Calendar";
import CalendarHeader from "@/components/ChartPage/MonthChart/CalendarHeader";

import { habitIconData } from "@/constants/myPageConstants";

import {
	layoutStyle,
	boxStyle,
	calendarBoxStyle,
	iconListBoxStyle,
} from "@/components/ChartPage/MonthChart/MonthChart.style";

const MonthChart = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [nowMonth] = useState(new Date());

	const handlePrevMonth = useCallback(() => {
		setCurrentMonth(subMonths(currentMonth, 1));
	}, [currentMonth]);

	const handleNextMonth = useCallback(() => {
		if (currentMonth >= nowMonth) {
			setCurrentMonth(nowMonth);
		} else {
			setCurrentMonth(addMonths(currentMonth, 1));
		}
	}, [currentMonth]);

	return (
		<div css={layoutStyle}>
			<div css={boxStyle}>
				<CalendarHeader
					currentMonth={currentMonth}
					onClickNextMonth={handleNextMonth}
					onClickPrevMonth={handlePrevMonth}
					disabledNextMonth={currentMonth >= nowMonth}
				/>

				<h2>
					<span>27일</span> 해냈어요!
				</h2>

				<div css={calendarBoxStyle}>
					<Calendar currentMonth={currentMonth} />

					<div className="divider" />

					{/* api 연결 후 아이콘 데이터 변경 예정 */}
					<div css={iconListBoxStyle}>
						{habitIconData.map((data) => (
							<div key={data.id} className="iconBox">
								{data.icon}
								<p>3</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MonthChart;
