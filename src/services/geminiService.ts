export interface AnalysisResult {
  score: number;
  summary: string;
  target_users: string[];
  problem: string;
  features: string[];
  market_potential: string;
  risks: string[];
  future_scope: string[];
  next_steps: string[];
}

export async function analyzeIdea(idea: string): Promise<AnalysisResult> {
  // Simulate loading for 1-1.5 seconds
  const delay = Math.floor(Math.random() * 500) + 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  const analysisResult: AnalysisResult = {
    score: 8.4,
    summary: "An AI-powered learning app that transforms boring study topics into engaging, easy-to-understand content using stories, quizzes, and personalized explanations.",
    target_users: [
      "High school students",
      "University students",
      "Exam preparation learners",
      "Students struggling with focus"
    ],
    problem: "Students often find studying boring, overwhelming, and difficult to stay consistent with.",
    features: [
      "AI-powered simple explanations",
      "Story-based learning",
      "Interactive quizzes",
      "Personalized study plans",
      "Progress tracking"
    ],
    market_potential: "High demand due to large student population and need for engaging learning tools.",
    risks: [
      "High competition",
      "User retention challenges",
      "Content accuracy concerns"
    ],
    future_scope: [
      "Voice-based tutor",
      "Gamified learning",
      "Real-time doubt solving"
    ],
    next_steps: [
      "Build MVP",
      "Test with students",
      "Iterate based on feedback"
    ]
  };

  return analysisResult;
}
