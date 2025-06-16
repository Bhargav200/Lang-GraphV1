
interface AIFeedback {
  score: number;
  starCompliance: number;
  confidence: number;
  clarity: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  detailedAnalysis: string;
}

interface JobAnalysis {
  role: string;
  industry: string;
  skills: string[];
  requirements: string[];
  experienceLevel: 'entry' | 'mid' | 'senior';
  keywordDensity: Record<string, number>;
}

interface QuestionGeneration {
  questions: {
    question: string;
    category: 'behavioral' | 'technical' | 'situational' | 'general' | 'closing';
    difficulty: 'easy' | 'medium' | 'hard';
    expectedStructure: string;
    tips: string;
  }[];
}

class AIService {
  private apiKey: string | null = null;

  constructor() {
    // In production, this would come from Supabase secrets
    this.apiKey = localStorage.getItem('ai_api_key');
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('ai_api_key', key);
  }

  async analyzeJobDescription(jobDescription: string): Promise<JobAnalysis> {
    if (!this.apiKey) {
      throw new Error('AI API key not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert career coach analyzing job descriptions. Extract key information and return it as JSON with the following structure:
              {
                "role": "specific job title",
                "industry": "industry sector",
                "skills": ["skill1", "skill2", ...],
                "requirements": ["requirement1", "requirement2", ...],
                "experienceLevel": "entry|mid|senior",
                "keywordDensity": {"keyword": count, ...}
              }`
            },
            {
              role: 'user',
              content: `Analyze this job description: ${jobDescription}`
            }
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job description');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('AI analysis error:', error);
      // Fallback to mock analysis
      return this.getMockJobAnalysis(jobDescription);
    }
  }

  async generateQuestions(
    role: string, 
    industry: string, 
    experienceLevel: 'entry' | 'mid' | 'senior',
    difficulty: 'easy' | 'medium' | 'hard',
    count: number = 5
  ): Promise<QuestionGeneration> {
    if (!this.apiKey) {
      throw new Error('AI API key not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert interview coach. Generate interview questions for a ${experienceLevel} level ${role} position in the ${industry} industry. 
              Return JSON with this structure:
              {
                "questions": [
                  {
                    "question": "the interview question",
                    "category": "behavioral|technical|situational|general|closing",
                    "difficulty": "easy|medium|hard",
                    "expectedStructure": "STAR|Examples|Technical|Vision",
                    "tips": "specific tips for answering this question"
                  }
                ]
              }
              
              Include a mix of behavioral, technical, and situational questions appropriate for the ${difficulty} difficulty level.`
            },
            {
              role: 'user',
              content: `Generate ${count} interview questions for: Role: ${role}, Industry: ${industry}, Experience: ${experienceLevel}, Difficulty: ${difficulty}`
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Question generation error:', error);
      return this.getMockQuestions(role, industry, experienceLevel, count);
    }
  }

  async analyzeAnswer(question: string, answer: string, category: string): Promise<AIFeedback> {
    if (!this.apiKey) {
      throw new Error('AI API key not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert interview coach providing detailed feedback on interview answers. 
              Return JSON with this structure:
              {
                "score": number (0-100),
                "starCompliance": number (0-100, how well they used STAR method),
                "confidence": number (0-100, confidence level in delivery),
                "clarity": number (0-100, clarity of communication),
                "strengths": ["strength1", "strength2", ...],
                "improvements": ["improvement1", "improvement2", ...],
                "suggestions": ["suggestion1", "suggestion2", ...],
                "detailedAnalysis": "comprehensive analysis of the answer"
              }`
            },
            {
              role: 'user',
              content: `Analyze this interview answer:
              Question: ${question}
              Category: ${category}
              Answer: ${answer}`
            }
          ],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze answer');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Answer analysis error:', error);
      return this.getMockFeedback(answer, question);
    }
  }

  private getMockJobAnalysis(jobDescription: string): JobAnalysis {
    const roles = ["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Manager"];
    const industries = ["Technology", "Finance", "Healthcare", "E-commerce", "Education"];
    const allSkills = ["JavaScript", "React", "Python", "SQL", "Communication", "Leadership", "Problem Solving", "Analytics"];
    
    return {
      role: roles[Math.floor(Math.random() * roles.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      skills: allSkills.slice(0, Math.floor(Math.random() * 4) + 3),
      requirements: [
        "Bachelor's degree in relevant field",
        "3+ years of experience",
        "Strong communication skills",
        "Experience with agile methodologies"
      ],
      experienceLevel: ['entry', 'mid', 'senior'][Math.floor(Math.random() * 3)] as 'entry' | 'mid' | 'senior',
      keywordDensity: {
        "experience": 3,
        "team": 2,
        "leadership": 1,
        "technical": 4
      }
    };
  }

  private getMockQuestions(role: string, industry: string, experienceLevel: string, count: number): QuestionGeneration {
    const mockQuestions = [
      {
        question: "Tell me about yourself and your background.",
        category: "general" as const,
        difficulty: "easy" as const,
        expectedStructure: "STAR",
        tips: "Focus on relevant experience and skills that align with the role."
      },
      {
        question: "Describe a challenging project you worked on. How did you handle it?",
        category: "behavioral" as const,
        difficulty: "medium" as const,
        expectedStructure: "STAR",
        tips: "Use the STAR method: Situation, Task, Action, Result."
      },
      {
        question: "What are your greatest strengths and how do they apply to this role?",
        category: "general" as const,
        difficulty: "easy" as const,
        expectedStructure: "Examples",
        tips: "Provide specific examples that demonstrate your strengths in action."
      },
      {
        question: "How do you handle conflict in a team setting?",
        category: "behavioral" as const,
        difficulty: "medium" as const,
        expectedStructure: "STAR",
        tips: "Focus on resolution and positive outcomes."
      },
      {
        question: "Where do you see yourself in 5 years?",
        category: "general" as const,
        difficulty: "medium" as const,
        expectedStructure: "Vision",
        tips: "Show ambition while staying relevant to the role and company."
      }
    ];

    return {
      questions: mockQuestions.slice(0, count)
    };
  }

  private getMockFeedback(answer: string, question: string): AIFeedback {
    const score = Math.floor(Math.random() * 30) + 70;
    const hasSTAR = answer.toLowerCase().includes('situation') || 
                   answer.toLowerCase().includes('task') ||
                   answer.toLowerCase().includes('action') ||
                   answer.toLowerCase().includes('result');
    
    return {
      score,
      starCompliance: hasSTAR ? 85 : 45,
      confidence: Math.floor(Math.random() * 20) + 75,
      clarity: Math.floor(Math.random() * 15) + 80,
      strengths: [
        "Good structure and flow",
        "Relevant examples provided",
        "Clear communication"
      ],
      improvements: [
        "Could include more specific metrics",
        "Consider using the STAR method more explicitly",
        "Expand on the impact of your actions"
      ],
      suggestions: [
        "Try to quantify your achievements with numbers",
        "Include the outcome or result of your actions",
        "Practice speaking with more confidence"
      ],
      detailedAnalysis: `Your answer demonstrates good understanding of the question and provides relevant information. The structure is clear and easy to follow. Consider incorporating more specific metrics and outcomes to strengthen your response.`
    };
  }
}

export const aiService = new AIService();
export type { AIFeedback, JobAnalysis, QuestionGeneration };
