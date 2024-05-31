import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToastContainer from "@/components/common/Toast/ToastContainer/ToastContainer";

import { PATH } from "@/constants/path";

import ChartPage from "@/pages/ChartPage";
import ChattingPage from "@/pages/ChattingPage";
import CreateHabitPage from "@/pages/CreateHabitPage/CreateHabitPage";
import HabitDeletePage from "@/pages/HabitDeletePage";
import HabitDetailPage from "@/pages/HabitDetailPage";
import HabitGuidePage from "@/pages/HabitGuidePage/HabitGuidePage";
import HabitManagePage from "@/pages/HabitManagePage";
import HabitPage from "@/pages/HabitPage/HabitPage";
import KakaoLoginPage from "@/pages/KakaoLoginPage";
import MyHabitPage from "@/pages/MyHabitPage";
import MyInfoPage from "@/pages/MyInfoPage/MyInfoPage";
import MyPage from "@/pages/MyPage";
import MyStarTracePage from "@/pages/MyStarTracePage";
import NotificationSettingPage from "@/pages/NotificationSettingPage";
import OnboardingPage from "@/pages/OnboardingPage";
import PracticeRecordPage from "@/pages/PracticeRecordPage";
import RestRecordPage from "@/pages/RestRecordPage/RestRecordPage";
import StarCardDetailPage from "@/pages/StarCardDetailPage";
import StarCardPage from "@/pages/StarCardPage";
import StarMainPage from "@/pages/StarMainPage/StarMainPage";
import WithdrawalPage from "@/pages/WithdrawalPage";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HabitPage />} />
					<Route path="/:id" element={<HabitDetailPage />} />
					<Route path={PATH.STAR} element={<StarMainPage />} />
					<Route path="/star-card" element={<StarCardPage />} />
					<Route path="/star-card/:id" element={<StarCardDetailPage />} />
					<Route path="/chart" element={<ChartPage />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/myinfo" element={<MyInfoPage />} />
					<Route path="/star-trace" element={<MyStarTracePage />} />
					<Route path="/habit-history" element={<MyHabitPage />} />
					<Route path="/notification-setting" element={<NotificationSettingPage />} />
					<Route path="/withdrawal" element={<WithdrawalPage />} />
					<Route path={PATH.REST_RECORD} element={<RestRecordPage />} />
					<Route path="/chatting" element={<ChattingPage />} />
					<Route path="/habit-delete" element={<HabitDeletePage />} />
					<Route path="/onboarding" element={<OnboardingPage />} />
					<Route path="/oauth2/kakao" element={<KakaoLoginPage />} />
					<Route path={PATH.PRACTICE_RECORD(":runHabitId")} element={<PracticeRecordPage />} />
					<Route path={PATH.CREATE_HABIT} element={<CreateHabitPage />} />
					<Route path="habit-guide" element={<HabitGuidePage />} />
					<Route path={PATH.HABIT_MANAGE} element={<HabitManagePage />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	);
};

export default App;
