import { useState } from "react";
import { PEERS } from "../constants";

interface CommunityProps {
  profile: any;
}

export function Community({ profile }: CommunityProps) {
  const [intro, setIntro] = useState("");
  const [copied, setCopied] = useState(false);
  const goal = profile.goal?.split(" ").slice(0, 4).join(" ") || "a tech career";
  const myIntro = `Hi! I'm from ${profile.country} and I'm learning ${goal} using MentorAI. Currently on Stage 1. Looking for an accountability partner! DM me if you're on a similar path. 🤝`;
  const filteredPeers = PEERS.filter((p) => p.stage <= 2);

  const copyIntro = (text?: string) => {
    navigator.clipboard?.writeText(text || intro || myIntro);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="community-wrap grid grid-cols-[1fr_280px] gap-[2px] bg-pb md:grid-cols-1">
      <div>
        <div className="bg-white border border-pb2 p-4 px-5 mb-4 rounded-lg">
          <div className="font-display font-black text-base mb-1">Students on similar paths</div>
          <div className="text-[13px] text-mid leading-[1.65]">These students are at the same stage as you. Connect with them for accountability, peer review, and moral support.</div>
        </div>
        <div className="peer-feed flex flex-col gap-[2px]">
          {filteredPeers.map((p, i) => (
            <div key={i} className="peer-card bg-white border-[1.5px] border-pb p-[22px] transition-all border-l-[3px] border-l-transparent hover:bg-cream hover:border-l-ch">
              <div className="peer-top flex items-center gap-3.5 mb-3.5">
                <div className="peer-av w-11 h-11 border-[1.5px] border-pb2 flex items-center justify-center text-xl shrink-0 bg-cream">{p.emoji}</div>
                <div className="flex-1">
                  <div className="peer-name font-display font-black text-[18px] uppercase tracking-[0.04em] mb-0.5">{p.name}</div>
                  <div className="peer-info font-display text-[11px] text-pale uppercase tracking-[0.1em] font-bold">{p.city} · studying {p.goal}</div>
                </div>
                <div className="peer-stage-badge bg-ch text-acid font-display text-[10px] font-bold px-[11px] py-1 ml-auto whitespace-nowrap uppercase tracking-[0.12em]">Stage {p.stage}</div>
              </div>
              <div className="peer-note text-[13px] text-mid leading-[1.75] mb-3.5 bg-cream border-[1.5px] border-pb p-3 px-3.5 border-l-[3px] border-l-pb2">"{p.note}"</div>
              <button
                type="button"
                className="peer-connect-btn bg-transparent border-[1.5px] border-ch text-ch font-display text-xs font-bold p-2.5 px-4 transition-colors w-full uppercase tracking-[0.12em] cursor-pointer hover:bg-ch hover:text-acid"
                onClick={() => {
                  const msg = `Hi ${p.name.split(" ")[0]}! I saw your note on MentorAI — I'm also learning ${goal} and on Stage 1. Would love to connect and be accountability partners! I'm from ${profile.country}. Let's study together? 🤝`;
                  setIntro(msg);
                  copyIntro(msg);
                }}
              >
                👋 Generate connection message
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="comm-sidebar flex flex-col gap-[2px]">
        <div className="cs-card bg-white border-[1.5px] border-pb p-5">
          <div className="cs-title font-display text-[15px] font-black uppercase tracking-[0.06em] mb-[11px] pb-[9px] border-b-[1.5px] border-pb">Your intro message</div>
          <div className="text-xs text-mid mb-2.5 leading-[1.65]">Use this to introduce yourself in WhatsApp groups, Telegram or Discord communities for your field.</div>
          <div className="cs-intro-box bg-cream border-[1.5px] border-pb border-l-[3px] border-l-ch p-3 px-3.5 text-xs text-mid leading-[1.78] mb-[11px]">{myIntro}</div>
          <button
            type="button"
            className="cs-copy-btn w-full bg-ch text-acid font-display font-black border-none p-2.5 text-[13px] uppercase tracking-[0.12em] cursor-pointer transition-colors hover:bg-acid hover:text-ch"
            onClick={() => copyIntro(myIntro)}
          >
            {copied ? "✓ Copied!" : "📋 Copy intro message"}
          </button>
        </div>

        <div className="cs-card bg-white border-[1.5px] border-pb p-5">
          <div className="cs-title font-display text-[15px] font-black uppercase tracking-[0.06em] mb-[11px] pb-[9px] border-b-[1.5px] border-pb">Where to find peers</div>
          {[
            ["💬", `Telegram groups for your field (search: '${goal} India Telegram')`],
            ["📱", "WhatsApp communities — post in alumni groups"],
            ["👥", "Reddit: r/developersIndia, r/UPSC, r/Indian_Academia"],
            ["🤝", `LinkedIn — connect with people posting about ${goal}`],
            ["🌐", "Discord servers for your tech community"],
          ].map(([ic, t], i) => (
            <div key={i} className="flex gap-2 mb-2 text-xs text-mid leading-[1.55]">
              <span className="shrink-0">{ic}</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}