import React, { useState, useEffect } from 'react';
import { 
  GitCompare, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Sliders,
  DollarSign,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function SkillGapView({ onNavigate, userSkills }) {
  const [selectedRoleId, setSelectedRoleId] = useState('ai-engineer');
  const [roles, setRoles] = useState([]);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'critical', 'emerging', 'quick', 'strengths'

  useEffect(() => {
    const loadRoles = async () => {
      const data = await api.getRoles();
      setRoles(data);
    };
    loadRoles();
  }, []);

  useEffect(() => {
    const compute = async () => {
      const result = await api.calculateSkillGap(selectedRoleId, userSkills);
      setGapAnalysis(result);
    };
    compute();
  }, [selectedRoleId, userSkills]);

  const displayedSkills = (gapAnalysis?.skill_breakdown || []).filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'critical') return item.severity === 'CRITICAL GAP';
    if (activeFilter === 'emerging') return item.severity === 'EMERGING GAP';
    if (activeFilter === 'quick') return item.severity === 'QUICK WIN';
    if (activeFilter === 'strengths') return item.severity === 'EXISTING STRENGTH';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header with Badges */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <GitCompare className="w-4 h-4 text-cyan-400" />
          <span>TRIAGE SKILL GAP CLASSIFICATION // SECTION 20</span>
          <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
            [ANALYZED DECOMPOSITION]
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Skill Gap & Alignment Intelligence
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              5-Tier gap taxonomy classifying Critical Gaps, Emerging Gaps, Moderate Gaps, Quick Wins, and Existing Strengths.
            </p>
          </div>

          {gapAnalysis && (
            <div className="flex items-center space-x-3 glass-panel px-4 py-2 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">CURRENT ROLE ALIGNMENT</span>
                <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                  {gapAnalysis.alignment_percentage}%
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400/40 flex items-center justify-center font-mono text-xs font-bold text-white bg-blue-600/10">
                {gapAnalysis.alignment_percentage > 75 ? 'HIGH' : 'MED'}
              </div>
            </div>
          )}
        </div>

        {/* Target Role Selector Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoleId(r.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 ${
                selectedRoleId === r.id
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400 font-bold'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{r.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5-Tier Filter Tabs */}
      <div className="flex flex-wrap gap-2 my-6 font-mono text-xs">
        {[
          { id: 'all', label: 'ALL SKILLS' },
          { id: 'critical', label: `CRITICAL GAPS (${gapAnalysis?.critical_gaps?.length || 0})`, color: 'text-rose-400' },
          { id: 'emerging', label: `EMERGING GAPS (${gapAnalysis?.emerging_gaps?.length || 0})`, color: 'text-violet-400' },
          { id: 'quick', label: `QUICK WINS (${gapAnalysis?.quick_wins?.length || 0})`, color: 'text-cyan-400' },
          { id: 'strengths', label: `EXISTING STRENGTHS (${gapAnalysis?.existing_strengths?.length || 0})`, color: 'text-emerald-400' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeFilter === f.id
                ? 'bg-white/10 text-white border-white/30 font-bold'
                : 'bg-white/[0.02] text-slate-400 border-white/5'
            }`}
          >
            <span className={f.color}>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Comparison Bars & Action Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Animated Comparison Bars */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
            <span className="text-slate-400">SKILL COMPONENT</span>
            <div className="flex items-center space-x-6 text-[11px]">
              <span className="text-blue-400 flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                <span>Your Score</span>
              </span>
              <span className="text-slate-300 flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 border border-white/30 inline-block" />
                <span>Benchmark</span>
              </span>
              <span className="text-rose-400 flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/30 border border-rose-500 inline-block" />
                <span>Deficit Gap</span>
              </span>
            </div>
          </div>

          <div className="space-y-5 mt-6">
            {displayedSkills.map((item) => {
              const userPct = item.user_score;
              const benchPct = item.benchmark;
              const hasDeficit = item.gap > 0;
              const isCritical = item.severity === 'CRITICAL GAP';
              const isEmerging = item.severity === 'EMERGING GAP';
              const isQuick = item.severity === 'QUICK WIN';
              const isStrength = item.severity === 'EXISTING STRENGTH';

              return (
                <div key={item.skill} className="space-y-1.5 group">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-semibold text-slate-200 flex items-center space-x-2">
                      <span>{item.skill}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        isCritical ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        isEmerging ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' :
                        isQuick ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {item.severity}
                      </span>
                    </span>
                    <div className="flex items-center space-x-3 text-[11px]">
                      <span className="text-blue-400">{userPct}%</span>
                      <span className="text-slate-500">/</span>
                      <span className="text-slate-300">{benchPct}%</span>
                      {hasDeficit ? (
                        <span className="text-rose-400 font-bold tabular-nums">-{item.gap}%</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✓ Met</span>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full h-3.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex items-center">
                    <div
                      className="h-full rounded-l-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-700 relative z-10"
                      style={{ width: `${userPct}%` }}
                    />
                    {hasDeficit && (
                      <div
                        className={`h-full transition-all duration-700 ${
                          isCritical ? 'bg-rose-500/40 animate-pulse' : 'bg-amber-500/25'
                        }`}
                        style={{ width: `${item.gap}%`, left: `${userPct}%` }}
                      />
                    )}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_#fff] z-20"
                      style={{ left: `${benchPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>* Evaluated against real-time industry requirement vectors.</span>
            <button
              onClick={() => onNavigate('what-if')}
              className="text-cyan-400 hover:text-cyan-300 underline flex items-center space-x-1"
            >
              <span>Simulate Closing Gaps in What-If Simulator →</span>
            </button>
          </div>
        </div>

        {/* Right Column: Context Cards */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
            <span className="text-slate-400 uppercase text-[10px]">MARKET ROLE CONTEXT</span>
            <div className="flex justify-between">
              <span className="text-slate-400">Median Compensation:</span>
              <span className="text-white font-bold">{gapAnalysis?.median_salary_range}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Industry Demand Tier:</span>
              <span className="text-cyan-400 font-bold">{gapAnalysis?.demand_tier}</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
            <span className="text-rose-400 uppercase text-[10px] font-bold">CRITICAL DEFICIT SUMMARY</span>
            <p className="text-slate-300 leading-relaxed font-sans text-xs">
              RAG Architectures and Vector Databases represent 65%+ of your current deficit for {gapAnalysis?.role_name}. Mastering them elevates your profile to top candidate tiers.
            </p>
            <button
              onClick={() => onNavigate('what-if')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono text-xs font-bold transition-all shadow-md"
            >
              Simulate Adding RAG (+12.4% Jump)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
