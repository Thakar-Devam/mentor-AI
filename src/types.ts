export interface CareerPlan {
  realityCheck: {
    suitable: boolean;
    verdict: string;
    difficulty: number;
    competition: number;
    timeToJobMonths: number;
    aiRisk: number;
    gaps: string[];
    dailyTasks: string[];
    roles: { title: string; salary: string; desc: string }[];
    alternatives: string[];
  };
  stages: Stage[];
  realWorldProof: {
    name: string;
    background: string;
    avatarEmoji: string;
    timeline: string;
    path: string[];
    outcome: string;
  }[];
  jobReality: {
    entryLevel: string;
    timeToFirstIncome: string;
    freelancePlatforms: string[];
    jobPlatforms: string[];
    startupIdeas: string[];
    topCertifications: string[];
  };
  commonMistakes: { title: string; desc: string }[];
  mockInterviewQuestions: { q: string; type: "Behavioural" | "Technical" | "Situational" }[];
}

export interface Stage {
  stage: number;
  name: string;
  duration: string;
  outcome: string;
  skills: string[];
  topics: string[];
  resources: { name: string; type: string; icon: string; platform: string }[];
  weeklyPlan: { week: string; focus: string; tasks: string[] }[];
  miniProject: string;
  test: {
    questions: { q: string; options: string[]; correct: number; explanation: string }[];
    passingScore: number;
  };
}

export interface Post12thGuideData {
  recommendation: {
    bestStream: string;
    reason: string;
    alternativeFields: string[];
  };
  exams: {
    name: string;
    fullForm: string;
    eligibility: string;
    dates: string;
    difficulty: string;
    relevantFor: string;
  }[];
  colleges: {
    name: string;
    type: string;
    location: string;
    cutoff: string;
    fees: string;
    rankingNote: string;
  }[];
  prepPlan: { period: string; title: string; desc: string }[];
  importantFacts: string[];
}

export interface Scheme {
  name: string;
  organisation: string;
  type: string;
  icon: string;
  benefit: string;
  eligibility: string;
  desc: string;
  applicationSteps: string;
  officialSite: string;
  tags: string[];
}

export interface SchemeFinderData {
  totalFound: number;
  schemes: Scheme[];
  importantNote: string;
}

export interface StudyContent {
  summary: string;
  keyPoints: string[];
  flashcards: { question: string; answer: string }[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
    difficulty: "easy" | "medium" | "hard";
    explanation: string;
  }[];
}

export interface InterviewEval {
  overallScore: number;
  verdict: string;
  perQuestion: {
    qNum: number;
    score: number;
    scoreLabel: string;
    feedback: string;
  }[];
  topStrengths: string[];
  topImprovements: string[];
  nextSteps: string[];
}
