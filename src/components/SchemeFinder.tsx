import { useState } from "react";
import { findSchemes } from "../services/aiService";
import { SchemeFinderData, Scheme } from "../types";
import { EDU_OPTS } from "../constants";

interface SchemeFinderProps {
  onBack: () => void;
}

export function SchemeFinder({ onBack }: SchemeFinderProps) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ category: "", state: "", age: "", education: "", income: "", goal: "" });
  const [result, setResult] = useState<SchemeFinderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const submit = async () => {
    if (!form.category || !form.state) {
      setErr("Please fill in your category and state");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const d = await findSchemes(form);
      setResult(d);
      setStep("result");
    } catch (e: any) {
      setErr(e.message || "Error");
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="loading-screen flex flex-col items-center justify-center p-[100px] px-10 text-center min-h-[70vh]">
        <div className="ls-ic-wrap relative w-16 h-16 mb-7">
          <div className="ls-spin absolute inset-0 border-2 border-pb border-t-ch rounded-full animate-spin" />
          <div className="ls-ic absolute inset-0 flex items-center justify-center text-[26px]">🏛️</div>
        </div>
        <div className="ls-title font-display text-[36px] font-black uppercase tracking-[0.02em] mb-2 text-ch">Finding your schemes…</div>
        <div className="ls-sub text-mid text-[13px] leading-[1.8] max-w-[360px] mb-10">Searching central and state government databases for schemes you qualify for. 20–30 seconds.</div>
      </div>
    );

  if (step === "form")
    return (
      <div className="scheme-wrap max-w-[700px] mx-auto px-10 py-16 pb-[100px] md:px-5 md:py-11 md:pb-20">
        <div className="ob-back-row flex items-center gap-2.5 mb-11">
          <button className="ob-back bg-none border-none text-pale text-xs flex items-center gap-1.5 transition-colors uppercase tracking-[0.12em] font-display font-bold cursor-pointer hover:text-ch" onClick={onBack}>
            ← Home
          </button>
          <div className="ml-auto bg-mint/10 text-mint border border-mint/25 text-[11px] font-bold px-2.5 py-1 rounded-[20px]">Scheme Finder</div>
        </div>
        <div className="ob-eyebrow text-[11px] font-bold text-mid uppercase tracking-[0.22em] mb-3.5 flex items-center gap-2.5 font-display before:content-[''] before:w-6 before:h-[2px] before:bg-pb2">Government Scheme Finder</div>
        <h2 className="ob-title font-display text-[clamp(48px,10vw,88px)] font-black leading-[0.9] tracking-[-0.01em] uppercase mb-3 text-ch md:text-[clamp(44px,14vw,72px)]">
          Discover <span className="text-mint">free money & support</span>
          <br />
          you didn't know existed
        </h2>
        <p className="ob-sub text-mid text-sm leading-[1.8] mb-8">India has 1,000+ schemes — scholarships, grants, loans, skill training. 90% of eligible students never apply because they don't know. Let's change that.</p>
        <div className="ob-card bg-white border-[1.5px] border-pb p-8">
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Your Social Category</label>
            <select className="inp" value={form.category} onChange={(e) => upd("category", e.target.value)}>
              <option value="">Select category</option>
              {["General", "OBC", "SC", "ST", "EWS (Economically Weaker Section)", "Minority", "Person with Disability", "Woman"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">State</label>
            <select className="inp" value={form.state} onChange={(e) => upd("state", e.target.value)}>
              <option value="">Select your state</option>
              {[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
                "Delhi",
                "J&K",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Age</label>
            <input className="inp" type="number" placeholder="e.g. 18" value={form.age} onChange={(e) => upd("age", e.target.value)} />
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Current Education Level</label>
            <select className="inp" value={form.education} onChange={(e) => upd("education", e.target.value)}>
              <option value="">Select level</option>
              {EDU_OPTS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Annual Family Income</label>
            <select className="inp" value={form.income} onChange={(e) => upd("income", e.target.value)}>
              <option value="">Select income range</option>
              {["Below ₹1 lakh", "₹1–2.5 lakh", "₹2.5–5 lakh", "₹5–8 lakh", "Above ₹8 lakh"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="fg flex flex-col gap-[7px] mb-[18px]">
            <label className="fg-label font-display text-[11px] font-bold text-mid uppercase tracking-[0.14em]">Your Goal / What You Want to Do</label>
            <input className="inp" placeholder="e.g. study engineering, start a business, learn a skill..." value={form.goal} onChange={(e) => upd("goal", e.target.value)} />
          </div>
          {err && <div className="ob-err text-poppy text-xs mt-2 flex items-center gap-1.25">⚠ {err}</div>}
          <div className="ob-btn-row flex gap-2.5 mt-6">
            <button className="btn-primary w-full text-[15px] p-3.5 bg-mint border-mint text-ch hover:bg-ch hover:text-mint" onClick={submit}>
              Find My Government Schemes →
            </button>
          </div>
        </div>
      </div>
    );

  if (step === "result" && result)
    return (
      <div className="scheme-result max-w-[960px] mx-auto px-10 py-8 pb-[100px] md:px-5 md:py-8 md:pb-20 animate-[fadeUp_0.45s_ease]">
        <div className="flex items-center gap-2.5 mb-[18px] flex-wrap">
          <button className="ob-back bg-none border-none text-pale text-xs flex items-center gap-1.5 transition-colors uppercase tracking-[0.12em] font-display font-bold cursor-pointer hover:text-ch" onClick={() => setStep("form")}>
            ← Edit Profile
          </button>
          <button className="ob-back bg-none border-none text-pale text-xs flex items-center gap-1.5 transition-colors uppercase tracking-[0.12em] font-display font-bold cursor-pointer hover:text-ch" onClick={onBack}>
            ← Home
          </button>
        </div>
        <div className="sr-header bg-white border-[1.5px] border-pb border-t-[5px] border-t-royal p-5.5 px-6.5 mb-[2px]">
          <div className="sr-h font-display text-[clamp(28px,5vw,54px)] font-black uppercase tracking-[-0.01em] mb-1">Found {result.totalFound || result.schemes?.length || 0} schemes for you</div>
          <div className="sr-sub font-display text-xs text-pale uppercase tracking-[0.14em] font-bold">
            {form.category} · {form.state} · {form.education}
          </div>
        </div>
        {result.importantNote && <div className="bg-citrus/10 border border-citrus/20 rounded-lg p-3 px-4 text-[13px] text-mid leading-[1.65] mb-4">⚠ {result.importantNote}</div>}
        {result.schemes?.map((s, i) => (
          <div key={i} className="scheme-card bg-white border-[1.5px] border-pb border-l-[3px] border-l-transparent p-5.5 mb-[2px] cursor-pointer transition-all hover:bg-cream hover:border-l-royal" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="scheme-top flex items-start gap-3.5 mb-2.5">
              <span className="scheme-type-icon text-2xl shrink-0 mt-0.5">{s.icon || "🎓"}</span>
              <div className="flex-1">
                <div className="scheme-name font-display text-[19px] font-black uppercase tracking-[0.04em] mb-0.5">{s.name}</div>
                <div className="scheme-org font-display text-[11px] text-pale uppercase tracking-[0.1em] font-bold">
                  {s.organisation} · {s.type}
                </div>
              </div>
              <div className="scheme-benefit font-display text-[13px] font-black text-royal border-[1.5px] border-royal/30 px-[11px] py-1 ml-auto whitespace-nowrap shrink-0 uppercase tracking-[0.1em]">{s.benefit}</div>
            </div>
            <div className="scheme-desc text-[13px] text-mid leading-[1.78] mb-3.5">{s.desc}</div>
            <div className="scheme-tags flex flex-wrap gap-1.5 mb-3.5">
              {s.tags?.map((t, j) => (
                <span key={j} className="scheme-tag font-display text-[10px] font-bold text-mid border-[1.5px] border-pb2 px-2.5 py-[3px] uppercase tracking-[0.1em]">
                  {t}
                </span>
              ))}
            </div>
            {expanded === i && (
              <>
                <div className="scheme-steps bg-royal/5 border-l-[3px] border-l-royal p-3 px-4 mb-2.5 text-xs text-mid leading-[1.78]">
                  <strong className="text-royal">How to apply:</strong> {s.applicationSteps}
                </div>
                <div className="text-xs text-mid/60 mb-2.5">Official site: {s.officialSite}</div>
                <div className="text-xs text-mid mb-2.5">Eligibility: {s.eligibility}</div>
              </>
            )}
            <button
              className="scheme-apply bg-transparent border-[1.5px] border-royal text-royal font-display text-xs font-bold p-2.5 px-4 w-full transition-colors cursor-pointer uppercase tracking-[0.12em] hover:bg-royal hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(expanded === i ? null : i);
              }}
            >
              {expanded === i ? "▲ Hide details" : "▼ Show how to apply"}
            </button>
          </div>
        ))}
      </div>
    );
  return null;
}
