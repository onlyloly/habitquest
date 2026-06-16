type Language = "en" | "ru";

type HomeScreenProps = {
  language: Language;
};
import CountUp from "react-countup";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Zap, ChevronRight, Trophy, Coins } from "lucide-react";
import Confetti from "react-confetti";
const translations = {
  en: {
    greeting: "Good morning",
    ready: "Ready to complete your quests today?",
    level: "Level",
    heroClass: "Consistency Seeker",
    xp: "XP",
    dayStreak: "day streak",
    progressTo: "Progress to Level 25",
    coins: "Coins",
    badges: "Badges",
    todayXp: "Today XP",
    todaysQuests: "Today's Quests",
    done: "done",
    recentAchievements: "Recent Achievements",
    seeAll: "See all",
  },
  ru: {
    greeting: "Доброе утро",
    ready: "Готова выполнить квесты сегодня?",
    level: "Уровень",
    heroClass: "Искатель постоянства",
    xp: "XP",
    dayStreak: "дней подряд",
    progressTo: "Прогресс до 25 уровня",
    coins: "Монеты",
    badges: "Значки",
    todayXp: "XP сегодня",
    todaysQuests: "Квесты на сегодня",
    done: "готово",
    recentAchievements: "Недавние достижения",
    seeAll: "Смотреть все",
  },
};

const initialHabits = [
  { id: 1, name: { en: "Morning Meditation", ru: "Утренняя медитация" }, emoji: "🧘", xp: 50, streak: 12, category: { en: "Mind", ru: "Разум" } },
  { id: 2, name: { en: "Read 30 Minutes", ru: "Читать 30 минут" }, emoji: "📚", xp: 40, streak: 7, category: { en: "Learning", ru: "Обучение" } },
  { id: 3, name: { en: "Workout", ru: "Тренировка" }, emoji: "💪", xp: 80, streak: 21, category: { en: "Health", ru: "Здоровье" } },
  { id: 4, name: { en: "Drink 8 Glasses of Water", ru: "Выпить 8 стаканов воды" }, emoji: "💧", xp: 30, streak: 5, category: { en: "Health", ru: "Здоровье" } },
  { id: 5, name: { en: "Evening Journal", ru: "Личный дневник" }, emoji: "✍️", xp: 35, streak: 3, category: { en: "Mind", ru: "Разум" } },
];

const recentAchievements = [
  { id: 1, name: { en: "7-Day Warrior", ru: "Воин 40 дней" }, emoji: "⚔️", rarity: { en: "Rare", ru: "Редкое" }, colorKey: "Rare" },
  { id: 2, name: { en: "Mind Master", ru: "Мастер разума" }, emoji: "🧠", rarity: { en: "Epic", ru: "Эпическое" }, colorKey: "Epic" },
  { id: 3, name: { en: "Consistency King", ru: "Король стабильности" }, emoji: "👑", rarity: { en: "Legendary", ru: "Легендарное" }, colorKey: "Legendary" },
];

export function HomeScreen({ language }: HomeScreenProps) {
  const t = translations[language];
  const [habits, setHabits] = useState(initialHabits);
  const [completedHabits, setCompletedHabits] = useState<Set<number>>(new Set([2, 4]));
  const totalCoins = habits
  .filter((habit) => completedHabits.has(habit.id))
  .reduce((sum, habit) => sum + Math.floor(habit.xp / 10), 0);

const baseCoins = 1240;
const currentCoins = baseCoins + totalCoins;
  const [floatingReward, setFloatingReward] = useState<{
  id: number;
  xp: number;
  coins: number;
} | null>(null);

  const totalXp = habits
    .filter((habit) => completedHabits.has(habit.id))
    .reduce((sum, habit) => sum + habit.xp, 0);

  const baseXp = 4500;
  const currentXp = baseXp + totalXp;
  const nextLevelXp = 6000;
  const xpProgress = (currentXp / nextLevelXp) * 100;

  const toggleHabit = (id: number) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    setCompletedHabits((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
        setFloatingReward({
  id,
  xp: -habit.xp,
  coins: -Math.floor(habit.xp / 10),
});
      } else {
        next.add(id);
        setFloatingReward({
  id,
  xp: habit.xp,
  coins: Math.floor(habit.xp / 10),
});
      }

      setTimeout(() => setFloatingReward(null), 1000);

      return next;
    });
  };

  const completedCount = completedHabits.size;
  const totalCount = habits.length;
  const progressPct = (completedCount / totalCount) * 100;
  const allCompleted = completedCount === totalCount;
  return (
    
    <>
  {allCompleted && (
   <Confetti
  width={390}
  height={844}
  recycle={false}
  numberOfPieces={250}
  gravity={0.25}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9999,
    pointerEvents: "none",
  }}
/>
  )}

  <div className="flex flex-col gap-5 pb-6">
      <div className="flex items-center justify-between px-5 pt-5">
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#6b6b8a", fontSize: "13px" }}>
            {t.greeting} 👋
          </p>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#f0f0fa", fontSize: "22px", fontWeight: 700, marginTop: "2px" }}>
            Daria Balanina
          </h1>
        </div>

        <div className="relative">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            👩‍💻
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              background: "#f59e0b",
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #09090f",
            }}
          >
            <span style={{ fontSize: "9px", fontWeight: 700, color: "#09090f", fontFamily: "'JetBrains Mono', monospace" }}>24</span>
          </div>
        </div>
      </div>

      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "linear-gradient(135deg, #1a1030 0%, #130d2a 50%, #0f1a2a 100%)",
            borderRadius: 20,
            padding: "20px",
            border: "1px solid rgba(139, 92, 246, 0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -30, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(139, 92, 246, 0.18)", filter: "blur(30px)" }} />
          <div style={{ position: "absolute", bottom: -20, left: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(6, 182, 212, 0.12)", filter: "blur(25px)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, position: "relative" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {t.level} 24
                </span>
                <span style={{ background: "rgba(139, 92, 246, 0.2)", borderRadius: 6, padding: "1px 6px", fontSize: "10px", color: "#c4b5fd", fontFamily: "'Inter', sans-serif" }}>
                  {t.heroClass}
                </span>
              </div>

              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: 800, color: "#f0f0fa", lineHeight: 1.1 }}>
                <CountUp end={currentXp} duration={0.5} separator="," />{" "}
<span style={{ fontSize: "14px", fontWeight: 500, color: "#a78bfa" }}>
  {t.xp}
</span>
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                <Flame size={16} color="#f97316" fill="#f97316" />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: 700, color: "#f0f0fa" }}>42</span>
              </div>
              <p style={{ fontSize: "11px", color: "#6b6b8a", fontFamily: "'Inter', sans-serif" }}>{t.dayStreak}</p>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "11px", color: "#6b6b8a", fontFamily: "'Inter', sans-serif" }}>{t.progressTo}</span>
              <span style={{ fontSize: "11px", color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace" }}>
                {currentXp.toLocaleString("en-US")} / {nextLevelXp.toLocaleString("en-US")}
              </span>
            </div>

            <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
              <motion.div
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: 100 }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {[
              {
                icon: <Coins size={13} color="#f59e0b" />,
                value: currentCoins.toLocaleString("en-US"),
                label: t.coins,
              },
              { icon: <Trophy size={13} color="#f59e0b" />, value: "18", label: t.badges },
              { icon: <Zap size={13} color="#06b6d4" />, value: `+${totalXp}`, label: t.todayXp },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: "8px 10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                  {s.icon}
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500, color: "#f0f0fa" }}>{s.value}</span>
                </div>
                <p style={{ fontSize: "10px", color: "#6b6b8a", fontFamily: "'Inter', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f0f0fa" }}>
            {t.todaysQuests}
          </h2>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#8b5cf6" }}>
            {completedCount}/{totalCount} {t.done}
          </span>
        </div>

        <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 100, marginBottom: 14, overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ height: "100%", background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", borderRadius: 100 }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {habits.map((habit, i) => {
            const done = completedHabits.has(habit.id);

            return (
              <motion.div
                key={habit.id}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => toggleHabit(habit.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: done ? "rgba(139, 92, 246, 0.08)" : "#13131f",
                  borderRadius: 16,
                  padding: "14px",
                  border: done ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                <AnimatePresence>
                  {floatingReward?.id === habit.id && (
                    <motion.div
  initial={{ opacity: 0, y: 10, scale: 0.8 }}
  animate={{ opacity: 1, y: -12, scale: 1 }}
  exit={{ opacity: 0, y: -24, scale: 0.8 }}
  transition={{ duration: 0.6 }}
  style={{
    position: "absolute",
    right: 48,
    top: 10,
    pointerEvents: "none",
    zIndex: 5,
    textAlign: "center",
  }}
>
  <div
    style={{
      color: floatingReward.xp > 0 ? "#2DD881" : "#f43f5e",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "12px",
      fontWeight: 700,
    }}
  >
    {floatingReward.xp > 0 ? "+" : ""}
    {floatingReward.xp} XP
  </div>

  <div
    style={{
      color: "#f59e0b",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "11px",
      fontWeight: 700,
      marginTop: 2,
    }}
  >
    {floatingReward.coins > 0 ? "+" : ""}
    {floatingReward.coins} 🪙
  </div>
</motion.div>
                  )}
                </AnimatePresence>

                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: done ? "rgba(139, 92, 246, 0.2)" : "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  {habit.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: done ? "#c4b5fd" : "#f0f0fa",
                      textDecoration: done ? "line-through" : "none",
                      opacity: done ? 0.7 : 1,
                    }}
                  >
                    {habit.name[language]}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    <span style={{ fontSize: "11px", color: "#6b6b8a", fontFamily: "'Inter', sans-serif" }}>
                      {habit.category[language]}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#2d2d45", display: "inline-block" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Flame size={10} color="#f97316" fill="#f97316" />
                      <span style={{ fontSize: "11px", color: "#f97316", fontFamily: "'JetBrains Mono', monospace" }}>{habit.streak}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: "#a78bfa",
                      background: "rgba(139, 92, 246, 0.12)",
                      padding: "2px 7px",
                      borderRadius: 8,
                    }}
                  >
                    +{habit.xp} {t.xp}
                  </span>

                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: done ? "linear-gradient(135deg, #8b5cf6, #a78bfa)" : "transparent",
                      border: done ? "none" : "2px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {done && <span style={{ color: "white", fontSize: "11px" }}>✓</span>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="px-5">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f0f0fa" }}>
            {t.recentAchievements}
          </h2>

          <button style={{ display: "flex", alignItems: "center", gap: 2, fontSize: "12px", color: "#8b5cf6", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {t.seeAll} <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {recentAchievements.map((a) => {
            const rarityColors: Record<string, string> = {
              Rare: "#06b6d4",
              Epic: "#8b5cf6",
              Legendary: "#f59e0b",
            };

            const color = rarityColors[a.colorKey];

            return (
              <motion.div
                key={a.id}
                whileHover={{ scale: 1.03 }}
                style={{
                  flex: 1,
                  background: "#13131f",
                  borderRadius: 16,
                  padding: "14px 10px",
                  border: `1px solid ${color}30`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "26px", marginBottom: 6 }}>{a.emoji}</div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#f0f0fa", marginBottom: 3 }}>
                  {a.name[language]}
                </p>
                <span style={{ fontSize: "10px", color, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  {a.rarity[language]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
   </div>
</>
);
}