import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [prevTab, setPrevTab] = useState<Tab | null>(null);
const [language, setLanguage] = useState<Language>("en");
const t = translations[language];

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

      {/* App label */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 100,
          padding: "6px 16px",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "14px" }}>⚔️</span>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#6b6b8a", letterSpacing: "0.04em" }}>
          HABITQUEST
        </span>
      </div>
    </div>
  );
}
