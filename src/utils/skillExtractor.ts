export interface ExtractedSkills {
  coreCS: string[];
  languages: string[];
  web: string[];
  data: string[];
  cloudDevOps: string[];
  testing: string[];
}

export type SkillConfidence = 'know' | 'practice';

export interface AnalysisResult {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  plan: DayPlan[];
  checklist: RoundChecklist[];
  questions: string[];
  readinessScore: number;
  skillConfidenceMap?: Record<string, SkillConfidence>;
}

export interface DayPlan {
  day: number;
  title: string;
  tasks: string[];
}

export interface RoundChecklist {
  round: number;
  title: string;
  items: string[];
}

const SKILL_KEYWORDS = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms', 'Object Oriented', 'Database', 'Operating System'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Golang', 'Rust', 'Swift', 'Kotlin'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS', 'Frontend', 'Backend', 'Full Stack'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Database', 'NoSQL', 'Elasticsearch'],
  cloudDevOps: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Jenkins', 'GitHub Actions', 'Terraform', 'Cloud'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Jest', 'Testing', 'Automation'],
};

export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase();
  const skills: ExtractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloudDevOps: [],
    testing: [],
  };

  // Helper to check if keyword exists in text
  const hasKeyword = (keyword: string): boolean => {
    // Handle special cases like C++, C#
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(text);
  };

  // Extract skills for each category
  Object.entries(SKILL_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (hasKeyword(keyword)) {
        const key = category as keyof ExtractedSkills;
        // Normalize C/C++ naming
        const normalized = keyword === 'C' ? 'C' : 
                          keyword === 'C++' ? 'C++' :
                          keyword === 'C#' ? 'C#' :
                          keyword === 'Golang' ? 'Go' :
                          keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
        
        if (!skills[key].includes(normalized)) {
          skills[key].push(normalized);
        }
      }
    });
  });

  return skills;
}

export function calculateReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdLength: number
): number {
  let score = 35;

  // +5 per detected category (max 30)
  const categoriesPresent = Object.values(skills).filter(arr => arr.length > 0).length;
  score += Math.min(categoriesPresent * 5, 30);

  // +10 if company name provided
  if (company && company.trim().length > 0) {
    score += 10;
  }

  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10;
  }

  // +10 if JD length > 800 chars
  if (jdLength > 800) {
    score += 10;
  }

  return Math.min(score, 100);
}

export function generateChecklist(skills: ExtractedSkills): RoundChecklist[] {
  const hasSkill = (category: keyof ExtractedSkills, skill?: string): boolean => {
    if (skill) {
      return skills[category].some(s => s.toLowerCase() === skill.toLowerCase());
    }
    return skills[category].length > 0;
  };



  return [
    {
      round: 1,
      title: 'Aptitude / Basics',
      items: [
        'Practice quantitative aptitude (percentages, ratios, probability)',
        'Solve logical reasoning puzzles',
        'Review verbal ability and comprehension',
        'Complete 2-3 timed mock aptitude tests',
        hasSkill('coreCS', 'OS') ? 'Review OS basics: processes, threads, memory management' : 'Review basic computer fundamentals',
        hasSkill('coreCS', 'Networks') ? 'Study network protocols and OSI model' : 'Learn basic networking concepts',
      ].filter(Boolean),
    },
    {
      round: 2,
      title: 'DSA + Core CS',
      items: [
        'Arrays and Strings manipulation problems',
        'Linked Lists and Trees traversal',
        'Graph algorithms (BFS, DFS)',
        'Sorting and Searching algorithms',
        'Dynamic Programming basics',
        hasSkill('coreCS', 'OOP') ? 'OOP concepts: inheritance, polymorphism, encapsulation' : 'Review object-oriented principles',
        hasSkill('coreCS', 'DBMS') ? 'SQL queries: joins, subqueries, normalization' : 'Basic database concepts',
        ...(hasSkill('languages', 'Java') ? ['Java collections framework and multithreading'] : []),
        ...(hasSkill('languages', 'Python') ? ['Python data structures and list comprehensions'] : []),
      ].filter(Boolean),
    },
    {
      round: 3,
      title: 'Tech Interview (Projects + Stack)',
      items: [
        'Prepare project explanations with architecture diagrams',
        'Review your role and contributions in each project',
        ...(hasSkill('web', 'React') ? ['React hooks, state management, component lifecycle'] : []),
        ...(hasSkill('web', 'Node.js') ? ['Node.js event loop, async programming, Express middleware'] : []),
        ...(hasSkill('data', 'SQL') ? ['Database optimization, indexing, query performance'] : []),
        ...(hasSkill('cloudDevOps', 'AWS') ? ['AWS services: EC2, S3, Lambda basics'] : []),
        ...(hasSkill('cloudDevOps', 'Docker') ? ['Docker containers, images, docker-compose'] : []),
        ...(hasSkill('testing', 'Selenium') || hasSkill('testing', 'Cypress') ? ['Testing frameworks and automation strategies'] : []),
        'System design basics for your experience level',
        'Be ready to write code on screen/whiteboard',
      ].filter(Boolean),
    },
    {
      round: 4,
      title: 'Managerial / HR',
      items: [
        'Prepare "Tell me about yourself" pitch (2 minutes)',
        'Review common HR questions: strengths, weaknesses, goals',
        'Research company culture and recent news',
        'Prepare questions to ask the interviewer',
        'Practice salary negotiation talking points',
        'Review your resume thoroughly - every detail',
        'Prepare STAR format stories for behavioral questions',
      ],
    },
  ];
}

export function generatePlan(skills: ExtractedSkills): DayPlan[] {
  const hasSkill = (category: keyof ExtractedSkills, skill?: string): boolean => {
    if (skill) {
      return skills[category].some(s => s.toLowerCase() === skill.toLowerCase());
    }
    return skills[category].length > 0;
  };

  const basePlan: DayPlan[] = [
    {
      day: 1,
      title: 'Basics + Core CS',
      tasks: [
        'Review OS fundamentals: processes, threads, memory',
        'Study DBMS basics: ACID, normalization, indexing',
        'Practice 5 aptitude problems',
        hasSkill('coreCS', 'Networks') ? 'Review networking: OSI model, TCP/IP' : 'Learn basic networking concepts',
      ].filter(Boolean),
    },
    {
      day: 2,
      title: 'Core CS Deep Dive',
      tasks: [
        'OOP principles with examples in your language',
        'SQL practice: joins, aggregations, subqueries',
        'Computer organization basics',
        'Solve 2 logic puzzles',
      ],
    },
    {
      day: 3,
      title: 'DSA + Coding',
      tasks: [
        'Arrays and Strings: 5 problems',
        'Linked List: 3 problems (reverse, cycle detection)',
        'Review time/space complexity analysis',
      ],
    },
    {
      day: 4,
      title: 'Advanced DSA',
      tasks: [
        'Trees and Graphs: 4 problems',
        'Dynamic Programming: 2-3 basic problems',
        'Sorting algorithms review',
        'Practice binary search variations',
      ],
    },
    {
      day: 5,
      title: 'Project + Resume',
      tasks: [
        'Update resume with quantified achievements',
        'Prepare project elevator pitch (2 min)',
        'Document technical decisions in projects',
        ...(hasSkill('web', 'React') ? ['Review React concepts: hooks, context, performance'] : []),
        ...(hasSkill('web', 'Node.js') ? ['Review Node.js: event loop, async patterns'] : []),
        'Align resume with JD keywords',
      ].filter(Boolean),
    },
    {
      day: 6,
      title: 'Mock Interview',
      tasks: [
        'Practice coding problems on whiteboard/screen',
        'Record yourself answering behavioral questions',
        'Mock system design discussion (if applicable)',
        'Review common "trick" questions',
        'Practice explaining your projects clearly',
      ],
    },
    {
      day: 7,
      title: 'Revision + Weak Areas',
      tasks: [
        'Review mistakes from practice problems',
        'Focus on weak areas identified during prep',
        'Light coding practice (2-3 problems)',
        'Rest and mental preparation',
        'Prepare interview day logistics',
      ],
    },
  ];

  // If no specific skills detected, add general guidance
  if (!Object.values(skills).some(arr => arr.length > 0)) {
    basePlan[0].tasks.unshift('Focus on General Fresher Stack: Java/Python, SQL, Basic Web');
  }

  return basePlan;
}

export function generateQuestions(skills: ExtractedSkills): string[] {
  const hasSkill = (category: keyof ExtractedSkills, skill: string): boolean => {
    return skills[category].some(s => s.toLowerCase() === skill.toLowerCase());
  };

  const questions: string[] = [];

  // Core CS questions
  if (hasSkill('coreCS', 'DSA') || skills.coreCS.length > 0) {
    questions.push(
      'How would you optimize search in a sorted array? Compare linear vs binary search.',
      'Explain the difference between array and linked list. When would you use each?',
      'What is the time complexity of quicksort and when does it degrade?'
    );
  }

  if (hasSkill('coreCS', 'OOP')) {
    questions.push(
      'Explain the four pillars of OOP with real-world examples.',
      'What is polymorphism? Explain compile-time vs runtime polymorphism.',
      'Difference between abstract class and interface?'
    );
  }

  if (hasSkill('coreCS', 'DBMS')) {
    questions.push(
      'Explain database normalization. Why is it important?',
      'What are ACID properties? Explain each with examples.',
      'Difference between INNER JOIN and LEFT JOIN?'
    );
  }

  // Language-specific questions
  if (hasSkill('languages', 'Java')) {
    questions.push(
      'Explain Java memory model: heap vs stack.',
      'What is the difference between String, StringBuilder, and StringBuffer?',
      'Explain Java collections framework: List, Set, Map differences.'
    );
  }

  if (hasSkill('languages', 'Python')) {
    questions.push(
      'Explain Python GIL and its implications.',
      'What are decorators in Python? Give an example.',
      'Difference between lists and tuples? When to use each?'
    );
  }

  if (hasSkill('languages', 'JavaScript') || hasSkill('languages', 'TypeScript')) {
    questions.push(
      'Explain JavaScript event loop and call stack.',
      'What are closures? Provide a practical example.',
      'Difference between == and === in JavaScript?'
    );
  }

  // Web questions
  if (hasSkill('web', 'React')) {
    questions.push(
      'Explain React hooks: useState, useEffect, useContext.',
      'What is virtual DOM and how does React use it?',
      'Compare Redux vs Context API vs Zustand for state management.'
    );
  }

  if (hasSkill('web', 'Node.js')) {
    questions.push(
      'Explain Node.js event loop phases.',
      'What is middleware in Express.js?',
      'How would you handle errors in an Express application?'
    );
  }

  // Data questions
  if (hasSkill('data', 'SQL')) {
    questions.push(
      'Explain indexing in databases. When does it help and when does it hurt?',
      'What is database sharding and when would you use it?',
      'Write a query to find the second highest salary.'
    );
  }

  if (hasSkill('data', 'MongoDB')) {
    questions.push(
      'When would you choose MongoDB over SQL databases?',
      'Explain MongoDB aggregation pipeline.',
      'How does MongoDB handle relationships between collections?'
    );
  }

  // Cloud/DevOps questions
  if (hasSkill('cloudDevOps', 'AWS')) {
    questions.push(
      'Explain the difference between EC2, Lambda, and ECS.',
      'What is S3 and what are its use cases?',
      'How would you secure an AWS VPC?'
    );
  }

  if (hasSkill('cloudDevOps', 'Docker')) {
    questions.push(
      'What is the difference between a Docker image and container?',
      'Explain Docker volumes and when to use them.',
      'How would you optimize a Docker image size?'
    );
  }

  // Testing questions
  if (skills.testing.length > 0) {
    questions.push(
      'What is the difference between unit, integration, and e2e testing?',
      'Explain TDD and its benefits.',
      'How would you test a React component?'
    );
  }

  // General questions if few specific ones
  if (questions.length < 5) {
    questions.push(
      'Tell me about a challenging project you worked on.',
      'How do you keep up with new technologies?',
      'Explain a technical concept to a non-technical person.',
      'What is your approach to debugging a complex issue?',
      'How do you handle conflicts in a team?'
    );
  }

  return questions.slice(0, 10);
}

export function analyzeJD(
  company: string,
  role: string,
  jdText: string
): AnalysisResult {
  const skills = extractSkills(jdText);
  const score = calculateReadinessScore(skills, company, role, jdText.length);
  const plan = generatePlan(skills);
  const checklist = generateChecklist(skills);
  const questions = generateQuestions(skills);

  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company: company || 'Unknown Company',
    role: role || 'Unknown Role',
    jdText,
    extractedSkills: skills,
    plan,
    checklist,
    questions,
    readinessScore: score,
  };
}
