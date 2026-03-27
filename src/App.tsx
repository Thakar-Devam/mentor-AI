import { useState } from "react";
import { Landing } from "./components/Landing";
import { Onboarding } from "./components/Onboarding";
import { Dashboard } from "./components/Dashboard";
import { Post12thGuide } from "./components/Post12thGuide";
import { SchemeFinder } from "./components/SchemeFinder";
import { generateCareerPlan } from "./services/aiService";
import { CareerPlan } from "./types";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [profile, setProfile] = useState<any>(null);
  const [planData, setPlanData] = useState<CareerPlan | null>(null);
  const [errMsg, setErrMsg] = useState("");

  const goHome = () => {
    setScreen("landing");
    setPlanData(null);
    setProfile(null);
  };

  const handleOnboard = async (prof: any) => {
    setProfile(prof);
    setScreen("loading");
    setErrMsg("");
    try {
      const d = await generateCareerPlan(prof);
      setPlanData(d);
      setScreen("dashboard");
    } catch (e: any) {
      setErrMsg(e.message || "Something went wrong.");
      setScreen("error");
    }
  };

  const NAV_MODES = [
    { id: "career", label: "Career Mentor" },
    { id: "guide", label: "Post-12th Guide" },
    { id: "schemes", label: "Scheme Finder" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">

  <div className="flex items-center justify-between px-6 py-3 rounded-2xl 
  bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg">

    {/* LOGO */}
    <button
      onClick={goHome}
      className="font-display font-black text-[20px] tracking-widest uppercase text-ch"
    >
      MENTOR <span className="text-acid">AI</span>
    </button>

    {/* NAV LINKS */}
    <div className="hidden md:flex items-center gap-2 bg-white/60 backdrop-blur-md px-2 py-1 rounded-xl border border-white/30">

      {NAV_MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => setScreen(m.id)}
          className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-widest rounded-lg transition-all
          ${
            screen === m.id
              ? "bg-ch text-cream shadow"
              : "text-mid hover:text-ch hover:bg-white/70"
          }`}
        >
          {m.label}
        </button>
      ))}

    </div>

    {/* CONTACT BUTTON */}
    <button
      // onClick={() => setScreen("contact")}
      className="border px-5 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-widest transition-all bg-ch text-cream hover:bg-acid hover:text-ch"
    >
      Contact Us
    </button>

  </div>

</nav>
      <main className="flex-1 pt-[96px] md:pt-[80px]">
  <div className="space-y-10 md:space-y-8">

    {screen === "landing" && (
      <Landing
        onCareer={() => setScreen("career")}
        onGuide={() => setScreen("guide")}
        onScheme={() => setScreen("schemes")}
      />
    )}

    {screen === "career" && (
      <Onboarding
        onDone={handleOnboard}
        onBack={goHome}
      />
    )}

    {screen === "loading" && (
      <div className="loading-screen flex flex-col items-center justify-center px-10 py-24 text-center min-h-[70vh]">
        ...
      </div>
    )}

    {screen === "error" && (
      <div className="text-center px-10 py-24 max-w-[460px] mx-auto">
        ...
      </div>
    )}

    {screen === "dashboard" && planData && (
      <Dashboard
        data={planData}
        profile={profile}
        onReset={() => setScreen("career")}
      />
    )}

    {screen === "guide" && <Post12thGuide onBack={goHome} />}
    {screen === "schemes" && <SchemeFinder onBack={goHome} />}

  </div>
</main>

      <footer className="bg-ch text-cream border-t border-white/10 px-10 py-14 md:px-5">

  <div className="max-w-7xl mx-auto flex gap-16 flex-wrap">

    {/* LEFT - BRAND (BIG + DOMINANT) */}
    <div className="flex-1 min-w-[280px]">
      <h1 className="font-display text-[clamp(48px,6vw,88px)] leading-[0.85] font-black uppercase tracking-tight whitespace-nowrap">
        MENTOR <span className="text-acid">AI</span>
      </h1>

      <p className="text-white/40 text-sm mt-4 max-w-[320px] leading-relaxed">
        Built for students who had no mentor. India's free AI career mentor platform.
      </p>
    </div>

    {/* CENTER - FEATURES */}
    <div className="min-w-[220px] flex flex-col">
      <h3 className="font-display text-base font-bold uppercase tracking-[0.12em] mb-4">
        Features
      </h3>

      <div className="flex flex-col gap-2 text-sm text-white/70">
        <a href="#" className="hover:text-acid transition">AI Career Mentor</a>
        <a href="#" className="hover:text-acid transition">Post-12th Guide</a>
        <a href="#" className="hover:text-acid transition">Scheme Finder</a>
        <a href="#" className="hover:text-acid transition">Mock Interview</a>
        <a href="#" className="hover:text-acid transition">Peer Matching</a>
      </div>
    </div>

    {/* RIGHT - COMPANY LINKS */}
    <div className="min-w-[180px] flex flex-col">
      <h3 className="font-display text-base font-bold uppercase tracking-[0.12em] mb-4">
        Company
      </h3>

      <div className="flex flex-col gap-2 text-sm text-white/70">
        <a href="#" className="hover:text-acid transition">About</a>
        <a href="#" className="hover:text-acid transition">Privacy Policy</a>
        <a href="#" className="hover:text-acid transition">Contact</a>
        <a href="#" className="hover:text-acid transition">Share</a>
      </div>
    </div>

  </div>

  {/* BOTTOM */}
  <div className="mt-10 pt-5 border-t border-white/10 flex justify-between text-xs text-white/30">
    <span>© 2026 MentorAI</span>
    <span>Powered by Gemini AI</span>
  </div>

</footer>
    </div>
  );
}
