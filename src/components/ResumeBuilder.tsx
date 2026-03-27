import { useState } from "react";
import { Stage } from "../types";

interface ResumeBuilderProps {
  profile: any;
  stages: Stage[];
  completedStages: number[];
}

export function ResumeBuilder({ profile, stages, completedStages }: ResumeBuilderProps) {
  const [copied, setCopied] = useState(false);
  const completedList = stages.filter((_, i) => completedStages.includes(i));
  const allSkills = [...new Set(completedList.flatMap((s) => s.skills || []))];

  const copy = () => {
    const text = `${profile.goal?.split(" ").map((w: string) => w[0]?.toUpperCase() + w.slice(1)).join(" ") || "Student"}\n${profile.goal}\n\nSKILLS\n${allSkills.join(" · ")}\n\nPROJECTS\n${completedList.map((s) => `${s.miniProject} (Stage ${s.stage}: ${s.name})`).join("\n")}\n\nEDUCATION\n${profile.education}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="resume-wrap grid grid-cols-[1fr_320px] gap-[2px] bg-pb md:grid-cols-1">
      <div>
        <div className="resume-preview bg-white border-[1.5px] border-pb p-[30px]">
          {completedList.length === 0 ? (
            <div className="empty-state text-center p-[50px] px-5 text-pale text-[13px] leading-[1.8] border-2 border-dashed border-pb">
              <div className="text-[36px] mb-3">📄</div>
              <div className="font-bold text-mid mb-1.5">Your resume is waiting</div>
              <div>Complete Stage 1 to add your first skill and project. Each stage you finish automatically updates your resume.</div>
            </div>
          ) : (
            <>
              <div className="rp-name font-display text-[44px] font-black uppercase tracking-[-0.01em] mb-1.25">
                {profile.goal?.split(" ").map((w: string) => w[0]?.toUpperCase() + w.slice(1)).join(" ") || "Your Name"}
              </div>
              <div className="rp-goal text-[13px] text-mid mb-5 pb-5 border-b-[1.5px] border-pb">
                {profile.goal} · {profile.country} · {profile.education}
              </div>
              {allSkills.length > 0 && (
                <div className="rp-section mb-6">
                  <div className="rps-title font-display text-[11px] font-bold uppercase tracking-[0.18em] text-mid mb-3 flex items-center gap-3">
                    Technical Skills
                    <div className="rps-line flex-1 h-[1.5px] bg-pb2" />
                  </div>
                  <div className="skill-cloud flex flex-wrap gap-1.5">
                    {allSkills.map((s, i) => (
                      <span key={i} className="skill-chip border-[1.5px] border-ch text-ch p-1 px-3 font-display text-[11px] font-bold uppercase tracking-[0.1em]">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {completedList.length > 0 && (
                <div className="rp-section mb-6">
                  <div className="rps-title font-display text-[11px] font-bold uppercase tracking-[0.18em] text-mid mb-3 flex items-center gap-3">
                    Projects
                    <div className="rps-line flex-1 h-[1.5px] bg-pb2" />
                  </div>
                  {completedList.map((s, i) => (
                    <div key={i} className="proj-entry border-[1.5px] border-pb border-l-[3px] border-l-acid p-3.5 px-4 mb-[2px] bg-cream">
                      <div className="pe-title font-display text-base font-black uppercase mb-1">{s.miniProject?.split(":").pop()?.trim() || s.miniProject}</div>
                      <div className="pe-stage font-display text-[10px] font-bold text-mid border-[1.5px] border-pb2 px-2 py-[2px] mb-[7px] inline-block uppercase tracking-[0.12em]">Stage {s.stage}: {s.name}</div>
                      <div className="pe-desc text-xs text-mid leading-[1.7]">Built as part of the {s.name} stage. Skills applied: {s.skills?.join(", ")}.</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="rp-section mb-6">
                <div className="rps-title font-display text-[11px] font-bold uppercase tracking-[0.18em] text-mid mb-3 flex items-center gap-3">
                  Education
                  <div className="rps-line flex-1 h-[1.5px] bg-pb2" />
                </div>
                <div className="text-[13px] text-mid">{profile.education}</div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="resume-sidebar flex flex-col gap-[2px] bg-pb">
        <div className="rs-card bg-white border-[1.5px] border-pb p-5">
          <div className="rs-title font-display text-[15px] font-black uppercase tracking-[0.06em] mb-3.5 pb-2.5 border-b-[1.5px] border-pb">Stage Completion</div>
          {stages.map((s, i) => (
            <div key={i} className="rs-item flex gap-2.5 items-start text-[13px] text-pale mb-2 leading-[1.55] transition-colors hover:text-mid">
              <div className={`rs-dot font-display w-5 h-5 border-[1.5px] border-pb2 text-[10px] font-black flex items-center justify-center shrink-0 mt-[1px] ${completedStages.includes(i) ? "rsd-done border-ch text-ch bg-acid" : "rsd-lock text-pale"}`}>
                {completedStages.includes(i) ? "✓" : i + 1}
              </div>
              <span className={`text-xs ${completedStages.includes(i) ? "text-ch" : "text-mid/50"}`}>{s.name}</span>
            </div>
          ))}
        </div>

        <div className="rs-card bg-white border-[1.5px] border-pb p-5">
          <div className="rs-title font-display text-[15px] font-black uppercase tracking-[0.06em] mb-3.5 pb-2.5 border-b-[1.5px] border-pb">Export Resume</div>
          <div className="text-xs text-mid mb-2.5 leading-[1.6]">Copy your resume text and paste into any resume builder or Word document.</div>
          <button
            type="button"
            className="copy-btn w-full bg-ch text-acid font-display font-black border-none p-[13px] text-sm uppercase tracking-[0.12em] transition-colors cursor-pointer mt-2.5 hover:bg-acid hover:text-ch"
            onClick={copy}
          >
            {copied ? "✓ Copied to clipboard!" : "📋 Copy Resume Text"}
          </button>
        </div>

        <div className="rs-card bg-white border-[1.5px] border-pb p-5">
          <div className="rs-title font-display text-[15px] font-black uppercase tracking-[0.06em] mb-3.5 pb-2.5 border-b-[1.5px] border-pb">Pro tips</div>
          {["Complete more stages to add more skills", "Each mini-project = 1 portfolio item", "Export when applying for Stage 8 (First Income)", "Add a GitHub link to your resume manually"].map((t, i) => (
            <div key={i} className="rs-item flex gap-2.5 items-start text-[13px] text-pale mb-2 leading-[1.55] transition-colors hover:text-mid">
              <div className="text-acid text-[13px] font-bold shrink-0">→</div>
              <span className="text-xs text-mid">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}