import type { ExtractedSkills } from './skillExtractor';

export type CompanySize = 'startup' | 'mid' | 'enterprise';

export interface CompanyIntel {
  name: string;
  industry: string;
  size: CompanySize;
  sizeLabel: string;
  hiringFocus: string;
  typicalRounds: number;
}

export interface RoundInfo {
  roundNumber: number;
  title: string;
  description: string;
  whyItMatters: string;
  focusAreas: string[];
}

// Known enterprise companies
const ENTERPRISE_COMPANIES = [
  'amazon', 'microsoft', 'google', 'apple', 'meta', 'facebook',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'ibm',
  'oracle', 'sap', 'dell', 'hp', 'intel', 'cisco', 'adobe',
  'salesforce', 'vmware', 'broadcom', 'qualcomm', 'texas instruments',
  'hcl', 'tech mahindra', 'capgemini', 'deloitte', 'ey', 'kpmg',
  'pwc', 'jp morgan', 'goldman sachs', 'morgan stanley', 'wells fargo',
  'bank of america', 'citigroup', 'barclays', 'deutsche bank',
  'samsung', 'lg', 'sony', 'panasonic', 'toyota', 'honda',
  'mercedes', 'bmw', 'volkswagen', 'siemens', 'bosch',
];

// Known mid-size companies
const MIDSIZE_COMPANIES = [
  'zoho', 'freshworks', 'postman', 'razorpay', 'zerodha',
  'swiggy', 'zomato', 'ola', 'uber india', 'cred',
  'phonepe', 'paytm', 'byju', 'unacademy', 'vedantu',
  'meesho', 'nykaa', 'dream11', 'mpl', 'games24x7',
  'hashedin', 'thoughtworks', 'nagarro', 'xebia', 'intelliswift',
];

// Industry keywords
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  'Banking & Finance': ['bank', 'finance', 'fintech', 'payment', 'trading', 'investment', 'insurance'],
  'E-commerce': ['ecommerce', 'e-commerce', 'retail', 'marketplace', 'shopping'],
  'Healthcare': ['health', 'medical', 'pharma', 'hospital', 'clinic'],
  'EdTech': ['education', 'learning', 'edtech', 'training', 'course'],
  'SaaS': ['saas', 'software', 'cloud', 'platform'],
  'Automotive': ['automotive', 'car', 'vehicle', 'auto'],
};

export function generateCompanyIntel(companyName: string): CompanyIntel {
  const name = companyName.trim();
  const nameLower = name.toLowerCase();

  // Determine size
  let size: CompanySize = 'startup';
  if (ENTERPRISE_COMPANIES.some(c => nameLower.includes(c))) {
    size = 'enterprise';
  } else if (MIDSIZE_COMPANIES.some(c => nameLower.includes(c))) {
    size = 'mid';
  }

  // Determine industry
  let industry = 'Technology Services';
  for (const [ind, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some(k => nameLower.includes(k))) {
      industry = ind;
      break;
    }
  }

  // Size label and typical rounds
  const sizeInfo = {
    startup: { label: 'Startup (<200)', rounds: 3 },
    mid: { label: 'Mid-size (200-2000)', rounds: 4 },
    enterprise: { label: 'Enterprise (2000+)', rounds: 4 },
  };

  // Hiring focus based on size
  const hiringFocus = {
    startup: 'Practical problem solving + stack depth + cultural fit. Expect hands-on coding and real-world scenarios.',
    mid: 'Balanced approach: core fundamentals + practical skills + growth mindset.',
    enterprise: 'Structured DSA + core fundamentals + process orientation + scalability mindset.',
  };

  return {
    name,
    industry,
    size,
    sizeLabel: sizeInfo[size].label,
    hiringFocus: hiringFocus[size],
    typicalRounds: sizeInfo[size].rounds,
  };
}

export function generateRoundMapping(
  companyIntel: CompanyIntel,
  skills: ExtractedSkills
): RoundInfo[] {
  const hasSkill = (category: keyof ExtractedSkills, skill?: string): boolean => {
    if (skill) {
      return skills[category].some(s => s.toLowerCase() === skill.toLowerCase());
    }
    return skills[category].length > 0;
  };

  const hasDSA = hasSkill('coreCS', 'DSA') || hasSkill('coreCS');
  const hasWeb = hasSkill('web', 'React') || hasSkill('web', 'Node.js') || skills.web.length > 0;
  const hasSystemDesign = hasSkill('coreCS', 'System Design') || hasSkill('cloudDevOps');

  // Enterprise rounds
  if (companyIntel.size === 'enterprise') {
    return [
      {
        roundNumber: 1,
        title: 'Online Assessment',
        description: 'Aptitude + DSA coding problems on platform like HackerRank or Codility',
        whyItMatters: 'Filters candidates at scale. Tests basic problem-solving under time pressure.',
        focusAreas: [
          'Aptitude: Quantitative, logical reasoning',
          hasDSA ? 'DSA: Arrays, strings, basic algorithms' : 'Basic programming concepts',
          'Time management: 2-3 problems in 60-90 mins',
        ],
      },
      {
        roundNumber: 2,
        title: 'Technical Interview - I',
        description: 'Deep dive into DSA and core computer science fundamentals',
        whyItMatters: 'Validates depth of technical knowledge and problem-solving approach.',
        focusAreas: [
          hasDSA ? 'DSA: Trees, graphs, dynamic programming' : 'Programming fundamentals',
          hasSkill('coreCS', 'OOP') ? 'OOP concepts and design' : 'Basic CS concepts',
          hasSkill('coreCS', 'DBMS') ? 'SQL queries and database design' : 'Data management basics',
          'Code quality and edge case handling',
        ],
      },
      {
        roundNumber: 3,
        title: 'Technical Interview - II',
        description: 'Projects, system design (if applicable), and technology stack discussion',
        whyItMatters: 'Assesses practical experience and ability to design scalable solutions.',
        focusAreas: [
          'Project deep dive: Architecture, your contributions, challenges faced',
          hasSystemDesign ? 'System design: Scalability, databases, APIs' : 'Design principles',
          hasWeb ? 'Web technologies: React, Node.js, or your stack' : 'Relevant tech stack',
          'Behavioral: Team collaboration, conflict resolution',
        ],
      },
      {
        roundNumber: 4,
        title: 'HR / Managerial Round',
        description: 'Culture fit, salary discussion, and final evaluation',
        whyItMatters: 'Ensures alignment with company values and expectations.',
        focusAreas: [
          'Why this company? Research their products/services.',
          'Career goals and growth expectations',
          'Salary negotiation preparation',
          'Questions to ask the interviewer',
        ],
      },
    ];
  }

  // Startup rounds
  if (companyIntel.size === 'startup') {
    return [
      {
        roundNumber: 1,
        title: 'Practical Coding',
        description: 'Hands-on coding session, often on a real problem or take-home assignment',
        whyItMatters: 'Startups need people who can ship code quickly and solve real problems.',
        focusAreas: [
          hasWeb ? 'Build a small feature using React/Node.js' : 'Language-specific coding',
          'Code quality, readability, and best practices',
          'Git workflow and version control',
          'Testing approach',
        ],
      },
      {
        roundNumber: 2,
        title: 'System & Architecture Discussion',
        description: 'Discuss past projects, architecture decisions, and problem-solving approach',
        whyItMatters: 'Startups value engineers who can architect solutions with limited resources.',
        focusAreas: [
          'Deep dive into your best project',
          'Technical decisions: Why did you choose X over Y?',
          'Trade-offs: Speed vs quality, cost vs performance',
          hasSystemDesign ? 'Design a simple scalable system' : 'Basic architecture principles',
        ],
      },
      {
        roundNumber: 3,
        title: 'Culture Fit & Founder Chat',
        description: 'Meet the team, understand company vision, and assess mutual fit',
        whyItMatters: 'Startups are small teams. Cultural alignment is critical for success.',
        focusAreas: [
          'Your motivation for joining a startup',
          'Adaptability: Comfort with ambiguity and change',
          'Ownership mindset: Taking initiative',
          'Questions about company roadmap and growth',
        ],
      },
    ];
  }

  // Mid-size rounds (balanced)
  return [
    {
      roundNumber: 1,
      title: 'Online Test + Screening',
      description: 'Aptitude, DSA, and possibly a short coding assignment',
      whyItMatters: 'Initial filter to assess basic competency and problem-solving.',
      focusAreas: [
        'Aptitude and logical reasoning',
        hasDSA ? 'DSA: Medium difficulty problems' : 'Programming basics',
        'Possibly a take-home mini-project',
      ],
    },
    {
      roundNumber: 2,
      title: 'Technical Interview',
      description: 'DSA + core CS + practical problem solving',
      whyItMatters: 'Balances theoretical knowledge with practical application.',
      focusAreas: [
        hasDSA ? 'DSA: Problem-solving approach' : 'Coding fundamentals',
        hasSkill('coreCS', 'OOP') ? 'OOP and design patterns' : 'Programming concepts',
        hasWeb ? 'Your web stack expertise' : 'Relevant technologies',
      ],
    },
    {
      roundNumber: 3,
      title: 'Project & Design Discussion',
      description: 'Deep dive into past work and system design basics',
      whyItMatters: 'Evaluates ability to build and scale real-world applications.',
      focusAreas: [
        'Project presentation: Your role and impact',
        hasSystemDesign ? 'System design fundamentals' : 'Design thinking',
        'Code review discussion',
      ],
    },
    {
      roundNumber: 4,
      title: 'HR & Leadership',
      description: 'Culture fit, expectations, and offer discussion',
      whyItMatters: 'Ensures alignment with company values and growth trajectory.',
      focusAreas: [
        'Behavioral questions',
        'Career aspirations',
        'Compensation expectations',
      ],
    },
  ];
}
