export function Ticker() {
  const items = [
    "AI Career Mentor",
    "Post-12th Guide",
    "Scheme Finder",
    "Peer Matching",
    "Auto Resume",
    "Mock Interview",
    "10-Stage System",
    "100% Free",
    "Built for India",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap overflow-hidden border-t-[1.5px] border-b-[1.5px] border-pb py-[11px] bg-ch">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <div key={i} className="ticker-item whitespace-nowrap px-7 font-display text-[13px] font-bold tracking-[0.18em] uppercase text-cream flex items-center gap-6">
            {item}
            <span className="ticker-dot text-acid">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
