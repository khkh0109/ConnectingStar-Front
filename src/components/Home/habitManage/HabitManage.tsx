import { useState } from "react";

import AlarmCheckModal from "@/components/Home/habitManage/AlarmCheckModal/AlarmCheckModal";

import { useAppDispatch, useAppSelector } from "@/api/hooks";
import { openModal } from "@/api/modal/modalSlice";

import { habitManageCondition } from "@/constants/homeConstants";
import { modalType } from "@/constants/modalConstants";

import {
	layoutStyle,
	alarmBoxStyle,
	quitButtonStyle,
} from "@/components/Home/habitManage/HabitManage.style";

interface Alarm {
	first: boolean;
	second: boolean;
	[key: string]: boolean;
}

function HabitManage() {
	const dispatch = useAppDispatch();
	const { modal } = useAppSelector((state) => state.modal);
	const [target, setTarget] = useState<string>("first");
	const [alarm, setAlarm] = useState<Alarm>({
		first: false,
		second: false,
	});

	const CheckAlarm = (target: string) => {
		setTarget(target);
		if (alarm[target]) {
			dispatch(openModal(modalType.ALARM_CHECK));
		} else {
			setAlarm({ ...alarm, [target]: true });
		}
	};

	return (
		<main css={layoutStyle}>
			<div className="condition">
				<span>정체성</span>
				<span>성장하는</span>
			</div>
			<div className="tab">
				<span>습관</span>
				{habitManageCondition.map((texts) => (
					<div className="condition">
						<span>{texts.TITLE}</span>
						<span>{texts.INPUT}</span>
					</div>
				))}
			</div>
			<div className="tab">
				<span>알람</span>
				<div css={alarmBoxStyle(alarm.first)}>
					<span>
						<h1>{`1차 알림`}</h1>
						<p>{`오후 7:50`}</p>
					</span>
					<div>{`곧 약속 시간이에요 :) 성장하는 세림님 화이팅!`}</div>
					<div className="toggle" onClick={() => CheckAlarm("first")}>
						<span />
					</div>
				</div>
				<div css={alarmBoxStyle(alarm.second)}>
					<span>
						<h1>{`2차 알림`}</h1>
						<p>{`오후 8:30`}</p>
					</span>
					<div>{`오늘의 실천 결과는 어땠나요? 기록을 남기고 별 받아 가세요!`}</div>
					<div className="toggle" onClick={() => CheckAlarm("second")}>
						<span />
					</div>
				</div>
			</div>
			<button css={quitButtonStyle}>습관 그만두기</button>
			{modal === modalType.ALARM_CHECK && (
				<AlarmCheckModal target={target} alarm={alarm} setAlarm={setAlarm} />
			)}
		</main>
	);
}

export default HabitManage;
