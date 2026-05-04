// ============================================================
// CV DATA - sourced verbatim from sections/*.tex
// DO NOT modify content, only structure
// ============================================================

export const personalInfo = {
  name: 'NGUYEN Trong Thang, BEng',
  phone: '+84 387 779 883',
  email: 'trongthang.muzik@outlook.com',
  linkedin: 'ntthang-dev',
  linkedinUrl: 'http://www.linkedin.com/in/example/',
  github: 'ntthang-dev',
  githubUrl: 'https://github.com/ntthang-dev',
  blog: 'My Blog',
  blogUrl: 'https://bktienhiepquan.blogspot.com/',
  facebook: 'NguyenTrongThang',
  facebookUrl: 'https://facebook.com/thang.nguyen142857',
};

export const education = [
  {
    period: '2019 – 2026',
    degree: 'BEng. Electrical Engineering',
    institution: 'Ho Chi Minh University of Technology (HCMUT)',
    specialization: 'Power Systems',
    gpa: '7.07/10.0 for 133/132 Credits | Credits earned: 191/132',
    highlights: [
      'Project 1: Power Supply Design for a Brewery Factory — 9.0/10',
      'Project 2: Unified Multi-View Clustering Model for Time-Series Data: Integrating Shape Invariance and Outlier Robustness — 9.5/10',
      'Thesis: Proposing machine learning methods for classifying electricity customers with multiple characteristics — 9.7/10',
    ],
  },
];

export const employment = [
  {
    period: '2023 – 2026',
    role: 'Research Assistant',
    org: 'Power System Laboratory, Ho Chi Minh City University of Technology (HCMUT)',
  },
  {
    period: '2022 – 2024',
    role: 'Product & Brand Consultant',
    org: 'Private Enterprise, Ho Chi Minh City',
    detail: 'Focus: Product research and development (R&D), customer consultation, brand advertising, and marketing strategies.',
  },
  {
    period: '2020 – 2022',
    role: 'Research Assistant',
    org: 'Power Electric Research Laboratory, Ho Chi Minh City University of Technology (HCMUT)',
  },
  {
    period: '2021',
    role: 'Engineering Intern',
    org: 'Medium Voltage Consulting Department, HCMC Power Engineering Construction Consulting Joint Stock Company',
  },
];

export const projects = [
  {
    year: 2025,
    title: 'Smart Grid Monitoring and Control System (Graduation Thesis)',
    description: 'A comprehensive web platform for power system dispatch, electricity market simulation, and AI-driven customer load profiling.',
    url: 'https://smart-grid-mivkm-thesis.netlify.app/',
    urlLabel: 'smart-grid-mivkm-thesis.netlify.app',
    tags: ['Power Systems', 'AI', 'Web'],
    category: 'power',
  },
  {
    year: 2025,
    title: 'ClusterLayoutOptimizer (Electrical Cabinet Layout)',
    description: 'Automated layout optimization system utilizing custom K-Means clustering and geometric algorithms for obstacle avoidance and automatic wiring.',
    url: 'https://github.com/ntthang-dev/ClusterLayoutOptimizer.git',
    urlLabel: 'github.com/ntthang-dev/ClusterLayoutOptimizer',
    tags: ['Python', 'ML', 'Optimization'],
    category: 'power',
  },
  {
    year: 2025,
    title: 'Physics-Informed Neural Networks (PINNs) for Power System Stability',
    description: 'Pioneered the integration of physical laws into deep learning architectures to directly model and solve the complex dynamics of SMIB systems.',
    tech: 'Python, Deep Learning, Differential Equations',
    tags: ['Deep Learning', 'Physics', 'Power Systems'],
    category: 'power',
  },
  {
    year: 2025,
    title: 'Small-Signal Stability via Matrix Decomposition',
    description: 'Formulated a mathematically rigorous, Big-O optimized computational tool applying matrix decomposition and eigen-analysis to block-diagonalize N-machine grid state matrices.',
    tech: 'Advanced Linear Algebra, MATLAB',
    tags: ['MATLAB', 'Linear Algebra', 'Power Systems'],
    category: 'power',
  },
  {
    year: 2025,
    title: 'Optimal Control of Automatic Voltage Regulator (AVR) via LQR',
    description: 'Designed a Linear Quadratic Regulator (LQR) algorithm to mathematically optimize the transient response and ensure robust voltage stability for synchronous generators.',
    tech: 'Power System Stability, Optimal Control',
    tags: ['Control Theory', 'MATLAB', 'Power Systems'],
    category: 'power',
  },
  {
    year: 2024,
    title: 'Golang-based SCADA System via Modbus Protocol',
    description: 'Real-time data acquisition and remote control system for industrial electrical equipment using Golang and the Modbus communication protocol.',
    tags: ['Golang', 'SCADA', 'Modbus', 'Industrial'],
    category: 'power',
  },
  {
    year: 2025,
    title: 'Femnia: AI-Powered Women\'s Health Platform',
    description: "An AI-integrated web application designed for tracking, predicting menstrual cycles, and providing personalized healthcare insights.",
    url: 'https://femnia-v2.netlify.app/',
    urlLabel: 'femnia-v2.netlify.app',
    tags: ['AI', 'Web', 'React'],
    category: 'other',
  },
  {
    year: 2024,
    title: 'Xiangqi (Chinese Chess) AI Engine & Web Platform',
    description: 'Intelligent game-playing AI utilizing Minimax, Alpha-Beta Pruning, and MCTS, fully deployed as an interactive web application.',
    url: 'https://github.com/ntthang-dev/Xiangqi_AI',
    urlLabel: 'github: Xiangqi_AI',
    url2: 'https://github.com/ntthang-dev/Xiangqi_AI_Web.git',
    urlLabel2: 'github: Xiangqi_AI_Web',
    tags: ['AI', 'Game Dev', 'Python'],
    category: 'other',
  },
  {
    year: 2024,
    title: 'Probabilistic Robotics and 1D Robot Localization',
    description: 'Implemented a 1D Particle Filter algorithm, utilizing Bayesian probability and sensor measurement updates to estimate the robot\'s state under extreme uncertainty.',
    tech: 'Probability & Statistics, Autonomous Systems',
    tags: ['Robotics', 'Probability', 'Python'],
    category: 'other',
  },
  {
    year: 2024,
    title: 'Non-linear Inverted Pendulum Control via Sliding Mode Control (SMC)',
    description: 'Developed a robust non-linear controller utilizing the Lyapunov stability criterion to maintain system equilibrium under high uncertainty and external disturbances.',
    tech: 'Advanced Control Theory, Non-linear Dynamics',
    tags: ['Control Theory', 'MATLAB'],
    category: 'other',
  },
  {
    year: 2022,
    title: 'Convex Hulls in Normed Vector Spaces and Practical Applications',
    description: 'Conducted rigorous mathematical proofs on the geometric properties of convex hulls within infinite-dimensional normed spaces and explored their algorithm applications.',
    tech: 'Functional Analysis, Convex Geometry',
    tags: ['Math', 'Algorithms'],
    category: 'other',
  },
  {
    year: 2021,
    title: 'Vector and Matrix Norms: Theoretical Foundations and Applications in Lasso Regression',
    description: 'Investigated the mathematical properties of vector/matrix norms and their optimization role in L1-regularized (Lasso) machine learning models.',
    tech: 'Advanced Linear Algebra, Machine Learning Optimization',
    tags: ['Math', 'ML'],
    category: 'other',
  },
  {
    year: 2020,
    title: 'The Standard Model of Particle Physics: Higgs Boson and Macroscopic Quantum States',
    description: 'Researched elementary particles, the Higgs mechanism, and the theoretical quantum physics underlying the 5th and 6th states of matter.',
    tech: 'Quantum Physics, Particle Physics',
    tags: ['Physics', 'Quantum'],
    category: 'other',
  },
  {
    year: 2020,
    title: 'Computational Astrodynamics: Multi-Stage Rocket Trajectory Simulation',
    description: 'Programmed complex kinematic simulations of multi-stage rockets utilizing advanced numerical integration methods, including the Verlet algorithm and Iterative Euler.',
    tech: 'Classical Mechanics, Numerical Analysis',
    tags: ['Physics', 'Simulation', 'Python'],
    category: 'other',
  },
];

export const skills = {
  'Electrical Engineering': 'Power System Control & Stability, High Voltage & Lightning Protection, SCADA Systems & Modbus Protocol, Electrical Distribution, Power Supply System Design, IoT/Embedded, Arduino.',
  'AI & Computer Science': 'Machine Learning (Regression, SVM, K-Means), Deep Learning (RNN, LSTM, MLP), TensorFlow, Reinforcement Learning (Q-Learning), Heuristic Search Algorithms (A*, MCTS), Data Structures & Algorithms.',
  'Math, Physics & Quantum': 'Quantum Computing, Quantum Machine Learning, Advanced Linear Algebra, Functional Analysis, Complex Analysis, Wave Optics, Wave Physics, Nuclear Physics.',
  'Programming Languages': 'C/C++, C#, Golang, Python, Rust, Java, JavaScript, R, Pascal, Fortran, x86/x64 Assembly, Basic, MATLAB, LaTeX, PHP.',
  'Web & App Dev': 'HTML/CSS, Flutter, Angular, XML/XSL, React, Node.js, Firebase, Figma.',
  'Databases & DevOps': 'Linux, Git, Docker, MySQL, PostgreSQL, HSQL, SQLite.',
  'Engineering Software': 'ETAP, AutoCAD, Autodesk Inventor, Altium Designer, MATLAB Simulink, PSS/E, BIM MEP (Revit).',
  'Professional Skills': 'Problem Solving, Academic Research, Project Management, Team Leadership, Teaching & Training, Consultation, Technical Writing & Publishing, LaTeX typesetting.',
  'Languages': 'Vietnamese: Native | English: Professional Working Proficiency | French: Conversational | Basic: Chinese, Korean, Japanese.',
};

export const misc = [
  {
    year: 2026,
    title: '[Nominated] Best Graduation Thesis Award',
    org: 'Faculty of Electrical and Electronics Engineering, HCMUT',
    detail: 'Recognized for achieving the highest evaluation score in the graduation defense committee (Pending final approval).',
  },
  {
    year: 2025,
    title: 'Semi-finalist, The 27th Euréka Scientific Research Student Award',
    field: 'Field: Economics (Commerce, Business Administration, and Marketing).',
    detail: 'Project: "A Big Data Analytics Tool Utilizing Machine Learning for Energy Consumption Insight and Optimization in the Power Industry".',
  },
  {
    year: 2025,
    title: 'Certified of Completion the Global Project-Based Learning Program',
    detail: 'Awarded by Prof. Goro FUJITA, Shibaura Institute of Technology, Japan.',
  },
];
