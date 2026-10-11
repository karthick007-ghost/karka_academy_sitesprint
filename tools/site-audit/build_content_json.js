const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('docs/site-audit/raw_crawl_data.json', 'utf8'));
const getPage = (id) => raw.pages.find(p => p.id === id);

const home = getPage('home');
const placement = getPage('placement');
const about = getPage('about-us');
const contact = getPage('contact');
const roadmap = getPage('roadmap');
const school = getPage('for-school-students');
const college = getPage('for-college-students');
const graduates = getPage('for-graduates');
const professionals = getPage('for-professionals');
const blog = getPage('blog');
const privacy = getPage('privacy-policy');
const terms = getPage('terms-of-service');
const infini = getPage('infini');
const spike = getPage('spike');

// Extract all course pages
const coursePages = raw.pages.filter(p => p.id.startsWith('course-')).map(cp => {
  // extract duration
  const durMatch = cp.bodyText.match(/DURATION\s*([0-9]+\s+[A-Za-z]+)/i);
  const levelMatch = cp.bodyText.match(/LEVEL\s*([A-Za-z\s]+?)\s*TOTAL LESSONS/i);
  const lessonsMatch = cp.bodyText.match(/TOTAL LESSONS\s*([0-9]+\s+[A-Za-z]+)/i);
  const modeMatch = cp.bodyText.match(/TRAINING MODE\s*([A-Za-z\s]+?)\s*Program Overview/i);
  const studentsMatch = cp.bodyText.match(/([0-9]+\+?\s+Students)/i);
  
  // extract curriculum modules
  const curModules = [];
  const curMatches = cp.bodyText.matchAll(/([1-4])\s+([A-Za-z\s&]+?)\s+([A-Z][A-Za-z\s&/.,\-+]+?)(?=[1-4]\s+[A-Za-z]|Why Choose Karka|$)/g);
  for (const m of curMatches) {
    curModules.push({
      step: m[1],
      title: m[2].trim(),
      topics: m[3].trim().split(/\s{2,}/).map(t => t.trim()).filter(Boolean)
    });
  }

  // extract instructor
  const instMatch = cp.bodyText.match(/Meet Your.*?Instructors\s+([A-Za-z.\s]+?)\s+([A-Z\s]{4,}?)\s+([A-Za-z0-9\s]+?)\s+([0-9]+\s+Years Experience)/);
  const instructor = instMatch ? {
    name: instMatch[1].trim(),
    role: instMatch[2].trim(),
    company: instMatch[3].trim(),
    experience: instMatch[4].trim(),
    note: instMatch[1].includes('John Doe') || instMatch[1].includes('Sarah Connor') || instMatch[1].includes('Alan Turing') || instMatch[1].includes('Mike Tyson') || instMatch[1].includes('Ethan Hunt') || instMatch[1].includes('Diana Prince') || instMatch[1].includes('Robert Downey') ? 'Template placeholder detected' : 'todo: verify instructor'
  } : {
    name: 'todo',
    role: 'todo',
    company: 'todo',
    experience: 'todo',
    note: 'todo'
  };

  return {
    id: cp.id,
    name: cp.name,
    url: cp.url,
    title: cp.title,
    metaDescription: cp.metaDesc,
    duration: durMatch ? durMatch[1].trim() : 'todo',
    level: levelMatch ? levelMatch[1].trim() : 'Beginner to Advanced',
    totalLessons: lessonsMatch ? lessonsMatch[1].trim() : 'todo',
    trainingMode: modeMatch ? modeMatch[1].trim() : 'Offline / Online',
    studentBadge: studentsMatch ? studentsMatch[1].trim() : '500+ Students',
    curriculum: curModules,
    instructor: instructor,
    faqs: cp.faqs
  };
});

const contentJson = {
  metadata: {
    siteUrl: 'https://www.karka.academy',
    scrapedAt: new Date().toISOString(),
    generator: 'Karka Academy Research Agent Site Audit'
  },
  global: {
    organization: {
      name: 'Karka AI Academy',
      legalName: 'Karka Software Academy',
      parentOrAffiliate: 'Agile Tribers',
      founder: 'Sateesh Kumar',
      foundingYear: '2020',
      tagline: 'The one and only exclusive AI Learning Center in Nagercoil',
      description: 'Master Full Stack Development and Data Science with Karka AI Academy. The most comprehensive AI-driven coding bootcamp in India with Pay After Placement.'
    },
    contact: {
      phone: '+919487530243',
      displayPhone: '+91 9487530243',
      email: 'contact@karka.academy',
      addressLocality: 'Nagercoil',
      addressRegion: 'Tamil Nadu',
      postalCode: '629001',
      country: 'IN',
      addressFull: 'Nagercoil, Kanyakumari District, Tamil Nadu, 629001, India',
      googleMapsUrl: 'https://maps.app.goo.gl/karka-academy-nagercoil',
      operatingHours: 'Monday - Saturday: 09:00 - 18:00'
    },
    socialLinks: {
      instagram: 'https://www.instagram.com/karka.ai/',
      instagramAlt: 'https://www.instagram.com/karka.academy',
      facebook: 'https://www.facebook.com/karka.academy',
      linkedin: 'https://www.linkedin.com/company/karka-academy/',
      twitter: 'https://twitter.com/karka_academy'
    },
    navigation: {
      headerLinks: [
        { label: 'School Students', url: '/for-school-students' },
        { label: 'College Students', url: '/for-college-students' },
        { label: 'Graduates', url: '/for-graduates' },
        { label: 'Professionals', url: '/for-professionals' }
      ],
      headerCta: { label: 'Enroll Now', action: 'Enroll modal / scroll' },
      footerLinks: {
        programs: [
          { label: 'Home', url: '/' },
          { label: 'All Courses', url: '/courses' },
          { label: 'Placement', url: '/placement' },
          { label: 'Free Roadmap', url: '/roadmap' }
        ],
        karkaAcademy: [
          { label: 'About Us', url: '/about-us' },
          { label: 'Our Mentors', url: '/about-us#mentor' },
          { label: 'Success Stories', url: '/placement' },
          { label: 'Blog', url: '/blog' },
          { label: 'Hire From Us', url: 'mailto:contact@karka.academy?subject=Hiring%20Partnership%20Inquiry' },
          { label: 'Contact', url: '/contact' }
        ],
        legal: [
          { label: 'Privacy Policy', url: '/privacy-policy' },
          { label: 'Terms of Service', url: '/terms-of-service' }
        ]
      }
    }
  },
  home: {
    hero: {
      badge: 'The one and only exclusive AI Learning Center in Nagercoil',
      titleHighlight: 'AI-Driven',
      titleSub: 'Software Developer',
      ctaPrimary: 'Start Your Transformation',
      socialProofHeading: 'Where Our Learners are Making an Impact',
      floatingBadges: ['AI Powered', '100% Placement'],
      hiringPartnerLogos: ['Amazon', 'TCS', 'HCL', 'Matrimony', 'Novac', 'Capecom', 'Flow', 'Sodisys']
    },
    platforms: {
      subheading: 'Beyond the classroom',
      heading: 'Explore Karka Platforms',
      description: 'Compete with students across the district or level up with AI-powered learning.',
      infiniAi: {
        title: 'Karka Infini AI',
        subtitle: 'Inter-college student competition',
        prizePool: '₹1,00,000',
        prizePoolLabel: 'Total prize pool',
        tagline: 'Showcase Your Skills. Compete. Get Recognized. Win Big!',
        contests: [
          { name: 'PaperPulse', category: 'Idea Presentation' },
          { name: 'TechRush', category: 'Technical Quiz' },
          { name: 'Bug Hunt', category: 'Debugging' },
          { name: 'SiteSprint', category: 'Website Building' },
          { name: 'Graphix', category: 'Poster Design' },
          { name: 'VibeCut', category: 'Video Creation' }
        ],
        rounds: [
          { round: 'Round 1', description: 'Campus arena at your college' },
          { round: 'Round 2', description: 'District-level grand finale for the top 3 teams' },
          { round: 'Rewards', description: 'Cash prizes, Karka Rolling Trophy & certificates' }
        ],
        cta: 'Register for Infini',
        ctaUrl: 'https://infini.karka.academy/',
        metaText: 'Free entry · Join multiple contests · Teams of 1–4'
      },
      spikeAi: {
        title: 'Spike AI',
        subtitle: 'Learning platform',
        tagline: 'The AI-powered learning platform by Karka Academy',
        inputPlaceholder: 'Ask Spike anything you\'re learning…',
        features: [
          { title: 'AI-Guided', desc: 'Learn with AI at your side' },
          { title: 'Hands-On', desc: 'Practise as you learn' },
          { title: 'Progress', desc: 'Track your growth' },
          { title: 'Mentor-Backed', desc: 'Paired with Karka mentors' }
        ],
        cta: 'Open Spike',
        ctaUrl: 'https://spike.karka.academy/'
      }
    },
    whyKarka: {
      heading: 'Why Karka?',
      description: 'Six reasons ambitious learners in Nagercoil choose Karka over every other institute.',
      reasons: [
        {
          num: 1,
          title: 'Pay After You Get Hired',
          text: 'Traditional institutes demand heavy upfront fees regardless of your job outcome. At Karka, you start learning with ₹0 upfront tuition because we carry the financial risk—you only pay your course fees after you successfully secure a tech job.'
        },
        {
          num: 2,
          title: 'An "AI-First" Future-Proof Curriculum',
          text: 'Instead of wasting time on decade-old coding syntax, Karka natively integrates Generative AI workflows, Prompt Engineering, and AI Automation across all our tracks. You will learn how to build software and design interfaces with AI, exactly how modern tech companies build today.'
        },
        {
          num: 3,
          title: 'Live Internships Over Paper Certificates',
          text: 'Employers ignore generic print certificates; they hire proof. Karka functions as a hands-on, AI-powered internship platform where you work on real client projects, graduating with a live, deployable portfolio and an official Internship Certificate.'
        },
        {
          num: 4,
          title: 'Continuous On-Site Expert Mentorship',
          text: 'You gain daily access to fully equipped physical labs and direct, face-to-face guidance from industry mentors who track your progress and solve your technical bugs in real time, ensuring you never get stuck or lose learning momentum.'
        },
        {
          num: 5,
          title: 'Direct Regional & Global Hiring Pipelines',
          text: 'We completely bypass crowded online job portals by sending your completed portfolio directly to our network of hiring partners, local tech companies, and startup ecosystems that look to us to fill their open roles immediately.'
        },
        {
          num: 6,
          title: 'The 4-Pillar Job Readiness System',
          text: 'We transform you into a complete professional by systematically building your core technical stack, optimizing your speed using AI tools, training you in corporate business communication, and mastering technical mock interviews.'
        }
      ]
    },
    videoSuccessStories: {
      heading: 'Voices of Our Learners',
      description: 'Hear directly from our graduates about how Karka transformed their careers and helped them land their dream jobs in tech.',
      activeLearner: {
        name: 'Gabriel Samraj',
        role: 'FRONTEND DEVELOPER',
        quote: "Karka's UI/UX design course was a game-changer for me. The instructors are passionate and the curriculum is up-to-date with the latest design trends. I now feel confident in my ability to create stunning visuals that stand out.",
        note: 'Note discrepancy: role is Frontend Developer, but quote references UI/UX design course'
      },
      upNextList: ['GABRIEL', 'PRABIN', 'SHIJU', 'KISHORE', 'SRIDEVI']
    },
    featuredPrograms: [
      {
        name: 'MERN Fullstack Development',
        tag: 'BOOTCAMP',
        enrollments: '800+ ENROLLMENTS',
        rating: '4.8 (200 ratings)',
        desc: 'Master Full-Stack web development using MongoDB, Express, React, and Node.js. Build scalable web applications from scratch.',
        exploreUrl: '/courses/mern-fullstack'
      },
      {
        name: 'AI & Data Science',
        enrollments: '650+ ENROLLMENTS',
        rating: '4.8 (200 ratings)',
        desc: 'Comprehensive study of AI and Data Science concepts. Master the tools and machine learning models that drive the AI revolution.',
        exploreUrl: '/courses/ai-data-science'
      },
      {
        name: 'UI/UX Design',
        enrollments: '450+ ENROLLMENTS',
        rating: '4.8 (200 ratings)',
        desc: 'Master the art of designing intuitive, beautiful user interfaces and experiences using industry-standard design tools.',
        exploreUrl: '/courses/ui-ux-design'
      },
      {
        name: 'Python for Kids',
        enrollments: '200+ ENROLLMENTS',
        rating: '4.8 (200 ratings)',
        desc: 'Interactive introduction to programming logic using Python. Build games and animations while learning core coding concepts.',
        exploreUrl: '/courses/python-for-kids'
      },
      {
        name: 'Full Stack Developer Internship',
        enrollments: '800+ ENROLLMENTS',
        rating: '4.8 (200 ratings)',
        desc: 'Rigorous MERN stack training for students. Master DevOps, System Design, and Production best practices on large-scale apps.',
        exploreUrl: '/courses/fullstack-internship'
      },
      {
        name: 'Generative AI Foundations',
        enrollments: '900+ ENROLLMENTS',
        rating: '4.8 (200 ratings)',
        desc: 'Master the basics of Generative AI, prompt engineering, and fundamental AI concepts. Start your journey into the tech future.',
        exploreUrl: '/courses/genai-foundations'
      }
    ],
    fourPillars: {
      heading: '4 Pillars of a Job-Ready Tech Career',
      subtitle: "We don't just teach code; we build careers. Our holistic curriculum is designed to transform you into a complete professional.",
      pillars: [
        {
          num: '01',
          name: 'Master the Language of Business',
          skills: ['Listening', 'Speaking', 'Reading', 'Writing']
        },
        {
          num: '02',
          name: 'Build Scalable Modern Apps',
          skills: ['Web / Mobile', 'Data Analytics', 'UI/UX Design', 'Digital Marketing']
        },
        {
          num: '03',
          name: 'AI Skills',
          tag: 'CORE PILLAR',
          skills: ['Prompt Engineering', 'AI Automation', 'AI Tools', 'LLM']
        },
        {
          num: '04',
          name: 'Interview Skills',
          skills: ['ATS Friendly Profile', 'Mock Interview', 'Group Discussion', 'Presentation Skills']
        }
      ]
    },
    payAfterPlacementSection: {
      heading: 'Pay After You Get Hired',
      subheading: "Zero Upfront Fees. Zero Risk. We're so confident in our training that we don't get paid until you do.",
      steps: [
        {
          step: 1,
          title: 'Enroll & Learn',
          desc: 'Learn from Real Mentors. Join live sessions, work on real-world projects, and get mentored by industry experts.'
        },
        {
          step: 2,
          title: 'Get Job Ready',
          desc: 'We help you build your resume, portfolio, and prep for interviews.'
        },
        {
          step: 3,
          title: 'Get Paid, Not Billed',
          desc: 'Focus on learning today. Share your success once you are placed.'
        }
      ],
      socialProofSnippet: {
        enrollments: '190+',
        ratingsCount: '200 ratings',
        rating: '4.8',
        note: 'Contradiction: Displays 190+ enrollments based on 200 ratings, whereas course cards claim 800+ and 900+ enrollments.'
      },
      whatsIncluded: [
        '1:1 Mentorship',
        'Placement Training',
        'Resume & LinkedIn Preparation',
        'Mock Interviews',
        'Job Referral Support'
      ]
    },
    internshipSection: {
      heading: 'Internship Experience Before You Graduate.',
      badge: 'INTERNSHIP',
      desc: 'Stop worrying about "0 experience" on your resume. At Karka, every student works on real-time internship projects guided by industry mentors. Gain the kind of hands-on experience that employers crave — and build a powerhouse portfolio before you even finish.',
      features: [
        'Work on real client projects',
        'Build your project portfolio',
        'Learn Collaboration',
        'Receive Internship Certificate'
      ]
    },
    studentTestimonialsText: [
      {
        name: 'Priya',
        quote: "Karka's hands-on approach completely changed my career path. The mentors are incredibly supportive and the curriculum is up-to-date with industry standards."
      },
      {
        name: 'Arun',
        quote: "I loved the ReactJS training! The live projects were challenging but very rewarding. A huge shoutout to the placement team."
      },
      {
        name: 'Vikram',
        quote: "Hands down the best decision I made for my career. The project-based learning really helped me build confidence."
      },
      {
        name: 'Rahul',
        quote: "I was new to programming, but the Python course here made it so easy to understand. The instructors take the time to explain every concept clearly."
      },
      {
        name: 'Karthik',
        quote: "The transition from non-tech to tech was smooth thanks to Karka. The SQL and Data Analytics bootcamp was comprehensive and practical."
      },
      {
        name: 'Divya',
        quote: "Amazing support system. Even after placement, the mentors are available to help. Truly grateful for Karka."
      },
      {
        name: 'Sneha',
        quote: "The depth of knowledge in the advanced Java and Spring Boot modules is impressive. It's not just about coding; they teach you how to think like a software engineer."
      },
      {
        name: 'Anitha',
        quote: "It's a fantastic place to learn. The environment is positive and motivates you to keep learning. The technicians are very knowledgeable."
      },
      {
        name: 'Sandeep',
        quote: "The mock interviews prepared me so well for the real thing. I cracked my first interview thanks to the rigorous training."
      }
    ],
    faqs: [
      {
        question: 'What is Pay After Placement?',
        answer: 'We want you to focus entirely on your learning without worrying about upfront costs. You only share your success (and the fees) after you land a tech job with a guaranteed minimum salary. It\'s our way of saying we\'re in this together.'
      },
      {
        question: 'Is placement guaranteed?',
        answer: 'todo: check detailed answer (rendered in accordion modal)'
      },
      {
        question: 'Who are the mentors at Karka?',
        answer: 'todo: check detailed answer (rendered in accordion modal)'
      },
      {
        question: 'Do I need a background in coding or CSE?',
        answer: 'todo: check detailed answer (rendered in accordion modal)'
      },
      {
        question: 'How long does the course take?',
        answer: 'todo: check detailed answer (rendered in accordion modal)'
      },
      {
        question: 'Will I get internship or project experience?',
        answer: 'todo: check detailed answer (rendered in accordion modal)'
      }
    ]
  },
  placementsPage: {
    hero: {
      title: 'Our Placement Records',
      subtitle: "100% Lifetime Placement Support. We don't just teach technology; we launch careers."
    },
    keyStats: [
      { label: 'HIGHEST PACKAGE', value: '24 LPA' },
      { label: 'PLACEMENT RATE', value: '100%' },
      { label: 'HIRING PARTNERS', value: '50+' },
      { label: 'AVERAGE HIKE', value: '120%' }
    ],
    features: [
      'Mock Interviews',
      'HR Grooming',
      'Resume & LinkedIn Building',
      'Daily Placement Calls',
      '100% Job Assistance'
    ],
    placementAssistanceCards: [
      {
        title: 'Placement Assistance',
        desc: 'Direct support from our placement cell for your career growth.',
        cta: 'GET PLACEMENT ASSISTANCE'
      },
      {
        title: 'Explore Courses',
        desc: 'Check out our job-oriented programs and master new skills.',
        cta: 'BROWSE OUR COURSES'
      },
      {
        title: 'Job Openings',
        desc: 'Apply to current vacancies with our 50+ hiring partners.',
        cta: 'CALL ABOUT JOB OPENINGS'
      }
    ],
    careerSupport: {
      heading: 'Complete Career Support',
      desc: 'From your first interview to your first promotion, we stand by you with comprehensive placement assistance and continued mentorship.',
      interviewAndPlacementBenefits: [
        'Dedicated Placement Officer',
        'Two Weeks Placement Training',
        'Portfolio Creation',
        'Learn till job placement (LTP)',
        'Pay after job placement (PAP)',
        'Internship @ AI First Product Studio'
      ],
      afterJobSupport: [
        'Up to 3 Months Support',
        'Monthly Mentorship Sessions',
        'Dedicated One-to-One Sessions'
      ],
      whyAfterSupport: 'We ensure you settle comfortably in your new role, helping you navigate corporate challenges and accelerate your initial growth.'
    },
    recentPlacementsDataStatus: {
      endpoint: 'https://www.karka.academy/placements-data/list.json',
      response: { items: [], total: 0 },
      uiDisplayState: 'SYNCHRONIZING STORIES... (No student records returned from server database)',
      studentList: 'todo: verified placement records required'
    }
  },
  aboutUsPage: {
    hero: {
      badge: 'Establish. Execute. Evolve.',
      heading: 'Redefining Tech Education',
      subheading: 'Karka is an exclusive training ecosystem designed to transform ambitious freshers into industry-ready software engineers through rigorous, holistic mentorship.'
    },
    story: {
      heading: 'Our Story',
      text: "Every great journey begins with a spark of curiosity. Karka was founded with a singular, powerful vision: to bridge the gap between traditional learning and real-world excellence. We saw passionate minds eager to grow, but held back by outdated resources and disconnected guidance. Driven by the spirit of learning flawlessly, we built a platform where knowledge meets action. From humble beginnings as a passionate idea, Karka has evolved into a thriving ecosystem empowering students, professionals, and future leaders to master the skills demanded by today's fast-paced world. We don't just teach; we transform."
    },
    mission: 'To bridge the massive gap between academic learning and industry requirements. We don\'t just teach coding; we engineer careers by instilling professional discipline, problem-solving mindsets, and effective communication skills.',
    vision: 'To be the most trusted hub for producing high-caliber tech talent that companies desire, creating a ripple effect of innovation and economic growth in our community.',
    comparisonTable: {
      heading: 'The Karka Advantage',
      subheading: "We've dismantled the traditional education model and rebuilt it around your success.",
      features: [
        { feature: 'AI-Based Curriculum', karka: true, others: false },
        { feature: 'AI Tools', karka: true, others: false },
        { feature: 'AI Bootcamp (Based on Course)', karka: true, others: false },
        { feature: 'Exercises & Tasks (200+)', karka: true, others: false },
        { feature: 'Mini Projects (Up to 5)', karka: true, others: false },
        { feature: 'Capstone Projects', karka: true, others: false },
        { feature: 'Learn Till Job Placement', karka: true, others: false }
      ]
    },
    meetTheMentor: {
      heading: 'Meet The Mentor',
      subheading: 'Learn directly from an Ex-CTO with 18+ years of experience.',
      name: 'Sateesh Kumar',
      role: 'Founder, Karka Software Academy | Agile Tribers',
      experience: '18+ years of experience in the tech industry',
      bio: 'With over 18+ years of experience in the tech industry, Sateesh has led engineering teams across the globe.',
      highlights: [
        'Ex-CTO of Flow Global (UK Fintech)',
        'Worked with Wipro & Yatra.com',
        'Specialized in building AI-powered Web & Mobile Products'
      ],
      linkedin: 'Connect on LinkedIn'
    },
    meetTheTeam: {
      heading: 'Meet The Team',
      text: "Behind Karka's success is a dedicated crew of innovators, educational designers, tech enthusiasts, and student support champions. We work relentlessly behind the scenes to ensure your learning experience is seamless, engaging, and highly rewarding. From continuous curriculum updates to round-the-clock student assistance, our team is united by a single goal: your growth.",
      teamMembers: 'todo: individual team members not listed on page'
    },
    infrastructure: {
      heading: 'Our Infrastructure',
      subheading: 'To master modern skills, you need a modern environment. Karka boasts state-of-the-art infrastructure designed to optimize the learning process.',
      cuttingEdgeTechStack: 'Seamless online learning portals, interactive live-session frameworks, and high-performance learning management systems.',
      collaborativeSpaces: 'Modern, fully equipped physical training labs built to foster peer-to-peer interaction, hands-on experimentation, and collaborative problem-solving.'
    }
  },
  roadmapPage: {
    heading: 'Your Path to Success',
    subtitle: 'A transparent, step-by-step journey from learning to earning.',
    steps: [
      { step: 1, title: 'Join Foundation', desc: 'Gain experience with industry tools' },
      { step: 2, title: 'Expert Learning', desc: 'Intensive Project Training' },
      { step: 3, title: 'Shared Success', desc: 'Pay only after placement' },
      { step: 4, title: 'Placement Training', desc: '2 Weeks Intensive Prep' },
      { step: 5, title: 'Free Internship', desc: 'At Agile Tribers' },
      { step: 6, title: 'Interview Schedule', desc: 'We line up interviews' },
      { step: 7, title: 'Success', desc: 'Job Placement Achieved!' },
      { step: 8, title: 'Payment', desc: 'Pay ₹40,000 only after placement' }
    ],
    scheduleAndCommitment: {
      fullTime: {
        name: 'Full-Time Program',
        tagline: 'Immersive Career Transformation',
        hoursPerWeek: '30hrs/week',
        breakdown: [
          '10hr Live Sessions',
          '10hr Classroom Practice',
          '10hr Home Assignments'
        ],
        days: 'Dedicated 5 Days/Week Schedule'
      },
      partTime: {
        name: 'Part-Time',
        details: 'todo'
      }
    },
    papRationale: {
      heading: 'Why Choose Pay After Placement?',
      text: 'We believe in our training quality so much that we only ask for the tuition fee once you secure a job. This model aligns our success with yours.'
    }
  },
  blog: {
    heading: 'Insights & Updates',
    subheading: 'Karka Academy Insights...',
    description: 'Explore the latest in coding, AI, and career transformation from our expert mentors.',
    status: 'No stories found',
    message: "We're currently crafting new insights. Please check back soon.",
    posts: []
  },
  legal: {
    privacyPolicy: {
      lastUpdated: 'July 30, 2026',
      sections: [
        {
          title: '1. Information We Collect',
          content: "When you submit an enrollment inquiry, contact form, or newsletter signup on this site, we collect the information you provide directly — such as your name, email address, phone/WhatsApp number, and the course or program you're interested in."
        },
        {
          title: '2. How We Use Your Information',
          content: 'We use the details you share to respond to your enquiry, provide course counseling, process admissions, and send relevant updates about our programs, placements, and events. We do not sell your personal information to third parties.'
        },
        {
          title: '3. Data Sharing',
          content: "Your information may be shared internally with our admissions and placement teams, and — where relevant to your placement support — with hiring partners you've consented to be introduced to. We use third-party services (such as email and messaging providers) solely to deliver notifications related to your enquiry."
        },
        {
          title: '4. Cookies & Analytics',
          content: 'We use Google Analytics to understand how visitors use our site so we can improve it. This may involve cookies that collect anonymized usage data.'
        },
        {
          title: '5. Your Rights',
          content: 'You can request access to, correction of, or deletion of your personal data at any time by contacting us using the details below.'
        },
        {
          title: '6. Contact Us',
          content: 'For any privacy-related questions, reach out at contact@karka.academy or call +91 9487530243.'
        }
      ]
    },
    termsOfService: {
      lastUpdated: 'July 30, 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing this website or submitting an enrollment inquiry, you agree to these Terms of Service. If you do not agree, please discontinue use of the site.'
        },
        {
          title: '2. Enrollment & Admissions',
          content: "Submitting an inquiry through this site does not guarantee a seat in any program. Admission is confirmed only after our counseling and admission process is complete, per the specific program's requirements."
        },
        {
          title: '3. Pay After Placement Terms',
          content: 'Where offered, the Pay After Placement model is subject to a separate admission agreement signed at enrollment, which specifies eligibility conditions, payment triggers, and program-specific terms. The general description on this website is for informational purposes only.'
        },
        {
          title: '4. Intellectual Property',
          content: 'All content on this site — including course curricula, branding, graphics, and text — is the property of Karka AI Academy and may not be reproduced without permission.'
        },
        {
          title: '5. Placement Assistance Disclaimer',
          content: 'Placement statistics and hiring partner figures reflect historical outcomes and do not constitute a guarantee of employment for any individual student.'
        },
        {
          title: '6. Contact Us',
          content: 'Questions about these terms can be sent to contact@karka.academy or call +91 9487530243.'
        }
      ]
    }
  },
  subdomains: {
    infini: {
      url: 'https://infini.karka.academy/',
      title: 'A CONTEST BY KARKA AI & TECH ACADEMY',
      tagline: 'A GENZ TECH FEST - Showcase Your Skills. Compete. Get Recognized. Win Big!',
      prizePool: '₹1,00,000 ONE LAKH RUPEES OVERALL PRIZE POOL',
      contests: [
        { name: 'PaperPulse', category: 'Idea Presentation', tagline: 'Present. Persuade. Inspire.' },
        { name: 'TechRush', category: 'Technical Quiz', tagline: 'Think Fast. Know More.' },
        { name: 'Bug Hunt', category: 'Debugging', tagline: 'Find. Fix. Win.' },
        { name: 'SiteSprint', category: 'Website Design & Development', tagline: 'Design. Develop. Impress.' },
        { name: 'Graphix', category: 'Graphic / Poster Design', tagline: 'Create. Communicate. Stand Out.' },
        { name: 'VibeCut', category: 'Video / Reel Creation', tagline: 'Edit. Express. Engage.' }
      ],
      eventFlow: [
        { step: '01', title: 'Register', desc: 'Choose your contest and complete registration through our website.' },
        { step: '02', title: 'Round 1 CAMPUS ARENA', desc: 'Conducted at your college by our Karka team.' },
        { step: '03', title: 'Winners', desc: 'Top 3 teams from each contest move to Round 2.' },
        { step: '04', title: 'Round 2 GRAND FINALE', desc: 'District-level competition with cash prizes & trophy.' }
      ],
      rewards: ['Cash Prizes', 'Karka Rolling Trophy', 'Certificates', 'Recognition Across Colleges'],
      partnerCategories: ['MEDIA PARTNER', 'INTERNSHIP PARTNERS', 'GIFTING PARTNERS']
    },
    spike: {
      url: 'https://spike.karka.academy/',
      title: 'Spike AI Platform',
      tagline: 'Skill Today, Lead Tomorrow - Transform how you Teach, Amplify how they Learn',
      description: 'Meet Spike — your AI-powered learning partner, helping you craft engaging programs that build real-world skills in an AI-first world.',
      features: [
        { title: 'AI-Powered', desc: 'Smart learning assistance' },
        { title: 'Real-time', desc: 'Live feedback & progress' },
        { title: 'Personalized', desc: 'Tailored learning experience' }
      ],
      authRequirement: 'Google OAuth required to access platform portal'
    }
  },
  coursesList: coursePages
};

fs.writeFileSync('docs/site-audit/content.json', JSON.stringify(contentJson, null, 2));
console.log('Successfully written docs/site-audit/content.json with full structure and 37 courses!');
