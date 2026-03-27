import { useState } from "react";
import { generatePost12thGuide } from "../services/aiService";
import { Post12thGuideData } from "../types";
import { EDU_OPTS } from "../constants";

interface Post12thGuideProps {
  onBack: () => void;
}

export function Post12thGuide({ onBack }: Post12thGuideProps) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ stream: "", marks: "", city: "", budget: "", interests: "", dream: "" });
  const [result, setResult] = useState<Post12thGuideData | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [gtab, setGtab] = useState("rec");

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const submit = async () => {
    if (!form.stream || !form.marks) {
      setErr("Please fill in your stream and marks");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const d = await generatePost12thGuide(form);
      setResult(d);
      setStep("result");
    } catch (e: any) {
      setErr(e.message || "Error");
      setLoading(false);
    }
    setLoading(false);
  };

  const GTABS = [
    { id: "rec", label: "Recommendation" },
    { id: "exams", label: "Entrance Exams" },
    { id: "colleges", label: "Colleges" },
    { id: "plan", label: "90-Day Plan" },
  ];

  if (loading)
    return (
      <div className="loading-screen flex flex-col items-center justify-center p-[100px] px-10 text-center min-h-[70vh]">
        <div className="ls-ic-wrap relative w-16 h-16 mb-7">
          <div className="ls-spin absolute inset-0 border-2 border-pb border-t-ch rounded-full animate-spin" />
          <div className="ls-ic absolute inset-0 flex items-center justify-center text-[26px]">🎓</div>
        </div>
        <div className="ls-title font-display text-[36px] font-black uppercase tracking-[0.02em] mb-2 text-ch">Analysing your profile…</div>
        <div className="ls-sub text-mid text-[13px] leading-[1.8] max-w-[360px] mb-10">Finding the best streams, exams, colleges, and preparation plan for you. 20–30 seconds.</div>
      </div>
    );

  if (step === "form")
    return (
      <div className="guide-wrap max-w-[700px] mx-auto px-10 py-16 pb-[100px] md:px-5 md:py-11 md:pb-20">
        <div className="ob-back-row flex items-center gap-2.5 mb-11">
          <button className="ob-back bg-none border-none text-pale text-xs flex items-center gap-1.5 transition-colors uppercase tracking-[0.12em] font-display font-bold cursor-pointer hover:text-ch" onClick={onBack}>
            ← Home
          </button>
          <div className="ml-auto bg-citrus/10 text-citrus border border-citrus/25 text-[11px] font-bold px-2.5 py-1 rounded-[20px]">Post-12th Guide</div>
        </div>
        <div className="ob-eyebrow text-[11px] font-bold text-mid uppercase tracking-[0.22em] mb-3.5 flex items-center gap-2.5 font-display before:content-[''] before:w-6 before:h-[2px] before:bg-pb2">Post-12th College & Stream Guide</div>
        <h2 className="ob-title font-display text-[clamp(48px,10vw,88px)] font-black leading-[0.9] tracking-[-0.01em] uppercase mb-3 text-ch md:text-[clamp(44px,14vw,72px)]">
          Find your best<br />
          <span className="text-citrus">stream & college</span>
        </h2>
        <p className="ob-sub text-mid text-sm leading-[1.8] mb-8">Fill in your details — AI will recommend the right stream, entrance exams, colleges to target, and a 90-day preparation plan.</p>
        <div className="ob-card bg-white border-[1.5px] border-pb p-8">
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Your 12th Stream</label>
            <select className="inp" value={form.stream} onChange={(e) => upd("stream", e.target.value)}>
              <option value="">Select your stream</option>
              {["Science (PCM)", "Science (PCB)", "Commerce (with Maths)", "Commerce (without Maths)", "Arts/Humanities", "Vocational"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Expected/Actual 12th Marks (%)</label>
            <input className="inp" type="number" placeholder="e.g. 75" min={0} max={100} value={form.marks} onChange={(e) => upd("marks", e.target.value)} />
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Your City / State</label>
            <input className="inp" placeholder="e.g. Rajkot, Gujarat" value={form.city} onChange={(e) => upd("city", e.target.value)} />
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Family's Annual Budget for Education</label>
            <select className="inp" value={form.budget} onChange={(e) => upd("budget", e.target.value)}>
              <option value="">Select budget range</option>
              {["Under ₹50,000/year", "₹50,000 – ₹1 lakh/year", "₹1 – ₹3 lakh/year", "₹3 – ₹8 lakh/year", "Above ₹8 lakh/year"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Your Interests</label>
            <input className="inp" placeholder="e.g. computers, biology, business, art, sports..." value={form.interests} onChange={(e) => upd("interests", e.target.value)} />
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Dream Career / What You Want to Do</label>
            <input className="inp" placeholder="e.g. software engineer, doctor, IAS officer, entrepreneur..." value={form.dream} onChange={(e) => upd("dream", e.target.value)} />
            <span className="fg-hint text-[11px] text-pale">Even if unsure, write your best guess. AI will help you refine it.</span>
          </div>
          {err && <div className="ob-err text-poppy text-xs mt-2 flex items-center gap-1.25">⚠ {err}</div>}
          <div className="ob-btn-row flex gap-2.5 mt-6">
            <button className="btn-primary w-full text-[15px] p-3.5" onClick={submit}>
              Get My College & Exam Guide →
            </button>
          </div>
        </div>
      </div>
    );

  if (step === "result" && result)
    return (
      <div className="guide-result max-w-[960px] mx-auto px-10 py-8 pb-[100px] md:px-5 md:py-8 md:pb-20 animate-[fadeUp_0.45s_ease]">
        <div className="flex items-center gap-2.5 mb-[18px] flex-wrap">
          <button className="ob-back bg-none border-none text-pale text-xs flex items-center gap-1.5 transition-colors uppercase tracking-[0.12em] font-display font-bold cursor-pointer hover:text-ch" onClick={() => setStep("form")}>
            ← Edit Profile
          </button>
          <button className="ob-back bg-none border-none text-pale text-xs flex items-center gap-1.5 transition-colors uppercase tracking-[0.12em] font-display font-bold cursor-pointer hover:text-ch" onClick={onBack}>
            ← Home
          </button>
          <div className="ml-auto bg-citrus/10 text-citrus border border-citrus/25 text-[11px] font-bold px-2.5 py-1 rounded-[20px]">Post-12th Guide</div>
        </div>
        <div className="gr-header bg-white border-[1.5px] border-pb border-t-[5px] border-t-poppy p-6 px-7 mb-[2px]">
          <div className="gr-h font-display text-[clamp(36px,6vw,72px)] font-black uppercase tracking-[-0.01em] mb-1.5">Your Post-12th Guidance — {form.stream} · {form.marks}%</div>
          <div className="gr-sub font-display text-xs text-pale uppercase tracking-[0.14em] font-bold">
            {form.city} · Budget: {form.budget}
          </div>
        </div>
        <div className="gr-tabs flex bg-white border-[1.5px] border-pb mb-[2px] overflow-x-auto">
          {GTABS.map((t) => (
            <button key={t.id} className={`gr-tab p-3 px-5 font-display text-[11px] font-bold cursor-pointer text-pale border-none bg-none whitespace-nowrap transition-colors shrink-0 uppercase tracking-[0.12em] border-r-[1.5px] border-pb hover:text-ch hover:bg-cream ${gtab === t.id ? "active bg-poppy text-white" : ""}`} onClick={() => setGtab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        {gtab === "rec" && result.recommendation && (
          <div className="fade-up">
            <div className="guide-card bg-white border-[1.5px] border-pb p-5.5 mb-[2px] border-poppy/30 bg-gradient-to-br from-poppy/5 to-white">
              <div className="gc-head flex items-center gap-2.5 mb-4 pb-3 border-b-[1.5px] border-pb">
                <div className="gc-icon w-[34px] h-[34px] border-[1.5px] border-pb2 flex items-center justify-center text-base shrink-0 bg-cream">🎯</div>
                <div className="gc-title font-display text-[18px] font-black uppercase tracking-[0.06em]">AI Recommendation</div>
              </div>
              <div className="mb-4">
                <div className="font-display font-black text-[18px] text-citrus mb-1.5">{result.recommendation.bestStream}</div>
                <div className="text-sm text-mid leading-[1.7]">{result.recommendation.reason}</div>
              </div>
              {result.recommendation.alternativeFields?.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-mid uppercase tracking-[0.1em] mb-2">Also consider</div>
                  <div className="flex gap-2 flex-wrap">
                    {result.recommendation.alternativeFields.map((f, i) => (
                      <span key={i} className="bg-cream border border-pb2 rounded-[20px] px-3 py-1.25 text-xs text-mid">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {result.importantFacts?.length > 0 && (
              <div className="guide-card bg-white border-[1.5px] border-pb p-5.5 mb-[2px]">
                <div className="gc-head flex items-center gap-2.5 mb-4 pb-3 border-b-[1.5px] border-pb">
                  <div className="gc-icon w-[34px] h-[34px] border-[1.5px] border-pb2 flex items-center justify-center text-base shrink-0 bg-cream">💡</div>
                  <div className="gc-title font-display text-[18px] font-black uppercase tracking-[0.06em]">Things Most Students Miss</div>
                </div>
                {result.importantFacts.map((f, i) => (
                  <div key={i} className="flex gap-2.5 mb-2 text-[13px] text-mid leading-[1.6]">
                    <span className="text-citrus font-bold shrink-0">{i + 1}.</span>
                    {f}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {gtab === "exams" && (
          <div className="fade-up">
            {result.exams?.map((ex, i) => (
              <div key={i} className="exam-card bg-cream border-[1.5px] border-pb border-l-[3px] border-l-poppy p-[15px] px-[17px] mb-[2px] flex items-start gap-3 transition-colors hover:bg-white">
                <div className="exam-num font-display text-[22px] font-black text-poppy w-7 shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="exam-name font-display text-base font-black uppercase tracking-[0.04em] mb-1">
                    {ex.name} — {ex.fullForm}
                  </div>
                  <div className="exam-meta text-xs text-mid leading-[1.7]">
                    <span className="text-citrus font-semibold">{ex.difficulty}</span> · {ex.dates} · Eligibility: {ex.eligibility}
                    <br />
                    <span className="text-ch">Leads to: </span>
                    {ex.relevantFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {gtab === "colleges" && (
          <div className="fade-up">
            <div className="bg-white border border-pb2 rounded-lg p-3.5 px-[18px] mb-3.5 text-[13px] text-mid leading-[1.65]">
              Based on your marks of <span className="text-ch font-bold">{form.marks}%</span>, budget of <span className="text-ch font-bold">{form.budget}</span>, and location in <span className="text-ch font-bold">{form.city}</span>:
            </div>
            {result.colleges?.map((c, i) => (
              <div key={i} className="college-card bg-cream border-[1.5px] border-pb p-3 px-4 mb-[2px] flex items-center gap-2.5 flex-wrap transition-colors hover:bg-white">
                <div className="college-name font-display text-base font-black uppercase tracking-[0.04em] flex-1">{c.name}</div>
                <div className="college-cut font-display text-sm font-black text-poppy border-[1.5px] border-poppy/30 px-2 py-[3px] whitespace-nowrap uppercase tracking-[0.1em]">Cutoff: {c.cutoff}</div>
                <div className="college-type font-display text-[11px] text-pale uppercase tracking-[0.1em] font-bold w-full">
                  {c.type} · {c.location} · Fees: {c.fees}
                </div>
                {c.rankingNote && <div className="text-xs text-mid w-full mt-0.5">{c.rankingNote}</div>}
              </div>
            ))}
          </div>
        )}
        {gtab === "plan" && (
          <div className="fade-up">
            <div className="bg-white border border-pb2 rounded-lg p-3.5 px-[18px] mb-3.5">
              <div className="font-display font-black text-base mb-1">Your 90-Day Preparation Plan</div>
              <div className="text-[13px] text-mid">Follow this timeline from now until your exam/application deadlines.</div>
            </div>
            {result.prepPlan?.map((p, i) => (
              <div key={i} className="plan-step flex gap-3 items-start mb-[2px] p-4 px-[18px] bg-cream border-[1.5px] border-pb transition-colors hover:bg-white">
                <div className="ps-week font-display text-[11px] font-bold text-poppy border-[1.5px] border-poppy/30 px-2.5 py-1 whitespace-nowrap shrink-0 mt-0.5 uppercase tracking-[0.1em]">{p.period}</div>
                <div>
                  <div className="ps-title font-display text-base font-black uppercase tracking-[0.04em] mb-0.5">{p.title}</div>
                  <div className="ps-desc text-xs text-mid leading-[1.7]">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  return null;
}
