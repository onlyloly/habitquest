import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Sparkles, Zap, Trophy, BarChart3 } from "lucide-react";
import { HomeScreen } from "./components/HomeScreen";
import { HabitsScreen } from "./components/HabitsScreen";
import { StatisticsScreen } from "./components/StatisticsScreen";
import { ProfileScreen } from "./components/ProfileScreen";

type Tab = "home" | "habits" | "stats" | "profile";
type Language = "en" | "ru";

const translations = {
  en: {
    home: "Home",
    habits: "Habits",
    stats: "Stats",
    profile: "Profile",
  },
  ru: {
    home: "Главная",
    habits: "Привычки",
    stats: "Статистика",
    profile: "Профиль",
  },
};
const tabIcons: Record<Tab, { icon: string; activeIcon: string }> = {
  home: { icon: "🏠", activeIcon: "🏠" },
  habits: { icon: "⚡", activeIcon: "⚡" },
  stats: { icon: "📊", activeIcon: "📊" },
  profile: { icon: "👤", activeIcon: "👤" },
};

type ScreenProps = {
  language: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
};

const screenComponents: Record<Tab, React.FC<ScreenProps>> = {
  home: HomeScreen,
  habits: HabitsScreen,
  stats: StatisticsScreen,
  profile: ProfileScreen,
};
function LandingSidePanels() {
  const [checked, setChecked] = useState<number[]>([]);

  const miniHabits = [
    { id: 1, title: "Выпить воду", xp: 10 },
    { id: 2, title: "Прочитать 10 страниц", xp: 25 },
    { id: 3, title: "Сделать тренировку", xp: 40 },
  ];

  const totalXp = checked.reduce((sum, id) => {
    const habit = miniHabits.find((h) => h.id === id);
    return sum + (habit?.xp ?? 0);
  }, 0);

  const progress = (checked.length / miniHabits.length) * 100;
  const completed = checked.length === miniHabits.length;

  const toggleMiniHabit = (id: number) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* ЛЕВАЯ ПАНЕЛЬ */}
      <div className="hidden xl:flex fixed left-16 top-1/2 -translate-y-1/2 w-[330px] flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-200">
            <Sparkles size={15} />
            Product concept
          </div>

          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
><div>
  <h1
    style={{
      fontSize: "64px",
      fontWeight: 800,
      lineHeight: 0.9,
      color: "white",
      margin: 0,
    }}
  >
    Habit
  </h1>

  <h1
    style={{
      fontSize: "47px",
      fontWeight: 800,
      lineHeight: 0.9,
      color: "white",
      margin: 0,
    }}
  >
    Quest
  </h1>
</div>

 <img
  src="/zipi-main.png"
  alt="Zipy"
  style={{
    width: 130,
    height: 130,
    objectFit: "contain",
  }}
/>
</div>

          <p className="mb-5 font-['Inter'] text-sm leading-6 text-[#8f8faa]">
            HabitQuest — цифровой продукт, который помогает вырабатывать полезные привычки через игровые механики, систему уровней, достижений и ежедневных заданий.
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {["React", "TypeScript", "Vite", "Framer Motion", "Recharts", "Tailwind"].map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#c8c8dc]">
                {tech}
              </span>
            ))}
          </div>

          <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-purple-300">
              Создатель
            </p>
            <p className="text-sm leading-6 text-[#aaaac0]">
             Дарья Баланина — Fullstack-разработчик и создатель HabitQuest. Люблю превращать идеи в реальные продукты, объединяя красивый интерфейс, продуманную логику и современные технологии.
            </p>
          </div>
        </motion.div>
      </div>
            
      {/* ПРАВАЯ ПАНЕЛЬ */}
      
      <div className="hidden xl:flex fixed right-16 top-1/2 -translate-y-1/2 w-[330px] flex-col gap-5">
        
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
            <div
  style={{
    display: "flex",
    justifyContent: "flex-center",
    marginBottom: 16,
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 100,
      padding: "6px 16px",
    }}
  >
    <span style={{ fontSize: "14px" }}>⚔️</span>
    <span
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "12px",
        fontWeight: 700,
        color: "#6b6b8a",
        letterSpacing: "0.8em",
      }}
    >
      HABITQUEST⚔️
    </span>
  </div>
</div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
            Мини-демо
          </p>

          <h2 className="mb-3 text-2xl font-bold text-white">
            Выполни 3 квеста
          </h2>

          <p className="mb-5 text-sm leading-6 text-[#8f8faa]">
            Нажимай на привычки ниже. XP будет обновляться, прогресс заполнится,
            а после выполнения всех квестов откроется достижение.
          </p>

          <div className="mb-5 rounded-[22px] border border-white/10 bg-black/25 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[#c8c8dc]">Прогресс</span>
              <span className="font-['JetBrains_Mono'] text-sm text-purple-300">
                {checked.length}/3
              </span>
            </div>

            <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              {miniHabits.map((habit) => {
                const isDone = checked.includes(habit.id);

                return (
                  <motion.button
                    key={habit.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleMiniHabit(habit.id)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {habit.title}
                      </p>
                      <p className="text-xs text-[#8f8faa]">+{habit.xp} XP</p>
                    </div>

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        isDone
                          ? "bg-gradient-to-br from-purple-500 to-cyan-400"
                          : "border border-white/20"
                      }`}
                    >
                      {isDone && <span className="text-sm text-white">✓</span>}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <Zap size={18} className="mx-auto mb-1 text-purple-300" />
              <p className="font-['JetBrains_Mono'] text-sm text-white">{totalXp}</p>
              <p className="text-[10px] text-[#8f8faa]">XP</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <Trophy size={18} className="mx-auto mb-1 text-yellow-400" />
              <p className="font-['JetBrains_Mono'] text-sm text-white">
                {completed ? "1" : "0"}
              </p>
              <p className="text-[10px] text-[#8f8faa]">награда</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <BarChart3 size={18} className="mx-auto mb-1 text-cyan-300" />
              <p className="font-['JetBrains_Mono'] text-sm text-white">
                {Math.round(progress)}%
              </p>
              <p className="text-[10px] text-[#8f8faa]">готово</p>
            </div>
          </div>

          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.95 }}
                className="mt-4 rounded-[20px] border border-yellow-400/20 bg-yellow-400/10 p-4"
              >
                <div className="mb-1 flex items-center gap-2 text-yellow-300">
                  <Trophy size={18} />
                  <span className="text-sm font-semibold">
                    Достижение открыто
                  </span>
                </div>
                <p className="text-xs leading-5 text-[#d8d0aa]">
                  Ты выполнил(а) все мини-квесты и получил(а) награду “Daily Starter”.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [prevTab, setPrevTab] = useState<Tab | null>(null);
  const [language, setLanguage] = useState<Language>("ru");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isLight = theme === "light";
  const t = translations[language];
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

const handleDemoClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const newClick = {
    id: Date.now(),
    x: e.clientX,
    y: e.clientY,
  };

  setClicks((prev) => [...prev, newClick]);

  setTimeout(() => {
    setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
  }, 600);
};
const tabs: { id: Tab; label: string; icon: string; activeIcon: string }[] = [
  { id: "home", label: t.home, ...tabIcons.home },
  { id: "habits", label: t.habits, ...tabIcons.habits },
  { id: "stats", label: t.stats, ...tabIcons.stats },
  { id: "profile", label: t.profile, ...tabIcons.profile },
];
  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const tabIndex = tabs.findIndex((t) => t.id === activeTab);
  const prevTabIndex = prevTab ? tabs.findIndex((t) => t.id === prevTab) : tabIndex;
  const direction = tabIndex > prevTabIndex ? 1 : -1;

  const ActiveScreen = screenComponents[activeTab];
  
  return (
    <div
  onClick={handleDemoClick}
  style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d0818 0%, #080d1a 50%, #09090f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <LandingSidePanels />
      {/* Background ambient */}
      <div style={{ position: "fixed", top: "10%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "rgba(139,92,246,0.06)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "20%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "rgba(6,182,212,0.05)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Phone frame */}
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          height: "min(844px, 90vh)",
          background: "#09090f",
          borderRadius: 50,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(139,92,246,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px 0",
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500, color: "#f0f0fa" }}>9:41</span>
          <div
            style={{
              width: 120,
              height: 28,
              background: "#09090f",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: i < 3 ? "#f0f0fa" : "rgba(255,255,255,0.3)", borderRadius: 1 }} />
              ))}
            </div>
            <span style={{ fontSize: "12px" }}>📶</span>
            <span style={{ fontSize: "12px" }}>🔋</span>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ x: direction * 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -30, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              style={{ minHeight: "100%" }}
            >
              <ActiveScreen
              language={language}
              setLanguage={setLanguage}
              
            />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div
          style={{
            flexShrink: 0,
            background: "rgba(9,9,15,0.85)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "10px 8px 24px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.88 }}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 16px",
                  borderRadius: 14,
                  position: "relative",
                  minWidth: 60,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tabBg"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(139,92,246,0.12)",
                      borderRadius: 14,
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                    transition={{ type: "spring", damping: 26, stiffness: 380 }}
                  />
                )}
                <span
                  style={{
                    fontSize: "20px",
                    filter: isActive ? "none" : "grayscale(1) opacity(0.4)",
                    transition: "filter 0.2s",
                    position: "relative",
                  }}
                >
                  {tab.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#a78bfa" : "#6b6b8a",
                    transition: "color 0.2s",
                    position: "relative",
                  }}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

   
      {clicks.map((click) => (
  <motion.div
    key={click.id}
    initial={{ scale: 0.3, opacity: 0.8 }}
    animate={{ scale: 2.2, opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    style={{
      position: "fixed",
      left: click.x - 12,
      top: click.y - 12,
      width: 24,
      height: 24,
      borderRadius: "50%",
      border: "2px solid rgba(167,139,250,0.9)",
      background: "rgba(167,139,250,0.18)",
      pointerEvents: "none",
      zIndex: 9999,
    }}
  />
))}
    </div>
  );
}
