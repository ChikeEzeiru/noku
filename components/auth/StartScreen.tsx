"use client";

type StartScreenProps = {
  onRegister: () => void;
};

export default function StartScreen({ onRegister }: StartScreenProps) {
  return (
    <div className="min-h-[calc(100vh-44px)] relative flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(to bottom, white 25%, #e8e8e3 100%)" }}>

      {/* Generator photo */}
      <div className="absolute left-0 right-0 bottom-0 h-[60%] opacity-80">
        <img
          src="https://www.figma.com/api/mcp/asset/2a72753a-a35c-4034-8568-dcff47d2e904"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)" }} />
      </div>

      {/* Top content */}
      <div className="relative z-10 px-6 pt-6 flex flex-col gap-3">
        <img src="/icons/Noku Logo md.svg" alt="Noku" className="w-[64px]" />
        <div className="flex flex-col gap-3 mt-2">
          <p className="text-[36px] font-semibold text-noku-heading leading-[44px] tracking-[-1.08px]">
            Estate Power Generation
          </p>
          <p className="text-base text-[#5b5b4b] leading-6">
            Helping you track and monitor generated power consumption
          </p>
        </div>
      </div>

      {/* Register button */}
      <div className="relative z-10 mt-auto px-6 pb-10 flex justify-end">
        <button
          onClick={onRegister}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-base font-semibold"
          style={{
            backgroundColor: "#17a248",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 -2px 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          Register
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
