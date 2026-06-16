import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

type Language = "en" | "ru";

type StatisticsScreenProps = {
  language: Language;
  theme?: "dark" | "light";
};

const translations = {
  en: {
    title: "Statistics",
    subtitle: "Your journey overview",
    totalXp: "Total XP",
    habitsDone: "Habits Done",
    bestStreak: "Best Streak",
    levelUps: "Level Ups",
    allTime: "All time",
    current: "Current",
    total: "Total",
    days: "days",
    xpThisWeek: "XP This Week",
    xpEarned: "XP earned",
    monthlyCompletions: "Monthly Completions",
    categoryBreakdown: "Category Breakdown",
    activityHeatmap: "Activity Heatmap",
    last35Days: "Last 35 days",
  },
  ru: {
    title: "Статистика",
    subtitle: "Обзор твоего прогресса",
    totalXp: "Всего XP",
    habitsDone: "Привычек выполнено",
    bestStreak: "Лучший стрик",
    levelUps: "Повышений уровня",
    allTime: "За всё время",
    current: "Текущий",
    total: "Всего",
    days: "дней",
    xpThisWeek: "XP за неделю",
    xpEarned: "XP получено",
    monthlyCompletions: "Выполнения по месяцам",
    categoryBreakdown: "Разбор по категориям",
    activityHeatmap: "Карта активности",
    last35Days: "Последние 35 дней",
  },
};

const xpData = [
  { day: { en: "Mon", ru: "Пн" }, xp: 180 },
  { day: { en: "Tue", ru: "Вт" }, xp: 320 },
  { day: { en: "Wed", ru: "Ср" }, xp: 240 },
  { day: { en: "Thu", ru: "Чт" }, xp: 400 },
  { day: { en: "Fri", ru: "Пт" }, xp: 280 },
  { day: { en: "Sat", ru: "Сб" }, xp: 520 },
  { day: { en: "Sun", ru: "Вс" }, xp: 380 },
];

const monthlyData = [
  { month: { en: "Jan", ru: "Янв" }, habits: 22, goal: 30 },
  { month: { en: "Feb", ru: "Фев" }, habits: 28, goal: 30 },
  { month: { en: "Mar", ru: "Мар" }, habits: 25, goal: 30 },
  { month: { en: "Apr", ru: "Апр" }, habits: 30, goal: 30 },
  { month: { en: "May", ru: "Май" }, habits: 27, goal: 30 },
  { month: { en: "Jun", ru: "Июн" }, habits: 18, goal: 30 },
];

const habitBreakdown = [
  { name: { en: "Health", ru: "Здоровье" }, pct: 38, color: "#10b981", emoji: "💪" },
  { name: { en: "Mind", ru: "Разум" }, pct: 28, color: "#8b5cf6", emoji: "🧘" },
  { name: { en: "Learning", ru: "Обучение" }, pct: 22, color: "#06b6d4", emoji: "📚" },
  { name: { en: "Finance", ru: "Финансы" }, pct: 12, color: "#f59e0b", emoji: "💰" },
];

export function StatisticsScreen({ language, theme = "dark" }: StatisticsScreenProps) {
  const isLight = theme === "light";
  const t = translations[language];

  const c = {
    bg: isLight ? "#f7f4ff" : "transparent",
    card: isLight ? "#ffffff" : "#13131f",
    card2: isLight ? "#f0ecff" : "#1e1e30",
    text: isLight ? "#1f1f3d" : "#f0f0fa",
    muted: isLight ? "#6f6685" : "#6b6b8a",
    softText: isLight ? "#4b4565" : "#c4c4d8",
    border: isLight ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.05)",
    faint: isLight ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.04)",
    chartTick: isLight ? "#6f6685" : "#6b6b8a",
    heatEmpty: isLight ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.04)",
  };

  const chartXpData = xpData.map((item) => ({
    day: item.day[language],
    xp: item.xp,
  }));

  const chartMonthlyData = monthlyData.map((item) => ({
    month: item.month[language],
    habits: item.habits,
    goal: item.goal,
  }));

  const topStats = [
    { label: t.totalXp, value: "48,320", sub: t.allTime, color: "#8b5cf6", emoji: "⚡" },
    { label: t.habitsDone, value: "1,247", sub: t.allTime, color: "#10b981", emoji: "✅" },
    { label: t.bestStreak, value: `42 ${t.days}`, sub: t.current, color: "#f59e0b", emoji: "🔥" },
    { label: t.levelUps, value: "23", sub: t.total, color: "#06b6d4", emoji: "🎯" },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        style={{
          background: c.card2,
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: 10,
          padding: "8px 12px",
        }}
      >
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#8b5cf6" }}>
          {label}
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: c.text, fontWeight: 500 }}>
          {payload[0].value} XP
        </p>
      </div>
    );
  };

  const MonthlyTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        style={{
          background: c.card2,
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: 10,
          padding: "8px 12px",
        }}
      >
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#8b5cf6" }}>
          {label}
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: c.muted }}>
          {language === "ru" ? "Цель" : "Goal"}: {payload[0]?.value}
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: c.text, fontWeight: 500 }}>
          {language === "ru" ? "Привычки" : "Habits"}: {payload[1]?.value}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 pb-6 min-h-full" style={{ background: c.bg }}>
      <div className="px-5 pt-5">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 700, color: c.text }}>
          {t.title}
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: c.muted, marginTop: 2 }}>
          {t.subtitle}
        </p>
      </div>

      <div className="px-5">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {topStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: c.card,
                borderRadius: 18,
                padding: 16,
                border: `1px solid ${c.border}`,
                position: "relative",
                overflow: "hidden",
                boxShadow: isLight ? "0 12px 30px rgba(124,58,237,0.06)" : "none",
              }}
            >
              <div style={{ position: "absolute", top: -15, right: -15, width: 60, height: 60, borderRadius: "50%", background: `${s.color}18`, filter: "blur(10px)" }} />
              <div style={{ fontSize: 22, marginBottom: 8 }}>{s.emoji}</div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: s.color }}>{s.value}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: c.text, marginTop: 2 }}>{s.label}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: c.muted, marginTop: 1 }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <div style={{ background: c.card, borderRadius: 20, padding: "20px 16px", border: `1px solid ${c.border}` }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: c.text }}>
              {t.xpThisWeek}
            </h3>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: "#8b5cf6", marginTop: 4 }}>
              2,320 <span style={{ fontSize: 13, color: c.muted }}>{t.xpEarned}</span>
            </p>
          </div>

          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={chartXpData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: c.chartTick, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: c.chartTick }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="xp" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#xpGrad)" dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#a78bfa" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="px-5">
        <div style={{ background: c.card, borderRadius: 20, padding: "20px 16px", border: `1px solid ${c.border}` }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 16 }}>
            {t.monthlyCompletions}
          </h3>

          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={chartMonthlyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }} barGap={4}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: c.chartTick, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: c.chartTick }} axisLine={false} tickLine={false} />
              <Tooltip content={<MonthlyTooltip />} />
              <Bar dataKey="goal" fill={isLight ? "rgba(124,58,237,0.10)" : "rgba(255,255,255,0.04)"} radius={[6, 6, 0, 0]} />
              <Bar dataKey="habits" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="px-5">
        <div style={{ background: c.card, borderRadius: 20, padding: 20, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 16 }}>
            {t.categoryBreakdown}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {habitBreakdown.map((h) => (
              <div key={h.name.en}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{h.emoji}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: c.softText }}>{h.name[language]}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: h.color }}>{h.pct}%</span>
                </div>

                <div style={{ height: 6, background: c.faint, borderRadius: 100, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${h.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={{ height: "100%", background: h.color, borderRadius: 100 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5">
        <div style={{ background: c.card, borderRadius: 20, padding: 20, border: `1px solid ${c.border}` }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
            {t.activityHeatmap}
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: c.muted, marginBottom: 14 }}>
            {t.last35Days}
          </p>

          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {Array.from({ length: 35 }).map((_, i) => {
              const intensity = ((i * 17) % 100) / 100;
              const bg =
                intensity > 0.8
                  ? "#8b5cf6"
                  : intensity > 0.6
                  ? "rgba(139,92,246,0.55)"
                  : intensity > 0.35
                  ? "rgba(139,92,246,0.25)"
                  : c.heatEmpty;

              return (
                <div
                  key={i}
                  style={{
                    width: "calc((100% - 136px) / 7)",
                    height: 28,
                    borderRadius: 6,
                    background: bg,
                    minWidth: 28,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}