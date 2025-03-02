import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToastContainer from "@/components/common/Toast/ToastContainer/ToastContainer";

import { PATH } from "@/constants/path";

import { useNetworkStatus } from "@/hooks/useNetworkStatus";

import { handleAllowNotification } from "@/utils/notification";

import ChartPage from "@/pages/ChartPage";
import CreateHabitPage from "@/pages/CreateHabitPage/CreateHabitPage";
import EditHabitPage from "@/pages/EditHabitPage/EditHabitPage";
import GoogleLoginPage from "@/pages/GoogleLoginPage";
import GuidePage from "@/pages/GuidePage/GuidePage";
import HabitDeletePage from "@/pages/HabitDeletePage";
import HabitGuidePage from "@/pages/HabitGuidePage/HabitGuidePage";
import HabitPage from "@/pages/HabitPage/HabitPage";
import HabitRecordPage from "@/pages/HabitRecordPage/HabitRecordPage";
import KakaoLoginPage from "@/pages/KakaoLoginPage";
import MyHabitPage from "@/pages/MyHabitPage";
import MyInfoPage from "@/pages/MyInfoPage/MyInfoPage";
import MyPage from "@/pages/MyPage";
import MyStarTracePage from "@/pages/MyStarTracePage";
import NotFoundPage from "@/pages/NotFoundPage";
import NotificationSettingPage from "@/pages/NotificationSettingPage";
import OnboardingHabitPage from "@/pages/OnboardingHabitPage";
import OnboardingUserInfoPage from "@/pages/OnboardingUserInfoPage";
import PracticeRecordPage from "@/pages/PracticeRecordPage";
import RestRecordPage from "@/pages/RestRecordPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import StarCardPage from "@/pages/StarCardPage";
import StarDetailPage from "@/pages/StarDetailPage";
import StarMainPage from "@/pages/StarMainPage/StarMainPage";
import WithdrawalPage from "@/pages/WithdrawalPage";

const App = () => {
	useNetworkStatus();

	useEffect(() => {
		const isRegistered = localStorage.getItem("fcm_registered");

		if (!isRegistered) {
			handleAllowNotification();
		} else {
			console.log("Device is already registered.");
		}
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={PATH.MAIN} element={<HabitPage />} />
					<Route path={PATH.HABIT_RECORD(":habitId")} element={<HabitRecordPage />} />
					<Route path={PATH.SIGN_UP} element={<SignUpPage />} />
					<Route path={PATH.GUIDE} element={<GuidePage />} />
					<Route path={PATH.STAR} element={<StarMainPage />} />
					<Route path={PATH.STAR_CARD} element={<StarCardPage />} />
					<Route path={`${PATH.STAR_CARD}/:id`} element={<StarDetailPage />} />
					<Route path={PATH.CHART} element={<ChartPage />} />
					<Route path={PATH.MY} element={<MyPage />} />
					<Route path={PATH.MY_INFO} element={<MyInfoPage />} />
					<Route path="/star-trace" element={<MyStarTracePage />} />
					<Route path="/habit-history" element={<MyHabitPage />} />
					<Route path="/notification-setting" element={<NotificationSettingPage />} />
					<Route path="/withdrawal" element={<WithdrawalPage />} />
					<Route
						path={PATH.REST_RECORD(":habitId", ":year", ":month", ":date")}
						element={<RestRecordPage />}
					/>
					<Route path={PATH.ONBOARDING_HABIT} element={<OnboardingHabitPage />} />
					<Route path={PATH.DELETE_HABIT(":habitId")} element={<HabitDeletePage />} />
					<Route path={PATH.ONBOARDING_USER_INFO} element={<OnboardingUserInfoPage />} />
					<Route path={PATH.LOGIN_GOOGLE} element={<GoogleLoginPage />} />
					<Route path={PATH.LOGIN_KAKAO} element={<KakaoLoginPage />} />
					<Route
						path={PATH.PRACTICE_RECORD(":habitId", ":year", ":month", ":date")}
						element={<PracticeRecordPage />}
					/>
					<Route path={PATH.CREATE_HABIT} element={<CreateHabitPage />} />
					<Route path="habit-guide" element={<HabitGuidePage />} />
					<Route path={PATH.EDIT_HABIT(":habitId")} element={<EditHabitPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	);
};

export default App;
