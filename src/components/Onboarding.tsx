import { useState } from "react";
import { CAREER_MODES, EDU_OPTS, FIN_OPTS, SKILLS_LIST } from "../constants";

interface OnboardingProps {
  onDone: (profile: any) => void;
  onBack: () => void;
}

export function Onboarding({ onDone, onBack }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [prof, setProf] = useState({
    goal: "",
    mode: "fast",
    edu: "12th",
    skills: [] as string[],
    fin: "mid",
    time: "full",
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const toggleSkill = (s: string) => {
    setProf((p) => ({
      ...p,
      skills: p.skills.includes(s) ? p.skills.filter((x) => x !== s) : [...p.skills, s],
    }));
  };

  return (
    <div className="onboard-wrap min-h-[80vh] flex items-center justify-center p-10 md:p-5">
      <div className="onboard-card bg-white border-[1.5px] border-pb p-12 max-w-[600px] w-full shadow-[12px_12px_0_0_rgba(0,0,0,0.05)] md:p-7">
        <div className="ob-steps flex gap-2 mb-10">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`ob-step h-1 flex-1 rounded-full ${step >= s ? "bg-ch" : "bg-pb/30"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="ob-step-content">
            <div className="ob-label font-display text-xs font-bold uppercase tracking-[0.14em] text-ch3 mb-3">Goal Setting</div>
            <div className="ob-title font-display text-[32px] font-black uppercase tracking-[0.02em] leading-tight mb-6">What do you want to become?</div>
            <input
              type="text"
              className="input-main mb-8"
              placeholder="e.g. Full Stack Developer, Data Scientist..."
              value={prof.goal}
              onChange={(e) => setProf({ ...prof, goal: e.target.value })}
            />
            <div className="ob-label font-display text-xs font-bold uppercase tracking-[0.14em] text-ch3 mb-3">Pace</div>
            <div className="ob-grid grid grid-cols-2 gap-3 mb-10">
              {CAREER_MODES.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  className={`ob-opt p-4 border-[1.5px] text-left transition-all ${prof.mode === m.id ? "border-ch bg-ch text-cream" : "border-pb hover:border-ch"}`}
                  onClick={() => setProf({ ...prof, mode: m.id })}
                >
                  <div className="ob-opt-name font-display font-bold text-sm uppercase tracking-[0.05em] mb-1">{m.label}</div>
                  <div className={`ob-opt-desc text-[11px] ${prof.mode === m.id ? "text-cream/70" : "text-mid"}`}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="ob-step-content">
            <div className="ob-label font-display text-xs font-bold uppercase tracking-[0.14em] text-ch3 mb-3">Education</div>
            <div className="ob-title font-display text-[32px] font-black uppercase tracking-[0.02em] leading-tight mb-8">Current qualification?</div>
            <div className="ob-list flex flex-col gap-3 mb-10">
              {EDU_OPTS.map((o) => (
                <button
                  type="button"
                  key={o.id}
                  className={`ob-opt p-4 border-[1.5px] text-left transition-all flex items-center justify-between ${prof.edu === o.id ? "border-ch bg-ch text-cream" : "border-pb hover:border-ch"}`}
                  onClick={() => setProf({ ...prof, edu: o.id })}
                >
                  <span className="font-display font-bold text-sm uppercase tracking-[0.05em]">{o.label}</span>
                  {prof.edu === o.id && <span className="text-acid">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="ob-step-content">
            <div className="ob-label font-display text-xs font-bold uppercase tracking-[0.14em] text-ch3 mb-3">Skills</div>
            <div className="ob-title font-display text-[32px] font-black uppercase tracking-[0.02em] leading-tight mb-4">What do you already know?</div>
            <div className="ob-sub text-mid text-sm mb-8">Select skills you have some basic knowledge of.</div>
            <div className="ob-chips flex flex-wrap gap-2 mb-10">
              {SKILLS_LIST.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`ob-chip px-4 py-2 border-[1.5px] font-display text-[11px] font-bold uppercase tracking-[0.05em] transition-all ${
                    prof.skills.includes(s) ? "bg-ch text-cream border-ch" : "border-pb hover:border-ch"
                  }`}
                  onClick={() => toggleSkill(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="ob-step-content">
            <div className="ob-label font-display text-xs font-bold uppercase tracking-[0.14em] text-ch3 mb-3">Financials</div>
            <div className="ob-title font-display text-[32px] font-black uppercase tracking-[0.02em] leading-tight mb-8">Budget for learning?</div>
            <div className="ob-grid grid grid-cols-1 gap-3 mb-10">
              {FIN_OPTS.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  className={`ob-opt p-5 border-[1.5px] text-left transition-all ${prof.fin === f.id ? "border-ch bg-ch text-cream" : "border-pb hover:border-ch"}`}
                  onClick={() => setProf({ ...prof, fin: f.id })}
                >
                  <div className="ob-opt-name font-display font-bold text-sm uppercase tracking-[0.05em] mb-1">{f.label}</div>
                  <div className={`ob-opt-desc text-[11px] ${prof.fin === f.id ? "text-cream/70" : "text-mid"}`}>{f.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="ob-step-content">
            <div className="ob-label font-display text-xs font-bold uppercase tracking-[0.14em] text-ch3 mb-3">Commitment</div>
            <div className="ob-title font-display text-[32px] font-black uppercase tracking-[0.02em] leading-tight mb-8">Time you can give?</div>
            <div className="ob-grid grid grid-cols-2 gap-3 mb-10">
              {[
                { id: "full", label: "Full Time", desc: "8+ hours/day" },
                { id: "part", label: "Part Time", desc: "3-4 hours/day" },
                { id: "weekend", label: "Weekends", desc: "Intense study" },
                { id: "casual", label: "Casual", desc: "1-2 hours/day" },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  className={`ob-opt p-5 border-[1.5px] text-left transition-all ${prof.time === t.id ? "border-ch bg-ch text-cream" : "border-pb hover:border-ch"}`}
                  onClick={() => setProf({ ...prof, time: t.id })}
                >
                  <div className="ob-opt-name font-display font-bold text-sm uppercase tracking-[0.05em] mb-1">{t.label}</div>
                  <div className={`ob-opt-desc text-[11px] ${prof.time === t.id ? "text-cream/70" : "text-mid"}`}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="ob-nav flex justify-between pt-8 border-t-[1.5px] border-pb">
          <button type="button" className="btn-sec" onClick={step === 1 ? onBack : prev}>
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={step === 5 ? () => onDone(prof) : next}
            disabled={step === 1 && !prof.goal}
          >
            {step === 5 ? "Generate Plan →" : "Next Step →"}
          </button>
        </div>
      </div>
    </div>
  );
}