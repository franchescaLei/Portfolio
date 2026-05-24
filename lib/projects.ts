export interface Project {
  slug: string
  title: string
  subtitle: string
  category: 'web' | 'mobile' | 'game'
  categoryLabel: string
  description: string
  longDescription: string
  stack: string[]
  highlights: string[]
  image: string
  accent: string
  accentDark: string
  liveUrl?: string
  githubUrl?: string
  year: string
  status: string
}

export const projects: Project[] = [
  {
    slug: 'digital-scrum-board',
    title: 'Digital Scrum Board',
    subtitle: 'Real-time agile project management platform',
    category: 'web',
    categoryLabel: 'Full-Stack Web',
    description:
      'A production-grade agile workspace with real-time collaboration, drag-and-drop Kanban boards, and sprint planning — built for development teams that need instant sync across all connected clients.',
    longDescription: `Digital Scrum Board is a full-stack agile project management platform I designed and built end-to-end. It implements the complete Scrum lifecycle — from epic and work item creation through sprint planning, execution, and completion.

The frontend is a React + TypeScript SPA built on Vite, with drag-and-drop Kanban boards, real-time updates via SignalR, and a role-differentiated UI that mirrors backend permission models exactly. The backend is a production-grade ASP.NET Core 9 REST API on SQL Server with transactional audit logging, multi-layer authorization, and real-time broadcasting.

Every board change, comment, and notification is pushed to all connected clients instantly — no page refreshes, no polling. The architecture treats security as a first-class concern: HttpOnly cookie auth, session invalidation propagated via SignalR across all browser tabs simultaneously, and PBKDF2 password hashing with 150,000 iterations.`,
    stack: [
      'React', 'TypeScript', 'Vite', 'SignalR',
      'ASP.NET Core 9', 'Entity Framework Core', 'SQL Server',
      'MSSQL', 'C#', 'REST API'
    ],
    highlights: [
      'Dual SignalR hub architecture — board events and user notifications on separate persistent connections',
      'Optimistic UI with targeted rollback: only the affected card reverts on failure, not the entire board',
      'Permission-aware UI mirroring backend model — sprint manager, assignee, and role all determine what you can touch',
      'Session invalidation pushed in real time to all open browser tabs when admin changes your role',
      'Multi-step auth gate architecture with automatic polling-based progression for email verification',
      'Transactional audit logging — no data mutation occurs without a corresponding audit record',
      'PBKDF2-SHA256 with versioned hash format supporting future algorithm migration',
      'EF-level hierarchy rule enforcement as SaveChanges interceptor',
    ],
    image: '/images/projects/scrum-board.jpg',
    accent: '#4A7AFF',
    accentDark: '#3A6AEF',
    liveUrl: 'https://digital-scrum-board.vercel.app',
    githubUrl: 'https://github.com/yourusername/digital-scrum-board',
    year: '2024',
    status: 'Live',
  },
  {
    slug: 'pixelaura',
    title: 'PixelAura',
    subtitle: 'Android social platform for artists',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    description:
      'A production-ready Android social platform for artists to share work, grow an audience, and engage with a creative community — with real-time messaging, a bidirectional social graph, and an event-driven notification pipeline.',
    longDescription: `PixelAura is a native Android social media platform I built for the creative community — artists sharing work, finding audiences, and connecting with peers. It implements the core architecture of a modern social platform: real-time messaging, a bidirectional social graph, content engagement mechanics, and an event-driven notification system.

Built natively in Kotlin, the app uses Firebase Authentication for secure auth, Cloud Firestore as the primary NoSQL database, and Firestore snapshot listeners for instant real-time updates without polling. The image pipeline routes through the Imgur API to keep binary data out of Firestore and maintain low read/write costs within free-tier quotas.

The data model handles complex relational structures across multiple collections — users, posts, likes, reposts, follow relationships, messaging threads, and notifications — while minimizing read operations. The follow system powers both personalized feed generation and notification triggers for social interactions.`,
    stack: [
      'Kotlin', 'Android', 'Firebase Auth',
      'Cloud Firestore', 'Imgur API', 'Jetpack', 'MVVM'
    ],
    highlights: [
      'Real-time messaging with Firestore snapshot listeners — instant delivery without polling',
      'Bidirectional social graph enabling personalized feed generation and notification triggers',
      'Event-driven notification pipeline for follows, likes, reposts, and messages',
      'Image pipeline through Imgur API keeps binary data out of Firestore, minimizing read costs',
      'Fully customizable artist profiles with portfolio galleries and social stats',
      'NoSQL data model optimized for free-tier quota constraints across 6+ collections',
    ],
    image: '/images/projects/pixelaura.jpg',
    accent: '#FF6B9D',
    accentDark: '#E0508A',
    githubUrl: 'https://github.com/yourusername/pixelaura',
    year: '2024',
    status: 'Android APK Available',
  },
  {
    slug: 'lusong',
    title: 'Lusong',
    subtitle: '3D survival adventure game on marine conservation',
    category: 'game',
    categoryLabel: 'Game Dev',
    description:
      'A systems-driven 3D survival adventure game set in the Philippine seas — where every fishing decision ripples into the ecosystem. Built in Unity with a karma system, real-time pollution simulation, and Filipino mythological creatures.',
    longDescription: `Lusong is a 3D survival adventure game I developed as a capstone project — a moral mirror set in the Philippine seas, where the ocean responds directly and meaningfully to how the player treats it. The core question: what kind of fisher do you want to be?

The game mechanizes four real environmental crises: overfishing, marine pollution, illegal fishing, and the loss of indigenous fishing knowledge. These aren't abstract statistics — they're woven into every system so the player feels them, causes them, and can choose to reverse them.

Built in Unity, the architecture centers on persistent singleton managers (GameManager, SaveManager, QuestManager, InventoryManager) that survive scene transitions. The save system supports 3 independent slots with SHA256 checksum verification and atomic writes. A custom karma system tracks ethical decisions across 15+ action types. The pollution simulation changes fog density, fish availability, spot counts, and mutant fish spawn rates in real time.

The Bakunawa — a Filipino sea serpent — serves as the ultimate consequence: 100% pollution triggers permanent save deletion. The world also references four Philippine environmental laws (RA 8550, 9003, 9275, 9147) through NPC dialogue and in-game consequences.`,
    stack: [
      'Unity', 'C#', 'Unity NavMesh', 'ScriptableObjects',
      'Unity Animator', 'Unity Physics', 'Custom Save System', 'FMOD'
    ],
    highlights: [
      'Dual-currency loop: ecological (karma, pollution) and economic (PHP) systems are in constant tension',
      'Pollution simulation changes fog density, fish availability, and mutant spawn rates in real time',
      'DREDGE-style grid inventory with shape-based item placement creating genuine spatial decision-making',
      'Karma system with 15+ tracked action types, threshold-based world consequences, and dawn-check rewards',
      'Bakunawa permanent-save-deletion at 100% pollution — consequence is irreversible',
      'Fishdex, Encounters, and Achievement systems tracking 10+ achievements per save slot',
      'SHA256 checksum save verification with atomic writes preventing data corruption',
      'References real Philippine environmental laws: RA 8550, 9003, 9275, 9147, 7586',
    ],
    image: '/images/projects/lusong.jpg',
    accent: '#3ECFB2',
    accentDark: '#2BBFA0',
    githubUrl: 'https://github.com/yourusername/lusong',
    year: '2024',
    status: 'Capstone — Complete',
  },
]

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug)
}
