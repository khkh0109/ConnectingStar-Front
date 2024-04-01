import { useState } from "react";

import OauthSignUp from "@/components/Onboarding/OauthSignup/OauthSignUp";
import SignUp from "@/components/Onboarding/SignUp";

// import Splash from "@/components/Onboarding/Splash";

function OnboardingPage() {
	const [step, setStep] = useState<"Splash" | "SignUp" | "OauthSignUp">("Splash");
	console.log(step);

	return (
		<main>
			{/* {step === "Splash" && (
				<Splash
					onNext={() => {
						setStep("SignUp");
					}}
				/>
			)} */}
			{step === "SignUp" && (
				<SignUp
					onNext={() => {
						setStep("OauthSignUp");
					}}
				/>
			)}
			{step === "OauthSignUp" && (
				<OauthSignUp
					onNext={() => {
						setStep("SignUp");
					}}
				/>
			)}
			{/* <CreateAccount /> */}
			{/* <VisitTracker /> */}
		</main>
	);
}

export default OnboardingPage;
