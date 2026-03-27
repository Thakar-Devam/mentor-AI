import { Ticker } from "./Ticker";

interface LandingProps {
  onCareer: () => void;
  onGuide: () => void;
  onScheme: () => void;
}

export function Landing({ onCareer, onGuide, onScheme }: LandingProps) {
  return (
    <div>
      <div className="hero px-10 py-[72px] border-b-[1.5px] border-pb md:px-5 md:py-[52px]">
        <div className="hero-label font-display text-[11px] font-bold tracking-[0.22em] uppercase text-mid mb-6 flex items-center gap-3 before:content-[''] before:w-7 before:h-[1.5px] before:bg-pb3">
          India's First AI Career Mentor — 100% Free
        </div>
        <h1 className="hero-h1 font-display text-[clamp(80px,14vw,196px)] font-black leading-[0.88] tracking-[-0.01em] uppercase text-ch md:text-[clamp(64px,17vw,96px)]">
          <span className="block">Your Career</span>
          <span className="block text-acid [text-shadow:-2px_2px_0_var(--color-ch)]">MENTOR</span>
          <span className="block [-webkit-text-stroke:2.5px_var(--color-ch)] text-transparent">IS HERE.</span>
        </h1>
        <div className="hero-bottom flex items-end justify-between mt-9 pt-7 border-t-[1.5px] border-pb flex-wrap gap-5 md:flex-col">
          <p className="hero-sub text-[15px] text-mid leading-[1.8] max-w-[400px]">
            No expensive coaching. No connections. No confusion.<br />
            <strong className="text-ch font-semibold">Tell MentorAI your goal — get your complete career path.</strong>
          </p>
          <div className="hero-right flex items-end gap-10 flex-wrap md:gap-6">
            {[
              ["10", "Stage System"],
              ["3", "Tools in One"],
              ["₹0", "Forever Free"],
            ].map(([n, l]) => (
              <div key={l} className="hero-stat text-center">
                <div className="hstat-n font-display text-[52px] font-black leading-none text-ch md:text-[40px]">{n}</div>
                <div className="hstat-l font-display text-[11px] font-bold tracking-[0.14em] uppercase text-mid">{l}</div>
              </div>
            ))}
            <button className="btn-primary text-base px-10 py-3.5" onClick={onCareer}>Start Free →</button>
          </div>
        </div>
      </div>

      <div className="programs-strip flex border-b-[1.5px] border-pb overflow-x-auto md:flex-col">
        {[
          { type: "Full Platform", name: "Career Mentor", fn: onCareer, color: "text-ch" },
          { type: "Stream & College", name: "Post-12th Guide", fn: onGuide, color: "text-poppy" },
          { type: "Government Support", name: "Scheme Finder", fn: onScheme, color: "text-royal" },
          { type: "Inside Career", name: "Peer Matching", fn: onCareer, color: "text-ch" },
          { type: "Inside Career", name: "AI Mock Interview", fn: onCareer, color: "text-ch" },
        ].map((p, i) => (
          <div
            key={i}
            className={`prog-item flex-1 min-w-[160px] p-5 px-6 border-r-[1.5px] border-pb cursor-pointer transition-colors relative overflow-hidden bg-cream hover:bg-white md:border-r-0 md:border-b-[1.5px] group ${p.color}`}
            onClick={p.fn}
          >
            <div className={`prog-type font-display text-[10px] font-bold tracking-[0.18em] uppercase mb-1 ${p.color === 'text-ch' ? 'text-mid' : 'opacity-55'}`}>
              {p.type}
            </div>
            <div className="prog-name font-display text-xl font-black uppercase tracking-[0.04em] leading-none">
              {p.name}
            </div>
            <span className="prog-arrow text-base mt-2 opacity-0 transition-all block group-hover:opacity-100 group-hover:translate-x-[3px] group-hover:translate-y-[-3px]">↗</span>
            <div className="absolute bottom-0 left-0 h-[3px] w-0 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] bg-current group-hover:w-full" />
          </div>
        ))}
      </div>

      <Ticker />

      <div className="section-block border-b-[1.5px] border-pb px-10 py-[72px] md:px-5 md:py-[52px]">
        <div className="sb-super flex items-center gap-2.5 mb-4 font-display text-[11px] font-bold tracking-[0.2em] uppercase text-mid before:content-[''] before:w-7 before:h-[1.5px] before:bg-pb2">
          <span className="sb-num text-ch3">01 /</span> Choose Your Tool
        </div>
        <h2 className="sb-title font-display text-[clamp(48px,7vw,96px)] font-black leading-[0.92] uppercase tracking-[-0.01em] text-ch mb-12">
          Discover<br />Our <em className="not-italic text-acid">Programs</em>
        </h2>
        <div className="tools-grid grid grid-cols-3 border-[1.5px] border-pb md:grid-cols-1">
          {[
            {
              num: "01",
              tag: "Full Platform",
              icon: "🧭",
              title: "AI Career Mentor",
              desc: "The mentor every Indian student deserves but never had. Personalised 10-stage roadmap from zero to job-ready, with tests, resources, peer matching, auto-resume and AI mock interview.",
              feats: ["Reality check & skill gap analysis", "10 stages with tests & weekly plans", "Auto-resume fills as you progress", "Peer matching & AI mock interview"],
              cta: "Get Career Plan",
              fn: onCareer,
              barColor: "bg-acid",
            },
            {
              num: "02",
              tag: "Stream & College",
              icon: "🎓",
              title: "Post-12th Guide",
              desc: "Confused after 12th? Get stream recommendation, entrance exam list (JEE/NEET/CUET/CLAT), colleges matching your marks and budget, and a 90-day action plan.",
              feats: ["AI stream recommendation", "All entrance exams with difficulty", "Colleges matching cutoff & budget", "90-day preparation plan"],
              cta: "Get College Guide",
              fn: onGuide,
              barColor: "bg-poppy",
            },
            {
              num: "03",
              tag: "Government Support",
              icon: "🏛️",
              title: "Scheme Finder",
              desc: "India has 1,000+ scholarships, grants and skill programmes. 90% of eligible students never apply. 2-minute profile — get matched to everything you qualify for.",
              feats: ["8+ schemes matched to your profile", "Central + state government schemes", "Real scheme names (NSP, PMKVY)", "Step-by-step how to apply"],
              cta: "Find My Schemes",
              fn: onScheme,
              barColor: "bg-royal",
            },
          ].map((t) => (
            <div
              key={t.num}
              className="tool-card border-[1.5px] border-pb flex flex-col cursor-pointer relative overflow-hidden group"
              onClick={t.fn}
            >
              <div className={`tc-bar h-1.5 w-full transition-[height] duration-300 group-hover:h-2.5 ${t.barColor}`} />
              <div className="tc-body p-7 flex-1 flex flex-col bg-cream transition-colors group-hover:bg-white">
                <div className="tc-top flex justify-between items-start mb-[18px]">
                  <div className="tc-num font-display text-[56px] font-black leading-none text-pb">{t.num}</div>
                  <div className="tc-tag font-display text-[10px] font-bold tracking-[0.12em] uppercase px-[9px] py-1 border-[1.5px] border-current text-pb3">{t.tag}</div>
                </div>
                <div className="tc-icon text-[34px] mb-3.5 block">{t.icon}</div>
                <div className="tc-title font-display text-[28px] font-black uppercase tracking-[0.02em] mb-2.5 leading-none text-ch transition-colors">
                  {t.title}
                </div>
                <div className="tc-desc text-[13px] text-mid leading-[1.78] flex-1 mb-5">{t.desc}</div>
                <div className="tc-feats flex flex-col gap-1.5 mb-[22px]">
                  {t.feats.map((f, i) => (
                    <div key={i} className="tc-feat text-xs text-ch3 flex gap-2 leading-[1.5] before:content-['—'] before:text-pale before:shrink-0 group-hover:before:content-['→'] group-hover:before:text-ch group-hover:text-ch3">
                      {f}
                    </div>
                  ))}
                </div>
                <div className="tc-foot pt-[18px] border-t-[1.5px] border-pb flex items-center justify-between">
                  <div className="tc-cta font-display text-sm font-bold tracking-[0.1em] uppercase text-pale transition-colors group-hover:text-ch">{t.cta}</div>
                  <div className="tc-arr text-xl text-pale transition-all duration-300 group-hover:text-ch group-hover:translate-x-1 group-hover:translate-y-[-4px]">↗</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Ticker />

      <div className="section-block border-b-[1.5px] border-pb px-10 py-[72px] md:px-5 md:py-[52px]">
        <div className="sb-super flex items-center gap-2.5 mb-4 font-display text-[11px] font-bold tracking-[0.2em] uppercase text-mid before:content-[''] before:w-7 before:h-[1.5px] before:bg-pb2">
          <span className="sb-num text-ch3">02 /</span> Why We Exist
        </div>
        <h2 className="sb-title font-display text-[clamp(48px,7vw,96px)] font-black leading-[0.92] uppercase tracking-[-0.01em] text-ch mb-12">
          The Problem<br />We <em className="not-italic text-acid">Solve</em>
        </h2>
        <div className="pain-grid grid grid-cols-3 md:grid-cols-1">
          {[
            ["01", "No Mentor", "Most students have never spoken to a professional in the field they want to join. Career choices happen based on fees, peer pressure, and random YouTube videos."],
            ["02", "Info Overload", "The internet is full of conflicting advice. 50% is outdated or wrong. Finding what works takes months of expensive trial and error."],
            ["03", "High Cost", "Good coaching costs ₹50,000 to ₹5 lakh. IITians get alumni networks. Everyone else gets nothing. MentorAI closes this gap."],
          ].map(([n, t, d]) => (
            <div key={n} className="pain-item border-[1.5px] border-pb p-7 px-[28px] transition-colors hover:bg-white">
              <div className="pi-n font-display text-[96px] font-black leading-none text-pb mb-3 transition-colors group-hover:text-pb2">{n}</div>
              <div className="pi-t font-display text-[22px] font-black uppercase tracking-[0.05em] mb-2.5">{t}</div>
              <div className="pi-d text-[13px] text-mid leading-[1.78]">{d}</div>
            </div>
          ))}
        </div>
        <div className="pain-quote border-[1.5px] border-pb p-12 px-[48px] bg-ch relative overflow-hidden mt-[2px] md:px-6 md:py-11">
          <div className="pq-bg font-display text-[220px] font-black text-white/5 absolute top-[-30px] left-4 leading-none pointer-events-none select-none">"</div>
          <div className="pq-body font-display text-[clamp(26px,4vw,52px)] font-extrabold leading-[1.12] uppercase tracking-[-0.01em] text-cream max-w-[800px] relative z-10">
            I chose commerce because of <span className="text-acid">low fees.</span> I did not know what IIT or IIM was. After 3 years, I still did not know what to do with my life.
          </div>
          <div className="pq-credit mt-7 text-xs tracking-[0.14em] uppercase text-white/30 relative z-10">Story of millions of Indian students. MentorAI exists because of this.</div>
        </div>
      </div>

      <div className="section-block border-b-[1.5px] border-pb px-10 py-[72px] md:px-5 md:py-[52px]">
        <div className="sb-super flex items-center gap-2.5 mb-4 font-display text-[11px] font-bold tracking-[0.2em] uppercase text-mid before:content-[''] before:w-7 before:h-[1.5px] before:bg-pb2">
          <span className="sb-num text-ch3">03 /</span> What's Inside
        </div>
        <h2 className="sb-title font-display text-[clamp(48px,7vw,96px)] font-black leading-[0.92] uppercase tracking-[-0.01em] text-ch mb-12">
          Everything<br />You <span className="[-webkit-text-stroke:2.5px_var(--color-ch)] text-transparent">Need</span>
        </h2>
        <div className="feats-grid grid grid-cols-3 md:grid-cols-1">
          {[
            { n: "01", ic: "🔍", t: "Reality Check", d: "Difficulty, competition, AI risk, skill gaps — honest assessment before you commit a year to the wrong path.", items: ["Difficulty & competition meter", "AI automation risk score", "Skill gap analysis", "Honest alternative paths"] },
            { n: "02", ic: "🏆", t: "10-Stage System", d: "Zero to job-ready in structured stages. Unlock each stage by passing a test — you actually learn, not just scroll.", items: ["Topics, resources & weekly plan", "Mini-project per stage", "Test to unlock next stage", "Study tool built in"] },
            { n: "03", ic: "📄", t: "Auto Resume", d: "Resume fills itself as you complete stages. Every mini-project gets added automatically. Job-ready by Stage 7.", items: ["Skills auto-add from stages", "Projects listed automatically", "One-click copy to export", "Grows from empty to full"] },
            { n: "04", ic: "👥", t: "Peer Matching", d: "Find students on the same stage and career path for accountability, peer review and support.", items: ["Filtered by career + stage", "Auto-generates connection message", "WhatsApp intro ready to copy", "Find your study partner"] },
            { n: "05", ic: "🎙️", t: "Mock Interview", d: "Unlocks after Stage 7. AI evaluates your answers and gives detailed per-question scoring and feedback.", items: ["Technical, Behavioural & Situational", "AI scores each answer", "Detailed per-question feedback", "Strengths and improvement plan"] },
            { n: "06", ic: "🏛️", t: "Scheme Finder", d: "Matched to real central and state government schemes with step-by-step application instructions.", items: ["8+ schemes per profile", "Real names (NSP, PMKVY etc)", "Step-by-step application guide", "Eligibility checker"] },
          ].map((f, i) => {
            const colors = ["before:bg-acid", "before:bg-royal", "before:bg-poppy", "before:bg-citrus", "before:bg-mint", "before:bg-ch"];
            return (
              <div key={f.n} className={`feat-cell border-[1.5px] border-pb p-[30px] px-[26px] transition-colors hover:bg-white relative overflow-hidden group before:content-[''] before:absolute before:top-0 before:left-0 before:w-[3px] before:h-0 before:transition-[height] before:duration-[350ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:h-full ${colors[i % colors.length]}`}>
                <div className="fc-n font-display text-[11px] font-bold text-pale tracking-[0.18em] uppercase mb-5">{f.n}</div>
                <div className="fc-ic text-[28px] mb-3.5 block">{f.ic}</div>
                <div className="fc-t font-display text-[19px] font-black uppercase tracking-[0.05em] mb-[9px] group-hover:text-ch">{f.t}</div>
                <div className="fc-d text-xs text-mid leading-[1.78]">{f.d}</div>
                <div className="fc-items mt-3 flex flex-col gap-1.5">
                  {f.items.map((li, j) => (
                    <div key={j} className="fc-it text-xs text-mid flex gap-2 leading-[1.5] before:content-['—'] before:text-pale before:shrink-0 group-hover:before:content-['→'] group-hover:before:text-ch group-hover:text-ch3">
                      {li}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Ticker />

      <div className="cta-block grid grid-cols-2 border-t-[1.5px] border-pb md:grid-cols-1">
        <div className="cta-left p-[72px] px-12 bg-ch flex flex-col justify-between border-r-[1.5px] border-white/5 md:p-11 md:px-6">
          <div>
            <div className="cta-h font-display text-[clamp(52px,8vw,112px)] font-black uppercase tracking-[-0.02em] leading-[0.9] text-cream mb-7">
              Start<br />For<br /><em className="not-italic text-acid">Free.</em>
            </div>
            <div className="cta-sub text-sm text-white/40 leading-[1.8]">No account. No payment. No spam. Choose a tool and get your personalised plan in under 60 seconds.</div>
          </div>
          <div className="cta-note font-display text-[11px] font-bold text-white/20 tracking-[0.12em] uppercase mt-7">100% Free · No Sign-Up · Powered by Claude AI</div>
        </div>
        <div className="cta-right p-12 flex flex-col gap-3 justify-center bg-cream md:p-6">
          {[
            { id: "career", ic: "🧭", lbl: "AI Career Mentor", sub: "10-stage career plan", fn: onCareer, hover: "hover:border-l-[5px] hover:border-l-acid" },
            { id: "guide", ic: "🎓", lbl: "Post-12th Guide", sub: "Stream, exams & colleges", fn: onGuide, hover: "hover:border-l-[5px] hover:border-l-poppy hover:border-poppy" },
            { id: "scheme", ic: "🏛️", lbl: "Govt Scheme Finder", sub: "Free money for students", fn: onScheme, hover: "hover:border-l-[5px] hover:border-l-royal hover:border-royal" },
          ].map(b => (
            <button key={b.id} className={`cta-btn bg-cream border-2 border-pb2 p-5 px-[22px] cursor-pointer transition-all duration-[220ms] flex items-center justify-between text-left hover:border-ch hover:bg-white ${b.hover} group`} onClick={b.fn}>
              <div className="ctb-info flex items-center gap-3.5">
                <div className="ctb-ic text-2xl">{b.ic}</div>
                <div>
                  <span className="ctb-label font-display text-[17px] font-black uppercase tracking-[0.08em] text-ch block mb-[2px]">{b.lbl}</span>
                  <span className="ctb-sub text-[11px] text-mid tracking-[0.06em] uppercase">{b.sub}</span>
                </div>
              </div>
              <div className="ctb-arr text-xl text-pale transition-all duration-[220ms] group-hover:text-ch group-hover:translate-x-1 group-hover:translate-y-[-4px]">↗</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
