"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Landing from "@/components/admin-onboarding/Landing";
import SignIn from "@/components/admin-onboarding/SignIn";
import Step1 from "@/components/admin-onboarding/Step1";
import Step2 from "@/components/admin-onboarding/Step2";
import Step3 from "@/components/admin-onboarding/Step3";
import Step4 from "@/components/admin-onboarding/Step4";
import Step5 from "@/components/admin-onboarding/Step5";
import Step6 from "@/components/admin-onboarding/Step6";
import Step7 from "@/components/admin-onboarding/Step7";
import Step8 from "@/components/admin-onboarding/Step8";
import Confirmation from "@/components/admin-onboarding/Confirmation";
import { useEstateStore } from "@/store/estateStore";

type Screen = "landing" | "sign-in" | "step-1" | "step-2" | "step-3" | "step-4" | "step-5" | "step-6" | "step-7" | "step-8" | "confirmation";

export default function AdminOnboarding() {
  const [screen, setScreen] = useState<Screen>("landing");
  const { setStructure, setBilling, setResidents, structure } = useEstateStore();
  const router = useRouter();

  switch (screen) {
    case "sign-in":
      return <SignIn onSignUp={() => setScreen("step-1")} />;
    case "step-1":
      return <Step1 onNext={() => setScreen("step-2")} onBack={() => setScreen("landing")} />;
    case "step-2":
      return <Step2 onNext={() => setScreen("step-3")} onBack={() => setScreen("step-1")} />;
    case "step-3":
      return <Step3
        onNext={(s) => { setStructure(s); setScreen("step-4"); }}
        onBack={() => setScreen("step-2")}
      />;
    case "step-4":
      return <Step4 onNext={() => setScreen("step-5")} onBack={() => setScreen("step-3")} />;
    case "step-5":
      return <Step5 onNext={() => setScreen("step-6")} onBack={() => setScreen("step-4")} />;
    case "step-6":
      return <Step6
        onNext={(b) => { setBilling(b); setScreen("step-7"); }}
        onBack={() => setScreen("step-5")}
      />;
    case "step-7":
      return <Step7
        estateStructure={structure ?? { buildingNames: [], aptNaming: "Unit", aptCounts: [] }}
        onNext={(r) => { setResidents(r); setScreen("step-8"); }}
        onBack={() => setScreen("step-6")}
      />;
    case "step-8":
      return <Step8 onNext={() => setScreen("confirmation")} onBack={() => setScreen("step-7")} />;
    case "confirmation":
      return (
        <Confirmation
          onDashboard={() => router.push("/admin")}
          onEdit={(target) => {
            const map = {
              estate:    "step-2",
              generator: "step-4",
              billing:   "step-6",
              residents: "step-7",
              committee: "step-8",
            } as const;
            setScreen(map[target]);
          }}
        />
      );
    default:
      return (
        <Landing
          onSetup={() => setScreen("step-1")}
          onSignIn={() => setScreen("sign-in")}
        />
      );
  }
}
