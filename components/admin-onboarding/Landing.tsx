import Image from "next/image";

type Props = {
  onSetup: () => void;
  onSignIn: () => void;
};

export default function AdminOnboardingLanding({ onSetup, onSignIn }: Props) {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {/* Left — branding + CTAs */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="flex flex-col w-[300px]">
          <Image src="/Images/Noku Full logo.svg" alt="Noku" width={120} height={35} className="self-center" />
          <p className="mt-12 text-[17px] text-center text-[#474739] leading-[1.6]">
            Generator Management<br />for shared estates
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={onSetup}
              className="w-full py-[13px] rounded-[10px] text-sm font-semibold text-white"
              style={{
                backgroundColor: "#17a248",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Set up your estate
            </button>
            <button
              onClick={onSignIn}
              className="w-full py-[13px] rounded-[10px] text-sm font-semibold text-[#474739] bg-white border border-[#d1d5db]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* Right — generator image */}
      <div className="flex-1 p-3">
        <div className="relative h-full w-full rounded-[20px] overflow-hidden">
          <Image
            src="/Images/Generator img for admin side.avif"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
