import { motion } from "motion/react";
import { useState } from "react";
import { Github, ExternalLink, Sparkles, Zap, Trophy, BarChart3 } from "lucide-react";

export function SidePanels() {
  const [orb, setOrb] = useState({ x: 0, y: 0 });

  return (
    <>
      {/* LEFT */}
      <div className="hidden lg:flex fixed left-16 top-1/2 -translate-y-1/2 w-[330px] flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-200">
            <Sparkles size={15} />
            Portfolio Project
          </div>

          <h1 className="mb-4 font-['Plus_Jakarta_Sans'] text-6xl font-extrabold leading-none text-white">
            Habit
            <br />
            Quest
          </h1>

          <p className="mb-5 font-['Inter'] text-sm leading-6 text-[#8f8faa]">
            A gamified habit tracker web demo created by Daria Balanina.
            Track habits, earn XP, keep streaks and explore progress through a premium mobile-style interface.
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {["React", "TypeScript", "Vite", "Framer Motion", "Recharts", "Tailwind"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#c8c8dc]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black">
              <Github size={16} />
              GitHub
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white">
              <ExternalLink size={16} />
              Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-purple-300">Creator</p>
          <p className="text-sm leading-6 text-[#aaaac0]">
            Daria Balanina — frontend developer focused on interactive interfaces,
            React, TypeScript and product-style web applications.
          </p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex fixed right-16 top-1/2 -translate-y-1/2 w-[330px] flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
        >
          <motion.div
            className="pointer-events-none absolute h-48 w-48 rounded-full bg-purple-500/20 blur-3xl"
            animate={{ x: orb.x - 80, y: orb.y - 80 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />

          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-300">Interactive Demo</p>
          <h2 className="mb-3 text-2xl font-bold text-white">Drag the orb</h2>
          <p className="mb-5 text-sm leading-6 text-[#8f8faa]">
            Move the glowing element and watch the side panel react. It adds a small interactive wow-effect around the phone demo.
          </p>

          <div className="relative h-44 rounded-[24px] border border-white/10 bg-black/25">
            <motion.div
              drag
              dragConstraints={{ left: -105, right: 105, top: -55, bottom: 55 }}
              onDrag={(_, info) => setOrb({ x: info.point.x % 250, y: info.point.y % 160 })}
              whileDrag={{ scale: 1.15 }}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 shadow-[0_0_40px_rgba(139,92,246,0.55)]"
            >
              <Sparkles size={24} color="white" />
            </motion.div>

            {[...Array(12)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-purple-300"
                style={{
                  left: `${15 + ((i * 23) % 75)}%`,
                  top: `${18 + ((i * 17) % 65)}%`,
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.8, 1] }}
                transition={{ duration: 2 + i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid gap-3">
          {[
            { icon: <Zap size={18} />, title: "XP system", text: "Earn rewards for completed habits." },
            { icon: <Trophy size={18} />, title: "Achievements", text: "Unlock badges and track milestones." },
            { icon: <BarChart3 size={18} />, title: "Progress stats", text: "Visualize weekly and monthly progress." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
            >
              <div className="mb-2 flex items-center gap-2 text-purple-300">
                {item.icon}
                <span className="text-sm font-semibold text-white">{item.title}</span>
              </div>
              <p className="text-xs leading-5 text-[#8f8faa]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}