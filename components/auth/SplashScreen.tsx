"use client";

import { useEffect } from "react";

type SplashScreenProps = {
  onDone: () => void;
};

export default function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-44px)]">
      <img src="/icons/Noku Logo md.svg" alt="Noku" className="w-[69px]" />
    </div>
  );
}
