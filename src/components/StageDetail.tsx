import { useState } from "react";
import { evalInterview } from "../services/aiService";
import { Stage, InterviewEval } from "../types";
import { StudyTool } from "./StudyTool";

interface StageDetailProps {
  stage: Stage;
  stageIdx: number;
  total: number;
  isCurrent: boolean;
  onBack: () => void;
  onUnlock: () => void;
  hasNext: boolean;
  goal: string;
  mockInterviewUnlocked: boolean;
  onMockUnlock: () => void;
}

export function StageDetail({
  stage,
  total,
  isCurrent,
  onBack,
  onUnlock,
  hasNext,
  goal,
  mockInterviewUnlocked,
  onMockUnlock,
}: StageDetailProps) {
  const [view, setView] = useState("content");
  const [ta, setTa] = useState<Record<number, number>>({});
  const [ts, setTs] = useState(false);
  const [tr, setTr] = useState<Record<number, boolean>>({});
  const [mockAnswers, setMockAnswers] = useState<Record<number, string>>({});
  const [mockResult, setMockResult] = useState<InterviewEval | null>(null);
  const [mockLoading, setMockLoading] = useState(false);

  if (!stage) return null;

  const test = stage.test;
  const answered = Object.keys(ta).length;
  const tScore = ts ? test.questions.reduce((s, q, i) => s + (ta[i] === q.correct ? 1 : 0), 0) : 0;
  const tPct = ts ? Math.round((tScore / test.questions.length) * 100) : 0;
  const passed = tPct >= (test.passingScore || 70);

  const retryTest = () => { setTa({}); setTs(false); setTr({}); };
  const isStage7 = stage.stage === 7;

  const mockQuestions = [
    { q: `Tell me about yourself and why you chose ${goal} as a career.`, type: "Behavioural" },
    { q: "What is your strongest technical skill in this field and how did you develop it?", type: "Technical" },
    { q: "Describe a project you built. What problem did it solve and what was your approach?", type: "Situational" },
    { q: "How do you stay updated with new developments in this field?", type: "Behavioural" },
    { q: "Where do you see yourself in 3 years in this career?", type: "Behavioural" },
  ];

  const submitMock = async () => {
    setMockLoading(true);
    try {
      const r = await evalInterview(mockQuestions, mockAnswers, goal);
      setMockResult(r);
    } catch (e: any) {
      setMockResult({
        overallScore: 0,
        verdict: e.message,
        perQuestion: [],
        topStrengths: [],
        topImprovements: [],
        nextSteps: [],
      });
    }
    setMockLoading(false);
  };

  return (
    <div className="sd animate-[fadeUp_0.45s_cubic-bezier(0.22,1,0.36,1)]">
      <div className="sd-nav flex items-center gap-3 mb-[22px] pb-3.5 border-b-[1.5px] border-pb flex-wrap">
        <button
          type="button"
          className="sd-back bg-none border-none text-pale text-[11px] flex items-center gap-[5px] transition-colors uppercase tracking-[0.12em] cursor-pointer font-display font-bold hover:text-ch"
          onClick={onBack}
        >
          ← All Stages
        </button>
        <div className="sd-pill bg-ch text-acid font-display text-[11px] font-bold px-[13px] py-[5px] ml-auto uppercase tracking-[0.12em]">
          Stage {stage.stage} of {total}
        </div>
        {isStage7 && mockInterviewUnlocked && (
          <button
            type="button"
            className="btn-ghost text-[12px] px-3 py-1.5"
            onClick={() => setView(view === "mock" ? "content" : "mock")}
          >
            🎙️ {view === "mock" ? "Hide" : "Mock Interview"}
          </button>
        )}
      </div>

      {view === "content" && (
        <>
          <div className="sd-header border-[1.5px] border-pb border-l-4 border-l-acid p-5 mb-[2px] bg-white">
            <div className="sd-h1 font-display text-[clamp(28px,5vw,52px)] font-black uppercase tracking-[-0.01em] mb-1.5">{stage.name}</div>
            <div className="sd-meta flex flex-wrap gap-3 text-[11px] text-mid uppercase tracking-[0.1em] font-display font-bold">
              <span>⏱ {stage.duration}</span>
              <span>🎯 {stage.outcome}</span>
            </div>
          </div>

          <div className="sd-grid grid grid-cols-2 gap-[2px] bg-pb mb-[2px] md:grid-cols-1">
            <div className="sd-card bg-white border-[1.5px] border-pb p-[18px]">
              <div className="sd-ct font-display text-[11px] font-bold uppercase tracking-[0.16em] text-pale mb-3 pb-[9px] border-b-[1.5px] border-pb">Topics to cover</div>
              {stage.topics?.map((t, i) => (
                <div key={i} className="tl-item flex gap-[9px] text-[13px] text-mid leading-[1.6] items-start mb-2">
                  <div className="tl-n font-display w-[21px] h-[21px] border-[1.5px] border-ch text-ch text-[11px] font-black flex items-center justify-center shrink-0 mt-[1px]">{i + 1}</div>
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="sd-card bg-white border-[1.5px] border-pb p-[18px]">
              <div className="sd-ct font-display text-[11px] font-bold uppercase tracking-[0.16em] text-pale mb-3 pb-[9px] border-b-[1.5px] border-pb">Skills you gain</div>
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {stage.skills?.map((s, i) => (
                  <span key={i} className="bg-acid/10 border border-acid/20 text-ch rounded-[20px] px-2.5 py-1 text-[11px] font-semibold">{s}</span>
                ))}
              </div>
              <div className="sd-ct font-display text-[11px] font-bold uppercase tracking-[0.16em] text-pale mb-3 pb-[9px] border-b-[1.5px] border-pb">Mini project</div>
              <div className="proj-box bg-ch p-4 px-[18px] text-[13px] text-cream leading-[1.75]">
                <strong className="text-acid">🛠 Build: </strong>{stage.miniProject}
              </div>
            </div>

            <div className="sd-card full bg-white border-[1.5px] border-pb p-[18px] col-span-2 md:col-span-1">
              <div className="sd-ct font-display text-[11px] font-bold uppercase tracking-[0.16em] text-pale mb-3 pb-[9px] border-b-[1.5px] border-pb">Best free resources</div>
              {stage.resources?.map((r, i) => (
                <div key={i} className="res-item flex gap-[11px] bg-cream border-[1.5px] border-pb p-3 px-[15px] mb-[2px] items-start transition-colors hover:bg-white">
                  <span className="res-icon text-[17px] shrink-0 mt-[1px]">{r.icon}</span>
                  <div>
                    <div className="res-name text-[13px] font-semibold text-ch mb-[3px] flex items-center gap-[7px]">
                      {r.name}
                      <span className="res-free font-display text-[9px] font-bold text-ch bg-acid px-[7px] py-0.5 tracking-[0.1em] uppercase">FREE</span>
                    </div>
                    <div className="res-type font-display text-[11px] text-pale uppercase tracking-[0.08em]">{r.type} · {r.platform}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sd-card full bg-white border-[1.5px] border-pb p-[18px] col-span-2 md:col-span-1">
              <div className="sd-ct font-display text-[11px] font-bold uppercase tracking-[0.16em] text-pale mb-3 pb-[9px] border-b-[1.5px] border-pb">Week-by-week plan</div>
              {stage.weeklyPlan?.map((w, i) => (
                <div key={i} className="wl-item flex gap-[11px] items-start mb-3 pb-3 border-b-[1.5px] border-pb last:border-b-0 last:mb-0 last:pb-0">
                  <div className="wl-dot font-display w-[26px] h-[26px] border-2 border-ch text-ch font-black text-xs flex items-center justify-center shrink-0 bg-acid">{i + 1}</div>
                  <div>
                    <div className="wl-focus font-display text-sm font-black uppercase tracking-[0.06em] mb-[3px]">{w.week} — {w.focus}</div>
                    <div className="wl-tasks text-xs text-mid leading-[1.75]">{Array.isArray(w.tasks) ? w.tasks.join(" · ") : w.tasks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <StudyTool stageName={stage.name} />

          {isCurrent && (
            <div className="text-center mt-[18px]">
              <button type="button" className="btn-primary text-sm px-8 py-3.5" onClick={() => setView("test")}>
                Take Stage {stage.stage} Test →
              </button>
              <div className="text-[12px] text-mid mt-[7px]">Pass {test?.passingScore || 70}% to unlock Stage {stage.stage + 1}</div>
            </div>
          )}
        </>
      )}

      {view === "test" && (
        <>
          <div className="test-wrap bg-white border-[1.5px] border-pb p-[26px] mb-[2px]">
            <div className="test-hd flex items-center justify-between mb-[22px] pb-3.5 border-b-[1.5px] border-pb flex-wrap gap-2">
              <div className="test-title font-display text-2xl font-black uppercase tracking-[0.05em]">Stage {stage.stage} Test</div>
              <div className="test-meta font-display text-[11px] font-bold text-pale uppercase tracking-[0.12em]">
                {test.questions.length} questions · Pass {test.passingScore || 70}%
              </div>
            </div>

            {test.questions.map((q, qi) => {
              const chosen = ta[qi];
              const isRev = tr[qi] || ts;
              return (
                <div key={qi} className="tq mb-5 pb-5 border-b-[1.5px] border-pb last:border-b-0 last:mb-0 last:pb-0">
                  <div className="tq-num font-display text-[10px] font-bold text-pale uppercase tracking-[0.16em] mb-2">
                    Question {qi + 1} of {test.questions.length}
                  </div>
                  <div className="tq-q text-sm font-semibold mb-[13px] leading-[1.55] text-ch">{q.q}</div>
                  <div className="tq-opts flex flex-col gap-[2px]">
                    {q.options.map((op, oi) => {
                      let cls = "tq-opt bg-cream border-[1.5px] border-pb p-3 px-[15px] text-[13px] text-mid text-left w-full flex items-center gap-[9px] transition-all cursor-pointer";
                      if (isRev) {
                        if (oi === q.correct) cls += " correct bg-mint/5 border-mint text-ch border-l-4 border-l-mint";
                        else if (chosen === oi) cls += " wrong bg-poppy/5 border-poppy text-poppy border-l-4 border-l-poppy";
                        cls += " locked cursor-not-allowed";
                      } else if (chosen === oi) {
                        cls += " sel border-ch border-l-4 border-l-ch bg-white text-ch";
                      } else {
                        cls += " hover:border-ch hover:text-ch hover:bg-white";
                      }
                      return (
                        <button
                          type="button"
                          key={oi}
                          className={cls}
                          onClick={() => { if (!ts && !tr[qi]) setTa((a) => ({ ...a, [qi]: oi })); }}
                        >
                          <span className={`tq-ltr font-display w-6 h-6 border-[1.5px] border-pb2 text-xs font-bold flex items-center justify-center shrink-0 bg-white
                            ${isRev && oi === q.correct ? "border-mint" : isRev && chosen === oi ? "border-poppy" : ""}`}>
                            {["A", "B", "C", "D"][oi]}
                          </span>
                          {op}
                        </button>
                      );
                    })}
                  </div>
                  {isRev && q.explanation && (
                    <div className="tq-expl mt-2.5 p-[11px] px-3.5 bg-cream border-l-[3px] border-ch text-xs text-mid leading-[1.78]">
                      💡 {q.explanation}
                    </div>
                  )}
                  {!ts && !tr[qi] && chosen !== undefined && (
                    <button
                      type="button"
                      className="check-btn bg-none border-none text-pale font-display text-[11px] mt-2 cursor-pointer uppercase tracking-[0.12em] font-bold transition-colors underline underline-offset-[3px] hover:text-ch"
                      onClick={() => setTr((r) => ({ ...r, [qi]: true }))}
                    >
                      Check answer
                    </button>
                  )}
                </div>
              );
            })}

            {!ts && (
              <button
                type="button"
                className="btn-primary w-full mt-3 p-3.5"
                disabled={answered < test.questions.length}
                onClick={() => setTs(true)}
              >
                {answered < test.questions.length ? `Answer all (${answered}/${test.questions.length})` : "Submit Test →"}
              </button>
            )}
          </div>

          {ts && (
            passed ? (
              <div className="result-card border-[1.5px] border-pb p-[38px] mb-[2px] text-center bg-white border-l-[5px] border-l-acid bg-acid/5">
                <div className="result-pct font-display text-[84px] font-black leading-none mb-2 tracking-[-0.02em] text-ch">{tPct}%</div>
                <div className="result-msg font-display text-[26px] font-black uppercase tracking-[0.04em] mb-[7px]">🎉 Stage {stage.stage} Passed!</div>
                <div className="result-sub text-[13px] text-mid mb-[22px]">You got {tScore}/{test.questions.length} correct. Stage {stage.stage + 1} is now unlocked.</div>
                <div className="flex gap-2.5 justify-center flex-wrap mt-1">
                  {hasNext && (
                    <button type="button" className="btn-primary" onClick={onUnlock}>
                      Unlock Stage {stage.stage + 1} →
                    </button>
                  )}
                  {isStage7 && !mockInterviewUnlocked && (
                    <button type="button" className="btn-primary bg-royal border-royal" onClick={() => { onMockUnlock(); setView("mock"); }}>
                      🎙️ Take Mock Interview
                    </button>
                  )}
                  {!hasNext && (
                    <div className="text-[15px] font-bold text-ch">🏆 All stages complete — you're job-ready!</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="result-card border-[1.5px] border-pb p-[38px] mb-[2px] text-center bg-white border-l-[5px] border-l-poppy bg-poppy/5">
                <div className="result-pct font-display text-[84px] font-black leading-none mb-2 tracking-[-0.02em] text-poppy">{tPct}%</div>
                <div className="result-msg font-display text-[26px] font-black uppercase tracking-[0.04em] mb-[7px]">Not quite — try again</div>
                <div className="result-sub text-[13px] text-mid mb-[22px]">Need {test.passingScore || 70}% to pass. Study the resources and retry.</div>
                <div className="flex gap-2.5 justify-center mt-1">
                  <button type="button" className="btn-primary bg-poppy border-poppy" onClick={retryTest}>↺ Retry Test</button>
                  <button type="button" className="btn-ghost" onClick={() => setView("content")}>← Review Resources</button>
                </div>
              </div>
            )
          )}
        </>
      )}

      {view === "mock" && (
        <div className="mock-wrap max-w-[720px] mx-auto">
          {!mockResult && (
            <>
              <div className="mock-intro bg-white border-[1.5px] border-pb border-t-[5px] border-t-ch p-[30px] mb-[2px] text-center">
                <div className="mock-icon text-[40px] mb-3.5 block">🎙️</div>
                <div className="mock-title font-display text-[30px] font-black uppercase tracking-[0.05em] mb-1.5">AI Mock Interview</div>
                <div className="mock-sub text-[13px] text-mid leading-[1.78] mb-5">Practice with an AI interviewer before your real job interviews. Answer all 5 questions honestly — the more detail you give, the better the feedback.</div>
              </div>
              {mockQuestions.map((q, i) => (
                <div key={i} className="mock-q bg-white border-[1.5px] border-pb p-6 mb-[2px]">
                  <div className="mq-num font-display text-[10px] font-bold text-pale uppercase tracking-[0.16em] mb-[7px]">Question {i + 1} of {mockQuestions.length}</div>
                  <span className={`mq-type font-display text-[11px] font-bold px-2.5 py-[3px] mb-[11px] inline-block uppercase tracking-[0.12em] border-[1.5px] ${q.type === "Technical" ? "text-royal border-royal/30" : q.type === "Situational" ? "text-citrus border-citrus/30" : "text-ch3 border-ch3/30"}`}>
                    {q.type}
                  </span>
                  <div className="mq-q font-display text-[21px] font-black mb-[15px] leading-[1.15] uppercase tracking-[0.02em]">{q.q}</div>
                  <textarea
                    className="mq-textarea w-full bg-cream border-[1.5px] border-pb2 p-3.5 px-[15px] text-ch text-[13px] outline-none resize-y min-h-[100px] transition-colors focus:border-ch placeholder:text-pale leading-[1.78]"
                    placeholder="Type your answer here... Be specific. Use examples from your projects or learning journey."
                    value={mockAnswers[i] || ""}
                    onChange={e => setMockAnswers(a => ({ ...a, [i]: e.target.value }))}
                    rows={4}
                  />
                  <div className="mq-counter font-display text-[11px] text-pale mt-1.25 text-right uppercase tracking-[0.1em]">{(mockAnswers[i] || "").length} characters</div>
                </div>
              ))}
              <button
                type="button"
                className="btn-primary w-full text-[15px] p-[15px]"
                disabled={Object.keys(mockAnswers).length < mockQuestions.length || mockLoading}
                onClick={submitMock}
              >
                {mockLoading ? "AI is evaluating your answers…" : "Submit Interview for AI Evaluation →"}
              </button>
            </>
          )}

          {mockResult && (
            <div className="mock-feedback bg-white border-[1.5px] border-pb p-6 mb-[2px] animate-[fadeUp_0.4s_ease]">
              <div className="mock-intro text-left p-5 px-[22px]">
                <div className="mf-top flex items-start gap-3.5 mb-[18px] pb-4 border-b-[1.5px] border-pb">
                  <div className="mf-score font-display text-[60px] font-black text-ch leading-none">{mockResult.overallScore}%</div>
                  <div className="flex-1">
                    <div className="mf-label font-display text-[19px] font-black uppercase tracking-[0.04em] mb-[3px]">
                      {mockResult.overallScore >= 75 ? "Strong performance!" : mockResult.overallScore >= 55 ? "Good effort — improve these areas" : "Needs more preparation"}
                    </div>
                    <div className="mf-sub text-xs text-mid leading-[1.7]">{mockResult.verdict}</div>
                  </div>
                  <button
                    type="button"
                    className="mf-retry bg-ch text-acid font-display font-black border-none p-2.5 px-[22px] text-[13px] ml-auto uppercase tracking-[0.12em] cursor-pointer transition-colors hover:bg-acid hover:text-ch"
                    onClick={() => { setMockAnswers({}); setMockResult(null); }}
                  >
                    ↺ Retry
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                  <div>
                    <div className="text-[11px] font-bold text-acid mb-1.5 uppercase tracking-[0.08em]">Strengths</div>
                    {mockResult.topStrengths?.map((s, i) => (
                      <div key={i} className="text-xs text-mid mb-1 flex gap-1.5"><span className="text-acid">✓</span>{s}</div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-citrus mb-1.5 uppercase tracking-[0.08em]">Improve</div>
                    {mockResult.topImprovements?.map((s, i) => (
                      <div key={i} className="text-xs text-mid mb-1 flex gap-1.5"><span className="text-citrus">→</span>{s}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-3.5">
                <div className="text-[11px] font-bold text-mid uppercase tracking-[0.1em] mb-2.5">Per-Question Feedback</div>
                {mockResult.perQuestion?.map((f, i) => (
                  <div key={i} className="mf-q-fb bg-cream border-[1.5px] border-pb border-l-[3px] border-l-pb2 p-3.5 px-4 mb-[2px]">
                    <div className="mfq-title font-display text-[13px] font-black uppercase tracking-[0.06em] mb-1.25">Q{f.qNum}: {mockQuestions[i]?.q?.slice(0, 60)}…</div>
                    <span className={`mfq-score font-display text-[11px] font-bold px-[9px] py-0.5 mb-1.5 inline-block uppercase tracking-[0.12em] border-[1.5px] ${f.score >= 70 ? "text-ch border-ch" : f.score >= 50 ? "text-citrus border-citrus" : "text-poppy border-poppy"}`}>
                      {f.score}% — {f.scoreLabel}
                    </span>
                    <div className="mfq-fb text-xs text-mid leading-[1.75]">{f.feedback}</div>
                  </div>
                ))}
              </div>
              <div className="bg-cream border border-pb rounded-lg p-3.5 px-4">
                <div className="text-[11px] font-bold text-acid mb-2 uppercase tracking-[0.08em]">Next Steps to Improve</div>
                {mockResult.nextSteps?.map((s, i) => (
                  <div key={i} className="text-[13px] text-mid mb-1.5 flex gap-2">
                    <span className="text-acid font-bold shrink-0">{i + 1}.</span>{s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}