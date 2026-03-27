import { useState } from "react";
import { genStudy } from "../services/aiService";
import { StudyContent } from "../types";

interface StudyToolProps {
  stageName?: string;
}

export function StudyTool({ stageName }: StudyToolProps) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StudyContent | null>(null);
  const [err, setErr] = useState("");
  const [stab, setStab] = useState("fc");
  const [cur, setCur] = useState(0);
  const [flip, setFlip] = useState(false);
  const [seen, setSeen] = useState(new Set<number>());
  const [qa, setQa] = useState<Record<number, number>>({});
  const [qsub, setQsub] = useState(false);
  const [qrev, setQrev] = useState<Record<number, boolean>>({});

  const gen = async (t: string) => {
    if (!t.trim()) return;
    setLoading(true);
    setErr("");
    setData(null);
    setCur(0);
    setFlip(false);
    setSeen(new Set());
    setQa({});
    setQsub(false);
    setQrev({});
    try {
      const d = await genStudy(t);
      setData(d);
      setStab("fc");
    } catch (e: any) {
      setErr(e.message || "Error");
    }
    setLoading(false);
  };

  const goTo = (i: number) => {
    setFlip(false);
    setTimeout(() => setCur(i), flip ? 230 : 0);
  };

  const next = () => {
    setSeen((s) => new Set([...s, cur]));
    goTo((cur + 1) % (data?.flashcards?.length || 1));
  };

  const qScore = data?.quiz ? data.quiz.reduce((s, q, i) => s + (qa[i] === q.correct ? 1 : 0), 0) : 0;
  const qPct = data?.quiz ? Math.round((qScore / data.quiz.length) * 100) : 0;
  const sug = [stageName ? `${stageName} basics` : null, "Python functions", "SQL basics", "React hooks", "Machine Learning", "Networking basics"].filter(Boolean) as string[];

  return (
    <div className="study-tool bg-cream border-[1.5px] border-pb border-t-3 border-t-ch p-[22px] mt-[2px]">
      <div className="st-hd flex items-center gap-2.5 mb-3.5 pb-[11px] border-b-[1.5px] border-pb">
        <span className="st-badge bg-ch text-acid font-display text-[10px] font-bold px-2.5 py-[3px] uppercase tracking-[0.14em]">📚 Study Tool</span>
        <span className="st-title font-display text-[15px] font-black uppercase tracking-[0.06em]">Generate flashcards & quiz for any topic</span>
      </div>
      <div className="st-desc text-xs text-mid leading-[1.75] mb-3.5">Enter a topic from this stage to get instant flashcards and a 5-question quiz.</div>
      <div className="st-row flex gap-[2px] mb-[9px]">
        <input
          className="st-inp flex-1 bg-white border-[1.5px] border-pb2 px-[13px] py-2.5 text-ch text-[13px] outline-none min-w-0 transition-colors focus:border-ch placeholder:text-pale"
          placeholder="e.g. Python functions, HTML basics, Networking..."
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            setErr("");
          }}
          onKeyDown={(e) => e.key === "Enter" && gen(topic)}
        />
        <button className="st-btn bg-ch text-acid font-display font-black border-none px-5 py-2.5 text-[13px] whitespace-nowrap transition-colors cursor-pointer uppercase tracking-[0.1em] hover:not-disabled:bg-acid hover:not-disabled:text-ch disabled:opacity-40 disabled:cursor-not-allowed" disabled={!topic.trim() || loading} onClick={() => gen(topic)}>
          {loading ? "Generating…" : "Go →"}
        </button>
      </div>
      <div className="st-chips flex flex-wrap gap-1.5">
        {sug.map((s) => (
          <button
            key={s}
            className="st-chip bg-transparent border-[1.5px] border-pb2 px-[11px] py-[3px] font-display text-[11px] font-bold text-pale transition-colors cursor-pointer uppercase tracking-[0.1em] hover:border-ch hover:text-ch"
            onClick={() => {
              setTopic(s);
              gen(s);
            }}
          >
            {s}
          </button>
        ))}
      </div>
      {err && <div className="text-poppy text-xs mt-2">⚠ {err}</div>}
      {data && (
        <div className="st-res mt-[13px] fade-up">
          <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
            <span className="text-[12px] font-semibold text-ch">{topic}</span>
            <button className="st-chip" onClick={() => { setData(null); setTopic(""); }}>✕ Clear</button>
          </div>
          <div className="st-tabs flex bg-white border-[1.5px] border-pb mb-[13px]">
            <button className={`st-tab p-[9px] px-4 font-display text-[11px] font-bold cursor-pointer text-pale border-none bg-none transition-colors shrink-0 uppercase tracking-[0.12em] border-r-[1.5px] border-pb hover:text-ch ${stab === "fc" ? "active bg-ch text-acid" : ""}`} onClick={() => setStab("fc")}>
              🃏 Flashcards<span className="opacity-70 text-[10px]"> ({data.flashcards?.length})</span>
            </button>
            <button className={`st-tab p-[9px] px-4 font-display text-[11px] font-bold cursor-pointer text-pale border-none bg-none transition-colors shrink-0 uppercase tracking-[0.12em] border-r-[1.5px] border-pb hover:text-ch ${stab === "quiz" ? "active bg-ch text-acid" : ""}`} onClick={() => setStab("quiz")}>
              ✏️ Quiz<span className="opacity-70 text-[10px]"> ({data.quiz?.length})</span>
            </button>
            <button className={`st-tab p-[9px] px-4 font-display text-[11px] font-bold cursor-pointer text-pale border-none bg-none transition-colors shrink-0 uppercase tracking-[0.12em] border-r-[1.5px] border-pb hover:text-ch ${stab === "sum" ? "active bg-ch text-acid" : ""}`} onClick={() => setStab("sum")}>
              📋 Summary
            </button>
          </div>
          {stab === "fc" && data.flashcards && (
            <>
              <div className="fc-wrap perspective-[1100px] h-[220px] cursor-pointer mb-[11px]" onClick={() => { setFlip((f) => !f); if (!flip) setSeen((s) => new Set([...s, cur])); }}>
                <div className={`fc-inner w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${flip ? "flip rotate-y-180" : ""}`}>
                  <div className="fc-face fc-f absolute inset-0 [backface-visibility:hidden] border-[1.5px] border-pb flex flex-col items-center justify-center p-[22px] px-[30px] text-center bg-white">
                    <div className="fc-lbl font-display text-[9px] font-bold tracking-[0.2em] uppercase text-pale mb-[13px]">Question — click to flip</div>
                    <div className="fc-q font-display text-[clamp(16px,3vw,24px)] font-black leading-[1.15] uppercase text-ch">{data.flashcards[cur].question}</div>
                    <div className="fc-hint font-display text-[10px] text-pale mt-2.5 uppercase tracking-[0.14em]">Click to reveal answer</div>
                  </div>
                  <div className="fc-face fc-b absolute inset-0 [backface-visibility:hidden] border-[1.5px] border-pb flex flex-col items-center justify-center p-[22px] px-[30px] text-center bg-ch border-ch rotate-y-180">
                    <div className="fc-lbl font-display text-[9px] font-bold tracking-[0.2em] uppercase text-acid/45 mb-[13px]">Answer</div>
                    <div className="fc-a text-[13px] text-acid leading-[1.78]">{data.flashcards[cur].answer}</div>
                  </div>
                </div>
              </div>
              <div className="fc-dots flex justify-center gap-1.25 flex-wrap mb-[11px]">
                {data.flashcards.map((_, i) => (
                  <div key={i} className={`fcd w-[7px] h-[7px] bg-pb cursor-pointer transition-colors border-[1.5px] border-pb2 ${i === cur ? "c bg-ch border-ch" : seen.has(i) ? "s bg-pb2 border-pb" : ""}`} onClick={() => goTo(i)} />
                ))}
              </div>
              <div className="fc-ctrl flex gap-[2px] justify-center">
                <button className="sm-btn bg-cream border-[1.5px] border-pb2 text-mid font-display text-[11px] font-bold px-3.5 py-[7px] transition-colors uppercase tracking-[0.1em] cursor-pointer hover:text-ch hover:border-ch" onClick={() => goTo((cur - 1 + data.flashcards.length) % data.flashcards.length)}>← Prev</button>
                <button className="sm-btn bg-cream border-[1.5px] border-pb2 text-mid font-display text-[11px] font-bold px-3.5 py-[7px] transition-colors uppercase tracking-[0.1em] cursor-pointer hover:text-ch hover:border-ch" onClick={() => { setFlip(false); setTimeout(() => { setCur(0); setSeen(new Set()); }, 220); }}>↺</button>
                <button className="sm-btn act bg-ch text-acid border-ch font-display text-[11px] font-bold px-3.5 py-[7px] transition-colors uppercase tracking-[0.1em] cursor-pointer hover:text-ch hover:border-ch" onClick={next}>Next →</button>
              </div>
            </>
          )}
          {stab === "quiz" && data.quiz && (
            <>
              {qsub && (
                <div className="qs-box bg-acid border-[1.5px] border-ch p-4 text-center mb-[9px]">
                  <div className="qs-pct font-display text-[48px] font-black text-ch leading-none">{qPct}%</div>
                  <div className="qs-msg font-display text-[13px] font-black uppercase tracking-[0.1em] text-ch my-1 mb-2">{qPct >= 80 ? "🎉 Great!" : qPct >= 60 ? "👍 Good" : "📚 Review"}</div>
                  <button className="st-chip" onClick={() => { setQa({}); setQsub(false); setQrev({}); }}>↺ Retry</button>
                </div>
              )}
              <div className="q2-wrap flex flex-col gap-[2px]">
                {data.quiz.map((q, qi) => {
                  const chosen = qa[qi];
                  const isRev = qrev[qi] || qsub;
                  const dc = ({ easy: "dt-e border-ch text-ch", medium: "dt-m border-royal text-royal", hard: "dt-h border-poppy text-poppy" })[q.difficulty] || "dt-e border-ch text-ch";
                  return (
                    <div key={qi} className="q2 bg-white border-[1.5px] border-pb p-[15px]">
                      <div className="q2-hd flex items-center justify-between mb-[7px]">
                        <span className="q2-num font-display text-[10px] font-bold text-pale uppercase tracking-[0.16em]">Q{qi + 1}</span>
                        <span className={`dtag font-display text-[9px] font-bold px-2 py-[2px] uppercase tracking-[0.12em] border-[1.5px] ${dc}`}>{q.difficulty || "easy"}</span>
                      </div>
                      <div className="q2-q text-[13px] font-semibold mb-[9px] leading-[1.5] text-ch">{q.question}</div>
                      <div className="q2-opts flex flex-col gap-[2px]">
                        {q.options.map((op, oi) => {
                          let cls = "q2-opt bg-cream border-[1.5px] border-pb p-[9px] px-[13px] text-xs text-mid text-left w-full flex items-center gap-[7px] transition-all cursor-pointer";
                          if (isRev) {
                            if (oi === q.correct) cls += " correct bg-mint/5 border-mint text-ch";
                            else if (chosen === oi) cls += " wrong bg-poppy/5 border-poppy text-poppy";
                            cls += " locked cursor-not-allowed";
                          } else if (chosen === oi) cls += " sel border-ch border-l-[3px] border-l-ch bg-white text-ch";
                          else cls += " hover:border-ch hover:text-ch";
                          return (
                            <button key={oi} className={cls} onClick={() => { if (!qsub && !qrev[qi]) setQa((a) => ({ ...a, [qi]: oi })); }}>
                              <span className={`q2-ltr font-display w-5 h-5 border-[1.5px] border-pb2 text-[11px] font-bold flex items-center justify-center shrink-0 bg-white ${isRev && oi === q.correct ? "border-mint" : isRev && chosen === oi ? "border-poppy" : ""}`}>
                                {["A", "B", "C", "D"][oi]}
                              </span>
                              {op}
                            </button>
                          );
                        })}
                      </div>
                      {isRev && q.explanation && <div className="q2-expl mt-[7px] p-2 px-3 bg-cream border-l-[2.5px] border-ch text-[11px] text-mid leading-[1.75]">💡 {q.explanation}</div>}
                      {!qsub && !qrev[qi] && chosen !== undefined && (
                        <button className="check-btn bg-none border-none text-pale font-display text-[11px] mt-2 cursor-pointer uppercase tracking-[0.12em] font-bold transition-colors underline underline-offset-[3px] hover:text-ch" onClick={() => setQrev((r) => ({ ...r, [qi]: true }))}>Check answer</button>
                      )}
                    </div>
                  );
                })}
              </div>
              {!qsub && (
                <button className="st-btn w-full mt-2 rounded-[10px] p-2.5" disabled={Object.keys(qa).length < data.quiz.length} onClick={() => setQsub(true)}>
                  {Object.keys(qa).length < data.quiz.length ? `Answer all (${Object.keys(qa).length}/${data.quiz.length})` : "Submit Quiz →"}
                </button>
              )}
            </>
          )}
          {stab === "sum" && (
            <div>
              <div className="text-[13px] text-mid leading-[1.78] mb-3">{data.summary}</div>
              <div className="grid grid-cols-2 gap-[7px]">
                {data.keyPoints?.map((kp, i) => (
                  <div key={i} className="bg-cream border border-pb p-[9px] px-3 text-xs text-mid leading-[1.55] flex gap-[7px]">
                    <span className="text-acid font-bold shrink-0">→</span>
                    {kp}
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
