import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Globe, 
  Users, 
  ArrowUpRight, 
  AlertCircle,
  Building,
  Layers,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function IndustryDashboardView({ onNavigate }) {
  const [selectedCity, setSelectedCity] = useState('Bengaluru');
  const [regionalData, setRegionalData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await api.getRegional();
      if (data) setRegionalData(data);
    };
    load();
  }, []);

  const macroStats = [
    { label: 'GENAI TALENT DEFICIT', value: '-68%', status: 'ACUTE SHORTAGE', color: 'text-rose-400' },
    { label: 'MEDIAN POSTING DURATION', value: '46 Days', status: 'SLOW FILL RATE', color: 'text-amber-400' },
    { label: 'EMERGING CROSS-TRAIN DEMAND', value: '+142%', status: 'EXPONENTIAL', color: 'text-emerald-400' },
    { label: 'LEGACY DEPRECATION VELOCITY', value: '-38%', status: 'SUNSETTING', color: 'text-blue-400' }
  ];

  const activeRegion = regionalData.find(r => r.city === selectedCity) || regionalData[0];

  const enterpriseSkillMatrix = [
    { role: 'AI Platform Architect', demandIndex: 96, talentSupply: 24, ratio: '4.0x Deficit', priority: 'CRITICAL' },
    { role: 'LLM Systems & RAG Engineer', demandIndex: 94, talentSupply: 31, ratio: '3.0x Deficit', priority: 'CRITICAL' },
    { role: 'MLOps Automation Engineer', demandIndex: 89, talentSupply: 42, ratio: '2.1x Deficit', priority: 'HIGH' },
    { role: 'Cloud Infrastructure Engineer', demandIndex: 86, talentSupply: 68, ratio: '1.2x Balanced', priority: 'MODERATE' },
    { role: 'Enterprise Data Analyst', demandIndex: 78, talentSupply: 85, ratio: 'Surplus', priority: 'LOW' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header with Regional Hierarchy Badges */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          <span>ENTERPRISE TALENT INTELLIGENCE // REGIONAL WORKFORCE MAP</span>
          <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
            [OBSERVED GEOGRAPHIC TELEMETRY]
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Industry Observatory & Regional Skill Intelligence
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Geographic workforce breakdown across India's technology hubs: Bengaluru, Hyderabad, Pune, Delhi NCR, and Indore.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono px-3.5 py-1.5 rounded-xl glass-panel border border-white/10">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300">Data Period: 2024–2026 Q3 • 1.4M+ Records</span>
          </div>
        </div>
      </div>

      {/* Macro Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 font-mono">
        {macroStats.map((st) => (
          <div key={st.label} className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
            <span className="text-[10px] text-slate-400 block">{st.label}</span>
            <div className={`text-3xl font-extrabold ${st.color} tabular-nums`}>
              {st.value}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              STATUS: <strong className="text-slate-200">{st.status}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Section 24: Regional Geographic Intelligence Hubs */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 my-8 space-y-4 font-mono text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <span className="font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>REGIONAL WORKFORCE TELEMETRY (INDIA HUBS)</span>
          </span>
          <span className="text-slate-400 text-[10px]">HIERARCHY: INDIA ➔ STATE ➔ CITY ➔ SKILLS</span>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {regionalData.map((reg) => (
            <button
              key={reg.city}
              onClick={() => setSelectedCity(reg.city)}
              className={`px-3.5 py-2 rounded-xl transition-all border ${
                selectedCity === reg.city
                  ? 'bg-blue-600 text-white border-cyan-400 font-bold shadow-md'
                  : 'bg-white/[0.02] text-slate-400 hover:text-white border-white/10'
              }`}
            >
              {reg.city} ({reg.state})
            </button>
          ))}
        </div>

        {/* Selected Hub Details Card */}
        {activeRegion && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 pt-4">
            <div>
              <span className="text-[10px] text-slate-500 block">HIRING ACTIVITY INDEX</span>
              <span className="text-2xl font-bold text-cyan-400 tabular-nums">{activeRegion.hiring_index} / 100</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">{activeRegion.shortage_tier}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">ACTIVE JOB OPENINGS</span>
              <span className="text-2xl font-bold text-white tabular-nums">{activeRegion.open_positions}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">{activeRegion.data_points} Analyzed Records</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">MEDIAN TECH COMPENSATION</span>
              <span className="text-2xl font-bold text-emerald-400 tabular-nums">{activeRegion.median_salary}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">Top-Quartile AI Engineers</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">PRIMARY SCARCITY SKILLS</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeRegion.top_demanded_skills?.map((s) => (
                  <span key={s} className="px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[10px] font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enterprise Role Scarcity Table */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
          <span className="font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>ROLE-LEVEL TALENT SCARCITY EQUILIBRIUM</span>
          </span>
          <span className="text-slate-400">DEMAND VS AVAILABILITY</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {enterpriseSkillMatrix.map((m) => (
            <div key={m.role} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">{m.role}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                    m.priority === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : m.priority === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {m.ratio}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Industry Demand Index: {m.demandIndex}</span>
                  <span>Talent Pool Availability: {m.talentSupply}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 flex overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${m.demandIndex}%` }} />
                  <div className="h-full bg-slate-600 opacity-50" style={{ width: `${m.talentSupply}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
