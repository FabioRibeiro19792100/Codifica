// Centralized data structure for the gamification system
// GO UP! 2026
// Focus: Growing Opportunities Unlocking Potential

export const gamificationData = {
  stages: [
    {
      id: 1,
      number: 1,
      title: "Strategic Plan",
      subtitle: "Weeks 1-5",
      dateRange: "February 15 to March 21",
      icon: "FileText",
      activities: [
        "Form teams of 3-5 students each",
        "Register as an English teacher leader (mandatory)",
        "Fill out the team registration form",
        "Receive access to the tracking platform",
        "Strategic Plan Workshop (online, conducted in English)",
        "Teams identify problems and develop STEM solutions aligned with a SDG",
        "Weekly Office Hours",
        "All deliveries must be completed in English",
        "Strategic Plan Deadline: March 21, 11:59 PM"
      ],
      badges: [
        { id: 1, name: "Team Activated", icon: "CheckCircle2", description: "Team registered with English teacher and students", criteria: "Team registered with an English teacher leader and 3-5 students", category: "conclusao" },
        { id: 2, name: "Diverse Team", icon: "Users", description: "Team with students from 2+ different genders", criteria: "Team composed of students from at least 2 different genders", category: "conquista_especial" },
        { id: 3, name: "Multi-team Teacher", icon: "GraduationCap", description: "English teacher mentoring 2+ teams", criteria: "English teacher leading 2 or more teams simultaneously", category: "conquista_especial" },
        { id: 4, name: "Strategic Plan Workshop", icon: "Calendar", description: "Participation in the strategic plan workshop", criteria: "Confirmed attendance at the online Strategic Plan Workshop", category: "participacao" },
        { id: 5, name: "Office Hours Active", icon: "MessageSquare", description: "Confirmed attendance at office hours", criteria: "Participation in at least 1 office hours session during this stage", category: "participacao" },
        { id: 6, name: "Strategic Plan Completed", icon: "Lightbulb", description: "Strategic plan delivery registered in English", criteria: "Strategic plan submitted on time, written entirely in English", category: "conclusao" },
        { id: 7, name: "Computational Thinking", icon: "Cpu", description: "Demonstrated computational thinking skills", criteria: "Project demonstrated use of logic, abstraction, and computational problem-solving", category: "pedagogica", subcategory: "pensamento_computacional" },
        { id: 8, name: "SDG Alignment", icon: "Leaf", description: "Project linked to a Sustainable Development Goal", criteria: "Project clearly aligned with at least 1 UN SDG", category: "pedagogica", subcategory: "ods", sdgTag: "SDG 4 - Quality Education" }
      ],
      distinctions: [
        { name: "Mobilizing School", criteria: "5+ teams registered and activated" },
        { name: "Persistent School", criteria: "80%+ of teams submit their strategic plan in English" }
      ],
      rewards: "Access to the official list + Exclusive sessions + Public showcase wall"
    },
    {
      id: 2,
      number: 2,
      title: "Prototyping & Development",
      subtitle: "Weeks 6-9",
      dateRange: "March 24 to April 18",
      icon: "Wrench",
      activities: [
        "Prototyping Workshop (online, conducted in English)",
        "Teams create functional prototypes",
        "Testing with real users",
        "Process documentation in English",
        "Weekly Office Hours",
        "All deliveries must be completed in English",
        "Prototype Deadline: April 18, 11:59 PM"
      ],
      badges: [
        { id: 9, name: "Prototyping Workshop", icon: "Calendar", description: "Participation in the prototyping workshop", criteria: "Confirmed attendance at the online Prototyping Workshop", category: "participacao" },
        { id: 10, name: "Office Hours Active", icon: "MessageSquare", description: "Confirmed attendance at office hours", criteria: "Participation in at least 1 office hours session during the Prototyping stage", category: "participacao" },
        { id: 11, name: "Prototype Completed", icon: "Wrench", description: "Prototype delivery registered in English", criteria: "Functional prototype submitted on time with English documentation", category: "conclusao" },
        { id: 12, name: "SDG Impact", icon: "Heart", description: "Project demonstrated impact aligned with SDGs", criteria: "Prototype demonstrates direct impact on at least 1 Sustainable Development Goal", category: "pedagogica", subcategory: "ods", sdgTag: "SDG 11 - Sustainable Cities" }
      ],
      distinctions: [
        { name: "Innovative School", criteria: "3+ teams in the final evaluation" },
        { name: "STEM + English Excellence", criteria: "100% of teams with deliveries in English and STEM + SDG alignment" }
      ],
      rewards: "Prototype Wall + VIP Office Hours + Demo Review"
    },
    {
      id: 3,
      number: 3,
      title: "Pitch & Final Evaluation",
      subtitle: "Weeks 10-12",
      dateRange: "April 21 to May 9",
      icon: "Mic",
      activities: [
        "Pitch Workshop (online, conducted in English)",
        "Teams record 3-minute pitch videos in English",
        "Review of functional prototypes",
        "All deliveries must be completed in English",
        "Pitch Submission: April 28, 11:59 PM",
        "Top 10 Finalists Announcement: April 30",
        "In-Person Panel in São Paulo: May 5",
        "Awards Ceremony: May 9"
      ],
      badges: [
        { id: 13, name: "Pitch Workshop", icon: "Theater", description: "Participation in the pitch workshop", criteria: "Confirmed attendance at the online Pitch Workshop", category: "participacao" },
        { id: 14, name: "Pitch Submitted", icon: "Video", description: "Pitch video successfully submitted in English", criteria: "Pitch video up to 3 minutes, presented entirely in English, submitted on time", category: "conclusao" },
        { id: 15, name: "Finalist", icon: "Award", description: "Team selected among the top 10 finalists", criteria: "Team ranked among the top 10 by the evaluation panel", category: "conquista_especial" },
        { id: 16, name: "Top 3", icon: "Target", description: "Team among the 3 winners", criteria: "Team ranked among the top 3 at the in-person final panel", category: "conquista_especial" },
        { id: 17, name: "Teamwork", icon: "Handshake", description: "Demonstrated excellent collaboration", criteria: "Recognition for exemplary collaboration among team members throughout the program", category: "conquista_especial" },
        { id: 18, name: "STEM + English Excellence", icon: "Globe", description: "Project integrated STEM with English proficiency and SDGs", criteria: "Project demonstrated integration of STEM, English proficiency, and SDG alignment", category: "pedagogica", subcategory: "ods", sdgTag: "SDG 4 - Quality Education" }
      ],
      distinctions: [
        { name: "Finalist School", criteria: "1+ team among the top 10 finalists" },
        { name: "Real Impact School", criteria: "Average of 50+ people testing prototypes" },
        { name: "Transformative School", criteria: "Earned all distinctions" }
      ],
      rewards: "Prize + Mentorship + Official Podcast + Physical Certificate"
    }
  ],
  allDistinctions: [
    { id: 1, name: "Mobilizing School", description: "High engagement and massive participation in the program", criteria: "5+ teams registered and activated", icon: "Trophy", type: "selo_reconhecimento" },
    { id: 2, name: "Persistent School", description: "Consistency and commitment throughout the journey", criteria: "80%+ of teams completed deliveries in English", icon: "Heart", type: "certificado_digital" },
    { id: 3, name: "Innovative School", description: "Outstanding creativity and transformative solutions", criteria: "3+ teams reached the final evaluation", icon: "Zap", type: "selo_reconhecimento" },
    { id: 4, name: "STEM + English Excellence", description: "Commitment to STEM, English, and SDGs in all deliveries", criteria: "100% of teams with deliveries in English and STEM + SDG alignment", icon: "Globe", type: "certificado_digital" },
    { id: 5, name: "Inclusive School", description: "Leadership in diversity and representation across teams", criteria: "70%+ of teams are diverse", icon: "Users", type: "selo_reconhecimento" },
    { id: 6, name: "Finalist School", description: "Excellence recognized with teams in the final evaluation", criteria: "At least 1 team in the final evaluation", icon: "Crown", type: "certificado_digital" },
    { id: 7, name: "Real Impact School", description: "Solutions validated through user testing and concrete evidence", criteria: "Average of 50+ people testing prototypes", icon: "Target", type: "certificado_digital" },
    { id: 8, name: "Transformative School", description: "Highest achievement in the program", criteria: "Earned all distinctions", icon: "Star", type: "mencao_honrosa" }
  ],
  badgeCategories: {
    participacao: { label: "Workshop & Event Participation", icon: "Calendar", color: "#4A90D9" },
    conclusao: { label: "Delivery Completion", icon: "CheckCircle2", color: "#7BC67E" },
    conquista_especial: { label: "Special Achievements", icon: "Star", color: "#F5A623" },
    pedagogica: { label: "Pedagogical Badges (STEM + SDG)", icon: "BookOpen", color: "#9B59B6" }
  },
  successStories: [
    {
      id: 1,
      name: "Camila",
      role: "Founder of an EdTech company",
      quote: "English completely changed my life. I grew up in a humble family without access to expensive courses, but public school gave me the foundation. When I learned English, doors opened: I earned scholarships, participated in international conferences, and today I lead a company that impacts thousands of young people. STEM and English together are the most powerful combination there is.",
      highlight: "From public school to EdTech leader",
      sdgTag: "SDG 4 - Quality Education"
    },
    {
      id: 2,
      name: "Rafael",
      role: "Software engineer at a global company",
      quote: "I was good at programming, but without English I couldn't access the best opportunities. When I started mastering the language, I joined international hackathons, published papers, and was hired by a Silicon Valley company — all remote, living in Brazil. English was the multiplier of my STEM career.",
      highlight: "From rural Brazil to a global tech career",
      sdgTag: "SDG 8 - Decent Work"
    },
    {
      id: 3,
      name: "Mariana",
      role: "Sustainability researcher",
      quote: "At university, I realized all relevant scientific literature was in English. I learned the language with determination and it allowed me to pursue a master's degree abroad, publish research on SDGs, and today I work at the UN. For those who want to change the world, STEM and English are essential tools.",
      highlight: "From Brazil to the UN through English and science",
      sdgTag: "SDG 13 - Climate Action"
    }
  ]
}

// Enrolled classes (turmas inscritas) — origin of work teams
// Each class belongs to a school and a teacher; teamIds reference teams in TeamDashboard / TeacherDashboard / SchoolDashboard
export const enrolledClasses = [
  {
    id: 'classe-11a-joao-silva',
    name: '11ª A',
    grade: '11th grade',
    school: 'E.E. Professor João Silva',
    teacher: 'Prof. Sarah Johnson',
    studentsCount: 28,
    teamIds: ['ecotech-solutions', 'verde-futuro'],
    enrolledAt: '2026-02-10',
    status: 'active',
  },
  {
    id: 'classe-10b-joao-silva',
    name: '10ª B',
    grade: '10th grade',
    school: 'E.E. Professor João Silva',
    teacher: 'Prof. Sarah Johnson',
    studentsCount: 24,
    teamIds: ['agua-limpa'],
    enrolledAt: '2026-02-12',
    status: 'active',
  },
  {
    id: 'classe-12c-joao-silva',
    name: '12ª C',
    grade: '12th grade',
    school: 'E.E. Professor João Silva',
    teacher: 'Prof. Sarah Johnson',
    studentsCount: 30,
    teamIds: ['climatech', 'youth-sustainability'],
    enrolledAt: '2026-02-15',
    status: 'active',
  },
  {
    id: 'classe-11a-maria-aparecida',
    name: '11ª A',
    grade: '11th grade',
    school: 'E.E. Maria Aparecida',
    teacher: 'Prof. Carlos Mendes',
    studentsCount: 26,
    teamIds: ['green-innovation'],
    enrolledAt: '2026-02-09',
    status: 'active',
  },
  {
    id: 'classe-12a-maria-aparecida',
    name: '12ª A',
    grade: '12th grade',
    school: 'E.E. Maria Aparecida',
    teacher: 'Prof. Carlos Mendes',
    studentsCount: 22,
    teamIds: ['eco-warriors'],
    enrolledAt: '2026-02-11',
    status: 'inactive',
  },
];

// Reference catalog of teams known to the system — used to resolve teamIds → display info
// in views that don't load full team data (e.g. ClassesDashboard).
export const teamsCatalog = {
  'ecotech-solutions': { name: 'EcoTech Solutions', currentStage: 2, badgesCount: 8, membersCount: 5 },
  'verde-futuro': { name: 'Verde Futuro', currentStage: 2, badgesCount: 8, membersCount: 4 },
  'agua-limpa': { name: 'Água Limpa', currentStage: 1, badgesCount: 6, membersCount: 3 },
  'climatech': { name: 'ClimaTech', currentStage: 2, badgesCount: 11, membersCount: 4 },
  'youth-sustainability': { name: 'Youth Sustainability', currentStage: 1, badgesCount: 7, membersCount: 3 },
  'green-innovation': { name: 'Green Innovation', currentStage: 2, badgesCount: 12, membersCount: 5 },
  'eco-warriors': { name: 'Eco Warriors', currentStage: 1, badgesCount: 6, membersCount: 3 },
};

// Save data to localStorage
export const saveGamificationData = (data) => {
  try {
    localStorage.setItem('learningSectorsData', JSON.stringify(data))
    window.dispatchEvent(new CustomEvent('gamificationDataChanged', {
      detail: data,
      bubbles: true,
      cancelable: true
    }))
  } catch (error) {
    console.error('Error saving data to localStorage:', error)
  }
}

// Load data from localStorage or use defaults
export const loadGamificationData = () => {
  try {
    let savedData = localStorage.getItem('learningSectorsData')

    if (!savedData) {
      localStorage.removeItem('gamificationData')
      return gamificationData
    }

    const parsed = JSON.parse(savedData)
    if (parsed && parsed.stages && Array.isArray(parsed.stages) && parsed.allDistinctions && Array.isArray(parsed.allDistinctions)) {
      return parsed
    }

    localStorage.removeItem('learningSectorsData')
    return gamificationData
  } catch (error) {
    console.error('Error loading data from localStorage:', error)
    localStorage.removeItem('learningSectorsData')
  }
  return gamificationData
}
