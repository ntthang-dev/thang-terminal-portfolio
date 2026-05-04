import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { personalInfo, skills, education } from '../data/cvData';

// ── Types ────────────────────────────────────────────────────────────────────

type TextColor = 'green' | 'cyan' | 'red' | 'yellow' | 'white' | 'gray';

export type OutputSegment =
  | { type: 'text'; content: string; color?: TextColor }
  | { type: 'link'; label: string; href: string }
  | { type: 'br' }
  | { type: 'jsx'; element: ReactNode };

export interface TerminalLine {
  id: string;
  kind: 'input' | 'output' | 'system';
  segments?: OutputSegment[];
  raw?: string;
}

interface TerminalContextValue {
  lines: TerminalLine[];
  activeWindows: Record<string, boolean>;
  pushInput: (cmd: string) => void;
  runCommand: (cmd: string) => void;
  clearLines: () => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const TerminalContext = createContext<TerminalContextValue | null>(null);

export const useTerminal = () => {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error('useTerminal must be used inside TerminalProvider');
  return ctx;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2);

function seg(content: string, color?: TextColor): OutputSegment {
  return { type: 'text', content, color };
}

function link(label: string, href: string): OutputSegment {
  return { type: 'link', label, href };
}

function br(): OutputSegment {
  return { type: 'br' };
}

// ── Command Handlers ─────────────────────────────────────────────────────────

let currentLang = 'vi'; // default to VI as requested

function buildHelp(): OutputSegment[] {
  const isVi = currentLang === 'vi';
  const isFr = currentLang === 'fr';

  const out: OutputSegment[] = [
    seg('┌─────────────────────────────────────────────────────────┐', 'green'), br(),
    seg(isVi ? '│  TÀI LIỆU HƯỚNG DẪN HỆ THỐNG (v2.5.1)                   │' : isFr ? '│  MANUEL DU SYSTÈME (v2.5.1)                             │' : '│  SYSTEM MANUAL (v2.5.1)                                 │', 'green'), br(),
    seg('└─────────────────────────────────────────────────────────┘', 'green'), br(), br(),
  ];

  const categories = [
    {
      title: isVi ? '[ HỒ SƠ CÁ NHÂN ]' : isFr ? '[ DOSSIER PERSONNEL ]' : '[ USER DOSSIER ]',
      cmds: [
        ['whoami',      isVi ? 'Tóm tắt thông tin & tầm nhìn' : 'Profile summary and vision'],
        ['skills',      isVi ? 'Danh sách kỹ năng công nghệ' : 'List technical skills by category'],
        ['projects',    isVi ? 'Giao diện quản lý đồ án (Hoặc dùng: ls, dir)' : 'Project UI (Aliases: ls, dir)'],
        ['education',   isVi ? 'Hồ sơ học thuật & bằng cấp' : 'Academic background & degrees'],
        ['experience',  isVi ? 'Tiến trình kinh nghiệm làm việc' : 'Work experience timeline'],
        ['awards',      isVi ? 'Chứng chỉ & giải thưởng' : 'Certifications & achievements'],
        ['download cv', isVi ? 'Tải tệp PDF CV gốc' : 'Download the full PDF CV'],
      ]
    },
    {
      title: isVi ? '[ HỆ THỐNG & MẠNG ]' : isFr ? '[ SYSTÈME & RÉSEAU ]' : '[ SYSTEM & NETWORK ]',
      cmds: [
        ['contact',     isVi ? 'Mở cổng liên lạc (EmailJS)' : 'Establish secure uplink (EmailJS)'],
        ['top, htop',   isVi ? 'Chuẩn đoán hiệu suất phần cứng' : 'System hardware diagnostics'],
        ['lang',        isVi ? 'Đổi ngôn ngữ (VD: lang --vi | --en | --fr)' : 'Switch language (Usage: lang --en)'],
        ['ping [ip]',   isVi ? 'Kiểm tra gói tin mạng' : 'Network packet diagnostic'],
      ]
    },
    {
      title: isVi ? '[ LỆNH TIỆN ÍCH ]' : isFr ? '[ UTILITAIRES ]' : '[ CORE UTILITIES ]',
      cmds: [
        ['help, ?',     isVi ? 'Hiển thị bảng hướng dẫn này' : 'Show this system manual'],
        ['clear, cls',  isVi ? 'Xoá màn hình terminal' : 'Clear terminal screen'],
        ['pwd, date',   isVi ? 'In thư mục hiện tại, thời gian' : 'Print working dir, current time'],
        ['echo [txt]',  isVi ? 'In chuỗi văn bản ra màn hình' : 'Print text string to stdout'],
        ['cat cv.txt',  isVi ? 'Đọc nội dung file hồ sơ (Alias: whoami)' : 'Read profile file (Alias: whoami)'],
      ]
    }
  ];

  for (const cat of categories) {
    out.push(seg(cat.title, 'cyan')); out.push(br());
    for (const [cmd, desc] of cat.cmds) {
      out.push(seg('  ', 'gray'));
      out.push(seg(cmd.padEnd(16), 'yellow'));
      out.push(seg(desc, 'white'));
      out.push(br());
    }
    out.push(br());
  }

  out.push(seg(isVi ? 'Gõ một lệnh và nhấn [Enter]' : 'Type a command and press [Enter]', 'gray'));
  out.push(br());
  return out;
}

function buildWhoami(): OutputSegment[] {
  const isVi = currentLang === 'vi';
  const isFr = currentLang === 'fr';

  const bioVi = [
    seg('Tôi là Nguyễn Trọng Thắng, một Kỹ sư Hệ thống điện mang trong mình sự nhiệt huyết mãnh liệt với công nghệ hiện đại. Từng tốt nghiệp và hiện đang tham gia với vai trò ', 'white'), seg('Cộng tác viên Nghiên cứu', 'cyan'), seg(' tại Bộ môn Hệ thống điện, Đại học Bách Khoa TP.HCM (HCMUT), tôi tập trung vào việc nghiên cứu và ứng dụng ', 'white'), seg('Trí tuệ Nhân tạo (AI)', 'cyan'), seg(' cùng ', 'white'), seg('Kỹ thuật Phần mềm', 'cyan'), seg(' vào các bài toán hạ tầng năng lượng phức tạp.', 'white'), br(), br(),
    seg('Tầm nhìn của tôi không chỉ dừng lại ở các hệ thống điện truyền thống. Tôi hướng tới việc giải quyết các thách thức tối ưu hóa trong lưới điện thông minh (Smart Grid), tiên phong ứng dụng các thuật toán Deep Learning (như PINNs - Mạng nơ-ron vật lý) để tính toán, mô phỏng và ổn định góc dao động rotor theo thời gian thực. Tôi tin rằng năng lượng của tương lai phải được dẫn dắt bởi dữ liệu và AI.', 'white'), br(), br(),
    seg('Về mặt chuyên môn, tôi tự hào có thể làm cầu nối giữa Công nghệ Thông tin và Kỹ thuật Điện lực. Tôi sở hữu khả năng xây dựng các hệ thống Backend hiệu năng cao bằng Golang, tích hợp liền mạch giao thức Modbus cho trạm biến áp, và triển khai các mô hình Machine Learning bằng Python. Tôi luôn tìm kiếm sự hoàn hảo, tính thực tế và độ chính xác tuyệt đối trong từng dự án công nghiệp cũng như các báo cáo khoa học.', 'white'), br(), br()
  ];

  const bioEn = [
    seg('I am Nguyen Trong Thang, a Power Systems Engineer with a fierce passion for modern technology. As an alumnus and active ', 'white'), seg('Research Collaborator', 'cyan'), seg(' at the Department of Power Systems, Ho Chi Minh City University of Technology (HCMUT), I focus on researching and applying ', 'white'), seg('Artificial Intelligence (AI)', 'cyan'), seg(' and ', 'white'), seg('Software Engineering', 'cyan'), seg(' to solve complex energy infrastructure problems.', 'white'), br(), br(),
    seg('My vision extends far beyond traditional electrical grids. I aim to tackle optimization challenges within the Smart Grid, pioneering the application of Deep Learning algorithms (such as Physics-Informed Neural Networks - PINNs) to compute, simulate, and stabilize rotor angle oscillations in real-time. I firmly believe that the future of energy must be driven by data and AI.', 'white'), br(), br(),
    seg('Professionally, I take pride in bridging the gap between IT and Power Engineering. I possess the ability to build high-performance Backend pipelines using Golang, seamlessly integrate Modbus protocols for electrical substations, and deploy scalable Machine Learning models in Python. I constantly seek perfection, practicality, and absolute precision in every industrial project and scientific research paper.', 'white'), br(), br()
  ];

  const bioFr = [
    seg('Je suis Nguyen Trong Thang, un Ingénieur en Systèmes Électriques avec une passion ardente pour la technologie moderne. En tant qu\'ancien élève et ', 'white'), seg('Collaborateur de Recherche', 'cyan'), seg(' actif au Département des Systèmes Électriques de l\'Université de Technologie de Ho Chi Minh-Ville (HCMUT), je me concentre sur la recherche et l\'application de ', 'white'), seg('l\'Intelligence Artificielle (IA)', 'cyan'), seg(' et de ', 'white'), seg('l\'Ingénierie Logicielle', 'cyan'), seg(' pour résoudre les problèmes complexes des infrastructures énergétiques.', 'white'), br(), br(),
    seg('Ma vision va bien au-delà des réseaux électriques traditionnels. Mon objectif est de relever les défis d\'optimisation des réseaux intelligents (Smart Grids), en pionnier de l\'application d\'algorithmes d\'apprentissage profond (comme les réseaux neuronaux informés par la physique - PINN) pour calculer, simuler et stabiliser les oscillations des angles de rotor en temps réel. Je suis fermement convaincu que l\'avenir de l\'énergie doit être piloté par les données et l\'IA.', 'white'), br(), br(),
    seg('Sur le plan professionnel, je suis fier de faire le lien entre l\'informatique et l\'ingénierie électrique. Je possède la capacité de créer des pipelines Backend haute performance en utilisant Golang, d\'intégrer de manière transparente les protocoles Modbus pour les sous-stations électriques, et de déployer des modèles de Machine Learning évolutifs en Python. Je recherche constamment la perfection, la praticité et une précision absolue dans chaque projet industriel et article de recherche scientifique.', 'white'), br(), br()
  ];

  const bio = isVi ? bioVi : isFr ? bioFr : bioEn;

  return [
    seg(`root@ntthang:~# id`, 'gray'), br(),
    seg(`uid=0(root) gid=0(root) groups=0(wheel), 1(power_systems), 2(ai_architects), 3(full_stack)`, 'white'), br(), br(),
    seg('╔══════════════════════════════════════════════════════════╗', 'green'), br(),
    seg(isVi ? '║  HỒ SƠ VẬN HÀNH — MỨC ĐỘ BẢO MẬT: OMNICLASS-9            ║' : isFr ? '║  PROFIL OPÉRATEUR — HABILITATION DE SÉCURITÉ: OMNICLASS-9║' : '║  OPERATOR PROFILE — SECURITY CLEARANCE: OMNICLASS-9      ║', 'green'), br(),
    seg('╚══════════════════════════════════════════════════════════╝', 'green'), br(), br(),
    ...bio,
    seg(isVi ? '  ĐỊNH DANH:   ' : isFr ? '  IDENTITÉ:    ' : '  IDENTITY:    ', 'cyan'), seg(personalInfo.name, 'white'), br(),
    seg(isVi ? '  CHỨC DANH:   ' : isFr ? '  TITRE:       ' : '  DESIGNATION: ', 'cyan'), seg('Power Systems Engineer // AI Architect // Full-Stack Developer', 'white'), br(),
    seg(isVi ? '  TRỤ SỞ:      ' : isFr ? '  BASE:        ' : '  BASE:        ', 'cyan'), seg('Bộ môn Hệ thống điện - Trường ĐH Bách Khoa TP.HCM (HCMUT)', 'white'), br(), br(),
    seg(isVi ? '  > NĂNG LỰC LÕI: ' : isFr ? '  > COMPÉTENCES CLÉS: ' : '  > KEY COMPETENCIES: ', 'yellow'), br(),
    seg('    [+] ', 'green'), seg(isVi ? 'Phân tích Hệ thống Điện' : 'Power System Analysis', 'cyan'), seg(isVi ? ' — Nghiên cứu ổn định dao động, Chế độ quá độ, Giải tích SCADA/EMS.' : ' — Oscillation stability, Transient regimes, SCADA/EMS Analysis.', 'white'), br(),
    seg('    [+] ', 'green'), seg(isVi ? 'Machine Learning & Toán tối ưu' : 'Machine Learning & Optimization', 'cyan'), seg(isVi ? ' — Lập trình mô hình PINNs, Meta-heuristic, Neural Networks.' : ' — PINNs modeling, Meta-heuristics, Neural Networks.', 'white'), br(),
    seg('    [+] ', 'green'), seg(isVi ? 'Kiến trúc Phần mềm' : 'Software Architecture', 'cyan'), seg(isVi ? ' — Phát triển hệ thống Golang (Backend), Modbus RTU/TCP, ReactJS (Frontend).' : ' — Golang distributed backends, Modbus RTU/TCP, ReactJS.', 'white'), br(), br(),
    seg('  > COMMS LINK: ', 'yellow'), br(),
    seg('    Email   : ', 'gray'), link(personalInfo.email, `mailto:${personalInfo.email}`), br(),
    seg('    Phone   : ', 'gray'), seg(personalInfo.phone, 'white'), br(),
    seg('    GitHub  : ', 'gray'), link('github.com/ntthang-dev', personalInfo.githubUrl), br(),
    seg('    LinkedIn: ', 'gray'), link('linkedin.com/in/ntthang-dev', personalInfo.linkedinUrl), br(),
    seg('    Blog    : ', 'gray'), link('bktienhiepquan.blogspot.com', personalInfo.blogUrl), br(), br(),
    seg(isVi ? '  Gõ lệnh ' : isFr ? '  Exécutez ' : '  Run ', 'gray'), seg('projects', 'yellow'), seg(' | ', 'gray'), seg('skills', 'yellow'),
    seg(' | ', 'gray'), seg('experience', 'yellow'), seg(isVi ? ' để xem các thông tin khác.' : isFr ? ' pour le dossier détaillé.' : ' for detailed dossier.', 'gray'), br(),
  ].filter(Boolean) as OutputSegment[];
}

function buildSkills(): OutputSegment[] {
  const isVi = currentLang === 'vi';
  const isFr = currentLang === 'fr';
  const out: OutputSegment[] = [
    seg(isVi ? '┌─ KỸ NĂNG & CHUYÊN MÔN ───────────────────────────┐' : isFr ? '┌─ COMPÉTENCES & EXPERTISE ────────────────────────┐' : '┌─ SKILLS & EXPERTISE ─────────────────────────────┐', 'cyan'), br(), br(),
  ];

  const translatedSkills: Record<string, {vi: string, fr: string, en: string, items: string}> = {
    'Electrical Engineering': {
      vi: 'Kỹ thuật Điện', fr: 'Génie Électrique', en: 'Electrical Engineering',
      items: isVi ? 'Điều khiển & Ổn định Hệ thống điện, Cao áp & Chống sét, Hệ thống SCADA & Giao thức Modbus, Cung cấp điện, Thiết kế chiếu sáng, IoT/Nhúng, Arduino.' : isFr ? 'Contrôle & Stabilité des Réseaux, Haute Tension & Paratonnerre, Systèmes SCADA & Protocole Modbus, Distribution Électrique, Conception d\'Éclairage, IoT/Embarqué, Arduino.' : skills['Electrical Engineering']
    },
    'AI & Computer Science': {
      vi: 'Trí tuệ Nhân tạo & KHMT', fr: 'IA & Informatique', en: 'AI & Computer Science',
      items: isVi ? 'Học máy (Hồi quy, SVM, K-Means), Học sâu (RNN, LSTM, MLP, PINNs), TensorFlow, Học tăng cường (Q-Learning), Thuật toán Heuristic (A*, MCTS), Cấu trúc dữ liệu & Giải thuật.' : isFr ? 'Apprentissage Automatique (Régression, SVM, K-Means), Apprentissage Profond (RNN, LSTM, MLP, PINNs), TensorFlow, Apprentissage par Renforcement, Algorithmes Heuristiques, Structures de Données.' : skills['AI & Computer Science']
    },
    'Math, Physics & Quantum': {
      vi: 'Toán học, Vật lý & Lượng tử', fr: 'Mathématiques, Physique & Quantique', en: 'Math, Physics & Quantum',
      items: isVi ? 'Tính toán lượng tử, Học máy lượng tử, Đại số tuyến tính nâng cao, Giải tích hàm, Giải tích phức, Quang học sóng, Vật lý sóng, Vật lý hạt nhân.' : isFr ? 'Informatique Quantique, Apprentissage Automatique Quantique, Algèbre Linéaire Avancée, Analyse Fonctionnelle, Analyse Complexe, Optique Ondulatoire, Physique Nucléaire.' : skills['Math, Physics & Quantum']
    },
    'Programming Languages': {
      vi: 'Ngôn ngữ Lập trình', fr: 'Langages de Programmation', en: 'Programming Languages',
      items: skills['Programming Languages']
    },
    'Web & App Dev': {
      vi: 'Phát triển Web & App', fr: 'Développement Web & App', en: 'Web & App Dev',
      items: skills['Web & App Dev']
    },
    'Databases & DevOps': {
      vi: 'Cơ sở dữ liệu & DevOps', fr: 'Bases de Données & DevOps', en: 'Databases & DevOps',
      items: skills['Databases & DevOps']
    },
    'Engineering Software': {
      vi: 'Phần mềm Kỹ thuật', fr: 'Logiciels d\'Ingénierie', en: 'Engineering Software',
      items: skills['Engineering Software']
    },
    'Professional Skills': {
      vi: 'Kỹ năng Chuyên môn', fr: 'Compétences Professionnelles', en: 'Professional Skills',
      items: isVi ? 'Giải quyết vấn đề, Nghiên cứu học thuật, Quản lý dự án, Lãnh đạo nhóm, Giảng dạy & Đào tạo, Tư vấn, Viết tài liệu kỹ thuật & Xuất bản, Trình bày LaTeX.' : isFr ? 'Résolution de Problèmes, Recherche Académique, Gestion de Projet, Leadership d\'Équipe, Enseignement, Consultation, Rédaction Technique, Typographie LaTeX.' : skills['Professional Skills']
    },
    'Languages': {
      vi: 'Ngoại ngữ', fr: 'Langues', en: 'Languages',
      items: isVi ? 'Tiếng Việt: Bản ngữ | Tiếng Anh: Lưu loát (Chuyên ngành) | Tiếng Pháp: Giao tiếp | Cơ bản: Trung, Hàn, Nhật.' : isFr ? 'Vietnamien: Langue Maternelle | Anglais: Maîtrise Professionnelle | Français: Conversationnel | Bases: Chinois, Coréen, Japonais.' : skills['Languages']
    }
  };

  for (const [, detail] of Object.entries(translatedSkills)) {
    const title = isVi ? detail.vi : isFr ? detail.fr : detail.en;
    out.push(seg(`  [${title}]`, 'yellow'));
    out.push(br());
    out.push(seg(`    ${detail.items}`, 'white'));
    out.push(br());
    out.push(br());
  }
  out.push(seg('└───────────────────────────────────────────────────┘', 'cyan'));
  out.push(br());
  return out;
}

function buildEducation(): OutputSegment[] {
  const e = education[0];
  const isVi = currentLang === 'vi';
  const isFr = currentLang === 'fr';
  
  return [
    seg(isVi ? '┌─ HỒ SƠ HỌC THUẬT ────────────────────────────────┐' : isFr ? '┌─ ÉDUCATION ──────────────────────────────────────┐' : '┌─ EDUCATION ──────────────────────────────────────┐', 'cyan'), br(), br(),
    seg(`  ${e.period}`, 'yellow'), br(),
    seg(`  ${isVi ? 'Kỹ sư Hệ thống Điện' : isFr ? 'Ingénieur en Systèmes Électriques' : e.degree}`, 'white'), br(),
    seg(`  ${isVi ? 'Đại học Bách Khoa TP.HCM (HCMUT)' : isFr ? 'Université de Technologie de Ho Chi Minh-Ville (HCMUT)' : e.institution}`, 'green'), br(),
    seg(`  ${isVi ? 'Chuyên ngành' : isFr ? 'Spécialisation' : 'Specialization'}: ${isVi ? 'Hệ thống Điện' : isFr ? 'Systèmes Électriques' : e.specialization}`, 'gray'), br(),
    seg(`  GPA: ${e.gpa}`, 'gray'), br(), br(),
    seg(isVi ? '  Các đồ án tiêu biểu:' : isFr ? '  Projets Clés:' : '  Key Projects:', 'cyan'), br(),
    seg(`    • ${isVi ? 'Đồ án 1: Thiết kế Cung cấp điện cho nhà máy Bia — 9.0/10' : isFr ? 'Projet 1: Conception d\'Alimentation Électrique pour une Brasserie — 9.0/10' : e.highlights[0]}`, 'white'), br(),
    seg(`    • ${isVi ? 'Đồ án 2: Mô hình phân cụm đa góc nhìn cho dữ liệu chuỗi thời gian: Tích hợp bất biến hình dạng và chống nhiễu — 9.5/10' : isFr ? 'Projet 2: Modèle de Clustering Multi-Vues pour Séries Temporelles — 9.5/10' : e.highlights[1]}`, 'white'), br(),
    seg(`    • ${isVi ? 'Luận văn: Đề xuất phương pháp học máy phân nhóm khách hàng sử dụng điện đa đặc trưng — 9.7/10' : isFr ? 'Thèse: Méthodes d\'apprentissage automatique pour la classification des clients — 9.7/10' : e.highlights[2]}`, 'white'), br(),
    br(),
    seg('└───────────────────────────────────────────────────┘', 'cyan'), br(),
  ];
}

function buildExperience(): OutputSegment[] {
  const isVi = currentLang === 'vi';
  const isFr = currentLang === 'fr';
  const out: OutputSegment[] = [
    seg(isVi ? '┌─ KINH NGHIỆM LÀM VIỆC ───────────────────────────┐' : isFr ? '┌─ EXPÉRIENCE PROFESSIONNELLE ─────────────────────┐' : '┌─ WORK EXPERIENCE ────────────────────────────────┐', 'cyan'), br(), br(),
  ];
  
  const transEmp = [
    {
      period: '2023 – 2026',
      role: isVi ? 'Cộng tác viên Nghiên cứu' : isFr ? 'Collaborateur de Recherche' : 'Research Assistant',
      org: isVi ? 'Bộ môn Hệ thống Điện, Đại học Bách Khoa TP.HCM (HCMUT)' : isFr ? 'Département des Systèmes Électriques, HCMUT' : 'Power System Laboratory, Ho Chi Minh City University of Technology (HCMUT)',
    },
    {
      period: '2022 – 2024',
      role: isVi ? 'Tư vấn Sản phẩm & Thương hiệu' : isFr ? 'Consultant Produit & Marque' : 'Product & Brand Consultant',
      org: isVi ? 'Doanh nghiệp Tư nhân, TP.HCM' : isFr ? 'Entreprise Privée, Ho Chi Minh-Ville' : 'Private Enterprise, Ho Chi Minh City',
      detail: isVi ? 'Trọng tâm: R&D sản phẩm, tư vấn khách hàng, quảng cáo thương hiệu, và chiến lược marketing.' : isFr ? 'Focus: R&D produit, consultation client, publicité et stratégies marketing.' : 'Focus: Product research and development (R&D), customer consultation, brand advertising, and marketing strategies.',
    },
    {
      period: '2020 – 2022',
      role: isVi ? 'Cộng tác viên Nghiên cứu' : isFr ? 'Collaborateur de Recherche' : 'Research Assistant',
      org: isVi ? 'Phòng Thí nghiệm Điện lực, Đại học Bách Khoa TP.HCM (HCMUT)' : isFr ? 'Laboratoire de Recherche Électrique, HCMUT' : 'Power Electric Research Laboratory, Ho Chi Minh City University of Technology (HCMUT)',
    },
    {
      period: '2021',
      role: isVi ? 'Thực tập sinh Kỹ thuật' : isFr ? 'Stagiaire en Ingénierie' : 'Engineering Intern',
      org: isVi ? 'Phòng Tư vấn Lưới điện Trung thế, CTCP Tư vấn Xây dựng Điện TP.HCM' : isFr ? 'Département de Conseil Moyenne Tension, HCMC Power Engineering' : 'Medium Voltage Consulting Department, HCMC Power Engineering Construction Consulting Joint Stock Company',
    }
  ];

  for (const e of transEmp) {
    out.push(seg(`  [${e.period}]`, 'yellow')); out.push(br());
    out.push(seg(`  ${e.role}`, 'white')); out.push(br());
    out.push(seg(`  ${e.org}`, 'green')); out.push(br());
    if (e.detail) { out.push(seg(`  ${e.detail}`, 'gray')); out.push(br()); }
    out.push(br());
  }
  out.push(seg('└───────────────────────────────────────────────────┘', 'cyan'));
  out.push(br());
  return out;
}



function buildAwards(): OutputSegment[] {
  const isVi = currentLang === 'vi';
  const isFr = currentLang === 'fr';
  const out: OutputSegment[] = [
    seg(isVi ? '┌─ CHỨNG CHỈ & GIẢI THƯỞNG ────────────────────────┐' : isFr ? '┌─ CERTIFICATIONS & PRIX ──────────────────────────┐' : '┌─ CERTIFICATIONS & AWARDS ────────────────────────┐', 'cyan'), br(), br(),
  ];
  
  const transMisc = [
    {
      year: 2026,
      title: isVi ? '[Đề cử] Giải thưởng Luận văn Tốt nghiệp Xuất sắc nhất' : isFr ? '[Nominé] Prix de la Meilleure Thèse de Fin d\'Études' : '[Nominated] Best Graduation Thesis Award',
      detail: isVi ? 'Được công nhận nhờ đạt điểm đánh giá cao nhất trong hội đồng bảo vệ (Đang chờ phê duyệt cuối cùng).' : isFr ? 'Reconnu pour avoir obtenu la meilleure note du jury (En attente d\'approbation finale).' : 'Recognized for achieving the highest evaluation score in the graduation defense committee (Pending final approval).',
    },
    {
      year: 2025,
      title: isVi ? 'Bán kết, Giải thưởng Sinh viên Nghiên cứu Khoa học Euréka lần thứ 27' : isFr ? 'Demi-finaliste, 27e Prix Euréka de Recherche Scientifique Étudiante' : 'Semi-finalist, The 27th Euréka Scientific Research Student Award',
      field: isVi ? 'Lĩnh vực: Kinh tế (Thương mại, Quản trị Kinh doanh, và Marketing).' : isFr ? 'Domaine: Économie (Commerce, Gestion, et Marketing).' : 'Field: Economics (Commerce, Business Administration, and Marketing).',
      detail: isVi ? 'Đề tài: "Công cụ Phân tích Dữ liệu Lớn ứng dụng Machine Learning để Thấu hiểu và Tối ưu Tiêu thụ Năng lượng trong Ngành Điện".' : isFr ? 'Projet: "Outil d\'Analyse Big Data utilisant le Machine Learning pour l\'Optimisation Énergétique".' : 'Project: "A Big Data Analytics Tool Utilizing Machine Learning for Energy Consumption Insight and Optimization in the Power Industry".',
    },
    {
      year: 2025,
      title: isVi ? 'Chứng nhận Hoàn thành Chương trình Học tập Dự án Toàn cầu (GPBL)' : isFr ? 'Certificat d\'Achèvement du Programme GPBL' : 'Certified of Completion the Global Project-Based Learning Program',
      detail: isVi ? 'Cấp bởi GS. Goro FUJITA, Học viện Công nghệ Shibaura, Nhật Bản.' : isFr ? 'Décerné par le Prof. Goro FUJITA, Shibaura Institute of Technology, Japon.' : 'Awarded by Prof. Goro FUJITA, Shibaura Institute of Technology, Japan.',
    }
  ];

  for (const m of transMisc) {
    out.push(seg(`  [${m.year}] `, 'yellow'));
    out.push(seg(m.title, 'white')); out.push(br());
    if (m.field) { out.push(seg(`    ${m.field}`, 'gray')); out.push(br()); }
    out.push(seg(`    ${m.detail}`, 'gray')); out.push(br()); out.push(br());
  }
  out.push(seg('└───────────────────────────────────────────────────┘', 'cyan'));
  out.push(br());
  return out;
}



function buildDownloadCV(): OutputSegment[] {
  return [
    seg('  Initiating secure file transfer...', 'yellow'), br(),
    seg('  [████████████████████] 100%', 'green'), br(), br(),
    seg('  CV download triggered.', 'white'), br(),
    seg('  File: CV_MPCOVN_Nguyen-Trong-Thang_HCMUT.pdf', 'gray'), br(),
  ];
}

function buildPing(ip: string): OutputSegment[] {
  return [
    seg(`PING ${ip} (${ip}) 56(84) bytes of data.`, 'white'), br(),
    seg(`64 bytes from ${ip}: icmp_seq=1 ttl=118 time=14.2 ms`, 'gray'), br(),
    seg(`64 bytes from ${ip}: icmp_seq=2 ttl=118 time=13.8 ms`, 'gray'), br(),
    seg(`64 bytes from ${ip}: icmp_seq=3 ttl=118 time=15.1 ms`, 'gray'), br(),
    seg(`64 bytes from ${ip}: icmp_seq=4 ttl=118 time=14.5 ms`, 'gray'), br(),
    seg(`--- ${ip} ping statistics ---`, 'white'), br(),
    seg(`4 packets transmitted, 4 received, 0% packet loss, time 3004ms`, 'green'), br(),
  ];
}

function buildNotFound(cmd: string): OutputSegment[] {
  return [
    seg(`  bash: ${cmd}: command not found`, 'red'), br(),
    seg('  Type ', 'gray'), seg('help', 'yellow'), seg(' to see available commands.', 'gray'), br(),
  ];
}

// ── Boot sequence ─────────────────────────────────────────────────────────────

const BOOT_LINES: TerminalLine[] = [
  {
    id: uid(), kind: 'system',
    segments: [
      seg('HỆ THỐNG ĐIỆN THẮNG — SCADA CONTROL TERMINAL v2.5.1', 'green'), br(),
      seg('Kernel: HCMUT-PowerSystem-LTS  |  Arch: 500kV-Grid-x86_64', 'gray'), br(),
      seg('OS: SCADA-Ubuntu 22.04 LTS (Jammy Power)', 'gray'), br(),
      seg('Boot: ', 'gray'), seg('[OK]', 'green'), seg(' All sub-stations nominal.', 'white'), br(),
      seg('AI Core: ', 'gray'), seg('[ONLINE]', 'cyan'), br(),
      seg('Grid Status: ', 'gray'), seg('[STABLE]', 'green'), br(), br(),
      seg('Language: VI (Default). Type ', 'gray'), seg('lang --en', 'yellow'), seg(' to switch.', 'gray'), br(),
      seg('Gõ ', 'gray'), seg('help', 'yellow'), seg(' để xem danh sách lệnh.', 'gray'), br(),
    ],
  },
];

// ── Provider ──────────────────────────────────────────────────────────────────

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<TerminalLine[]>(BOOT_LINES);
  const [activeWindows, setActiveWindows] = useState<Record<string, boolean>>({});

  const openWindow = useCallback((id: string) => {
    setActiveWindows(prev => ({ ...prev, [id]: true }));
  }, []);

  const closeWindow = useCallback((id: string) => {
    setActiveWindows(prev => ({ ...prev, [id]: false }));
  }, []);

  const pushOutput = useCallback((segments: OutputSegment[]) => {
    setLines(prev => [...prev, { id: uid(), kind: 'output', segments }]);
  }, []);

  const pushInput = useCallback((cmd: string) => {
    setLines(prev => [...prev, { id: uid(), kind: 'input', raw: cmd }]);
  }, []);

  const clearLines = useCallback(() => setLines([]), []);

  const runCommand = useCallback((raw: string) => {
    const cmdRaw = raw.trim();
    const cmdParts = cmdRaw.split(' ');
    const cmd = cmdParts[0].toLowerCase();
    const args = cmdParts.slice(1);

    if (cmd === 'clear' || cmd === 'cls') { clearLines(); return; }

    if (cmd === 'download' || (cmd === 'download' && args[0] === 'cv') || cmdRaw === 'download cv') {
      const a = document.createElement('a');
      a.href = '/CV_MPCOVN_Nguyen-Trong-Thang_HCMUT.pdf';
      a.download = 'CV_MPCOVN_Nguyen-Trong-Thang_HCMUT.pdf';
      a.click();
      pushOutput(buildDownloadCV());
      return;
    }

    if (cmd === 'lang') {
      const newLang = args[0]?.replace('--', '');
      if (['vi', 'en', 'fr'].includes(newLang)) {
        currentLang = newLang;
        pushOutput([seg(`Language switched to [${newLang.toUpperCase()}]`, 'green'), br()]);
      } else {
        pushOutput([seg(`Language not found. Usage: lang --vi | --en | --fr`, 'red'), br()]);
      }
      return;
    }

    if (cmd === 'echo') {
      pushOutput([seg(args.join(' '), 'white'), br()]);
      return;
    }

    if (cmd === 'ping') {
      pushOutput(buildPing(args[0] || '127.0.0.1'));
      return;
    }
    
    if (cmd === 'pwd') {
      pushOutput([seg('/var/opt/scada/nldc/portfolio', 'white'), br()]);
      return;
    }

    if (cmd === 'date') {
      pushOutput([seg(new Date().toString(), 'white'), br()]);
      return;
    }

    switch (cmd) {
      case 'help':       
      case '?':          
        pushOutput(buildHelp());
        break;
      case 'whoami':     
      case 'cat':        // cat cv.txt -> whoami
        pushOutput(buildWhoami()); break;
      case 'skills':     pushOutput(buildSkills()); break;
      case 'ls':
      case 'dir':
      case 'projects':   openWindow('projects'); pushOutput([seg(currentLang==='vi'?' Đang mở thư mục Projects...':' Opening Projects UI...', 'yellow'), br()]); break;
      case 'education':  pushOutput(buildEducation()); break;
      case 'experience': pushOutput(buildExperience()); break;
      case 'awards':     pushOutput(buildAwards()); break;
      case 'contact':    openWindow('contact'); pushOutput([seg(currentLang==='vi'?' Đang thiết lập kết nối EmailJS...':' Establishing EmailJS uplink...', 'cyan'), br()]); break;
      case 'top':        
      case 'htop':       openWindow('diagnostics'); pushOutput([seg(currentLang==='vi'?' Khởi chạy chuẩn đoán hệ thống...':' Launching System Diagnostics...', 'cyan'), br()]); break;
      default:           pushOutput(buildNotFound(cmdRaw)); break;
    }
  }, [clearLines, pushOutput, openWindow]);

  return (
    <TerminalContext.Provider value={{ 
      lines, activeWindows, pushInput, runCommand, clearLines, openWindow, closeWindow 
    }}>
      {children}
    </TerminalContext.Provider>
  );
}
