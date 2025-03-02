import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { socialLogIn } from "@/api/auth/authThunk";
import { axiosInstance } from "@/api/axiosInstance";
import { useAppDispatch } from "@/api/hooks";

import { ACCESS_TOKEN_KEY } from "@/constants/api";
import { PATH } from "@/constants/path";

import type { SocialType } from "@/types/user";

interface UseSocialLoginProps {
	socialType: SocialType;
}

export const useSocialLogin = ({ socialType }: UseSocialLoginProps) => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const authCode = searchParams.get("code");

	const handleLogin = async (authCode: string) => {
		try {
			const { data } = await dispatch(socialLogIn({ authCode, socialType })).unwrap();

			localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);

			axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

			navigate(PATH.ONBOARDING_USER_INFO);
		} catch (error) {
			console.log(error);
			navigate(PATH.SIGN_UP);
		}
	};

	useEffect(() => {
		if (authCode !== null) {
			handleLogin(authCode);
		}
	}, [authCode]);
};
