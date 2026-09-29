import React, { useState, useEffect, useMemo } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  RotateCcw, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Info,
  Layers,
  ArrowUpRight,
  Flame,
  Globe
} from 'lucide-react';
import { api } from '../services/api';

export default function MarketRadarView({ onNavigate, skills }) {
  const [viewMode, setViewMode] = useState('radar'); // 'radar', 'heatmap'
  const [timelineYear, setTimelineYear] = useState(2025);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [activeNode, setActiveNode] = useState(null);
  const [regionalList, setRegionalList] = useState([]);

  useEffect(() => {
    const loadReg = async () => {
      const reg = await api.getRegional();
      if (reg) setRegionalList(reg);
    };
    loadReg();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineYear((prev) => {
          if (prev >= 2028) return 2024;
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const rawSkills = [
    {
      id: 'genai',
      name: 'GenAI / LLMs',
      category: 'AI & ML',
      role: 'ai-engineer',
      base: { x: 74, y: 28 },
      target: { x: 88, y: 15 },
      demand_by_year: { 2024: 82, 2025: 92, 2026: 96, 2027: 98, 2028: 99 },
      status: 'HIGH DEMAND'
    },
    {
      id: 'rag',
      name: 'RAG Architectures',
      category: 'AI & ML',
      role: 'ai-engineer',
      base: { x: 62, y: 55 },
      target: { x: 84, y: 22 },
      demand_by_year: { 2024: 62, 2025: 78, 2026: 88, 2027: 93, 2028: 96 },
      status: 'EMERGING'
    },
    {
      id: 'agentic',
      name: 'Agentic AI',
      category: 'AI & ML',
      role: 'ai-engineer',
      base: { x: 45, y: 68 },
      target: { x: 86, y: 32 },
      demand_by_year: { 2024: 44, 2025: 68, 2026: 84, 2027: 92, 2028: 96 },
      status: 'EMERGING'
    },
    {
      id: 'vector',
      name: 'Vector Databases',
      category: 'Data',
      role: 'ai-engineer',
      base: { x: 55, y: 58 },
      target: { x: 78, y: 36 },
      demand_by_year: { 2024: 58, 2025: 74, 2026: 85, 2027: 90, 2028: 92 },
      status: 'EMERGING'
    },
    {
      id: 'python',
      name: 'Python Ecosystem',
      category: 'Languages',
      role: 'data-scientist',
      base: { x: 52, y: 32 },
      target: { x: 54, y: 28 },
      demand_by_year: { 2024: 92, 2025: 94, 2026: 96, 2027: 97, 2028: 98 },
      status: 'STABLE'
    },
    {
      id: 'mlops',
      name: 'MLOps / Deployment',
      category: 'DevOps',
      role: 'mlops-engineer',
      base: { x: 60, y: 40 },
      target: { x: 76, y: 24 },
      demand_by_year: { 2024: 72, 2025: 81, 2026: 89, 2027: 93, 2028: 95 },
      status: 'HIGH DEMAND'
    },
    {
      id: 'k8s',
      name: 'Kubernetes',
      category: 'DevOps',
      role: 'cloud-architect',
      base: { x: 42, y: 44 },
      target: { x: 48, y: 38 },
      demand_by_year: { 2024: 78, 2025: 82, 2026: 86, 2027: 89, 2028: 91 },
      status: 'HIGH DEMAND'
    },
    {
      id: 'cloud',
      name: 'Cloud Infrastructure',
      category: 'DevOps',
      role: 'cloud-architect',
      base: { x: 50, y: 36 },
      target: { x: 58, y: 32 },
      demand_by_year: { 2024: 83, 2025: 86, 2026: 89, 2027: 91, 2028: 93 },
      status: 'HIGH DEMAND'
    },
    {
      id: 'sql',
      name: 'SQL / Modeling',
      category: 'Data',
      role: 'data-scientist',
      base: { x: 38, y: 48 },
      target: { x: 38, y: 50 },
      demand_by_year: { 2024: 88, 2025: 89, 2026: 90, 2027: 90, 2028: 90 },
      status: 'STABLE'
    },
    {
      id: 'hadoop',
      name: 'Legacy Hadoop',
      category: 'Data',
      role: 'data-scientist',
      base: { x: 26, y: 68 },
      target: { x: 12, y: 88 },
      demand_by_year: { 2024: 40, 2025: 32, 2026: 24, 2027: 16, 2028: 11 },
      status: 'DECLINING'
    }
  ];

  const interpolatedSkills = useMemo(() => {
    const fraction = (timelineYear - 2024) / 4.0;
    return rawSkills
      .filter((s) => {
        if (selectedRole !== 'all' && s.role !== selectedRole) return false;
        return true;
      })
      .map((s) => {
        const curX = s.base.x + (s.target.x - s.base.x) * fraction;
        const curY = s.base.y + (s.target.y - s.base.y) * fraction;
        const currentDemand = s.demand_by_year[timelineYear] || 50;

        let dynStatus = s.status;
        if (currentDemand > 90) dynStatus = 'HIGH DEMAND';
        else if (currentDemand < 30) dynStatus = 'DECLINING';
        else if (s.target.x - s.base.x > 15) dynStatus = 'EMERGING';

        return {
          ...s,
          x: curX,
          y: curY,
          currentDemand,
          dynStatus
        };
      });
  }, [timelineYear, selectedRole]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title & Timeline Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>MACRO WORKFORCE RADAR // TEMPORAL SIMULATION</span>
            <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
              [OBSERVED & SIMULATED]
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Market Radar & Temporal Demand Heatmap
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Move the timeline from 2024 to 2028 to observe spatial displacement of emerging versus sunsetting skills.
          </p>
        </div>

        {/* Timeline Scrubber */}
        <div className="flex items-center space-x-4 glass-panel p-2 rounded-2xl border border-white/10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center text-xs font-mono px-1">
              <span className="text-slate-400">HORIZON YEAR:</span>
              <span className="text-cyan-400 font-bold text-sm tabular-nums">{timelineYear}</span>
            </div>
            <input
              type="range"
              min={2024}
              max={2028}
              step={1}
              value={timelineYear}
              onChange={(e) => {
                setTimelineYear(parseInt(e.target.value));
                setIsPlaying(false);
              }}
              className="w-44 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 px-0.5">
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
              <span>2027</span>
              <span>2028</span>
            </div>
          </div>

          <button
            onClick={() => { setTimelineYear(2025); setIsPlaying(false); }}
            className="p-2 text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Toggle & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => setViewMode('radar')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              viewMode === 'radar' ? 'bg-blue-600 text-white border-blue-400 font-bold' : 'bg-white/[0.02] text-slate-400 border-white/10'
            }`}
          >
            RADAR VIEW
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
              viewMode === 'heatmap' ? 'bg-blue-600 text-white border-blue-400 font-bold' : 'bg-white/[0.02] text-slate-400 border-white/10'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>DEMAND HEATMAP</span>
          </button>
        </div>

        {/* Regional Filter Dropdown */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-500">REGION:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
          >
            <option value="global">Global Normalized Benchmark</option>
            {regionalList.map(r => (
              <option key={r.city} value={r.city}>{r.city} ({r.shortage_tier})</option>
            ))}
          </select>
        </div>
      </div>

      {/* View Mode 1: Concentric Radar Screen */}
      {viewMode === 'radar' && (
        <div className="relative aspect-[16/9] max-h-[580px] w-full rounded-3xl glass-panel border border-white/10 p-6 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[30%] h-[50%] rounded-full border border-cyan-500/20 bg-cyan-500/[0.02] flex items-start justify-center pt-2">
              <span className="text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest">HIGH DEMAND CORE</span>
            </div>
            <div className="w-[60%] h-[78%] rounded-full border border-blue-500/15 border-dashed flex items-start justify-center pt-2">
              <span className="text-[9px] font-mono text-blue-400/50 uppercase tracking-widest">EMERGING & STABLE</span>
            </div>
            <div className="w-[90%] h-[95%] rounded-full border border-white/[0.05] flex items-end justify-center pb-2">
              <span className="text-[9px] font-mono text-rose-400/50 uppercase tracking-widest">DECLINING PERIMETER</span>
            </div>
          </div>

          {interpolatedSkills.map((skill) => {
            const isHovered = activeNode?.id === skill.id;
            const isHigh = skill.dynStatus === 'HIGH DEMAND';
            const isEmerging = skill.dynStatus === 'EMERGING';
            const isDeclining = skill.dynStatus === 'DECLINING';

            return (
              <div
                key={skill.id}
                onClick={() => onNavigate('forecast')}
                onMouseEnter={() => setActiveNode(skill)}
                onMouseLeave={() => setActiveNode(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 ease-out group"
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  zIndex: isHovered ? 40 : 20
                }}
              >
                <div
                  className={`relative px-2.5 py-1 rounded-full flex items-center space-x-1.5 border font-mono text-xs shadow-lg transition-transform duration-300 ${
                    isHigh
                      ? 'bg-blue-950/90 border-cyan-400 text-cyan-200 hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : isEmerging
                      ? 'bg-violet-950/90 border-violet-400 text-violet-200 hover:scale-110 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                      : isDeclining
                      ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 hover:scale-105'
                      : 'bg-slate-900 border-white/20 text-slate-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isHigh ? 'bg-cyan-400' : isEmerging ? 'bg-violet-400' : isDeclining ? 'bg-rose-400' : 'bg-slate-400'
                  }`} />
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">[{skill.currentDemand}]</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Mode 2: Skill Demand Heatmap (Section 11) */}
      {viewMode === 'heatmap' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase tracking-wider">TIME-SERIES SKILL DEMAND HEATMAP (2024 - 2028)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                [DEMO DATA]
              </span>
            </div>
            <span className="text-slate-400">ACTIVE SCRUBBER: YEAR {timelineYear}</span>
          </div>

          <div className="space-y-3 pt-2">
            {rawSkills.map((sk) => (
              <div key={sk.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-1/4">
                  <strong className="text-white block text-sm">{sk.name}</strong>
                  <span className="text-[10px] text-slate-500 uppercase">{sk.category}</span>
                </div>

                <div className="w-3/4 grid grid-cols-5 gap-2 text-center">
                  {[2024, 2025, 2026, 2027, 2028].map((yr) => {
                    const demand = sk.demand_by_year[yr];
                    const isSelectedYear = yr === timelineYear;
                    return (
                      <div
                        key={yr}
                        className={`p-2.5 rounded-lg border transition-all ${
                          isSelectedYear ? 'ring-2 ring-cyan-400 scale-105' : ''
                        }`}
                        style={{
                          backgroundColor: demand > 85 ? 'rgba(6, 182, 212, 0.28)' : demand > 65 ? 'rgba(59, 130, 246, 0.22)' : demand > 40 ? 'rgba(139, 92, 246, 0.18)' : 'rgba(244, 63, 94, 0.22)',
                          borderColor: demand > 85 ? 'rgba(6, 182, 212, 0.5)' : demand > 65 ? 'rgba(59, 130, 246, 0.4)' : demand > 40 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(244, 63, 94, 0.4)'
                        }}
                      >
                        <span className="text-[10px] text-slate-400 block">{yr}</span>
                        <strong className="text-white text-xs">{demand} index</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
