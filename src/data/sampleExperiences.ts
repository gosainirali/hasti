import { ExperienceFormState } from '../types';

export interface SampleExperience {
  id: string;
  badge: string;
  name: string;
  description: string;
  data: ExperienceFormState;
}

export const SAMPLE_EXPERIENCES: SampleExperience[] = [
  {
    id: 'hackathon-ai',
    badge: '🏆 Hackathon',
    name: '36-Hour AI Hackathon (2nd Place)',
    description: 'Built an AI-assisted triage tool for rural clinics under heavy sleep deprivation.',
    data: {
      experienceType: 'hackathon',
      title: 'Won 2nd Place at HackHealth 2024 (120+ Teams)',
      role: 'Full-Stack Developer & Team Lead',
      organization: 'HackHealth & Stanford Biodesign',
      rawExperience:
        'Over 36 intense hours, our team of 4 built "PulseAI", a low-bandwidth mobile triage assistant for community health workers. At 3:00 AM on Sunday, our SQLite database corrupted during test data ingestion, and we were terrified we would have to drop out. We stayed calm, migrated our schema to IndexedDB in 45 minutes, and got the prototype back up. We pitched to a panel of 5 physicians and ended up winning 2nd place overall out of 120 teams!',
      keyMetrics: '36 hours, 120 teams, 2nd place overall, 45-min emergency DB migration, tested on 50 mock medical cases',
      keyLearnings:
        'Resilience during unexpected 3 AM bugs; prioritizing a working core demo over 10 half-baked features; designing specifically for high-stress offline environments.',
      mentorsOrTeam: 'Sarah (ML), Dave (Design), Priyansh (Backend), and Dr. Linda Evans for domain feedback',
      tone: 'authentic_storyteller',
      conceptAngle: 'failure_to_breakthrough',
      customPrompt: 'Emphasize the 3 AM database crash and how staying level-headed saved the demo.',
      authorName: 'Alex Chen',
      authorTitle: 'Computer Science & Biomedical Informatics Student',
    },
  },
  {
    id: 'internship-fintech',
    badge: '💼 Internship',
    name: '12-Week Software Engineering Internship',
    description: 'Shipped a fraud detection telemetry pipeline that reduced false positives.',
    data: {
      experienceType: 'internship',
      title: 'Wrapping up my Summer 2024 Software Engineering Internship',
      role: 'Backend Engineering Intern',
      organization: 'Starlight Financial',
      rawExperience:
        'Just concluded my 12-week internship on the Core Risk & Fraud team. When I started, the codebase of 300,000 lines of Go and Kafka seemed totally impenetrable, and I felt acute imposter syndrome during my first sprint. My mentor Marcus gave me incredible guidance: read the logs, write integration tests before touching code, and ask dumb questions early. By week 8, I architected and deployed an async telemetry batching pipeline to production that reduced alert noise by 38% for our compliance analysts.',
      keyMetrics: '12 weeks, 1 production pipeline deployed, 38% reduction in alert noise, 4 PR reviews merged',
      keyLearnings:
        'Overcoming imposter syndrome through curiosity; the power of comprehensive unit testing; understanding business metrics behind code rather than just writing syntax.',
      mentorsOrTeam: 'Marcus Brody (Staff Engineer & Mentor), Rachel Kim (Engineering Manager), and the Risk Tech squad',
      tone: 'humble_reflective',
      conceptAngle: 'peer_learnings',
      customPrompt: 'Share practical advice for students entering their first tech internship.',
      authorName: 'Jordan Taylor',
      authorTitle: 'Software Engineering Intern | Systems & Cloud Enthusiast',
    },
  },
  {
    id: 'college-event-organizer',
    badge: '🎓 College Event',
    name: 'Annual Tech Summit (Lead Organizer)',
    description: 'Organized a 2-day conference with 850 attendees, 14 speakers, and sponsor logistics.',
    data: {
      experienceType: 'college_event',
      title: 'Organizing InnovateFest 2024: 850 Attendees & 14 Keynotes',
      role: 'Head of Operations & Logistics',
      organization: 'University Engineering Student Council',
      rawExperience:
        'For 6 months, our 15-person student team planned InnovateFest 2024. 48 hours before doors opened, our primary keynote speaker got stranded due to canceled flights, and our main badge printer died. We mobilized our volunteer team, shifted schedules to set up a high-definition remote stage broadcast, and hand-sorted badges until midnight. When the doors opened to 850 energetic students and 14 tech sponsors, seeing the auditorium packed was surreal.',
      keyMetrics: '850 attendees, 14 speakers, $22,000 sponsorship raised, 6 months of planning, 15 student organizers',
      keyLearnings:
        'Contingency planning is not optional in event ops; clear delegate roles keep chaos organized; empathetic leadership when volunteers are exhausted.',
      mentorsOrTeam: 'Co-lead Maya, Dean Robinson, and our 35 student volunteers',
      tone: 'high_energy_achiever',
      conceptAngle: 'leadership_collaboration',
      customPrompt: 'Highlight the human logistics, problem solving under pressure, and team pride.',
      authorName: 'Samira Patel',
      authorTitle: 'Student Body Tech President | Event Director',
    },
  },
  {
    id: 'certification-aws',
    badge: '📜 Certification',
    name: 'AWS Solutions Architect Professional',
    description: 'Passed after 4 months of evening labs, failing practice tests, and persistent study.',
    data: {
      experienceType: 'certification',
      title: 'Earned the AWS Certified Solutions Architect - Professional',
      role: 'Cloud Enthusiast & Self-Learner',
      organization: 'Amazon Web Services',
      rawExperience:
        'After 4 months of late-night study sessions and building hands-on sandbox labs across VPC peering, multi-region failovers, and IAM governance, I passed the AWS SAP-C02 exam on my second attempt. I actually failed my first practice test with 58% and almost gave up. Building actual architectural diagrams and reproducing real failure modes in sandbox accounts was the single turning point that made abstract cloud concepts click.',
      keyMetrics: '120+ study hours, 25 sandbox architectures built, 815/1000 final score',
      keyLearnings:
        'Flashcards do not work for systems thinking—hands-on labs do; embracing early failure as diagnostic signal; understanding cost trade-offs in cloud architecture.',
      mentorsOrTeam: 'Cloud study discord community and Stephane Maarek courses',
      tone: 'educational_takeaways',
      conceptAngle: 'peer_learnings',
      customPrompt: 'Provide a structured 3-step study blueprint for others tackling hard technical certifications.',
      authorName: 'Marcus Vance',
      authorTitle: 'Cloud Architect & DevOps Engineer',
    },
  },
  {
    id: 'volunteering-stem',
    badge: '🤝 Volunteering',
    name: 'High School Girls in STEM Code Camp',
    description: 'Mentored 35 high school students to build their first interactive web applications.',
    data: {
      experienceType: 'volunteering',
      title: 'Mentoring 35 High School Students at Saturday CodeCamp',
      role: 'Lead Curriculum Mentor',
      organization: 'Girls Who Code & Local Library',
      rawExperience:
        'Spent the last 4 Saturdays teaching foundational HTML, CSS, and basic JavaScript to 35 high school young women from underserved school districts. Many started on day 1 saying "I am not a math person, so I cannot do programming." By day 4, every single student had published a personal portfolio or interactive climate quiz live on GitHub Pages. Watching their eyes light up when their code rendered in the browser reminded me why I fell in love with software in the first place.',
      keyMetrics: '4 weeks, 35 students, 100% demo completion rate, 35 live GitHub Pages projects deployed',
      keyLearnings:
        'Demystifying tech jargon unlocks hidden confidence; mentorship is a two-way street that sharpens your own fundamentals; representation deeply matters.',
      mentorsOrTeam: 'Fellow mentors Priya and Elena, and the East Bay Public Library staff',
      tone: 'authentic_storyteller',
      conceptAngle: 'balanced',
      customPrompt: 'Focus on inspiring others to give back and the joy of teaching beginners.',
      authorName: 'Elena Rostova',
      authorTitle: 'Frontend Engineer & Community Mentor',
    },
  },
  {
    id: 'workshop-react',
    badge: '🎤 Workshop',
    name: 'Delivered Hands-on Web Performance Workshop',
    description: 'Conducted a 2-hour interactive deep-dive on Core Web Vitals for 60 developers.',
    data: {
      experienceType: 'workshop',
      title: 'Conducted "Speed Matters: Mastering Core Web Vitals" Workshop',
      role: 'Workshop Speaker & Facilitator',
      organization: 'React Dev Community Meetup',
      rawExperience:
        'Spoke to 60+ frontend developers on optimizing LCP, INP, and CLS in modern React applications. Instead of just slides, we conducted a live debugging session on a intentionally broken e-commerce site, profiling memory leaks and render waterfalls together. The audience asked hard questions about React 19 server components and edge rendering that sparked a 30-minute impromptu discussion.',
      keyMetrics: '60+ developers, 2-hour interactive session, 94% positive satisfaction rating, 1 open-source demo repo',
      keyLearnings:
        'Live interactive coding is 10x more engaging than slides; audience participation thrives when you embrace unscripted questions; explaining performance simply requires deep mastery.',
      mentorsOrTeam: 'Organizers Dan and Chloe at ReactNYC',
      tone: 'educational_takeaways',
      conceptAngle: 'technical_deep_dive',
      customPrompt: 'Emphasize actionable performance tips and key takeaways from the discussion.',
      authorName: 'Chloe Bennett',
      authorTitle: 'Principal Frontend Engineer',
    },
  },
];
