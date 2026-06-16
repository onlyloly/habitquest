type Language = "en" | "ru";

type HabitsScreenProps = {
  language: Language;
};

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Flame, Search, Zap } from "lucide-react";

const categoryLabels = {
  en: {
    All: "All",
    Health: "Health",
    Mind: "Mind",
    Learning: "Learning",
    Social: "Social",
    Finance: "Finance",
  },
  ru: {
    All: "Все",
    Health: "Здоровье",
    Mind: "Разум",
    Learning: "Обучение",
    Social: "Общение",
    Finance: "Финансы",
  },
};

type Habit = {
  id: number;
  name: { en: string; ru: string };
  emoji: string;
  xp: number;
  streak: number;
  category: string;
  frequency: string;
  difficulty: "Easy" | "Medium" | "Hard";
  totalDays: number;
};

const initialHabits: Habit[] = [
  { id: 1, name: { en: "Morning Meditation", ru: "Утренняя медитация" }, emoji: "🧘", xp: 50, streak: 12, category: "Mind", frequency: "Daily", difficulty: "Easy", totalDays: 45 },
  { id: 2, name: { en: "30-Min Workout", ru: "30-минутная тренировка" }, emoji: "💪", xp: 80, streak: 21, category: "Health", frequency: "Daily", difficulty: "Hard", totalDays: 89 },
  { id: 3, name: { en: "Read 30 Minutes", ru: "Читать 30 минут" }, emoji: "📚", xp: 40, streak: 7, category: "Learning", frequency: "Daily", difficulty: "Medium", totalDays: 32 },
  { id: 4, name: { en: "Drink 8 Glasses", ru: "Выпить 8 стаканов воды" }, emoji: "💧", xp: 30, streak: 5, category: "Health", frequency: "Daily", difficulty: "Easy", totalDays: 18 },
  { id: 5, name: { en: "Evening Journal", ru: "Личный дневник" }, emoji: "✍️", xp: 35, streak: 3, category: "Mind", frequency: "Daily", difficulty: "Easy", totalDays: 14 },
  { id: 7, name: { en: "Spanish Lesson", ru: "Урок испанского" }, emoji: "👨‍🎓", xp: 45, streak: 14, category: "Learning", frequency: "Daily", difficulty: "Medium", totalDays: 60 },
  { id: 8, name: { en: "Budget Check", ru: "Копилка" }, emoji: "💰", xp: 25, streak: 2, category: "Finance", frequency: "Weekly", difficulty: "Easy", totalDays: 8 },
];

const difficultyColors: Record<string, { color: string; bg: string }> = {
  Easy: { color: "#10b981", bg: "rgba(16, 185, 129, 0.12)" },
  Medium: { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)" },
  Hard: { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.12)" },
};

const categories = ["All", "Health", "Mind", "Learning", "Social", "Finance"] as const;

export function HabitsScreen({ language }: HabitsScreenProps) {
  const t = {
    en: {
      title: "My Habits",
      activeQuests: "active quests",
      search: "Search habits...",
      completed: "Completed",
      bestStreak: "Best Streak",
      xpToday: "XP Today",
      totalDays: "days total",
      newQuest: "New Habit Quest",
      habitName: "Habit name...",
      addQuest: "Add Quest",
    },
    ru: {
      title: "Мои привычки",
      activeQuests: "активных квестов",
      search: "Поиск привычек...",
      completed: "Выполнено",
      bestStreak: "Лучший стрик",
      xpToday: "XP сегодня",
      totalDays: "дней всего",
      newQuest: "Новая привычка",
      habitName: "Название привычки...",
      addQuest: "Добавить привычку",
    },
  }[language];

  const difficultyLabels = {
    en: { Easy: "Easy", Medium: "Medium", Hard: "Hard" },
    ru: { Easy: "Легко", Medium: "Средне", Hard: "Сложно" },
  };

  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<number | null>(null);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitCategory, setNewHabitCategory] = useState("Health");
  const [completed, setCompleted] = useState<Set<number>>(new Set([1, 3, 7]));

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY;
  };

  const filtered = habits.filter((h) => {
    const matchCat = activeCategory === "All" || h.category === activeCategory;
    const matchSearch = h.name[language].toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  
const toggle = (id: number) => {
  setCompleted((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
};

const deleteHabit = (id: number) => {
  setHabits((prev) => prev.filter((habit) => habit.id !== id));

  setCompleted((prev) => {
    const next = new Set(prev);
    next.delete(id);
    return next;
  });
};

const addHabit = () => {
  if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now(),
      name: { en: newHabitName.trim(), ru: newHabitName.trim() },
      emoji: "✨",
      xp: 30,
      streak: 0,
      category: newHabitCategory,
      frequency: "Daily",
      difficulty: "Easy",
      totalDays: 0,
    };

    setHabits((prev) => [newHabit, ...prev]);
    setNewHabitName("");
    setNewHabitCategory("Health");
    setShowAddModal(false);
  };

  return (
    <div className="relative flex flex-col gap-5 pb-6 min-h-full overflow-hidden">
      <div className="px-5 pt-5">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", fontWeight: 700, color: "#f0f0fa" }}>{t.title}</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6b6b8a", marginTop: 2 }}>{habits.length} {t.activeQuests}</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowAddModal(true)}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              borderRadius: 14,
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.35)",
            }}
          >
            <Plus size={20} color="white" />
          </motion.button>
        </div>

        <div style={{ position: "relative", marginBottom: 14 }}>
          <Search size={15} color="#6b6b8a" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            style={{
              width: "100%",
              background: "#1a1a28",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "11px 14px 11px 38px",
              color: "#f0f0fa",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          onMouseDown={(e) => {
            isDragging.current = true;
            startX.current = e.pageX;
            scrollLeft.current = scrollRef.current?.scrollLeft || 0;
          }}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={(e) => {
            if (!isDragging.current || !scrollRef.current) return;
            const walk = (e.pageX - startX.current) * 1.5;
            scrollRef.current.scrollLeft = scrollLeft.current - walk;
          }}
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            userSelect: "none",
          }}
          className="hide-scrollbar"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: "7px 14px",
                borderRadius: 100,
                border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                background: activeCategory === cat ? "linear-gradient(135deg, #7c3aed, #8b5cf6)" : "transparent",
                color: activeCategory === cat ? "white" : "#6b6b8a",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: activeCategory === cat ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {categoryLabels[language][cat]}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-5">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: t.completed, value: `${completed.size}/${habits.length}`, color: "#8b5cf6" },
            { label: t.bestStreak, value: language === "ru" ? "21 день" : "21 days", color: "#f59e0b" },
            { label: t.xpToday, value: "+125", color: "#06b6d4" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#13131f", borderRadius: 14, padding: "12px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "16px", fontWeight: 500, color: s.color }}>{s.value}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6b6b8a", marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((habit, i) => {
            const done = completed.has(habit.id);
            const diff = difficultyColors[habit.difficulty];

            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  background: "#13131f",
                  borderRadius: 18,
                  padding: "16px",
                  border: done ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid rgba(255,255,255,0.05)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {done && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }} />}

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: done ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                    {habit.emoji}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: done ? "#c4b5fd" : "#f0f0fa" }}>
                        {habit.name[language]}
                      </p>
                      <span style={{ fontSize: "10px", color: diff.color, background: diff.bg, padding: "1px 6px", borderRadius: 6, fontFamily: "'Inter', sans-serif" }}>
                        {difficultyLabels[language][habit.difficulty]}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Flame size={11} color="#f97316" fill="#f97316" />
                        <span style={{ fontSize: "11px", color: "#f97316", fontFamily: "'JetBrains Mono', monospace" }}>{habit.streak}{language === "ru" ? "д" : "d"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Zap size={11} color="#a78bfa" />
                        <span style={{ fontSize: "11px", color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace" }}>+{habit.xp} XP</span>
                      </div>
                      <span style={{ fontSize: "11px", color: "#6b6b8a", fontFamily: "'Inter', sans-serif" }}>{habit.totalDays} {t.totalDays}</span>
                    </div>
                  </div>
                <button
  onClick={() => setHabitToDelete(habit.id)}
  style={{
    background: "transparent",
    border: "none",
    color: "#6b6b8a",
    cursor: "pointer",
    fontSize: "16px",
    padding: 4,
  }}
>
  ×
</button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggle(habit.id)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: done ? "linear-gradient(135deg, #7c3aed, #a78bfa)" : "transparent",
                      border: done ? "none" : "2px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {done && <span style={{ color: "white", fontSize: "14px" }}>✓</span>}
                  </motion.button>
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 3 }}>
                  {Array.from({ length: 7 }).map((_, d) => (
                    <div
                      key={d}
                      style={{
                        height: 4,
                        flex: 1,
                        borderRadius: 100,
                        background: d < Math.min(habit.streak, 7) ? (done ? "#8b5cf6" : "rgba(139,92,246,0.4)") : "rgba(255,255,255,0.05)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
          <AnimatePresence>
  {habitToDelete !== null && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setHabitToDelete(null)}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 390,
        height: 844,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
        backdropFilter: "blur(4px)",
        borderRadius: 48,
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "82%",
          background: "#13131f",
          borderRadius: 22,
          padding: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        <h3
          style={{
            color: "#f0f0fa",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 17,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Delete habit?
        </h3>

        <p
          style={{
            color: "#8a8aa3",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            lineHeight: 1.5,
            marginBottom: 18,
          }}
        >
          This action cannot be undone.
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setHabitToDelete(null)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#f0f0fa",
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              deleteHabit(habitToDelete);
              setHabitToDelete(null);
            }}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #f43f5e, #fb7185)",
              color: "white",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 390,
              height: 844,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              zIndex: 50,
              backdropFilter: "blur(4px)",
            }}
          >
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#13131f",
                borderRadius: "24px 24px 0 0",
                padding: "24px 20px 40px",
                width: "100%",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderBottom: "none",
              }}
            >
              <div style={{ width: 40, height: 4, borderRadius: 100, background: "rgba(255,255,255,0.1)", margin: "0 auto 20px" }} />
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f0f0fa", marginBottom: 20 }}>
                {t.newQuest}
              </h3>

              <input
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder={t.habitName}
                style={{
                  width: "100%",
                  background: "#1a1a28",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: "13px 16px",
                  color: "#f0f0fa",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  outline: "none",
                  marginBottom: 12,
                  boxSizing: "border-box",
                }}
              />

              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["Health", "Mind", "Learning", "Finance"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewHabitCategory(cat)}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      borderRadius: 10,
                      border: newHabitCategory === cat ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.08)",
                      background: newHabitCategory === cat ? "rgba(139, 92, 246, 0.18)" : "transparent",
                      color: newHabitCategory === cat ? "#c4b5fd" : "#6b6b8a",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    {categoryLabels[language][cat as keyof typeof categoryLabels.en]}
                  </button>
                ))}
              </div>

              <button
                onClick={addHabit}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                  borderRadius: 16,
                  padding: "15px",
                  border: "none",
                  color: "white",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
                }}
              >
                {t.addQuest}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}