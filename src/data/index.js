import lifeLinkImg from '../assets/LifeLink.svg';
import reactCertImg from '../assets/react-certificate.jpeg';

export const projects = [
  {
    id: 1,
    number: '01',
    title: 'Swasthyam',
    subtitle: 'Clinically Integrated Healthcare Platform',
    description:
      'An AI and IoT-powered platform that connects real-time edible oil consumption tracking with personal lipid data to deliver personalised intake limits and prevent lifestyle diseases. Features a proprietary copyrighted oil quantification formula developed by our team.',
    tags: ['React.js', 'IoT', 'AI/ML', 'Node.js', 'Figma'],
    color: '#00f5a0',
    icon: '🩺',
    iconBg: 'linear-gradient(135deg,rgba(0,245,160,0.15),rgba(0,245,160,0.05))',
    badge: '© Copyrighted Formula',
    badgeColor: 'var(--accent)',
    link: 'https://github.com/vnsonawane371323-cell/Swasthyam',
  },
  {
    id: 2,
    number: '02',
    title: 'YATRAVEER',
    subtitle: 'Your Travel Safety Companion ',
    description:
      'While traveling, users often face situations where they may not get time to ask for help during emergencies. YATRAVEER solves this by automatically detecting unusual movements or potential accidents and instantly sending alerts with live location to trusted contacts. It reduces dependence on manual actions by working silently in the background. Features like ride tracking, safety zone alerts, digital ID, and voice assistance further support users. Designed to act when you can’t.',
    tags: ['React Native', 'Firebase', 'MongoDB'],
    color: '#ff9900',
    icon: '🛡️',
    iconBg: 'linear-gradient(135deg,rgba(255,153,0,0.15),rgba(255,153,0,0.05))',
    badge: 'Mobile App',
    badgeColor: '#ffd699',
    link: 'https://github.com/vnsonawane371323-cell/YATRAVEER',
  },
  {
    id: 3,
    number: '03',
    title: 'Lifelink',
    subtitle: 'Blood Donor & Hospital Network Platform',
    description:
      'A digital platform that seamlessly connects blood donors, hospitals, and societies — enabling real-time donor discovery and faster blood requests to save lives when it matters the most. Built to eliminate last-minute searches with a structured, reliable system.',
    tags: ['React.js', 'Next.js', 'REST API', 'Figma', 'Node.js'],
    color: '#00d9f5',
    icon: '🩸',
    iconBg: 'linear-gradient(135deg,rgba(0,217,245,0.15),rgba(0,217,245,0.05))',
    image: lifeLinkImg,
    badge: 'Live Platform',
    badgeColor: 'var(--accent2)',
    link: 'https://lifelink-ruddy.vercel.app/',
  },
  {
    id: 4,
    number: '04',
    title: 'This Portfolio',
    subtitle: 'Personal Developer Portfolio',
    description:
      'Built with React, Three.js, GSAP and Framer Motion. Features a 3D animated background, custom magnetic cursor, cinematic scroll animations, and a fully responsive dark design system.',
    tags: ['React.js', 'Three.js', 'GSAP', 'Framer Motion'],
    color: '#7b2fff',
    icon: '🚀',
    iconBg: 'linear-gradient(135deg,rgba(123,47,255,0.15),rgba(123,47,255,0.05))',
    badge: "You're here",
    badgeColor: '#c4a8ff',
    link: 'https://vedant-portfolio-ef2k.vercel.app',
  },
]

export const skills = [
  { icon: '⚡', name: 'React.js & Next.js', level: 'Frontend · Advanced', pct: 90, pills: ['Hooks','Context API','SSR','SSG','API Routes'], wide: true },
  { icon: '🎨', name: 'Figma & Design', level: 'UI/UX · Advanced', pct: 85, pills: ['Prototyping','Auto Layout','Components'] },
  { icon: '🌐', name: 'JavaScript', level: 'Language · Advanced', pct: 88, pills: ['ES6+','DOM','Async/Await'] },
  { icon: '☁️', name: 'AWS Cloud', level: 'Cloud · Foundation', pct: 55, pills: ['EC2','S3','IAM'] },
  { icon: '🖥️', name: 'HTML & CSS', level: 'Frontend · Expert', pct: 95, pills: ['Flexbox','Grid','Animations'] },
  { icon: '🧠', name: 'Design Thinking', level: 'Process · Core Skill', pct: 80, pills: ['Empathy Map','User Research'] },
  { icon: '', name: 'Python & C++', level: 'Language · Intermediate', pct: 65, pills: ['DSA','OOP','DBMS'] },
  { icon: '🤖', name: 'AI Tools', level: 'Emerging Tech', pct: 75, pills: ['Claude AI','Prompt Engineering'] },
]

export const experiences = {
  left: [
    {
      date: '2025 – Present',
      title: 'Director of Event Operations',
      org: 'DeSoc — Design Society, KK Wagh',
      desc: 'Leading and managing design-focused events end-to-end at the college level. Overseeing team coordination, creative direction, and execution.',
    },
    {
      date: '2025 – Present',
      title: 'Co-Treasurer',
      org: 'ISTE — Indian Society for Technical Education',
      desc: 'Managing financial coordination and operations for a national-level technical committee, ensuring smooth functioning of all events and activities.',
    },
    {
      date: '2025',
      title: 'Core Member — EPM Team',
      org: 'Innov-era National Hackathon',
      desc: 'Contributing to event planning and smooth execution of a national-level hackathon at the organisational level.',
    },
  ],
  right: [
    {
      date: '2026',
      title: 'National Runner-Up',
      org: 'Hacksagon 2026 — IIIT Gwalior',
      desc: 'Competed against top teams across India and secured National Runner-Up position at one of the most competitive national hackathons.',
    },
    {
      date: '2025',
      title: 'Co-Head — Fashion Show',
      org: 'MAFFICK 2025 — College Cultural Fest',
      desc: 'Led creative direction and end-to-end execution of the Fashion Show at the annual college cultural fest.',
    },
    {
      date: '2025',
      title: 'College-Level Finalist',
      org: 'Smart India Hackathon (SIH)',
      desc: 'Reached the college finals collaborating with a team to build an innovative solution under a competitive national-level hackathon environment.',
    },
  ],
}

export const achievements = [
  { icon: '🏆', title: 'National Runner-Up — Hacksagon 2026', desc: 'Competed against top teams across India at Hacksagon organised by IIIT Gwalior and secured National Runner-Up position.', link: 'https://www.linkedin.com/posts/vedant-sonawane-57012a337_hacksagon2026-hackathon-firsthackathon-activity-7448666212894527488-Rzun?utm_source=share&utm_medium=member_android&rcm=ACoAAFSO5KQBMpxkC7g9xkwhy-Er1Z-Wg-nc0jU' },
  { icon: '🎯', title: 'SIH College-Level Finalist', desc: 'Selected as a college-level finalist at Smart India Hackathon — one of India\'s most prestigious national-level hackathons.' },
  { icon: '🎤', title: 'Master Student — ISTE 2025', desc: 'Recognised as one of only 17 Master Student Speakers from the entire 2nd-year batch under a prestigious Master Students Program By ISTE Student Chapter 2025.', link: 'https://www.linkedin.com/posts/vedant-sonawane-57012a337_masterstudentprogram-chasingchange-challengingstereotypes-activity-7323267466283868160-OT1x?utm_source=share&utm_medium=member_android&rcm=ACoAAFSO5KQBMpxkC7g9xkwhy-Er1Z-Wg-nc0jU' },
  { icon: '📜', title: 'Under-Copyrighted Innovation', desc: 'Developed a proprietary oil quantification formula for Swasthyam that is officially under copyright — recognising the originality of our work.' },
]

export const certifications = [
  { logo: 'U', logoBg: 'rgba(234,103,44,0.15)', logoColor: '#ea672c', name: 'Complete React & Next.js', platform: 'Udemy', desc: 'Hands-on project-based learning', status: 'Completed', done: true, link: 'https://www.linkedin.com/posts/vedant-sonawane-57012a337_reactjs-nextjs-webdevelopment-activity-7440787730495856641-Cjyh?utm_source=share&utm_medium=member_android&rcm=ACoAAFSO5KQBMpxkC7g9xkwhy-Er1Z-Wg-nc0jU' },
  { logo: 'AWS', logoBg: 'rgba(255,153,0,0.15)', logoColor: '#ff9900', name: 'AWS Foundation', platform: 'AWS Academy', desc: 'Cloud computing fundamentals', status: 'Completed', done: true, link: 'https://www.linkedin.com/posts/vedant-sonawane-57012a337_awsacademy-cloudfoundations-aws-activity-7442954303796948993-_BYu?utm_source=share&utm_medium=member_android&rcm=ACoAAFSO5KQBMpxkC7g9xkwhy-Er1Z-Wg-nc0jU' },
  { logo: 'AI', logoBg: 'rgba(208,93,68,0.15)', logoColor: '#d05d44', name: 'Claude AI Certification', platform: 'Anthropic', desc: 'Emerging AI technologies', status: 'Completed', done: true },
]
