import { GoogleGenAI } from "@google/genai";
import { CareerPlan, Post12thGuideData, SchemeFinderData, StudyContent, InterviewEval } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const MODEL = "gemini-2.5-flash";

function safeParseJSON(text: string) {
  const clean = text.replace(/```json[\s\S]*?```|```[\s\S]*?```/g, (m) => m.replace(/```json|```/g, "")).replace(/```/g, "").trim();
  return JSON.parse(clean);
}

function stagePrompt(goal: string, from: number, to: number) {
  const nums = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  return `Career mentor. Goal: "${goal}".
Generate stages ${from} to ${to} of a 10-stage learning plan.

Return ONLY JSON:
{
  "stages": [
    {
      "stage": ${from},
      "name": "short name",
      "duration": "X weeks",
      "outcome": "one sentence",
      "skills": ["s1","s2","s3"],
      "topics": ["t1","t2","t3"],
      "resources": [{"name":"Name","type":"Course","icon":"🎓","platform":"YouTube"}],
      "weeklyPlan": [{"week":"Week 1","focus":"focus","tasks":["t1","t2"]}],
      "miniProject": "one sentence project",
      "test": {
        "questions": [
          {"q":"Q?","options":["A","B","C","D"],"correct":0,"explanation":"why"}
        ],
        "passingScore": 70
      }
    }
  ]
}
- Stages: ${nums.join(",")} only
- 2 test questions per stage
- Keep all strings SHORT (under 80 chars)
- Return ONLY JSON, no markdown`;
}

export async function generateCareerPlan(p: {
  goal: string;
  mode: string;
  education: string;
  skills: string;
  interests: string;
  financial: string;
  country: string;
  time: string;
}): Promise<CareerPlan> {

  const ctx = `Goal="${p.goal}", Education="${p.education}", Skills="${p.skills}", Country="${p.country}"`;

  const promptRC = `Career mentor. ${ctx}
Return ONLY JSON:
{
  "realityCheck": {
    "suitable": true,
    "verdict": "2 sentence honest assessment",
    "difficulty": 70,
    "competition": 60,
    "timeToJobMonths": 8,
    "aiRisk": 30,
    "gaps": ["g1","g2","g3"],
    "dailyTasks": ["t1","t2","t3","t4"],
    "roles": [{"title":"Title","salary":"₹X-Y LPA","desc":"short desc"}],
    "alternatives": ["alt1","alt2"]
  }
}
Keep all strings under 100 chars. Return ONLY JSON, no markdown.`;

  const promptExtra = `Career mentor for "${p.goal}" in ${p.country}.
Return ONLY JSON:
{
  "realWorldProof": [
    {"name":"Name","background":"bg","avatarEmoji":"👨‍💻","timeline":"6 months","path":["s1","s2","s3"],"outcome":"short outcome"}
  ],
  "jobReality": {
    "entryLevel":"₹3-6 LPA",
    "timeToFirstIncome":"4-6 months",
    "freelancePlatforms":["p1","p2"],
    "jobPlatforms":["p1","p2"],
    "startupIdeas":["i1","i2"],
    "topCertifications":["c1","c2"]
  },
  "commonMistakes": [{"title":"title","desc":"short desc"}],
  "mockInterviewQuestions": [
    {"q":"Question?","type":"Technical"},
    {"q":"Question?","type":"Behavioural"},
    {"q":"Question?","type":"Situational"}
  ]
}
Keep all strings under 100 chars. Return ONLY JSON, no markdown.`;

  const [rcRes, s1to3Res, s4to7Res, s8to10Res, extraRes] = await Promise.all([
    ai.models.generateContent({ model: MODEL, contents: promptRC, config: { responseMimeType: "application/json", maxOutputTokens: 2048 } }),
    ai.models.generateContent({ model: MODEL, contents: stagePrompt(p.goal, 1, 3), config: { responseMimeType: "application/json", maxOutputTokens: 4096 } }),
    ai.models.generateContent({ model: MODEL, contents: stagePrompt(p.goal, 4, 7), config: { responseMimeType: "application/json", maxOutputTokens: 4096 } }),
    ai.models.generateContent({ model: MODEL, contents: stagePrompt(p.goal, 8, 10), config: { responseMimeType: "application/json", maxOutputTokens: 4096 } }),
    ai.models.generateContent({ model: MODEL, contents: promptExtra, config: { responseMimeType: "application/json", maxOutputTokens: 2048 } }),
  ]);

  const rc = safeParseJSON(rcRes.text || "{}");
  const s1 = safeParseJSON(s1to3Res.text || "{}");
  const s2 = safeParseJSON(s4to7Res.text || "{}");
  const s3 = safeParseJSON(s8to10Res.text || "{}");
  const extra = safeParseJSON(extraRes.text || "{}");

  return {
    realityCheck: rc.realityCheck,
    stages: [...(s1.stages || []), ...(s2.stages || []), ...(s3.stages || [])],
    realWorldProof: extra.realWorldProof || [],
    jobReality: extra.jobReality,
    commonMistakes: extra.commonMistakes || [],
    mockInterviewQuestions: extra.mockInterviewQuestions || [],
  };
}

export async function generatePost12thGuide(profile: {
  stream: string;
  marks: string;
  city: string;
  budget: string;
  interests: string;
  dream: string;
}): Promise<Post12thGuideData> {
  const prompt = `Expert Indian education counsellor.
Student: Stream="${profile.stream}", Marks="${profile.marks}%", City="${profile.city}", Budget="${profile.budget}", Interests="${profile.interests}", Dream="${profile.dream}".

Return ONLY JSON:
{
  "recommendation": {"bestStream":"string","reason":"string","alternativeFields":["f1","f2"]},
  "exams": [{"name":"JEE","fullForm":"Joint Entrance Exam","eligibility":"string","dates":"string","difficulty":"High","relevantFor":"string"}],
  "colleges": [{"name":"Name","type":"Government","location":"City","cutoff":"string","fees":"₹X/year","rankingNote":"string"}],
  "prepPlan": [{"period":"Month 1-2","title":"title","desc":"desc"}],
  "importantFacts": ["f1","f2","f3"]
}
Keep strings under 120 chars. Return ONLY JSON, no markdown.`;

  const res = await ai.models.generateContent({
    model: MODEL, contents: prompt,
    config: { responseMimeType: "application/json", maxOutputTokens: 3000 },
  });
  return safeParseJSON(res.text || "{}");
}

export async function findSchemes(profile: {
  category: string; state: string; age: string;
  education: string; income: string; goal: string;
}): Promise<SchemeFinderData> {
  const prompt = `Expert on Indian government schemes.
Profile: Category="${profile.category}", State="${profile.state}", Age="${profile.age}", Education="${profile.education}", Income="${profile.income}", Goal="${profile.goal}".

Return ONLY JSON:
{
  "totalFound": 5,
  "schemes": [{"name":"Name","organisation":"Ministry","type":"Scholarship","icon":"🎓","benefit":"₹X","eligibility":"who","desc":"short desc","applicationSteps":"how to apply","officialSite":"https://gov.in","tags":["t1","t2"]}],
  "importantNote": "short note"
}
Keep strings under 120 chars. Return ONLY JSON, no markdown.`;

  const res = await ai.models.generateContent({
    model: MODEL, contents: prompt,
    config: { responseMimeType: "application/json", maxOutputTokens: 3000 },
  });
  return safeParseJSON(res.text || "{}");
}

export async function genStudy(topic: string): Promise<StudyContent> {
  const prompt = `Expert educator. Study material for: "${topic}".

Return ONLY JSON:
{
  "summary": "2 paragraph summary",
  "keyPoints": ["p1","p2","p3","p4","p5"],
  "flashcards": [{"question":"Q?","answer":"A"}],
  "quiz": [{"question":"Q?","options":["A","B","C","D"],"correct":0,"difficulty":"medium","explanation":"why"}]
}
Return ONLY JSON, no markdown.`;

  const res = await ai.models.generateContent({
    model: MODEL, contents: prompt,
    config: { responseMimeType: "application/json", maxOutputTokens: 3000 },
  });
  return safeParseJSON(res.text || "{}");
}

export async function evalInterview(questions: any[], answers: Record<number, string>, goal: string): Promise<InterviewEval> {
  const qa = questions.map((q, i) => `Q${i + 1}[${q.type}]: ${q.q}\nA: ${answers[i] || "(no answer)"}`).join("\n\n");

  const prompt = `Senior HR interviewer. Evaluate answers for "${goal}" candidate.\n\n${qa}\n\n
Return ONLY JSON:
{
  "overallScore": 75,
  "verdict": "2 sentence assessment",
  "perQuestion": [{"qNum":1,"score":80,"scoreLabel":"Good","feedback":"short feedback"}],
  "topStrengths": ["s1","s2","s3"],
  "topImprovements": ["i1","i2","i3"],
  "nextSteps": ["n1","n2","n3"]
}
Return ONLY JSON, no markdown.`;

  const res = await ai.models.generateContent({
    model: MODEL, contents: prompt,
    config: { responseMimeType: "application/json", maxOutputTokens: 2048 },
  });
  return safeParseJSON(res.text || "{}");
}