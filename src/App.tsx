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
      <nav className="nav sticky top-0 z-200 bg-cream/97 backdrop-blur-md border-b-[1.5px] border-pb h-16 flex items-center px-10 justify-between md:px-5">
        <button className="logo-btn font-display font-black text-[22px] tracking-widest cursor-pointer text-ch border-none bg-none uppercase" onClick={goHome}>
          MENTOR<span className="logo-br text-ch3">[</span><em className="not-italic">AI</em><span className="logo-br text-ch3">]</span>
        </button>
        <div className="nav-links flex gap-0 md:hidden">
          {NAV_MODES.map((m) => (
            <button
              key={m.id}
              className={`nav-link bg-none border-none text-mid font-display text-xs font-bold px-4.5 h-16 transition-all whitespace-nowrap tracking-widest uppercase cursor-pointer border-r-[1.5px] border-pb flex items-center first:border-l-[1.5px] hover:text-ch hover:bg-white ${
                screen === m.id ? "active bg-ch text-cream" : ""
              }`}
              onClick={() => setScreen(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="nav-right flex items-center gap-4">
          <div className="nav-status font-display text-[11px] font-bold tracking-[0.14em] uppercase text-mid flex items-center gap-1.75">
            <div className="nav-dot w-1.75 h-1.75 bg-acid rounded-full border-2 border-ch animate-pulse" />
            Free Beta
          </div>
          {screen === "landing" && (
            <button className="nav-cta bg-ch text-cream border-none font-display font-bold text-[13px] tracking-widest uppercase px-5.5 py-2.5 transition-colors cursor-pointer hover:bg-acid hover:text-ch" onClick={() => setScreen("career")}>
              Get My Plan →
            </button>
          )}
        </div>
      </nav>

      <main className="flex-1">
        {screen === "landing" && <Landing onCareer={() => setScreen("career")} onGuide={() => setScreen("guide")} onScheme={() => setScreen("schemes")} />}
        {screen === "career" && <Onboarding onDone={handleOnboard} onBack={goHome} />}
        {screen === "loading" && (
          <div className="loading-screen flex flex-col items-center justify-center p-25 px-10 text-center min-h-[70vh]">
            <div className="ls-ic-wrap relative w-16 h-16 mb-7">
              <div className="ls-spin absolute inset-0 border-2 border-pb border-t-ch rounded-full animate-spin" />
              <div className="ls-ic absolute inset-0 flex items-center justify-center text-[26px]">🧭</div>
            </div>
            <div className="ls-title font-display text-[36px] font-black uppercase tracking-[0.02em] mb-2 text-ch">Building your personal plan…</div>
            <div className="ls-sub text-mid text-[13px] leading-[1.8] max-w-90 mb-10">AI is analysing your goal, situation, and skills to build a plan that fits you — not a generic template. 30–60 seconds.</div>
          </div>
        )}
        {screen === "error" && (
          <div className="err-wrap text-center p-25 px-10 max-w-115 mx-auto">
            <div className="err-icon text-[44px] mb-4 block">⚠️</div>
            <div className="err-title font-display text-[40px] font-black uppercase tracking-[0.02em] mb-2.5">Something went wrong</div>
            <div className="err-msg text-mid text-sm leading-[1.8] mb-6.5">{errMsg}</div>
            <button className="btn-primary" onClick={() => setScreen("career")}>
              ← Try Again
            </button>
          </div>
        )}
        {screen === "dashboard" && planData && <Dashboard data={planData} profile={profile} onReset={() => setScreen("career")} />}
        {screen === "guide" && <Post12thGuide onBack={goHome} />}
        {screen === "schemes" && <SchemeFinder onBack={goHome} />}
      </main>

      <footer className="footer border-t-[1.5px] border-pb p-7 px-10 flex items-center justify-between flex-wrap gap-3.5 bg-cream md:px-4.5 md:py-5">
        <div className="footer-logo font-display font-black text-[18px] uppercase tracking-widest">
          MENTOR<span className="footer-br text-ch3">[</span>
          <em className="not-italic">AI</em>
          <span className="footer-br text-ch3">]</span>
        </div>
        <div className="footer-text text-[11px] text-pale tracking-widest uppercase">Built for students who had no mentor · India's free AI career mentor · Powered by Gemini AI</div>
        <div className="footer-links flex gap-5">
          <a href="#" className="text-[11px] text-pale no-underline transition-colors uppercase tracking-[0.08em] hover:text-ch">
            About
          </a>
          <a href="#" className="text-[11px] text-pale no-underline transition-colors uppercase tracking-[0.08em] hover:text-ch">
            Privacy
          </a>
          <a href="#" className="text-[11px] text-pale no-underline transition-colors uppercase tracking-[0.08em] hover:text-ch">
            Share
          </a>
        </div>
      </footer>
    </div>
  );
}
