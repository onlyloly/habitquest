import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Settings, ChevronRight, Star, Shield, Sword, Bell, Moon, Lock, HelpCircle } from "lucide-react";

type Language = "en" | "ru";

type ProfileScreenProps = {
  language: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
};

export function ProfileScreen({ language, setLanguage }: ProfileScreenProps) {
  const [showSettings, setShowSettings] = useState(false);

  const t = {
    en: {
      language: "Language",
      profile: "Profile",
      heroClass: "Consistency Seeker✨",
      joined: "Joined January 2025 · 8 friends",
      level: "Level",
      dayStreak: "Day Streak",
      habitsDone: "Habits Done",
      coins: "Coins",
      classPerks: "Class Perks",
      achievements: "Achievements",
      earned: "earned",
      settings: "Settings",
      signOut: "Sign Out",
      combatBonus: "Combat Bonus",
      combatBonusDesc: "+10% XP on Hard habits",
      streakShield: "Streak Shield",
      streakShieldDesc: "1 free streak save/week",
      coinMultiplier: "Coin Multiplier",
      coinMultiplierDesc: "+5% bonus coins",
      notifications: "Notifications",
      notificationsSub: "Daily reminders on",
      appearance: "Appearance",
      appearanceSub: "Dark mode",
      privacy: "Privacy & Security",
      privacySub: "Password, data",
      help: "Help & Support",
      helpSub: "FAQ, contact us",
    },
    ru: {
      language: "Язык",
      profile: "Профиль",
      heroClass: "Искатель постоянства✨",
      joined: "С января 2025 · 8 друзей",
      level: "Уровень",
      dayStreak: "Дней подряд",
      habitsDone: "Привычек выполнено",
      coins: "Монеты",
      classPerks: "Бонусы класса",
      achievements: "Достижения",
      earned: "получено",
      settings: "Настройки",
      signOut: "Выйти",
      combatBonus: "Боевой бонус",
      combatBonusDesc: "+10% XP за сложные привычки",
      streakShield: "Щит стрика",
      streakShieldDesc: "1 сохранение стрика в неделю",
      coinMultiplier: "Множитель монет",
      coinMultiplierDesc: "+5% бонусных монет",
      notifications: "Уведомления",
      notificationsSub: "Ежедневные напоминания включены",
      appearance: "Внешний вид",
      appearanceSub: "Тёмная тема",
      privacy: "Приватность и безопасность",
      privacySub: "Пароль, данные",
      help: "Помощь и поддержка",
      helpSub: "FAQ, связь с нами",
    },
  }[language];

  const achievements = [
    { id: 1, name: { en: "First Quest", ru: "Первый квест" }, emoji: "🗡️", earned: true, rarity: "Common" },
    { id: 2, name: { en: "7-Day Warrior", ru: "Воин 40 дней" }, emoji: "⚔️", earned: true, rarity: "Rare" },
    { id: 3, name: { en: "Mind Master", ru: "Мастер разума" }, emoji: "🧠", earned: true, rarity: "Epic" },
    { id: 4, name: { en: "Consistency King", ru: "Король стабильности" }, emoji: "👑", earned: true, rarity: "Legendary" },
    { id: 5, name: { en: "Century Club", ru: "Клуб сотни" }, emoji: "💯", earned: false, rarity: "Rare" },
    { id: 6, name: { en: "Iron Will", ru: "Железная воля" }, emoji: "🛡️", earned: false, rarity: "Epic" },
  ];

  const rarityColors: Record<string, { color: string; bg: string; glow: string }> = {
    Common: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", glow: "rgba(148,163,184,0.15)" },
    Rare: { color: "#06b6d4", bg: "rgba(6,182,212,0.1)", glow: "rgba(6,182,212,0.2)" },
    Epic: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", glow: "rgba(139,92,246,0.25)" },
    Legendary: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", glow: "rgba(245,158,11,0.25)" },
  };

  const rarityLabels = {
    en: { Common: "Common", Rare: "Rare", Epic: "Epic", Legendary: "Legendary" },
    ru: { Common: "Обычное", Rare: "Редкое", Epic: "Эпическое", Legendary: "Легендарное" },
  };

  const classPerks = [
    { icon: <Sword size={14} color="#f43f5e" />, name: t.combatBonus, desc: t.combatBonusDesc },
    { icon: <Shield size={14} color="#06b6d4" />, name: t.streakShield, desc: t.streakShieldDesc },
    { icon: <Star size={14} color="#f59e0b" />, name: t.coinMultiplier, desc: t.coinMultiplierDesc },
  ];

  const menuItems: {
    icon: React.ReactNode;
    label: string;
    sub: string;
    action?: () => void;
  }[] = [
    {
      icon: <span style={{ fontSize: 17 }}>🌐</span>,
      label: t.language,
      sub: language === "ru" ? "Русский" : "English",
      action: () => setLanguage?.(language === "en" ? "ru" : "en"),
    },
    { icon: <Bell size={17} />, label: t.notifications, sub: t.notificationsSub },
    { icon: <Moon size={17} />, label: t.appearance, sub: t.appearanceSub },
    { icon: <Lock size={17} />, label: t.privacy, sub: t.privacySub },
    { icon: <HelpCircle size={17} />, label: t.help, sub: t.helpSub },
  ];

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className="px-5 pt-5">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: 700, color: "#f0f0fa" }}>
            {t.profile}
          </h1>

          <button
            onClick={() => setShowSettings(true)}
            style={{
              background: "#1a1a28",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "8px",
              cursor: "pointer",
            }}
          >
            <Settings size={18} color="#6b6b8a" />
          </button>
        </div>
      </div>

      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "linear-gradient(135deg, #1a1030 0%, #0f1a2a 100%)",
            borderRadius: 24,
            padding: "24px 20px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", position: "relative" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 22,
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "34px",
                }}
              >
                🧙
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f0f0fa" }}>
                Daria Balanina
              </h2>
              <span style={{ fontSize: "12px", color: "#a78bfa", fontFamily: "'Inter', sans-serif", background: "rgba(139,92,246,0.15)", padding: "2px 8px", borderRadius: 100 }}>
                {t.heroClass}
              </span>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6b6b8a", marginTop: 10 }}>{t.joined}</p>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6b6b8a" }}>{t.level} 24 → 25</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#a78bfa" }}>4,820 / 6,000 XP</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80.3%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: 100 }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {[
              { value: "42", label: t.dayStreak, emoji: "🔥" },
              { value: "1,247", label: t.habitsDone, emoji: "✅" },
              { value: "1,240", label: t.coins, emoji: "🪙" },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: "16px", marginBottom: 2 }}>{s.emoji}</div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", color: "#f0f0fa" }}>{s.value}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#6b6b8a" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5">
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "#f0f0fa", marginBottom: 12 }}>
          {t.classPerks}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {classPerks.map((p) => (
            <div key={p.name} style={{ background: "#13131f", borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "#1e1e30", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.icon}
              </div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#f0f0fa" }}>{p.name}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6b6b8a" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "#f0f0fa" }}>{t.achievements}</h2>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6b6b8a" }}>
            {achievements.filter((a) => a.earned).length}/{achievements.length} {t.earned}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {achievements.map((a, i) => {
            const rc = rarityColors[a.rarity];

            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: a.earned ? rc.bg : "rgba(255,255,255,0.02)",
                  borderRadius: 16,
                  padding: "14px 10px",
                  textAlign: "center",
                  filter: a.earned ? "none" : "grayscale(1) opacity(0.4)",
                }}
              >
                <div style={{ fontSize: "26px", marginBottom: 6 }}>{a.emoji}</div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "10px", fontWeight: 600, color: "#f0f0fa" }}>
                  {a.name[language]}
                </p>
                <span style={{ fontSize: "9px", color: rc.color, fontFamily: "'Inter', sans-serif" }}>
                  {rarityLabels[language][a.rarity as keyof typeof rarityLabels.en]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-5">
        <button
          style={{
            width: "100%",
            background: "rgba(244, 63, 94, 0.08)",
            border: "1px solid rgba(244, 63, 94, 0.2)",
            borderRadius: 16,
            padding: "14px",
            color: "#f43f5e",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t.signOut}
        </button>
      </div>

            <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.58)",
              backdropFilter: "blur(5px)",
              zIndex: 100,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ y: 220, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 220, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 360,
                background: "#13131f",
                borderRadius: "26px 26px 0 0",
                border: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
                padding: "14px 16px 24px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 100,
                  background: "rgba(255,255,255,0.14)",
                  margin: "0 auto 16px",
                }}
              />

              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#f0f0fa",
                  marginBottom: 12,
                }}
              >
                {t.settings}
              </h2>

              <div
                style={{
                  background: "#181825",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                {menuItems.map((item, i) => (
                  <div key={item.label}>
                    <div
                      onClick={item.action}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "13px 14px",
                        cursor: item.action ? "pointer" : "default",
                      }}
                    >
                      <div style={{ color: "#6b6b8a", width: 22 }}>
                        {item.icon}
                      </div>

                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#f0f0fa",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "10px",
                            color: "#6b6b8a",
                            marginTop: 2,
                          }}
                        >
                          {item.sub}
                        </p>
                      </div>

                      <ChevronRight size={15} color="#2d2d45" />
                    </div>

                    {i < menuItems.length - 1 && (
                      <div
                        style={{
                          height: 1,
                          background: "rgba(255,255,255,0.04)",
                          marginLeft: 14,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}