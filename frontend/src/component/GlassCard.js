import React from "react";

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`glass-glow bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
