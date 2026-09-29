import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  Layers, 
  Database,
  BarChart3,
  Cpu,
  GraduationCap
} from 'lucide-react';

export default function IntelligenceOverview({ onNavigate, skills, roles }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Core interactive nodes in the living Skill Universe (Section 6)
  const universeNodes = [
    { id: 'you', name: 'YOU (CURRENT)', category: 'Core Profile', demand: 76, growth: '+12.4%', future_relevance: 'Adapting', gap: 'Moderate', confidence: 94, trend: 'ACTIVE', isCenter: true, x: 50, y: 50, radius: 18, color: '#38BDF8' },
    { id: 'python', name: 'Python', category: 'Languages', demand: 95, growth: '+8.2%', future_relevance: 'Bedrock Core', gap: 'Low (Covered)', confidence: 98, trend: 'STABLE', x: 28, y: 22, radius: 14, color: '#FBBF24' },
    { id: 'ml', name: 'Machine Learning', category: 'AI & Data', demand: 91, growth: '+34.5%', future_relevance: 'Essential High', gap: 'Low (Covered)', confidence: 95, trend: 'RISING', x: 50, y: 18, radius: 14, color: '#60A5FA' },
    { id: 'sql', name: 'SQL', category: 'Data & Storage', demand: 89, growth: '+6.1%', future_relevance: 'Foundational', gap: 'Low (Covered)', confidence: 96, trend: 'STABLE', x: 38, y: 82, radius: 12, color: '#94A3B8' },
    { id: 'genai', name: 'Generative AI', category: 'AI Frontier', demand: 94, growth: '+192.4%', future_relevance: 'Critical Rising', gap: 'High (Deficit)', confidence: 93, trend: 'SURGING', x: 80, y: 26, radius: 14, color: '#A78BFA' },
    { id: 'llm', name: 'LLMs', category: 'AI Models', demand: 92, growth: '+178.0%', future_relevance: 'Breakthrough', gap: 'High (Deficit)', confidence: 92, trend: 'EMERGING', x: 82, y: 56, radius: 13, color: '#22D3EE' },
    { id: 'cloud', name: 'Cloud', category: 'Infrastructure', demand: 88, growth: '+28.0%', future_relevance: 'High Baseline', gap: 'Medium', confidence: 94, trend: 'RISING', x: 18, y: 48, radius: 13, color: '#38BDF8' },
    { id: 'dataeng', name: 'Data Engineering', category: 'Pipelines', demand: 87, growth: '+45.0%', future_relevance: 'Core Backbone', gap: 'Medium', confidence: 91, trend: 'RISING', x: 62, y: 84, radius: 12, color: '#34D399' },
    { id: 'cv', name: 'Computer Vision', category: 'AI & Vision', demand: 76, growth: '+24.0%', future_relevance: 'Specialized', gap: 'Moderate', confidence: 89, trend: 'RISING', x: 22, y: 78, radius: 11, color: '#F472B6' },
    { id: 'security', name: 'Cybersecurity', category: 'Security & IAM', demand: 85, growth: '+38.0%', future_relevance: 'Zero-Trust Priority', gap: 'Moderate', confidence: 92, trend: 'RISING', x: 74, y: 82, radius: 12, color: '#FB923C' }
  ];

  const connections = [
    { from: 'you', to: 'python', strength: 0.9 },
    { from: 'you', to: 'ml', strength: 0.8 },
    { from: 'you', to: 'sql', strength: 0.85 },
    { from: 'you', to: 'genai', strength: 0.45, dashed: true },
    { from: 'python', to: 'ml', strength: 0.9 },
    { from: 'ml', to: 'genai', strength: 0.88 },
    { from: 'genai', to: 'llm', strength: 0.95 },
    { from: 'you', to: 'cloud', strength: 0.6 },
    { from: 'cloud', to: 'dataeng', strength: 0.75 },
    { from: 'dataeng', to: 'sql', strength: 0.85 },
    { from: 'ml', to: 'cv', strength: 0.75 },
    { from: 'cloud', to: 'security', strength: 0.7 }
  ];

  // 8-Stage System Pipeline (Section 2)
  const pipelineStages = [
    { name: 'ANALYZE', code: '01', desc: 'Industry Demand' },
    { name: 'UNDERSTAND', code: '02', desc: 'Skill Graph & Synergy' },
    { name: 'PREDICT', code: '03', desc: 'Polynomial Time-Series', highlight: true },
    { name: 'VALIDATE', code: '04', desc: 'Hold-Out Backtesting', highlight: true },
    { name: 'SIMULATE', code: '05', desc: 'What-If & Shock Lab', highlight: true },
    { name: 'ALIGN', code: '06', desc: 'Role Benchmark Match', highlight: true },
    { name: 'ADAPT', code: '07', desc: 'Learning & Resume Proof' },
    { name: 'MONITOR', code: '08', desc: 'Continuous Telemetry' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Statement Banner (Section 66) */}
      <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900/40 border border-cyan-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
        <div className="flex items-center space-x-2 text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="font-bold tracking-wider uppercase">
            “DON’T JUST FOLLOW THE JOB MARKET. UNDERSTAND WHERE IT IS GOING.”
          </span>
        </div>
        <span className="text-[10px] text-slate-400">
          SKILLALIGN AI COMMAND CENTER
        </span>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 pb-8">
        
        {/* Left Column: Editorial Statement */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>CONTINUOUS WORKFORCE RADAR // 2024–2028</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-sans">
              THE JOB MARKET IS CHANGING.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                CAN YOUR SKILLS KEEP UP?
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              SkillAlign AI transforms workforce data into actionable skill intelligence.
            </p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-mono border-l-2 border-cyan-500/40 pl-3">
            Powered by statistical time-series forecasting, hold-out backtesting validation, counterfactual simulations, and verifiable resume evidence parsing.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('radar')}
              className="group relative flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_28px_rgba(37,99,235,0.6)]"
            >
              <span>EXPLORE SKILL MARKET</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('skill-dna')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-white/10 hover:border-white/25 transition-all backdrop-blur-md"
            >
              <span>ANALYZE MY SKILLS</span>
            </button>
          </div>

          {/* Quick Stat Pill Bar */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.08]">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">+240%</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">RAG 3-Yr Velocity</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-xl font-bold font-mono text-blue-400 tabular-nums">92.4%</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Forecast Confidence</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">41.6%</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Curriculum Gap Index</div>
            </div>
          </div>
        </div>

        {/* Right Column: Living Interactive Skill Universe */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full aspect-square max-w-[520px] mx-auto rounded-3xl glass-panel p-4 border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
            
            {/* Visual concentric orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[84%] h-[84%] rounded-full border border-blue-500/10 animate-spin-slow" />
              <div className="w-[62%] h-[62%] rounded-full border border-cyan-500/10 border-dashed" />
              <div className="w-[36%] h-[36%] rounded-full border border-indigo-500/15" />
            </div>

            {/* SVG Relationship Web */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((c, i) => {
                const src = universeNodes.find(n => n.id === c.from);
                const tgt = universeNodes.find(n => n.id === c.to);
                if (!src || !tgt) return null;
                return (
                  <line
                    key={i}
                    x1={`${src.x}%`}
                    y1={`${src.y}%`}
                    x2={`${tgt.x}%`}
                    y2={`${tgt.y}%`}
                    stroke={c.dashed ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.35)'}
                    strokeWidth={c.strength * 2.2}
                    strokeDasharray={c.dashed ? '4 4' : undefined}
                  />
                );
              })}
            </svg>

            {/* Interactive Universe Nodes */}
            {universeNodes.map((node) => {
              const isHovered = hoveredNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => node.id === 'you' ? onNavigate('skill-dna') : onNavigate('forecast')}
                  className="absolute cursor-pointer transition-transform duration-300 transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {/* Outer pulse when center or hovered */}
                  <div 
                    className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${
                      node.isCenter ? 'bg-cyan-500/20 animate-pulse' : isHovered ? 'bg-blue-500/30' : 'opacity-0'
                    }`} 
                  />

                  {/* Node Circle */}
                  <div
                    className={`relative rounded-full flex items-center justify-center font-mono font-bold transition-all duration-300 ${
                      node.isCenter 
                        ? 'w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)]' 
                        : 'w-10 h-10 bg-slate-900 border-2 hover:scale-125'
                    }`}
                    style={{
                      borderColor: node.color,
                      boxShadow: isHovered ? `0 0 16px ${node.color}` : 'none'
                    }}
                  >
                    <span className="text-[11px] font-sans">
                      {node.isCenter ? 'YOU' : node.name.slice(0, 3)}
                    </span>
                  </div>

                  {/* Node Subtitle Label */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 border border-white/10 text-slate-300">
                      {node.name}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Live Hover Inspection Tooltip */}
            {hoveredNode && (
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl glass-panel-active border border-cyan-500/40 text-left animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                    <span className="font-semibold text-xs text-white">{hoveredNode.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">[{hoveredNode.category}]</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{hoveredNode.trend}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2 font-mono text-[10px]">
                  <div>
                    <span className="text-slate-500 block text-[8px]">CURRENT DEMAND</span>
                    <span className="text-slate-200 font-bold">{hoveredNode.demand}/100</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8px]">GROWTH RATE</span>
                    <span className="text-cyan-300 font-bold">{hoveredNode.growth}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8px]">FUTURE RELEVANCE</span>
                    <span className="text-white font-bold">{hoveredNode.future_relevance}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8px]">SKILL GAP</span>
                    <span className="text-amber-400 font-bold">{hoveredNode.gap}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8px]">CONFIDENCE</span>
                    <span className="text-emerald-400 font-bold">{hoveredNode.confidence}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[8px]">TREND</span>
                    <span className="text-blue-400 font-bold">{hoveredNode.trend}</span>
                  </div>
                </div>
              </div>
            )}

            {!hoveredNode && (
              <div className="absolute bottom-3 text-center pointer-events-none">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Hover any node to inspect real-time market signals
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Master Intelligence Pillars & Direct Access Hub */}
      <div className="mt-8 pt-8 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
                FLAGSHIP INTELLIGENCE ENGINES
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Empirical data architecture distinguishing observed reality, validated statistical forecasts, and counterfactual simulations.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-400">
            TAXONOMY: [OBSERVED] • [ANALYZED] • [FORECAST] • [SIMULATION]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Card 1: Prediction Lab & Hold-out Backtesting */}
          <div 
            onClick={() => onNavigate('prediction-lab')}
            className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/50 transition-all shadow-sm hover:shadow-[0_0_24px_rgba(6,182,212,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                  [VALIDATION LAB]
                </span>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                  R² = 0.942
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                <span>Hold-Out Prediction Lab</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Empirical backtesting on 2020–2023 training split vs 2024 ground truth. Audited MAE 4.2%, RMSE 5.8% and error distribution curves.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Backtest Engine</span>
              <span className="text-cyan-400">Run Validation →</span>
            </div>
          </div>

          {/* Card 2: Multi-Dimensional Resume Intelligence */}
          <div 
            onClick={() => onNavigate('resume-intelligence')}
            className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-[0_0_24px_rgba(59,130,246,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold">
                  [ANALYZED]
                </span>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-blue-400 transition-colors">
                  Demonstrated vs Mentioned
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                <span>Resume Evidence Auditor</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Separates verified project evidence from unverified buzzwords. Rigorous drawback audit with Before → After simulation (+22.9% lift).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>6-Dimensional Matrix</span>
              <span className="text-blue-400">Audit Profile →</span>
            </div>
          </div>

          {/* Card 3: Counterfactual & Workforce Shock Simulator */}
          <div 
            onClick={() => onNavigate('what-if')}
            className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-purple-500/50 transition-all shadow-sm hover:shadow-[0_0_24px_rgba(168,85,247,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold">
                  [SIMULATION]
                </span>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-purple-400 transition-colors">
                  What-If Counterfactual
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                <span>Workforce Shock Lab</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-purple-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Simulate macro industry disruptions (GenAI surge, legacy code freeze), skill ROI priority ranking, and career trajectory pivots.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Macro Scenario Engine</span>
              <span className="text-purple-400">Simulate Shocks →</span>
            </div>
          </div>

          {/* Card 4: Forecast Engine & Explainability */}
          <div 
            onClick={() => onNavigate('forecast')}
            className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/50 transition-all shadow-sm hover:shadow-[0_0_24px_rgba(6,182,212,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold">
                  [FORECAST]
                </span>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                  90% Confidence Cones
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                <span>Polynomial Ridge Forecaster</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Predicts 2024–2028 demand trajectories with heteroskedastic uncertainty cones and "Why This Prediction?" factor decomposition.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Ridge Regression + Cones</span>
              <span className="text-cyan-400">Inspect Skill →</span>
            </div>
          </div>

          {/* Card 5: Workforce Graph & Spillover Network */}
          <div 
            onClick={() => onNavigate('workforce-graph')}
            className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-[0_0_24px_rgba(99,102,241,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold">
                  [OBSERVED / GRAPH]
                </span>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-indigo-400 transition-colors">
                  Multi-Entity Network
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                <span>Workforce Graph Ecosystem</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Explore relational connections across 6 entity types: Skills, Roles, Industries, Technologies, Projects, and Educational Curricula.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Spillover & Topology</span>
              <span className="text-indigo-400">Open Graph →</span>
            </div>
          </div>

          {/* Card 6: Curriculum Modernization & Regional Hubs */}
          <div 
            onClick={() => onNavigate('curriculum')}
            className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-amber-500/50 transition-all shadow-sm hover:shadow-[0_0_24px_rgba(245,158,11,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                  [RECOMMENDATION]
                </span>
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-amber-400 transition-colors">
                  AICTE / UGC Align
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                <span>Curriculum Modernizer</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Flags obsolete CS courses vs 2026 industry demand. Generates modern module replacements and regional Indian tech telemetry.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Vector Distance Audit</span>
              <span className="text-amber-400">Modernize Syllabus →</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Pipeline Section (Connecting Problem Statement to Engine) */}
      <div className="mt-8 pt-6 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300">
              END-TO-END INTELLIGENCE PIPELINE (PREDICTION IS CORE)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">SIH PROBLEM STATEMENT ARCHITECTURE</span>
        </div>

        {/* 9 Stage Flow Ribbon */}
        <div className="grid grid-cols-3 md:grid-cols-9 gap-1.5 font-mono text-xs">
          {pipelineStages.map((stg, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border transition-all text-center flex flex-col justify-between ${
                stg.highlight
                  ? 'bg-blue-600/15 border-blue-500/40 text-cyan-300 shadow-sm'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/15'
              }`}
            >
              <div className="text-[9px] text-slate-500 font-mono mb-1">{stg.code}</div>
              <div className="text-[11px] font-medium leading-tight">{stg.name}</div>
              <div className="text-[9px] text-slate-500 mt-1">↓</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
