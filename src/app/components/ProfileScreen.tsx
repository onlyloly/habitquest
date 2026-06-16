import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Settings,
  ChevronRight,
  Star,
  Shield,
  Sword,
  Bell,
  Moon,
  Lock,
  HelpCircle,
  Sun,
} from "lucide-react";

type Language = "en" | "ru";
type ThemeMode = "dark" | "light";

type ProfileScreenProps = {
  language: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
  theme?: ThemeMode;
  setTheme?: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

export function ProfileScreen({
  language,
  setLanguage,
  theme,
  setTheme,
}: ProfileScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [localTheme, setLocalTheme] = useState<ThemeMode>("dark");
  const [infoModal, setInfoModal] = useState<string | null>(null);

  const currentTheme = theme ?? localTheme;
  const isLight = currentTheme === "light";

  const colors = {
    bg: isLight ? "#f7f4ff" : "#09090f",
    card: isLight ? "#ffffff" : "#13131f",
    card2: isLight ? "#f0ecff" : "#181825",
    text: isLight ? "#171421" : "#f0f0fa",
    muted: isLight ? "#6f6685" : "#6b6b8a",
    border: isLight ? "rgba(124,58,237,0.16)" : "rgba(255,255,255,0.08)",
  };

  const t = {
    en: {
      language: "Language",
      profile: "Profile",
      heroClass: "Consistency Seeker✨",
      joined: "Joined June 2026 · 8 friends",
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
      notificationsSub: notificationsOn ? "Daily reminders on" : "Daily reminders off",
      appearance: "Appearance",
      appearanceSub: isLight ? "Light mode" : "Dark mode",
      privacy: "Privacy & Security",
      privacySub: "Password, data",
      help: "Help & Support",
      helpSub: "FAQ, contact us",
      close: "Close",
      cancel: "Cancel",
      confirmSignOut: "Do you really want to sign out?",
    },
    ru: {
      language: "Язык",
      profile: "Профиль",
      heroClass: "Искатель постоянства✨",
      joined: "С июня 2026 · 8 друзей",
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
      notificationsSub: notificationsOn ? "Напоминания включены" : "Напоминания выключены",
      appearance: "Внешний вид",
      appearanceSub: isLight ? "Светлая тема" : "Тёмная тема",
      privacy: "Приватность и безопасность",
      privacySub: "Пароль, данные",
      help: "Помощь и поддержка",
      helpSub: "FAQ, связь с нами",
      close: "Закрыть",
      cancel: "Отмена",
      confirmSignOut: "Точно выйти из аккаунта?",
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

  const rarityColors: Record<string, { color: string; bg: string }> = {
    Common: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
    Rare: { color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
    Epic: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
    Legendary: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
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

  const toggleTheme = () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    if (setTheme) setTheme(next);
    else setLocalTheme(next);
  };

  const menuItems = [
    {
      icon: <span style={{ fontSize: 17 }}>🌐</span>,
      label: t.language,
      sub: language === "ru" ? "Русский" : "English",
      action: () => setLanguage?.(language === "en" ? "ru" : "en"),
    },
    {
      icon: <Bell size={17} />,
      label: t.notifications,
      sub: t.notificationsSub,
      action: () => setNotificationsOn((prev) => !prev),
    },
    {
      icon: <Lock size={17} />,
      label: t.privacy,
      sub: t.privacySub,
      action: () => setInfoModal(t.privacy),
    },
    {
      icon: <HelpCircle size={17} />,
      label: t.help,
      sub: t.helpSub,
      action: () => setInfoModal(t.help),
    },
  ];

  return (
    <div
      className="relative flex flex-col gap-5 pb-6 min-h-full"
      style={{ background: colors.bg }}
    >
      <div className="px-5 pt-5">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 700, color: colors.text }}>
            {t.profile}
          </h1>

          <button
            onClick={() => setShowSettings(true)}
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 8,
              cursor: "pointer",
            }}
          >
            <Settings size={18} color={colors.muted} />
          </button>
        </div>
      </div>

      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: isLight
              ? "linear-gradient(135deg, #ffffff 0%, #eee7ff 100%)"
              : "linear-gradient(135deg, #1a1030 0%, #0f1a2a 100%)",
            borderRadius: 24,
            padding: "24px 20px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 22,
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
              }}
            >
              👩‍💻
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, color: colors.text }}>
                Daria Balanina
              </h2>
              <span style={{ fontSize: 12, color: "#a78bfa", background: "rgba(139,92,246,0.15)", padding: "2px 8px", borderRadius: 100 }}>
                {t.heroClass}
              </span>
              <p style={{ fontSize: 12, color: colors.muted, marginTop: 10 }}>{t.joined}</p>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: colors.muted }}>{t.level} 24 → 25</span>
              <span style={{ fontSize: 11, color: "#a78bfa" }}>4,820 / 6,000 XP</span>
            </div>
            <div style={{ height: 8, background: "rgba(139,92,246,0.12)", borderRadius: 100, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80.3%" }}
                transition={{ duration: 1 }}
                style={{ height: "100%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {[
              { value: "42", label: t.dayStreak, emoji: "🔥" },
              { value: "1,247", label: t.habitsDone, emoji: "✅" },
              { value: "1,240", label: t.coins, emoji: "🪙" },
            ].map((s) => (
              <div key={s.label} style={{ flex: 1, background: isLight ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 16 }}>{s.emoji}</div>
                <p style={{ fontSize: 15, color: colors.text }}>{s.value}</p>
                <p style={{ fontSize: 10, color: colors.muted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5">
        <h2 style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>{t.classPerks}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {classPerks.map((p) => (
            <div key={p.name} style={{ background: colors.card, borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: colors.card2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.icon}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{p.name}</p>
                <p style={{ fontSize: 11, color: colors.muted }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{t.achievements}</h2>
          <span style={{ fontSize: 12, color: colors.muted }}>
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
                  background: a.earned ? rc.bg : "rgba(255,255,255,0.03)",
                  borderRadius: 16,
                  padding: "14px 10px",
                  textAlign: "center",
                  filter: a.earned ? "none" : "grayscale(1) opacity(0.4)",
                }}
              >
                <div style={{ fontSize: 26 }}>{a.emoji}</div>
                <p style={{ fontSize: 10, fontWeight: 600, color: colors.text }}>{a.name[language]}</p>
                <span style={{ fontSize: 9, color: rc.color }}>
                  {rarityLabels[language][a.rarity as keyof typeof rarityLabels.en]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-5">
        <button
          onClick={() => setInfoModal(t.confirmSignOut)}
          style={{
            width: "100%",
            background: "rgba(244, 63, 94, 0.08)",
            border: "1px solid rgba(244, 63, 94, 0.2)",
            borderRadius: 16,
            padding: 14,
            color: "#f43f5e",
            fontSize: 15,
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
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 390,
              height: 844,
              background: "rgba(0,0,0,0.58)",
              backdropFilter: "blur(5px)",
              zIndex: 100,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRadius: 48,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ y: 220, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 220, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 360,
                background: colors.card,
                borderRadius: "26px 26px 0 0",
                border: `1px solid ${colors.border}`,
                borderBottom: "none",
                padding: "14px 16px 24px",
              }}
            >
              <div style={{ width: 40, height: 4, borderRadius: 100, background: "rgba(255,255,255,0.14)", margin: "0 auto 16px" }} />

              <h2 style={{ fontSize: 17, fontWeight: 700, color: colors.text, marginBottom: 12 }}>
                {t.settings}
              </h2>

              <div style={{ background: colors.card2, borderRadius: 18, overflow: "hidden" }}>
                {menuItems.map((item, i) => (
                  <div key={item.label}>
                    <div
                      onClick={item.action}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "13px 14px",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ color: colors.muted, width: 22 }}>{item.icon}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{item.label}</p>
                        <p style={{ fontSize: 10, color: colors.muted, marginTop: 2 }}>{item.sub}</p>
                      </div>
                      <ChevronRight size={15} color={colors.muted} />
                    </div>

                    {i < menuItems.length - 1 && (
                      <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginLeft: 14 }} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {infoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInfoModal(null)}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 390,
              height: 844,
              background: "rgba(0,0,0,0.62)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 120,
              borderRadius: 48,
            }}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "78%",
                background: colors.card,
                borderRadius: 22,
                padding: 20,
                border: `1px solid ${colors.border}`,
              }}
            >
              <p style={{ color: colors.text, fontSize: 15, lineHeight: 1.5, marginBottom: 16 }}>
                {infoModal}
              </p>

              <button
                onClick={() => setInfoModal(null)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}