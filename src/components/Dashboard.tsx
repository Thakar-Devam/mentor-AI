import { useState } from "react";
import { CareerPlan } from "../types";
import { StageDetail } from "./StageDetail";
import { ResumeBuilder } from "./ResumeBuilder";
import { Community } from "./Community";

interface DashboardProps {
  data: CareerPlan;
  profile: any;
  onReset: () => void;
}

export function Dashboard({ data, profile, onReset }: DashboardProps) {
  const [tab, setTab] = useState("reality");
  const [stageView, setStageView] = useState<number | null>(null);
  const [unlockedStages, setUnlockedStages] = useState([0]);
  const [currentStage, setCurrentStage] = useState(0);
  const [mockUnlocked, setMockUnlocked] = useState(false);

  const completedStages = Array.from({ length: currentStage }, (_, i) => i);
  const totalProg = Math.round((currentStage / data.stages.length) * 100);
  const rc = data.realityCheck;

  const TABS = [
    { id: "reality", label: "Reality Check", icon: "🔍" },
    { id: "stages", label: "10 Stages", icon: "🏆" },
    { id: "resume", label: "My Resume", icon: "📄", isNew: true },
    { id: "community", label: "Community", icon: "👥", isNew: true },
    { id: "proof", label: "Real Stories", icon: "👥" },
    { id: "jobs", label: "Jobs & Money", icon: "💰" },
    { id: "mistakes", label: "Mistakes", icon: "⚠️" },
  ];

  const unlockNext = (i: number) => {
    const next = i + 1;
    setCurrentStage((p) => Math.max(p, next));
    setUnlockedStages((u) => [...new Set([...u, next])]);
    setStageView(null);
  };

  return (
    <div className="dashboard max-w-280 mx-auto px-10 py-8 pb-25 md:px-3.5 md:py-3.5 md:pb-15">
      <div className="dash-header border-[1.5px] border-pb mb-6 bg-white">
        <div className="dh-top flex items-start justify-between gap-4 flex-wrap p-5.5 px-6.5 border-b-[1.5px] border-pb">
          <div>
            <div className="dh-goal inline-flex items-center gap-2 bg-acid p-1.25 px-3 font-display text-[11px] font-bold text-ch mb-2.5 uppercase tracking-[0.12em]">
              🎯 {profile.goal?.slice(0, 50)}
              {profile.goal?.length > 50 ? "..." : ""}
            </div>
            <div className="dh-title font-display text-[clamp(20px,3.5vw,38px)] font-black tracking-[-0.01em] uppercase mb-1.5">Your AI Career Plan</div>
            <div className="dh-meta flex flex-wrap gap-3.5 text-[11px] text-mid uppercase tracking-[0.08em] font-display font-bold">
              <span>📚 {data.stages?.length} stages</span>
              <span>🎓 {profile.education}</span>
              <span>⏱ {profile.time}h/day</span>
              <span>🌍 {profile.country}</span>
            </div>
          </div>
          <button className="dh-new-btn bg-cream border-[1.5px] border-pb2 text-mid text-[11px] font-bold p-[9px] px-4 whitespace-nowrap transition-colors shrink-0 uppercase tracking-[0.1em] cursor-pointer font-display hover:text-ch hover:border-ch" onClick={onReset}>
            + New Plan
          </button>
        </div>
        <div className="prog-track flex items-center gap-3.5 p-3.5 px-6.5">
          <span className="pt-lbl font-display text-[11px] font-bold text-pale whitespace-nowrap uppercase tracking-[0.1em] w-20">Progress</span>
          <div className="pt-bar flex-1 h-0.75 bg-pb relative">
            <div className="pt-fill h-0.75 bg-ch transition-[width] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ width: `${totalProg}%` }} />
          </div>
          <span className="pt-pct font-display text-2xl font-black text-ch whitespace-nowrap">Stage {currentStage + 1}/{data.stages.length}</span>
        </div>
      </div>

      <div className="dash-tabs flex border-[1.5px] border-pb mb-5.5 overflow-x-auto bg-white">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`dash-tab p-3.5 px-4 font-display text-[11px] font-bold cursor-pointer text-pale border-none bg-none whitespace-nowrap transition-colors shrink-0 uppercase tracking-[0.12em] border-r-[1.5px] border-pb flex items-center gap-1.5 hover:text-ch hover:bg-cream ${tab === t.id ? "active bg-ch text-acid" : ""}`}
            onClick={() => {
              setTab(t.id);
              setStageView(null);
            }}
          >
            {t.icon} {t.label} {t.isNew && tab !== t.id && <span className="new-badge text-[9px] bg-poppy text-white px-1.5 py-0.5 font-bold tracking-[0.06em]">NEW</span>}
          </button>
        ))}
      </div>

      {tab === "reality" && (
        <div className="fade-up">
          <div className="rc-grid grid grid-cols-2 gap-[2px] bg-pb md:grid-cols-1">
            <div className={`verdict-card col-span-2 md:col-span-1 bg-white border-[1.5px] border-pb p-5.5 px-6.5 flex gap-[18px] items-start border-l-4 ${rc?.suitable ? "vc-fit border-l-acid" : "vc-risk border-l-poppy"}`}>
              <div className="vc-icon text-[30px] shrink-0">{rc?.suitable ? "✅" : "⚠️"}</div>
              <div>
                <div className={`vc-badge font-display text-[10px] font-bold uppercase tracking-[0.14em] mb-1.5 ${rc?.suitable ? "vcb-green text-ch" : "vcb-orange text-poppy"}`}>{rc?.suitable ? "Good Fit — Here's Your Reality" : "Proceed With Awareness"}</div>
                <div className="vc-title font-display text-[19px] font-black uppercase tracking-[0.04em] mb-1.5">{rc?.suitable ? "This path suits you — but here's the truth:" : "Important things to know upfront"}</div>
                <div className="vc-text text-[13px] text-mid leading-[1.78]">{rc?.verdict}</div>
              </div>
            </div>
            <div className="rc-card bg-white border-[1.5px] border-pb p-5.5">
              <div className="rcc-head flex items-center gap-2.5 mb-4 pb-3 border-b-[1.5px] border-pb">
                <div className="rcc-icon w-[34px] h-[34px] border-[1.5px] border-pb2 flex items-center justify-center text-base shrink-0 bg-cream">📊</div>
                <div className="rcc-title font-display text-base font-black uppercase tracking-[0.06em]">Reality Meters</div>
              </div>
              <div className="meter-stack flex flex-col gap-3.5">
                {[
                  ["Difficulty", rc?.difficulty || 50, "bg-royal"],
                  ["Competition", rc?.competition || 60, "bg-citrus"],
                  ["AI Risk", rc?.aiRisk || 30, "bg-poppy"],
                  ["Months to Job", `${rc?.timeToJobMonths || 12} months`, (rc?.timeToJobMonths || 12) / 24 * 100, "bg-ch"],
                ].map(([l, ...rest]) => {
                  const isText = typeof rest[0] === "string";
                  const displayVal = isText ? rest[0] : `${rest[0]}%`;
                  const barVal = isText ? (rest[1] as number) : (rest[0] as number);
                  const cls = isText ? (rest[2] as string) : (rest[1] as string);
                  return (
                    <div key={l as string}>
                      <div className="mi-hd flex justify-between items-center mb-1.5">
                        <span className="mi-lbl font-display text-[11px] font-bold text-mid uppercase tracking-[0.1em]">{l as string}</span>
                        <span className="mi-val font-display text-[22px] font-black text-ch">{displayVal as string}</span>
                      </div>
                      <div className="mi-bg h-[3px] bg-pb">
                        <div className={`mi-bar h-[3px] transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${cls}`} style={{ width: `${Math.min(barVal, 100)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rc-card bg-white border-[1.5px] border-pb p-5.5">
              <div className="rcc-head flex items-center gap-2.5 mb-4 pb-3 border-b-[1.5px] border-pb">
                <div className="rcc-icon w-[34px] h-[34px] border-[1.5px] border-pb2 flex items-center justify-center text-base shrink-0 bg-cream">⚡</div>
                <div className="rcc-title font-display text-base font-black uppercase tracking-[0.06em]">Skill Gaps to Bridge</div>
              </div>
              <div className="gap-list flex flex-col gap-2">
                {rc?.gaps?.map((g, i) => (
                  <div key={i} className="gap-item flex gap-2.5 text-[13px] text-mid leading-[1.65] items-start">
                    <div className="gap-badge w-5 h-5 border-[1.5px] border-poppy text-poppy text-[9px] font-bold flex items-center justify-center shrink-0 mt-[1px] font-display">!</div>
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rc-card bg-white border-[1.5px] border-pb p-5.5">
              <div className="rcc-head flex items-center gap-2.5 mb-4 pb-3 border-b-[1.5px] border-pb">
                <div className="rcc-icon w-[34px] h-[34px] border-[1.5px] border-pb2 flex items-center justify-center text-base shrink-0 bg-cream">💼</div>
                <div className="rcc-title font-display text-base font-black uppercase tracking-[0.06em]">What You'll Do Daily</div>
              </div>
              <div className="gap-list flex flex-col gap-2">
                {rc?.dailyTasks?.map((t, i) => (
                  <div key={i} className="gap-item flex gap-2.5 text-[13px] text-mid leading-[1.65] items-start">
                    <div className="gap-badge w-5 h-5 bg-acid/10 text-ch text-[9px] font-bold flex items-center justify-center shrink-0 mt-[1px] font-display">{i + 1}</div>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rc-card bg-white border-[1.5px] border-pb p-5.5">
              <div className="rcc-head flex items-center gap-2.5 mb-4 pb-3 border-b-[1.5px] border-pb">
                <div className="rcc-icon w-[34px] h-[34px] border-[1.5px] border-pb2 flex items-center justify-center text-base shrink-0 bg-cream">🎯</div>
                <div className="rcc-title font-display text-base font-black uppercase tracking-[0.06em]">Real Roles in This Field</div>
              </div>
              <div className="roles-list flex flex-col gap-[2px]">
                {rc?.roles?.map((r, i) => (
                  <div key={i} className="role-item bg-cream border-[1.5px] border-pb p-3 px-4 flex items-center gap-3 flex-wrap transition-colors hover:bg-white">
                    <div className="ri-title font-semibold text-[13px] flex-1">{r.title}</div>
                    <div className="ri-salary font-display text-xl font-black text-ch whitespace-nowrap">{r.salary}</div>
                    <div className="ri-desc text-xs text-mid w-full">{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {rc?.alternatives?.length > 0 && (
              <div className="rc-card bg-white border-[1.5px] border-pb p-5.5">
                <div className="rcc-head flex items-center gap-2.5 mb-4 pb-3 border-b-[1.5px] border-pb">
                  <div className="rcc-icon w-[34px] h-[34px] border-[1.5px] border-pb2 flex items-center justify-center text-base shrink-0 bg-cream">🔄</div>
                  <div className="rcc-title font-display text-base font-black uppercase tracking-[0.06em]">Alternative Paths</div>
                </div>
                <div className="alt-list grid grid-cols-2 gap-[2px] col-span-2 md:col-span-1 bg-pb">
                  {rc.alternatives.map((a, i) => (
                    <div key={i} className="alt-item bg-white p-[15px] px-[18px] text-[13px] text-mid leading-[1.7] transition-colors hover:bg-cream">
                      <span className="text-ch font-bold">Alt {i + 1}:</span> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="text-center mt-[18px]">
            <button className="btn-primary px-8 py-3.5 text-sm" onClick={() => setTab("stages")}>
              View My 10-Stage Learning Plan →
            </button>
          </div>
        </div>
      )}

      {tab === "stages" && !stageView && (
        <div className="fade-up">
          <div className="bg-white border border-pb2 rounded-lg p-4 px-5 mb-4 flex items-center gap-3.5 flex-wrap">
            <div className="text-[28px]">🏆</div>
            <div className="flex-1">
              <div className="font-display font-black text-base mb-1">Your 10-Stage System</div>
              <div className="text-[13px] text-mid leading-[1.6]">Complete each stage, pass the test, unlock the next. Study tool is built into every stage. Your resume updates automatically as you progress.</div>
            </div>
            <div className="bg-acid/10 border border-acid/20 rounded-lg p-[7px] px-[13px] text-[12px] font-bold text-ch shrink-0">{currentStage > 0 ? `${currentStage} Done` : "Stage 1 Open"}</div>
          </div>
          {mockUnlocked && (
            <div className="bg-gradient-to-br from-royal/10 to-royal/5 border border-royal/25 rounded-lg p-3.5 px-[18px] mb-3.5 flex items-center gap-3">
              <span className="text-[24px]">🎙️</span>
              <div>
                <div className="font-bold text-sm text-royal">AI Mock Interview Unlocked!</div>
                <div className="text-xs text-mid mt-0.5">You passed Stage 7. Go into Stage 7 to take your mock interview.</div>
              </div>
            </div>
          )}
          <div className="stages-grid grid grid-cols-2 gap-[2px] bg-pb md:grid-cols-1">
            {data.stages?.map((s, i) => {
              const isUnlocked = unlockedStages.includes(i);
              const isCur = currentStage === i && isUnlocked;
              const isDone = currentStage > i;
              return (
                <div key={i} className={`stage-card bg-white border-[1.5px] border-pb p-5 cursor-pointer transition-all border-l-[3px] border-l-transparent ${isCur ? "current bg-cream border-l-acid" : ""} ${isDone ? "done border-l-mint" : ""} ${isUnlocked ? "unlocked hover:bg-cream hover:border-l-ch" : "locked opacity-45 cursor-not-allowed"}`} onClick={() => isUnlocked && setStageView(i)}>
                  <div className="sc-top flex items-start justify-between mb-3">
                    <div className={`sc-num w-8 h-8 border-[1.5px] border-pb2 font-display font-black text-sm flex items-center justify-center shrink-0 bg-cream ${isCur ? "sn-active border-ch bg-acid text-ch" : isDone ? "sn-done bg-ch text-cream border-ch" : "sn-locked text-pale"}`}>{isDone ? "✓" : s.stage}</div>
                    <span className={`sc-sp font-display text-[10px] font-bold px-[9px] py-[3px] uppercase tracking-[0.12em] ${isCur ? "sp-cur bg-acid text-ch" : isDone ? "sp-done text-mid border-[1.5px] border-pb2" : "sp-lock text-pale border-[1.5px] border-pb"}`}>{isDone ? "✓ Done" : isCur ? "▶ Current" : isUnlocked ? "Open" : "🔒 Locked"}</span>
                  </div>
                  <div className="sc-name font-display font-black text-[17px] uppercase tracking-[0.04em] mb-1">{s.name}</div>
                  <div className="sc-out text-xs text-mid leading-[1.6] mb-[11px]">{s.outcome}</div>
                  <div className="sc-skills flex flex-wrap gap-1.25">
                    {s.skills?.slice(0, 3).map((sk, j) => (
                      <span key={j} className="skill-tag text-[10px] font-bold text-mid border-[1.5px] border-pb px-[9px] py-[3px] uppercase tracking-[0.08em] font-display">
                        {sk}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-mid mt-1.5">⏱ {s.duration}</div>
                  {isUnlocked && <div className="sc-hint font-display text-[11px] text-ch font-bold mt-[9px] uppercase tracking-[0.12em]">Click to open →</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "stages" && stageView !== null && (
        <StageDetail
          stage={data.stages[stageView]}
          stageIdx={stageView}
          total={data.stages.length}
          isCurrent={currentStage === stageView}
          onBack={() => setStageView(null)}
          onUnlock={() => unlockNext(stageView)}
          hasNext={stageView < data.stages.length - 1}
          goal={profile.goal}
          mockInterviewUnlocked={mockUnlocked}
          onMockUnlock={() => setMockUnlocked(true)}
        />
      )}

      {tab === "resume" && (
        <div className="fade-up">
          <ResumeBuilder profile={profile} stages={data.stages} completedStages={completedStages} />
        </div>
      )}
      {tab === "community" && (
        <div className="fade-up">
          <Community profile={profile} />
        </div>
      )}

      {tab === "proof" && (
        <div className="fade-up">
          <div className="bg-white border border-pb2 rounded-lg p-4 px-5 mb-3.5">
            <div className="font-display font-black text-base mb-1">Real Student Journeys</div>
            <div className="text-[13px] text-mid leading-[1.65]">Realistic journeys based on actual paths students have taken. What actually worked — step by step — no fluff.</div>
          </div>
          {data.realWorldProof?.map((p, i) => (
            <div key={i} className="rw-card bg-white border-[1.5px] border-pb border-l-4 border-l-pb p-6 mb-[2px] transition-colors hover:border-l-acid">
              <div className="rw-person flex items-center gap-3.5 mb-[18px] pb-4 border-b-[1.5px] border-pb">
                <div className="rw-av w-11 h-11 border-[1.5px] border-pb2 flex items-center justify-center text-xl shrink-0 bg-cream">{p.avatarEmoji || "👤"}</div>
                <div className="flex-1">
                  <div className="rw-name font-display font-black text-[19px] uppercase tracking-[0.04em]">{p.name}</div>
                  <div className="rw-bg text-xs text-pale mt-0.5 uppercase tracking-[0.08em] font-display font-bold">{p.background}</div>
                </div>
                <div className="rw-badge font-display text-[10px] font-bold text-citrus border-[1.5px] border-citrus/30 px-2.5 py-1 ml-auto uppercase tracking-[0.12em]">⏱ {p.timeline}</div>
              </div>
              <div className="rw-tl flex flex-col">
                {p.path?.map((step, j) => (
                  <div key={j} className="rwt-row flex gap-3 pb-3 relative last:pb-0 after:content-[''] after:absolute after:left-2.5 after:top-[21px] after:bottom-0 after:w-[1.5px] after:bg-pb last:after:hidden">
                    <div className="rwt-dot font-display w-[21px] h-[21px] border-[1.5px] border-ch text-ch text-[10px] font-black flex items-center justify-center shrink-0 relative z-10 bg-acid">{j + 1}</div>
                    <div className="rwt-text text-[13px] text-mid leading-[1.75] pt-0.5">{step}</div>
                  </div>
                ))}
              </div>
              <div className="rw-outcome bg-ch p-3 px-4 font-display text-sm font-black text-acid mt-3 flex items-center gap-2 uppercase tracking-[0.08em]">🏆 {p.outcome}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "jobs" && (
        <div className="fade-up">
          <div className="jobs-grid grid grid-cols-2 gap-[2px] bg-pb md:grid-cols-1">
            {data.jobReality && (
              <>
                <div className="salary-card col-span-2 md:col-span-1 bg-ch border-[1.5px] border-ch p-6 px-[30px] flex flex-wrap gap-8 items-center">
                  <div className="sc-stat">
                    <div className="sc-num font-display text-[42px] font-black text-acid leading-none mb-[3px]">💰</div>
                    <div className="font-display font-bold text-base mt-[3px] text-cream">{data.jobReality.entryLevel}</div>
                    <div className="sc-lbl font-display text-[11px] text-white/35 uppercase tracking-[0.12em] font-bold">Entry Level Salary</div>
                  </div>
                  <div className="sc-stat">
                    <div className="sc-num font-display text-[42px] font-black text-acid leading-none mb-[3px]">⏱</div>
                    <div className="font-display font-bold text-base mt-[3px] text-cream">{data.jobReality.timeToFirstIncome}</div>
                    <div className="sc-lbl font-display text-[11px] text-white/35 uppercase tracking-[0.12em] font-bold">Time to First Income</div>
                  </div>
                </div>
                {[
                  ["💻", "Freelance Platforms", data.jobReality.freelancePlatforms],
                  ["🎯", "Job Platforms", data.jobReality.jobPlatforms],
                  ["🚀", "Startup Ideas", data.jobReality.startupIdeas],
                  ["🏆", "Top Certifications", data.jobReality.topCertifications],
                ].map(([ic, t, items]) => (
                  <div key={t as string} className="job-card bg-white border-[1.5px] border-pb p-5.5 transition-colors hover:bg-cream">
                    <div className="jc-icon text-[26px] mb-[11px] block">{ic as string}</div>
                    <div className="jc-title font-display text-[19px] font-black uppercase tracking-[0.06em] mb-3 pb-2.5 border-b-[1.5px] border-pb">{t as string}</div>
                    {(items as string[])?.map((f, i) => (
                      <div key={i} className="jci flex gap-2 text-[13px] text-mid mb-1.5">
                        <span className="jci-dot text-ch font-bold shrink-0">→</span>
                        {f}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {tab === "mistakes" && (
        <div className="fade-up">
          <div className="mistake-intro bg-poppy/5 border-[1.5px] border-poppy/20 border-l-4 border-l-poppy p-3.5 px-5 mb-[2px]">
            <div className="font-display font-black text-[15px] text-poppy mb-[3px]">⚠ Mistakes That Kill Progress</div>
            <div className="text-[13px] text-mid leading-[1.65]">Read these now. Avoid them from Day 1.</div>
          </div>
          <div className="mistake-list flex flex-col gap-[2px]">
            {data.commonMistakes?.map((m, i) => (
              <div key={i} className="mistake-item flex gap-3.5 bg-white border-[1.5px] border-pb p-4 px-[18px] items-start transition-all border-l-[3px] border-l-transparent hover:bg-cream hover:border-l-poppy">
                <div className="mi-icon-box w-[30px] h-[30px] border-[1.5px] border-poppy/25 flex items-center justify-center text-[13px] shrink-0 mt-[1px]">⚠️</div>
                <div>
                  <div className="mi-title font-display text-base font-black uppercase tracking-[0.05em] mb-1">{m.title}</div>
                  <div className="mi-desc text-xs text-mid leading-[1.75]">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
