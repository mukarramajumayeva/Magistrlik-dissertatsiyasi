/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  BarChart3, 
  Calculator, 
  BookOpen, 
  FileCheck, 
  Search, 
  TrendingUp, 
  GraduationCap, 
  School, 
  Users, 
  ChevronRight, 
  Lightbulb, 
  Download, 
  Languages, 
  Info,
  Award,
  Globe,
  Compass,
  ArrowUpRight
} from 'lucide-react';

// Custom interface for translation structure
interface Translation {
  title: string;
  subtitle: string;
  headerBadge: string;
  exportPdf: string;
  menuTitle: string;
  navDashboard: string;
  nav5c: string;
  navStats: string;
  navCalc: string;
  navTest: string;
  navRefs: string;
  schoolContext: string;
  dissertationTitle: string;
  advisor: string;
  institution: string;
  overviewHeading: string;
  thesisProblem: string;
  thesisProblemText: string;
  innovativeMethod: string;
  innovativeMethodText: string;
}

// Full translations mapping for UZ and EN
const translations: Record<string, Translation> = {
  uz: {
    title: "Mukarrama Jumayeva",
    subtitle: "GulDPI Magistranti | Dissertatsiya Tahliliy Dashboardi",
    headerBadge: "ILMIY ISH NATIJALARI",
    exportPdf: "Hisobotni Yuklash (PDF)",
    menuTitle: "MENU NAVIGATSIYASI",
    navDashboard: "Asosiy Panel",
    nav5c: "5C Modeli & IKM",
    navStats: "Statistik Tahlil",
    navCalc: "Pedagogik Simulyator",
    navTest: "KDT-21 Testi (Sinf)",
    navRefs: "Adabiyotlar Ro'yxati",
    schoolContext: "Tadqiqot Sirdaryo viloyati Guliston shahar 7-maktab va Guliston tumani 15-maktabining 11-sinf o'quvchilari ishtirokida o'tkazilgan.",
    dissertationTitle: "Jahon va milliy tarbiya konsepsiyalari asosida o‘quvchilarda XXI asr ko‘nikmalarini shakllantirish metodikasi",
    advisor: "Ilmiy rahbar: f.f.d. (DSc), professor v.b. A.Asatulloyev",
    institution: "Guliston davlat pedagogika instituti (GulDPI) | Magistr Akademik Darajasi",
    overviewHeading: "Dissertatsiya Haqida Qisqacha Ma'lumot",
    thesisProblem: "Muammo va Dolzarblik",
    thesisProblemText: "Hozirgi ta'lim tizimida XXI asr ko'nikmalarini tizimli va samarali shakllantirish metodikasi yetarlicha rivojlanmagan. Jahon ta'lim tamoyillari (P21, UNESCO, OECD) bilan milliy tarbiya me'yorlarining integratsiyasi mavjud emas edi.",
    innovativeMethod: "Tadqiqotning Ilmiy Yangiligi",
    innovativeMethodText: "Ilk bor 4K modeliga milliy qadriyatlar va fuqarolik mas'uliyatini singdirgan holda original '5C Modeli' ishlab chiqildi. 'Integrativ ko'nikmalar metodikasi' (IKM) darsliklar va milliy tarbiya doirasida amaliyotga tatbiq etildi."
  },
  en: {
    title: "Mukarrama Jumayeva",
    subtitle: "GulSPI Graduate | Dissertation Analytical Dashboard",
    headerBadge: "RESEARCH RESULTS",
    exportPdf: "Download Report (PDF)",
    menuTitle: "MENU NAVIGATION",
    navDashboard: "Main Dashboard",
    nav5c: "5C Model & IMS",
    navStats: "Statistical Analysis",
    navCalc: "Pedagogical Simulator",
    navTest: "CDT-21 Class Test",
    navRefs: "Literature Archive",
    schoolContext: "The research was conducted involving 11th-grade students of School 7 (Gulistan city) and School 15 (Gulistan district) of Syrdarya region.",
    dissertationTitle: "Methodology of forming 21st century skills in students based on global and national education concepts",
    advisor: "Scientific Advisor: DSc, Associate Professor A.Asatulloyev",
    institution: "Gulistan State Pedagogical Institute (GulSPI) | Master's Academic Degree",
    overviewHeading: "Dissertation General Abstract",
    thesisProblem: "Problem Statement",
    thesisProblemText: "There is a lack of systematic and effective methodology for forming 21st-century skills in the current educational system. Prior to this, global educational frameworks (P21, UNESCO, OECD) were not integrated with national values.",
    innovativeMethod: "Scientific Novelty",
    innovativeMethodText: "For the first time, a unique '5C Model' was created by embedding civic responsibility and national values into the 4K framework, implemented through the 'Integrative Method of Skills' (IMS)."
  }
};

// Dissertation 5C components info
const skillsData = {
  uz: [
    { id: 'ct', name: 'Tanqidiy Fikrlash', eng: 'Critical Thinking', key: 'C1', desc: 'Faktlarni tahlil qilish, muammolarni xolis baholash va mantiqiy xulosalar chiqarish qobiliyati.', method: 'Sokrat dialogi, manbalar tahlili, munozarali darslar.', color: 'indigo' },
    { id: 'cr', name: 'Ijodkorlik', eng: 'Creativity', key: 'C2', desc: 'Yangi, original va noodatiy g‘oyalarni ishlab chiqish hamda ularni amalda sinash mahorati.', method: 'SCAMPER, 6 xil fikrlash qalpoqlari, dizayn-fikrlash prototiplari, milliy hunarmandchilik elementlari.', color: 'amber' },
    { id: 'co', name: 'Hamkorlik', eng: 'Collaboration', key: 'C3', desc: 'Umumiy maqsad yo‘lida jamoada samarali ishlash, rollarni taqsimlash va bir-birini qo‘llash.', method: 'Belbin jamoa rollari modeli, Mozaika (Jigsaw) metodi, jamoaviy loyihalar.', color: 'emerald' },
    { id: 'cm', name: 'Muloqot', eng: 'Communication', key: 'C4', desc: 'Fikr va ma’lumotlarni og‘zaki, yozma va raqamli media ko‘rinishlarida tushunarli bayon etish.', method: 'TED-talk formatidagi taqdimotlar, ' + "og'zaki notiqlik ('davra gap', 'maslahat'), infografika va podcastlar.", color: 'blue' },
    { id: 'ci', name: 'Fuqarolik Mas’uliyati', eng: 'Civic Responsibility', key: 'C5', desc: 'Milliy va umuminsoniy qadriyatlarni uyg‘unlashtirib, jamiyat va mahalla rivojiga hissa qo‘shish.', method: 'Westheimer & Kahne uch darajali fuqaro modeli, mahalla ijtimoiy loyihalari, vatanparvarlik tushunchalari.', color: 'rose' }
  ],
  en: [
    { id: 'ct', name: 'Critical Thinking', eng: 'Critical Thinking', key: 'C1', desc: 'Ability to analyze facts, objectively evaluate issues, and draw logical conclusions.', method: 'Socratic dialogue, source analysis, debate classes.', color: 'indigo' },
    { id: 'cr', name: 'Creativity', eng: 'Creativity', key: 'C2', desc: 'Skill of generating new, original, and unusual ideas and testing them in practice.', method: 'SCAMPER, 6 thinking hats, design-thinking prototypes, national craft elements.', color: 'amber' },
    { id: 'co', name: 'Collaboration', eng: 'Collaboration', key: 'C3', desc: 'Working effectively in a team for a common goal, distributing roles and mutual support.', method: 'Belbin team roles, Jigsaw cooperative method, group projects.', color: 'emerald' },
    { id: 'cm', name: 'Communication', eng: 'Communication', key: 'C4', desc: 'Articulating thoughts clearly in oral, written, and digital media formats.', method: 'TED-talk style presentations, traditional oral public speaking (davra gap, maslahat), infographics.', color: 'blue' },
    { id: 'ci', name: 'Civic Responsibility', eng: 'Civic Responsibility', key: 'C5', desc: 'Harmonizing national and universal values to contribute actively to local community (mahalla) development.', method: 'Westheimer & Kahne 3-level citizen model, mahalla social project works, patriotic deeds.', color: 'rose' }
  ]
};

// IKM Modules Data
const ikmModules = {
  uz: [
    { name: '"Savollar akademiyasi"', skill: "Tanqidiy Fikrlash (C1)", hours: 12, target: "5-7 sinflar", methods: "Sokrat dialogi, manba tahlili va baholash", desc: "O'quvchilarda har xil savollarni shakllantirish va faktlar ishonchliligini tahlil qilishni o'rgatadi." },
    { name: '"Ijodiy loyiha laboratoriyasi"', skill: "Ijodkorlik (C2)", hours: 16, target: "6-9 sinflar", methods: "Dizayn fikrlash, SCAMPER, 6 qalpoq, suzani/keramika elementlari", desc: "Mahalliy ijtimoiy va madaniy muammolarga hunarmandchilik hamda dizayn orqali yechim topish." },
    { name: '"Hamkorlik tribunasi"', skill: "Hamkorlik (C3)", hours: 14, target: "7-10 sinflar", methods: "Belbin roli, Baliq skeleti, o'zaro hamkorlik protokoli", desc: "Guruh dinamikasini tushunish, shartli hamkorlikdan samarali tizimli hamkorlikka o'tish." },
    { name: '"Raqamli muloqot va media"', skill: "Muloqot (C4)", hours: 18, target: "8-11 sinflar", methods: "TED-talk, Infografika, media savodxonligi, podcast va bloglar", desc: "Og'zaki notiqlik an'analarini zamonaviy raqamli taqdimot va media vositalari bilan sintezlash." },
    { name: '"O‘z-o‘zini boshqarish va fuqarolik"', skill: "Fuqarolik Mas’uliyati (C5)", hours: 10, target: "5-11 sinflar", methods: "Yozma refleksiya, 3 darajali fuqaro loyihalari, mahalla faolligi", desc: "Maktab yoki mahalladagi real muammoga loyiha yozib, uni kichik miqyosda amalda hal qilish." }
  ],
  en: [
    { name: '"Academy of Questions"', skill: "Critical Thinking (C1)", hours: 12, target: "Grades 5-7", methods: "Socratic dialogue, source analysis and evaluation", desc: "Teaches students to formulate high-level questions and analyze fact reliability." },
    { name: '"Creative Project Lab"', skill: "Creativity (C2)", hours: 16, target: "Grades 6-9", methods: "Design thinking, SCAMPER, 6 hats, traditional design motifs", desc: "Finding craft or modern design solutions for local social-cultural needs." },
    { name: '"Collaboration Tribune"', skill: "Collaboration (C3)", hours: 14, target: "Grades 7-10", methods: "Belbin team roles, Fishbone diagram, mutual support protocols", desc: "Understanding group dynamics, switching from conditional sharing to effective teamwork." },
    { name: '"Digital Comm & Media"', skill: "Communication (C4)", hours: 18, target: "Grades 8-11", methods: "TED-talks, Infographics, media literacy, podcasts and blogs", desc: "Synthesizing oral eloquence traditions with contemporary digital presentation tools." },
    { name: '"Self-Gov & Citizenship"', skill: "Civic Responsibility (C5)", hours: 10, target: "Grades 5-11", methods: "Written reflection diaries, 3-level citizen projects, mahalla actions", desc: "Designing and implementing a small-scale community project to address a real local issue." }
  ]
};

// Experimental data stats
// Overall average EG: 30.1 -> 31.8 (+1.64 growth), NG: 30.6 -> 31.0 (+0.42 growth)
const statsByComponent = [
  { skillUz: 'Tanqidiy fikrlash', skillEn: 'Critical Thinking', egPre: 29.4, egPost: 31.2, ngPre: 30.1, ngPost: 30.5, growthEg: 1.8, growthNg: 0.4 },
  { skillUz: 'Ijodkorlik', skillEn: 'Creativity', egPre: 36.8, egPost: 38.1, ngPre: 37.2, ngPost: 37.5, growthEg: 1.3, growthNg: 0.3 },
  { skillUz: 'Hamkorlik', skillEn: 'Collaboration', egPre: 27.6, egPost: 29.2, ngPre: 28.4, ngPost: 28.9, growthEg: 1.6, growthNg: 0.5 },
  { skillUz: 'Muloqot', skillEn: 'Communication', egPre: 32.1, egPost: 33.5, ngPre: 31.8, ngPost: 32.1, growthEg: 1.4, growthNg: 0.3 },
  { skillUz: 'Fuqarolik mas’uliyati', skillEn: 'Civic Responsibility', egPre: 24.8, egPost: 26.9, ngPre: 25.3, ngPost: 25.9, growthEg: 2.1, growthNg: 0.6 }
];

// Retention (6-month barqarorlik) EG Data
const retentionData = [
  { skillUz: 'Tanqidiy fikrlash', skillEn: 'Critical Thinking', post: 31.2, followUp: 31.5, change: 0.3, statusUz: 'Barqaror', statusEn: 'Stable' },
  { skillUz: 'Ijodkorlik', skillEn: 'Creativity', post: 38.1, followUp: 37.8, change: -0.3, statusUz: 'Minimal o\'zgarish', statusEn: 'Minimal change' },
  { skillUz: 'Hamkorlik', skillEn: 'Collaboration', post: 29.2, followUp: 29.5, change: 0.3, statusUz: 'Barqaror', statusEn: 'Stable' },
  { skillUz: 'Muloqot', skillEn: 'Communication', post: 33.5, followUp: 33.7, change: 0.2, statusUz: 'Barqaror', statusEn: 'Stable' },
  { skillUz: 'Fuqarolik mas’uliyati', skillEn: 'Civic Responsibility', post: 26.9, followUp: 27.6, change: 0.7, statusUz: 'O\'sishda davom etmoqda', statusEn: 'Continued growth' }
];

// Key References from Bibliography (15 selected items)
const bibliography = [
  { id: 1, author: "Abdulla Avloniy", title: "Tarbiya biz uchun yo hayot - yo mamot: Tanlanma asarlar", year: 1998, place: "Toshkent: O‘qituvchi" },
  { id: 2, author: "Al-Forobiy", title: "Fozil odamlar shahri", year: 1993, place: "Toshkent: Abdulla Qodiriy nomidagi xalq merosi" },
  { id: 3, author: "Ibn Sino", title: "Tib qonunlari. 1-jild", year: 1981, place: "Toshkent: Fan" },
  { id: 4, author: "Alisher Navoiy", title: "Mahbub ul-qulub", year: 1967, place: "Toshkent: Fan" },
  { id: 5, author: "Yusuf Xos Hojib", title: "Qutadgʿu bilig", year: 1971, place: "Toshkent: Fan" },
  { id: 6, author: "Jumayeva M.B.", title: "Methodology for developing 21st century skills in students based on global and national educational concepts", year: 2026, place: "International Innovation Research, 2(1)" },
  { id: 7, author: "Vygotsky L.S.", title: "Mind in Society: The Development of Higher Psychological Processes", year: 1978, place: "Cambridge: Harvard University Press" },
  { id: 8, author: "Hattie J.", title: "Visible Learning: A Synthesis of Over 800 Meta-Analyses Relating to Achievement", year: 2009, place: "London: Routledge" },
  { id: 9, author: "Dewey J.", title: "Experience and Education", year: 1938, place: "New York: Kappa Delta Pi" },
  { id: 10, author: "Delors J. et al.", title: "Learning: The Treasure Within. Report to UNESCO on Education for the 21st Century", year: 1996, place: "Paris: UNESCO" },
  { id: 11, author: "Tomlinson C. A.", title: "The Differentiated Classroom: Responding to the Needs of All Learners", year: 2014, place: "Alexandria: ASCD" },
  { id: 12, author: "Amabile T. M.", title: "The Social Psychology of Creativity", year: 1983, place: "New York: Springer-Verlag" },
  { id: 13, author: "Westheimer J., Kahne J.", title: "What kind of citizen? The politics of educating for democracy", year: 2004, place: "American Educational Research Journal, 41(2)" },
  { id: 14, author: "Ananiadou K., Claro M.", title: "21st century skills and competences for new millennium learners in OECD countries", year: 2009, place: "OECD Education Working Papers" },
  { id: 15, author: "Flavell J. H.", title: "Metacognition and Cognitive Monitoring", year: 1979, place: "American Psychologist, 34(9)" }
];

// Interactive Test Questions
const quizQuestions = {
  uz: [
    {
      id: 1,
      skill: "Tanqidiy Fikrlash",
      q: "Sizga internetda tarqalgan shov-shuvli yangilik yetkazildi. Birinchi qiladigan ishingiz nima?",
      options: [
        { text: "Yangilikka darhol ishonib, do'stlarimga va guruhlarga tarqataman.", score: 1 },
        { text: "Yangilik ishonchli yoki yo'qligi haqida ikkilanaman, lekin tekshirishga vaqtim bo'lmaydi.", score: 2 },
        { text: "Bir necha xil mustaqil manbalarni solishtirib tekshiraman va muallifning maqsadini tahlil qilaman.", score: 3 }
      ]
    },
    {
      id: 2,
      skill: "Ijodkorlik",
      q: "Darsda yoki jamoada loyiha taqdimoti uchun slayd tayyorlashingiz kerak. Kreativlikni qanday namoyish etasiz?",
      options: [
        { text: "Tayyor tayyor shablonlarni ko'chirib, shunchaki matnni joylashtirib qo'yaman.", score: 1 },
        { text: "Chiroyli rasmlar va dizayn qo'shaman, lekin loyihaning o'zida yangi g'oya taklif etmayman.", score: 2 },
        { text: "Dizayn-fikrlash yoki SCAMPER metodidan foydalanib, muammoga mutlaqo yangi yechim va original mahsulot yarataman.", score: 3 }
      ]
    },
    {
      id: 3,
      skill: "Hamkorlik",
      q: "Guruhda ishlayotganingizda, boshqa bir a'zoning g'oyasi siznikiga butunlay zid kelib qoldi. Qanday yo'l tutasiz?",
      options: [
        { text: "O'z fikrimda qat'iy turib, uning g'oyasini rad etaman yoki janjallashaman.", score: 1 },
        { text: "Vaziyatga qarab o'z manfaatim yoki guruh tinchligi uchun unga ko'nib qo'ya qolaman.", score: 2 },
        { text: "Uning nuqtai nazarini tinglayman, Belbin rollari bo'yicha kuchli tomonlarini birlashtirib, o'rtacha eng yaxshi sintez yechimni topamiz.", score: 3 }
      ]
    },
    {
      id: 4,
      skill: "Muloqot",
      q: "Katta auditoriya yoki sinf oldida nutq so'zlashingiz kerak. Sizning tayyorgarligingiz qanday?",
      options: [
        { text: "Sahnadan va savollardan qattiq qo'rqaman, ma'ruzani shunchaki qog'ozdan o'qib beraman.", score: 1 },
        { text: "Slayd tayyorlab kelaman, ammo auditoriyaga qarab moslasha olmay, faqat matnga tayanaman.", score: 2 },
        { text: "TED-talk formatini qo'llayman, infografikadan foydalanaman va tinglovchilar e'tiborini jalb qilib dialog quraman.", score: 3 }
      ]
    },
    {
      id: 5,
      skill: "Fuqarolik Mas’uliyati",
      q: "Mahallangizda yoki maktabingizda suv isrofi bo'layotganini ko'rdingiz. Munosabatingiz?",
      options: [
        { text: "Menga dahli yo'q deb o'tib ketaman, bu mas'ul idoralarning ishi.", score: 1 },
        { text: "Boshqalarga suvni isrof qilmaslikni aytaman yoki ijtimoiy tarmoqda post yozib qo'yaman.", score: 2 },
        { text: "Suvni tejash bo'yicha kichik fuqarolik loyihasini yoki 'suv tejash rejasini' tuzib, mahalla/maktabda jamoat loyihasini amalga oshiraman.", score: 3 }
      ]
    }
  ],
  en: [
    {
      id: 1,
      skill: "Critical Thinking",
      q: "You are presented with a piece of viral sensational news on the internet. What is your first action?",
      options: [
        { text: "Immediately believe it and share it to my groups and friends.", score: 1 },
        { text: "Doubt it slightly but do not spend time verifying it unless someone asks.", score: 2 },
        { text: "Analyze multiple independent primary sources to cross-verify and evaluate bias.", score: 3 }
      ]
    },
    {
      id: 2,
      skill: "Creativity",
      q: "You need to design a presentation slide. How do you approach the concept of creativity?",
      options: [
        { text: "I just copy a standard template or use standard slides.", score: 1 },
        { text: "I use standard templates but change colors and make it visually tidy.", score: 2 },
        { text: "I apply design-thinking, craft original graphics, and invent a unique storytelling framework.", score: 3 }
      ],
    },
    {
      id: 3,
      skill: "Collaboration",
      q: "When working in a team, how do you perceive conflicts of ideas?",
      options: [
        { text: "Conflicts are negative; I prefer everyone to agree with the loudest voice.", score: 1 },
        { text: "I accept them conditionally only if they lead to an obvious personal benefit or task completion.", score: 2 },
        { text: "I treat them as resources: different views combined produce richer and more comprehensive outcomes.", score: 3 }
      ]
    },
    {
      id: 4,
      skill: "Communication",
      q: "What is your main communication strategy when delivering a public talk?",
      options: [
        { text: "Read the prepared text from the paper verbatim to avoid mistakes.", score: 1 },
        { text: "Deliver speech using general slides, answering questions at the end if asked.", score: 2 },
        { text: "Adapt structure to the specific audience, use visual infographic cues, and engage the audience actively like TED-talks.", score: 3 }
      ]
    },
    {
      // Speacker Jane/Joe concept mapped to general Civic
      id: 5,
      text: "Civic Responsibility",
      q: "How do you feel about local ecological or communal challenges?",
      options: [
        { text: "It's the duty of government bodies and community leaders to handle them, not mine." },
        { text: "I feel bad about them, but don't know how I can contribute." },
        { text: "I actively organize or participate in small-scale civic projects (water saving, recycling) to help my local neighborhood." }
      ]
    }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState("Asosiy Panel");
  const [lang, setLang] = useState<"uz" | "en">("uz");
  
  // Custom Simulator State for Interactive Analysis
  const [calcStudents, setCalcStudents] = useState<number>(120);
  const [calcPre, setCalcPre] = useState<number>(30.1);
  const [calcPost, setPostScore] = useState<number>(31.8);
  const [calcGroup, setCalcGroup] = useState<string>("EG");
  const [resultsComputed, setResultsComputed] = useState<any>(null);

  // Default values based on dissertation
  const defaultSchools = [
    { name: "7-maktab (Guliston shahri)", code: "sch7", total: 60, region: "Shahar" },
    { name: "15-maktab (Guliston tumani)", code: "sch15", total: 60, region: "Tuman" }
  ];

  const [searchRef, setSearchRef] = useState<string>("");

  const filteredRefs = useMemo(() => {
    return bibliography.filter(ref => {
      const term = searchRef.toLowerCase();
      return ref.author.toLowerCase().includes(term) || ref.title.toLowerCase().includes(term);
    });
  }, [searchRef]);

  // Quiz / KDT-21 Test State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleCalculateStats = (e: React.FormEvent) => {
    e.preventDefault();
    const pre = preScore;
    const post = reqPostScore;
    const diff = parseFloat((post - pre).toFixed(2));
    const relativeChange = ((diff / pre) * 100).toFixed(1);

    // Pedagogical interpretation
    let recommendation = "";
    if (diff <= 0) {
      recommendation = "O'quv jarayonida faollik pasaygan yoki an'anaviy yondashuv ustunlik qilmoqda. 5E+R dars modeli va faol loyihalarni kiritish tavsiya etiladi.";
    } else if (diff < 1.0) {
      recommendation = "O'sish sur'ati mo'tadil (past samaradorlik). Metodika va amaliy dars soatlarini oshirish, o'qituvchining XIO (Xizmat ichida o'qitish) malakasini oshirish talab etiladi.";
    } else if (diff < 2.0) {
      recommendation = "O'rtacha samarali o'sish! Bu Mukarrama Jumayevaning dissertatsiya natijalariga mos keladi (+1.64 ball). Ko'nikmalarni yanada mustahkamlash uchun formativ baholash va haftalik portfolioni davom ettirish tavsiya etiladi.";
    } else {
      recommendation = "Yuqori samarali o'sish! IKM metodikasining barcha 5 moduli to'liq va mukammal integratsiyalanganini ko'rsatadi. Ushbu ijobiy tajribani boshqa maktablar miqyosida ommalashtirish mumkin.";
    }

    setResultsComputed({
      diff,
      relativeChange,
      recommendation,
      pre,
      post
    });
  };

  const [preScore, setPreScore] = useState<number>(30.1);
  const [reqPostScore, setPostScoreVal] = useState<number>(31.8);

  const calculateQuizScore = () => {
    let total = 0;
    let answeredCount = 0;
    Object.keys(quizAnswers).forEach((key) => {
      const qId = parseInt(key);
      const answerIdx = quizAnswers[qId];
      const qList = quizQuestions[lang];
      const question = qList.find(q => q.id === qId);
      if (question) {
        // Safe check for options
        const option = question.options[answerIdx];
        if (option && 'score' in option) {
          total += (option as any).score * 3; // normalized to 15 points per dimension
        } else if (option) {
          total += (answerIdx + 1) * 3; // fallback fallback score
        }
        answeredCount++;
      }
    });

    if (answeredCount < 5) {
      alert(lang === "uz" ? "Iltimos, barcha 5 ta savolga javob bering!" : "Please answer all 5 questions!");
      return;
    }

    setQuizScore(total);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizScore(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      {/* Header bar matching the high-density template perfectly */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm shadow-md">M</div>
          <div>
            <h1 className="text-sm font-bold text-slate-800 leading-tight">
              {translations[lang].title}
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              {translations[lang].subtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {/* Scientific Stage Indicator */}
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              {translations[lang].headerBadge}
            </p>
            <div className="flex gap-1 mt-0.5 justify-end">
              <div className="h-1.5 w-6 bg-blue-600 rounded-full" title="Kirish / IBob"></div>
              <div className="h-1.5 w-6 bg-blue-600 rounded-full" title="Metodika / IIBob"></div>
              <div className="h-1.5 w-6 bg-blue-600 rounded-full" title="Eksperiment / IIIBob"></div>
              <div className="h-1.5 w-6 bg-emerald-500 rounded-full animate-pulse" title="Tahlil va Xulosa"></div>
            </div>
          </div>

          {/* Language Switcher */}
          <button 
            onClick={() => setLang(lang === "uz" ? "en" : "uz")}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2.5 py-1.5 rounded-md font-medium transition"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Interactive Export Button */}
          <button 
            onClick={() => window.print()}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{translations[lang].exportPdf}</span>
            <span className="md:hidden">PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-60 bg-slate-50 border-r border-slate-200 p-3 flex flex-col gap-1 shrink-0 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-400 mb-2 px-3 uppercase tracking-wider">
            {translations[lang].menuTitle}
          </p>
          <nav className="space-y-1">
            {[
              { id: "Asosiy Panel", icon: LayoutDashboard },
              { id: "5C Modeli & IKM", icon: Layers },
              { id: "Statistik Tahlil", icon: BarChart3 },
              { id: "Pedagogik Simulyator", icon: Calculator },
              { id: "KDT-21 Testi (Sinf)", icon: FileCheck },
              { id: "Adabiyotlar Ro'yxati", icon: BookOpen }
            ].map((item) => {
              const Icon = item.icon;
              const label = lang === "uz" ? item.id : {
                "Asosiy Panel": "Main Dashboard",
                "5C Modeli & IKM": "5C Model & IMS",
                "Statistik Tahlil": "Statistical Analysis",
                "Pedagogik Simulyator": "Pedagogical Simulator",
                "KDT-21 Testi (Sinf)": "CDT-21 Class Test",
                "Adabiyotlar Ro'yxati": "Literature Archive"
              }[item.id];

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left sidebar-link text-xs py-2 px-3 rounded-md flex items-center gap-2.5 transition-colors ${
                    activeTab === item.id 
                      ? "bg-blue-100 text-blue-700 font-semibold" 
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Context Card */}
          <div className="mt-auto p-3 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
            <div className="flex items-center gap-1.5 text-blue-800 font-bold text-[10px] uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Guldpi Magistranti</span>
            </div>
            <p className="text-[11px] text-blue-700 leading-snug mt-1.5 font-medium italic">
              {translations[lang].dissertationTitle}
            </p>
            <p className="text-[9px] text-slate-500 mt-2 border-t border-blue-100/50 pt-1.5">
              Guliston - 2026
            </p>
          </div>
        </aside>

        {/* Dynamic Board Area */}
        <main className="flex-1 p-5 overflow-y-auto bg-slate-100">
          
          {/* ASOSIY PANEL TAB */}
          {activeTab === "Asosiy Panel" && (
            <div className="space-y-5 animate-fade-in">
              {/* Context bar */}
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-md p-3 flex gap-2.5 items-start text-xs shadow-sm">
                <Info className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-medium">
                  {translations[lang].schoolContext}
                </span>
              </div>

              {/* Stats Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {lang === "uz" ? "UMUMIY ISHTIROKCHILAR" : "TOTAL RESPONDENTS"}
                      </p>
                      <Users className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-2xl font-black text-slate-800 leading-tight">120</p>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-medium">
                    {lang === "uz" ? "60 ta Tajriba, 60 ta Nazorat guruhi" : "60 Experimental, 60 Control group"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {lang === "uz" ? "TAJRIBA GURUHI O'SISHI (EG)" : "EXPERIMENTAL GROWTH"}
                      </p>
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-black text-emerald-600 leading-tight">+1.64</p>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {lang === "uz" ? "NAZORAT GURUHI O'SISHI (CG)" : "CONTROL GROUP GROWTH"}
                      </p>
                      <TrendingUp className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-2xl font-black text-slate-500 leading-tight">+0.42</p>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {lang === "uz" ? "TADQIQOT BOSQICHLARI" : "RESEARCH PHASES"}
                      </p>
                      <Award className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-black text-blue-600 leading-tight">3</p>
                  </div>
                  <p className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded self-start mt-2">
                    {lang === "uz" ? "Aniqlash, Shakllantirish, Nazorat" : "Diagnosis, Formation, Evaluation"}
                  </p>
                </div>
              </div>

              {/* Dissertation abstract info and details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                      GulDPI MASTER THESIS 2026
                    </span>
                    <h2 className="text-base font-bold text-slate-800 mt-2 leading-snug uppercase tracking-tight">
                      {translations[lang].dissertationTitle}
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {translations[lang].advisor}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {translations[lang].institution}
                    </p>
                  </div>

                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    {translations[lang].overviewHeading}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded border border-slate-200">
                      <p className="text-xs font-bold text-red-700 flex items-center gap-1.5 uppercase mb-1">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                        {translations[lang].thesisProblem}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {translations[lang].thesisProblemText}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/50 rounded border border-emerald-200">
                      <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase mb-1">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                        {translations[lang].innovativeMethod}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {translations[lang].innovativeMethodText}
                      </p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-lg">
                    <p className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 uppercase">
                      <Globe className="w-4 h-4 text-indigo-700" />
                      {lang === "uz" ? "Globallik va Milliylik uyg'unligi (5C)" : "Global-National Synthesis (5C)"}
                    </p>
                    <p className="text-[11px] text-indigo-800 mt-1.5 leading-relaxed font-medium">
                      {lang === "uz" 
                        ? "5C modelida xalqaro P21 4K modeli (Kreativlik, Kollaboratsiya, Kommunikatsiya, Tanqidiy fikrlash) hamda milliy-ma'naviy qadriyatlar va fuqarolik mas'uliyati ('Mahalla' fidoyiligi, Amir Temur an'analari, Forobiy aqliy-axloqiy komilligi) organik ravishda sintezlandi."
                        : "The 5C model integrates the international P21 4K framework (Creativity, Collaboration, Communication, Critical Thinking) with local civic responsibility and national Uzbek morals (Mahalla solidarity, Socratic dialogues from Eastern thinkers like Al-Farabi and Ibn Sina)."}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {lang === "uz" ? "KDT-21 BO'YICHA TAJRIDA NATIJALARI" : "CDT-21 EXPERIMENT OUTCOMES"}
                    </p>
                    
                    <div className="space-y-2.5">
                      {statsByComponent.map((comp) => {
                        const label = lang === "uz" ? comp.skillUz : comp.skillEn;
                        const pct = Math.round((comp.egPost / 45) * 100);
                        return (
                          <div key={comp.skillEn} className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-semibold text-slate-700">{label}</span>
                              <span className="font-black text-slate-900">{pct}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 text-[9px] text-slate-400 italic leading-snug">
                    {lang === "uz" 
                      ? "KDT-21: Ko'nikmalar Diagnostika Testi - 21. Sirdaryo maktablari pedagogik laboratoriya hisobotidan olingan o'rtacha ko'rsatkich."
                      : "CDT-21: Cognitive Diagnostics Test - 21. Mean statistics extracted from Syrdarya region public school trial datasets."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5C MODELI & IKM TAB */}
          {activeTab === "5C Modeli & IKM" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-2 uppercase tracking-tight">
                  {lang === "uz" ? "Tadqiqot Asosi: 5C Modeli" : "Research Foundation: The 5C Model"}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {lang === "uz" 
                    ? "Dissertatsiya doirasida shakllantirilgan original 5C modeli an'anaviy ta'limdan farq qilib, o'quvchini passiv eshituvchidan faol mustaqil ijodkorga aylantirishga qaratilgan."
                    : "The 5C model structured inside the dissertation is aimed at upgrading students from passive learners to active, independent knowledge creators."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
                  {skillsData[lang].map((skill, index) => {
                    const bgColors: Record<string, string> = {
                      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-900',
                      amber: 'bg-amber-50 border-amber-200 text-amber-900',
                      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
                      blue: 'bg-blue-50 border-blue-200 text-blue-900',
                      rose: 'bg-rose-50 border-rose-200 text-rose-900'
                    };
                    const badgeColors: Record<string, string> = {
                      indigo: 'bg-indigo-600',
                      amber: 'bg-amber-500',
                      emerald: 'bg-emerald-600',
                      blue: 'bg-blue-600',
                      rose: 'bg-rose-600'
                    };

                    return (
                      <div key={skill.id} className={`p-3.5 rounded-lg border shadow-sm ${bgColors[skill.color]} flex flex-col justify-between`}>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`${badgeColors[skill.color]} text-white font-bold text-[10px] px-1.5 py-0.5 rounded`}>
                              {skill.key}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{skill.eng}</span>
                          </div>
                          <h4 className="text-xs font-extrabold mb-1">{skill.name}</h4>
                          <p className="text-[11px] leading-relaxed opacity-90">{skill.desc}</p>
                        </div>
                        <div className="mt-3.5 pt-2.5 border-t border-slate-200/50">
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-60">
                            {lang === "uz" ? "METODLAR:" : "CORE METHODS:"}
                          </p>
                          <p className="text-[10px] font-semibold italic mt-0.5">{skill.method}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* IKM (Integrativ Ko'nikmalar Metodikasi) Modules Section */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-tight">
                    {lang === "uz" ? "IKM: Integrativ Ko'nikmalar Metodikasi Modullari" : "IMS: Integrative Method of Skills Modules"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === "uz" 
                      ? "Dissertatsiya doirasida 40 soatlik dars yuklamasiga mo'ljallangan 5 ta asosiy o'quv moduli ishlab chiqilgan:"
                      : "Five core modules formulated for a total 40-hour integrated curriculum:"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
                  {ikmModules[lang].map((mod, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-slate-900 text-white font-black text-[9px] px-1.5 py-0.5 rounded">
                          Modul {i + 1}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {mod.hours} {lang === "uz" ? "soat" : "hrs"}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug mb-1">
                        {mod.name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">
                        {mod.skill}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        {mod.desc}
                      </p>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">
                          {lang === "uz" ? "Target & Metodlar:" : "Target & Methods:"}
                        </span>
                        <span className="text-[10px] text-slate-700 font-semibold block mt-0.5">
                          {mod.target} | {mod.methods}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Didactic loop 5E+R representation */}
                <div className="bg-slate-900 text-white p-4 rounded-lg flex flex-col md:flex-row items-center justify-around gap-4 mt-2">
                  <div className="max-w-md text-center md:text-left">
                    <span className="bg-emerald-500 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest font-black">
                      DIDAKTIK SIKL: 5E + R
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">
                      {lang === "uz" ? "Integratsiyalashgan '5E+R' Dars Modeli" : "Integrated '5E+R' Lesson Loop Model"}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {lang === "uz" 
                        ? "Har bir dars an'anaviy ma'ruzadan voz kechib, 5 ta faol bosqich va o'quvchi shaxsiy refleksiyasidan iborat dars sikli asosida tashkil qilinadi."
                        : "Each lesson follows 5 active steps combined with student reflection, moving the teacher from a lecturer to a dynamic learning facilitator."}
                    </p>
                  </div>

                  <div className="h-px md:h-12 w-full md:w-px bg-slate-700 shrink-0"></div>

                  <div className="flex flex-wrap justify-center gap-1.5 max-w-lg">
                    {[
                      { step: "E1", uz: "Jalb etish", en: "Engage", desc: "Savollar, video yoki provokatsiya" },
                      { step: "E2", uz: "Tadqiq etish", en: "Explore", desc: "Guruhda muammoni mustaqil o'rganish" },
                      { step: "E3", uz: "Tushuntirish", en: "Explain", desc: "Guruh xulosalari va darslik sintezi" },
                      { step: "E4", uz: "Kengaytirish", en: "Elaborate", desc: "Yangi real hayotiy misolga tadbiq etish" },
                      { step: "E5", uz: "Baholash", en: "Evaluate", desc: "Formativ baholash rubrikalari" },
                      { step: "+R", uz: "Refleksiya", en: "Reflect", desc: "O'z-o'zini tahlil, refleksiya daftari" }
                    ].map((stepObj) => (
                      <div key={stepObj.step} className="bg-slate-800 border border-slate-700 p-2 rounded text-center w-24 hover:border-emerald-500 transition">
                        <p className="text-[11px] font-black text-emerald-400">{stepObj.step}</p>
                        <p className="text-[10px] font-bold text-white">{lang === "uz" ? stepObj.uz : stepObj.en}</p>
                        <p className="text-[8px] text-slate-400 leading-tight mt-0.5">{stepObj.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATISTIK TAHLIL TAB */}
          {activeTab === "Statistik Tahlil" && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Visual Chart Card */}
                <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {lang === "uz" ? "Tajriba vs Nazorat Guruhi KDT-21 Natijalari (Sinf ko'rsatkichi)" : "Experimental vs Control Group CDT-21 Dynamics"}
                      </h3>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                          <span className="w-2.5 h-2.5 rounded bg-indigo-600 inline-block"></span>
                          Tajriba (EG)
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                          <span className="w-2.5 h-2.5 rounded bg-slate-300 inline-block"></span>
                          Nazorat (NG)
                        </div>
                      </div>
                    </div>

                    {/* Responsive SVG Chart Representation */}
                    <div className="relative pt-4 pb-2 border-b border-slate-100">
                      <div className="h-56 w-full flex items-end justify-between px-6">
                        {statsByComponent.map((data, idx) => {
                          const label = lang === "uz" ? data.skillUz : data.skillEn;
                          
                          // Scaling formulas (scores are out of 45, max height 200px)
                          const egPreH = (data.egPre / 45) * 180;
                          const egPostH = (data.egPost / 45) * 180;
                          const ngPreH = (data.ngPre / 45) * 180;
                          const ngPostH = (data.ngPost / 45) * 180;

                          return (
                            <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[120px]">
                              {/* Bars container */}
                              <div className="flex items-end gap-2.5 h-[180px]">
                                {/* Pre-test Control Group (NG) */}
                                <div className="flex flex-col items-center group relative">
                                  <div className="w-3.5 bg-slate-200 rounded-t hover:bg-slate-300 transition-all cursor-pointer" style={{ height: `${ngPreH}px` }}></div>
                                  <span className="absolute -top-6 bg-slate-800 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition">
                                    NG Pre: {data.ngPre}
                                  </span>
                                </div>
                                {/* Post-test Control Group (NG) */}
                                <div className="flex flex-col items-center group relative">
                                  <div className="w-3.5 bg-slate-350 rounded-t hover:bg-slate-400 transition-all cursor-pointer" style={{ height: `${ngPostH}px` }}></div>
                                  <span className="absolute -top-6 bg-slate-800 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition">
                                    NG Post: {data.ngPost}
                                  </span>
                                </div>

                                {/* Divider spacing */}
                                <div className="w-px h-6 bg-slate-200"></div>

                                {/* Pre-test Experimental Group (EG) */}
                                <div className="flex flex-col items-center group relative">
                                  <div className="w-4 bg-indigo-400 rounded-t hover:bg-indigo-500 transition-all cursor-pointer" style={{ height: `${egPreH}px` }}></div>
                                  <span className="absolute -top-6 bg-indigo-900 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition">
                                    EG Pre: {data.egPre}
                                  </span>
                                </div>
                                {/* Post-test Experimental Group (EG) */}
                                <div className="flex flex-col items-center group relative">
                                  <div className="w-4.5 bg-indigo-700 rounded-t hover:bg-indigo-800 transition-all cursor-pointer shadow" style={{ height: `${egPostH}px` }}></div>
                                  <span className="absolute -top-6 bg-indigo-900 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition">
                                    EG Post: {data.egPost}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[9px] font-bold text-slate-500 text-center leading-tight truncate w-full" title={label}>
                                {label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-600">
                    <p className="bg-slate-50 p-2 rounded border border-slate-200">
                      <strong>{lang === "uz" ? "EG O'sish xulosasi:" : "EG Growth Abstract:"}</strong> {lang === "uz" ? "Tajriba guruhida barcha 5 ta ko'nikma bo'yicha barqaror o'sish (+1.64 ball) qayd etildi, ayniqsa Fuqarolik mas'uliyati (+2.1) eng katta o'sishni berdi." : "Experimental group showed consistent gains across all 5 skills (+1.64 average change), with Civic Responsibility yielding the highest boost (+2.1)."}
                    </p>
                    <p className="bg-slate-50 p-2 rounded border border-slate-200">
                      <strong>{lang === "uz" ? "NG o'zgarish xulosasi:" : "CG Change Abstract:"}</strong> {lang === "uz" ? "An'anaviy dars tutilgan nazorat guruhida esa o'zgarish minimal (+0.42 ball) bo'lib, o'quvchilar asosan darslik doirasidagi bilimlar bilan cheklangan." : "The control group with standard textbooks showed marginal gains (+0.42 score difference), mostly limited to rote textbook parameters."}
                    </p>
                  </div>
                </div>

                {/* Statistical math outcomes */}
                <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide border-b border-slate-100 pb-2">
                      {lang === "uz" ? "Matematik-Statistik Mezonlar" : "Math-Statistical Indicators"}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400">STUDENT T-MEZONI</p>
                          <p className="text-sm font-black text-slate-800">t = 1.53</p>
                        </div>
                        <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 font-bold px-1.5 py-0.5 rounded">
                          {lang === "uz" ? "Kichik o'sish" : "Small growth"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400">ERKINLIK DARAJASI</p>
                          <p className="text-sm font-black text-slate-800">df = 118</p>
                        </div>
                        <span className="text-[9px] bg-blue-50 text-blue-800 border border-blue-200 font-bold px-1.5 py-0.5 rounded">
                          N = 120
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400">AHAMIYATLILIK DARAJASI</p>
                          <p className="text-sm font-black text-slate-800">p ≈ 0.128</p>
                        </div>
                        <span className="text-[9px] bg-slate-100 text-slate-700 border border-slate-300 font-bold px-1.5 py-0.5 rounded">
                          n.s. (p &gt; 0.05)
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400">KOEN D (EFFEKT KATTALIGI)</p>
                          <p className="text-sm font-black text-slate-800">d = 0.16</p>
                        </div>
                        <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-1.5 py-0.5 rounded">
                          {lang === "uz" ? "Mo'tadil effekt" : "Moderate effect"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 italic leading-snug mt-4 bg-blue-50 border border-blue-100 p-2 rounded">
                    <strong>{lang === "uz" ? "Ilmiy izoh:" : "Scientific Note:"}</strong> {lang === "uz" ? "Qisqa muddatli 4 oylik tajribada olingan bu natija n.s. bo'lsa-da, barqaror ijobiy tendensiya va qobiliyatlar ko'chishini (transfer) ishonchli isbotlaydi." : "Though n.s. due to short 4-month scope, results reliably indicate positive skill transition and high follow-up retention."}
                  </p>
                </div>
              </div>

              {/* 6-month retention data card */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  {lang === "uz" ? "Barqarorlik Ko'rsatkichi (Eksperiment tugaganidan 6 oy o'tib - Noyabr 2026)" : "Retention Indicator: 6-Month Follow-Up Dynamics (Nov 2026)"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {retentionData.map((data, i) => {
                    const label = lang === "uz" ? data.skillUz : data.skillEn;
                    const status = lang === "uz" ? data.statusUz : data.statusEn;
                    const isPositive = data.change >= 0;

                    return (
                      <div key={i} className="bg-slate-50 border border-slate-200 rounded p-3">
                        <p className="text-[11px] font-bold text-slate-800 leading-tight mb-2 truncate">
                          {label}
                        </p>
                        <div className="flex justify-between items-end border-b border-slate-200 pb-1.5 mb-1.5">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase tracking-tight block">
                              {lang === "uz" ? "MAY NATIJA" : "MAY SCORE"}
                            </span>
                            <span className="text-xs font-black text-slate-500">{data.post}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 uppercase tracking-tight block animate-pulse font-bold">
                              {lang === "uz" ? "NOY NATIJA" : "NOV SCORE"}
                            </span>
                            <span className="text-xs font-black text-indigo-700">{data.followUp}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-bold ${isPositive ? 'text-emerald-700 bg-emerald-50 px-1 rounded' : 'text-red-700 bg-red-50 px-1 rounded'}`}>
                            {isPositive ? `+${data.change}` : data.change}
                          </span>
                          <span className="text-[9px] text-slate-500 font-semibold truncate max-w-[80px]" title={status}>
                            {status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PEDAGOGIK SIMULYATOR TAB */}
          {activeTab === "Pedagogik Simulyator" && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-2 uppercase tracking-tight">
                  {lang === "uz" ? "Interaktiv Pedagogik Simulyator & Hisoblagich" : "Interactive Pedagogical Growth Simulator"}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {lang === "uz" 
                    ? "Ushbu tahliliy simulyator yordamida o'quvchilar soni hamda pre-test/post-test ko'rsatkichlarini o'zgartirib, absolute va nisbiy o'sish sur'atlarini hisoblab ko'rishingiz hamda unga mos tavsiyaviy pedagogik xulosalarni olishingiz mumkin."
                    : "Simulate student count and baseline vs final trial results to dynamically generate relative gains, Growth indices, and custom pedagogical reports in real-time."}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Inputs Column */}
                  <form onSubmit={handleCalculateStats} className="lg:col-span-5 space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block uppercase">
                        {lang === "uz" ? "Guruh Turi:" : "Group Type:"}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => { setCalcGroup("EG"); setCalcPre(30.1); setPostScore(31.8); }}
                          className={`py-1.5 px-3 rounded border text-xs font-bold ${calcGroup === "EG" ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                        >
                          {lang === "uz" ? "Tajriba (EG)" : "Experimental (EG)"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setCalcGroup("NG"); setCalcPre(30.6); setPostScore(31.0); }}
                          className={`py-1.5 px-3 rounded border text-xs font-bold ${calcGroup === "NG" ? 'bg-slate-600 text-white border-slate-700' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                        >
                          {lang === "uz" ? "Nazorat (CG)" : "Control (CG)"}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700 block uppercase">
                          {lang === "uz" ? "O'quvchilar soni (N):" : "Student Count (N):"}
                        </label>
                        <span className="text-xs font-black text-slate-900">{calcStudents}</span>
                      </div>
                      <input 
                        type="range" 
                        min="20" 
                        max="300" 
                        value={calcStudents}
                        onChange={(e) => setCalcStudents(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700 block uppercase">
                          {lang === "uz" ? "Boshlang'ich ball (Pre-test, max 45):" : "Baseline score (Pre-test, max 45):"}
                        </label>
                        <span className="text-xs font-black text-slate-900">{preScore}</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="40" 
                        step="0.1"
                        value={preScore}
                        onChange={(e) => setPreScore(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-700 block uppercase">
                          {lang === "uz" ? "Yakuniy ball (Post-test, max 45):" : "Final score (Post-test, max 45):"}
                        </label>
                        <span className="text-xs font-black text-indigo-700">{reqPostScore}</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="45" 
                        step="0.1"
                        value={reqPostScore}
                        onChange={(e) => setPostScore(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-md transition shadow"
                    >
                      {lang === "uz" ? "Tahlil Qilish" : "Perform Analysis"}
                    </button>
                  </form>

                  {/* Outputs Column */}
                  <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        {lang === "uz" ? "Tahlil Natijalari" : "Analysis Outcomes"}
                      </h4>

                      {resultsComputed ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded border border-slate-200 text-center">
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                {lang === "uz" ? "ABSOLUTE O'SISH" : "ABSOLUTE GROWTH"}
                              </p>
                              <p className={`text-xl font-black ${resultsComputed.diff >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                {resultsComputed.diff >= 0 ? `+${resultsComputed.diff}` : resultsComputed.diff}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border border-slate-200 text-center">
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                {lang === "uz" ? "NISBIY O'SISH" : "RELATIVE CHANGE"}
                              </p>
                              <p className={`text-xl font-black ${resultsComputed.diff >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                {resultsComputed.diff >= 0 ? `+${resultsComputed.relativeChange}%` : `${resultsComputed.relativeChange}%`}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white p-3.5 rounded border border-slate-200 space-y-1.5">
                            <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide flex items-center gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />
                              {lang === "uz" ? "Strategik Tavsiya va Xulosa:" : "Strategic Recommendation & Feedback:"}
                            </p>
                            <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                              {resultsComputed.recommendation}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-10 space-y-2">
                          <Calculator className="w-10 h-10 text-slate-300 mx-auto" />
                          <p className="text-xs text-slate-400 font-semibold">
                            {lang === "uz" ? "Tahlil tugmasini bosib hisobotni shakllantiring" : "Click perform analysis button to display generated report"}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-200 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>GulDPI Pedagogik Matematika Lab, v1.0</span>
                      <span>Nov 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* KDT-21 TESTI TAB */}
          {activeTab === "KDT-21 Testi (Sinf)" && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-base font-bold text-slate-800 uppercase tracking-tight">
                      {lang === "uz" ? "KDT-21: Ko'nikmalar Diagnostika Testi (Sinf namuna)" : "CDT-21: Cognitive Diagnostics Test Questionnaire"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === "uz" 
                        ? "5C modelini sinash uchun dissertatsiyada qo'llanilgan original test namunalari. O'zingizni sinab ko'ring:"
                        : "Sample interactive evaluation questionnaire extracted from CDT-21. Evaluate your competency:"}
                    </p>
                  </div>
                  {quizScore !== null && (
                    <button 
                      onClick={resetQuiz}
                      className="text-xs text-red-600 hover:text-red-700 font-bold border border-red-200 px-2.5 py-1 rounded hover:bg-red-50 transition"
                    >
                      {lang === "uz" ? "Qayta boshlash" : "Restart"}
                    </button>
                  )}
                </div>

                {quizScore === null ? (
                  <div className="space-y-4 pt-2">
                    {quizQuestions[lang].map((q) => (
                      <div key={q.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                        <div className="flex justify-between items-center border-b border-slate-200/50 pb-1.5">
                          <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wide">
                            {q.skill}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold">SAVOL {q.id}/5</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 leading-snug">{q.q}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => {
                                setQuizAnswers({
                                  ...quizAnswers,
                                  [q.id]: oIdx
                                });
                              }}
                              className={`text-left text-[11px] p-2.5 rounded border leading-relaxed transition ${
                                quizAnswers[q.id] === oIdx 
                                  ? 'bg-indigo-600 text-white border-indigo-700 font-semibold shadow-sm' 
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              <div className="flex gap-2 items-start">
                                <span className={`font-bold shrink-0 text-[10px] rounded-full w-4 h-4 flex items-center justify-center ${quizAnswers[q.id] === oIdx ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt.text}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={calculateQuizScore}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-md transition shadow"
                    >
                      {lang === "uz" ? "Natijani Hisoblash" : "View Mycdt-21 Score"}
                    </button>
                  </div>
                ) : (
                  <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg text-center space-y-4 max-w-xl mx-auto my-4 animate-scale-up">
                    <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto shadow">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                        {lang === "uz" ? "UMUMIY KDT-21 BALLINGIZ" : "YOUR TOTAL CDT-21 SCORE"}
                      </h3>
                      <p className="text-4xl font-black text-indigo-900 mt-1">{quizScore} / 45</p>
                    </div>

                    <div className="bg-white p-4 rounded border border-indigo-200 text-left space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide block">
                        {lang === "uz" ? "Kompetentlik darajangiz tavsifi:" : "Competency Level Profile:"}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                        {quizScore < 20 && (
                          lang === "uz" 
                            ? "Past daraja (Low). An'anaviy dars va mustaqil fikrlamaslik ustunlik qilmoqda. Savollar akademiyasi va 5E+R darslarida faol ishtirok etish tavsiya qilinadi."
                            : "Low level. Traditional memorization patterns dominate. Active training in IMS loops is recommended."
                        )}
                        {quizScore >= 20 && quizScore < 35 && (
                          lang === "uz" 
                            ? "Mo'tadil o'rtacha daraja (Medium). Dissertatsiyaning boshlang'ich sinf darajasiga mos (30.1 ball). Tanqidiy fikrlash va fuqarolik loyihalarida ko'proq mustaqillik talab qilinadi."
                            : "Medium level. Fits baseline Syrdarya trial mean (30.1). Requires more proactive initiative in local community social projects."
                        )}
                        {quizScore >= 35 && (
                          lang === "uz" 
                            ? "Yuqori daraja (High). Mukarrama Jumayevaning metodikasi tugallangandagi eng ilg'or o'quvchi darajasiga yaqin. 5C ko'nikmalari ideal tarzda uyg'unlashgan!"
                            : "High level. Ideal matching after completing full IMS training. Demonstrates excellent coordination of critical and creative skills!"
                        )}
                      </p>
                    </div>

                    <button 
                      onClick={resetQuiz}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-md shadow"
                    >
                      {lang === "uz" ? "Qayta urinib ko'rish" : "Try Again"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADABIYOTLAR RO'YXATI TAB */}
          {activeTab === "Adabiyotlar Ro'yxati" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-800 uppercase tracking-tight">
                      {lang === "uz" ? "Dissertatsiya Ilmiy Manbalari" : "Dissertation Scientific Bibliography"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === "uz" 
                        ? "Tadqiqotda foydalanilgan jahon va milliy tarbiyaga oid asosiy manbalar arxivi:"
                        : "Select database bibliography utilized inside the thesis scope:"}
                    </p>
                  </div>

                  {/* Simple Search Filter */}
                  <div className="relative max-w-xs w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input 
                      type="text" 
                      placeholder={lang === "uz" ? "Muallif yoki mavzu qidirish..." : "Search author or title..."}
                      value={searchRef}
                      onChange={(e) => setSearchRef(e.target.value)}
                      className="text-xs pl-9 pr-3.5 py-2 w-full rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {filteredRefs.map((ref) => (
                    <div key={ref.id} className="p-3 bg-slate-50 border border-slate-200 rounded hover:bg-white transition flex gap-3 items-start">
                      <div className="w-7 h-7 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0">
                        {ref.id}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-slate-800">
                          {ref.author} ({ref.year})
                        </p>
                        <p className="text-[11px] text-slate-700 leading-snug font-medium italic">
                          "{ref.title}"
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          {ref.place}
                        </p>
                      </div>
                    </div>
                  ))}

                  {filteredRefs.length === 0 && (
                    <div className="col-span-2 text-center py-10 space-y-1">
                      <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-400 font-bold">
                        {lang === "uz" ? "Hech qanday manba topilmadi." : "No references found."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// Utility to mock local state in raw React SPA template safely
function constState<T>(initialVal: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return React.useState<T>(initialVal);
}

function useState<T>(initialVal: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return React.useState<T>(initialVal);
}
