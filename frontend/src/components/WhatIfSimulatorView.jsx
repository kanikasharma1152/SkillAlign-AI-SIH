import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  RotateCcw,
  Zap,
  Briefcase,
  Flame,
  Scale
} from 'lucide-react';
import { api } from '../services/api';

export default function WhatIfSimulatorView({ onNavigate, userSkills, defaultSubTab = 'whatif' }) {
  const [activeTab, setActiveTab] = useState(defaultSubTab); // 'whatif', 'roi', 'shock'
  const [selectedRole, setSelectedRole] = useState('ai-engineer');
  const [addedSkill, setAddedSkill] = useState('RAG Architectures');
  const [targetProficiency, setTargetProficiency] = useState(85);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [roiComparisons, setRoiComparisons] = useState([]);
  const [workforceShocks, setWorkforceShocks] = useState([]);
  const [activeShockId, setActiveShockId] = useState('shock-genai');

  const presetSkills = [
    'RAG Architectures',
    'Vector Databases',
    'Agentic AI',
    'Kubernetes',
    'MLOps / Deployment',
    'Cloud Infrastructure'
  ];

  const runSimulation = async (skillToSimulate = addedSkill, prof = targetProficiency) => {
    setIsSimulating(true);
    const result = await api.simulateWhatIf(selectedRole, skillToSimulate, prof, userSkills);
    setTimeout(() => {
      setSimulationResult(result);
      setIsSimulating(false);
    }, 700);
  };

  useEffect(() => {
    runSimulation(addedSkill, targetProficiency);
    const loadExtra = async () => {
      const [rois, shocks] = await Promise.all([
        api.getRoiPriority(selectedRole),
        api.getWorkforceShocks()
      ]);
      if (rois) setRoiComparisons(rois);
      if (shocks) setWorkforceShocks(shocks);
    };
    loadExtra();
  }, [selectedRole]);

  const activeShock = workforceShocks.find(s => s.id === activeShockId) || workforceShocks[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header with Simulation Badges */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>COUNTERFACTUAL & WORKFORCE SCENARIO ENGINE</span>
          <span className="px-2 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
            [SCENARIO SIMULATION]
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              What-If Simulation & Workforce Shock Lab
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Test hypothetical skill acquisitions, compare relative learning ROI priorities, or simulate macro industry shocks.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-cyan-300 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>TOPOLOGY NETWORK SPILLOVER ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-white/10 my-6 font-mono text-xs gap-3">
        {[
          { id: 'whatif', label: '1. WHAT-IF SKILL SIMULATOR', icon: Zap },
          { id: 'roi', label: '2. SKILL ROI / PRIORITY COMPARATOR', icon: Scale },
          { id: 'shock', label: '3. WORKFORCE SHOCK SCENARIOS', icon: Flame }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 transition-all border-b-2 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mode 1: What-If Skill Simulator */}
      {activeTab === 'whatif' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
              <h3 className="text-sm font-mono text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>HYPOTHETICAL ACQUISITION</span>
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Target Career Role:</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="ai-engineer">AI / GenAI Engineer</option>
                  <option value="data-scientist">Data Scientist</option>
                  <option value="mlops-engineer">MLOps / Platform Engineer</option>
                  <option value="cloud-architect">Cloud Solutions Architect</option>
                  <option value="fullstack-ai">Full-Stack AI Developer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400">Select Skill to Inject:</label>
                <div className="grid grid-cols-2 gap-2">
                  {presetSkills.map((sk) => (
                    <button
                      key={sk}
                      onClick={() => {
                        setAddedSkill(sk);
                        runSimulation(sk, targetProficiency);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${
                        addedSkill === sk
                          ? 'bg-blue-600 text-white font-bold border border-cyan-400 shadow-md'
                          : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      + {sk}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Projected Proficiency Target:</span>
                  <span className="text-cyan-400 font-bold">{targetProficiency}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={95}
                  step={5}
                  value={targetProficiency}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setTargetProficiency(val);
                    runSimulation(addedSkill, val);
                  }}
                  className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={() => runSimulation(addedSkill, targetProficiency)}
                disabled={isSimulating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>{isSimulating ? 'SIMULATING TOPOLOGY...' : `RE-SIMULATE + ${addedSkill}`}</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  PROJECTED ROLE ALIGNMENT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SIMULATION CONVERGED
                </span>
              </div>

              <div className="flex items-center justify-between py-6">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Current Baseline</span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-400">
                    {simulationResult?.base_alignment || 72.4}%
                  </div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <span className="text-xs font-mono text-cyan-400 font-bold mb-1">
                    +{simulationResult?.alignment_delta || 12.4}% JUMP
                  </span>
                  <ArrowRight className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-cyan-300 block">Projected Alignment</span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {simulationResult?.projected_alignment || 84.8}%
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/25 text-xs font-mono text-slate-300">
                <strong className="text-cyan-300">Model Verdict: </strong>
                {simulationResult?.market_verdict || `Adding ${addedSkill} directly closes high-weight benchmarks.`}
              </div>

              <p className="text-[10px] font-mono text-slate-500 mt-2">
                * Simulated estimation based on role requirement vectors; does not guarantee employment.
              </p>
            </div>

            {/* Network Spillover */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center space-x-2">
                <Layers className="w-4 h-4 text-violet-400" />
                <span>NETWORK SPILLOVER (SYNERGY BOOSTS)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {simulationResult?.network_spillovers?.map((spill) => (
                  <div key={spill.skill} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-white font-semibold block">{spill.skill}</span>
                      <span className="text-[10px] text-slate-400">{spill.reason}</span>
                    </div>
                    <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                      {spill.boost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Mode 2: Skill ROI / Priority Comparator (Section 22) */}
      {activeTab === 'roi' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center space-x-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>SKILL ACQUISITION PRIORITY & PROJECTED IMPACT MATRIX</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Evaluates learning alternatives by gap reduction velocity, prerequisite effort, and project applicability. (Labeled as Projected Impact, not guaranteed financial ROI).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {roiComparisons.map((item, idx) => (
                <div key={item.option} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 font-mono text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-slate-500 text-[10px]">OPTION {String.fromCharCode(65 + idx)}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/20 text-cyan-300 font-bold">
                        {item.priority_tier}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-2">{item.option}</h4>
                    
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Alignment Jump:</span>
                        <strong className="text-emerald-400">+{item.alignment_delta}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Projected Alignment:</span>
                        <strong className="text-white">{item.projected_alignment}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Learning Effort:</span>
                        <strong className="text-slate-300">~{item.learning_effort_hours} Hours</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Synergy Spillovers:</span>
                        <strong className="text-cyan-300">{item.spillovers_count} Skills</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 font-sans border-t border-white/10 pt-2 leading-relaxed">
                    {item.project_applicability}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Workforce Shock Simulator (Section 23) */}
      {activeTab === 'shock' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 flex items-center space-x-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>WORKFORCE SHOCK SCENARIO SIMULATION</span>
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                STRESS TEST
              </span>
            </div>

            {/* Shock Scenario Selector */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {workforceShocks.map((shock) => (
                <button
                  key={shock.id}
                  onClick={() => setActiveShockId(shock.id)}
                  className={`px-4 py-2 rounded-xl transition-all border ${
                    activeShockId === shock.id
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold'
                      : 'bg-white/[0.02] text-slate-400 hover:text-white border-white/10'
                  }`}
                >
                  {shock.title}
                </button>
              ))}
            </div>

            {/* Active Shock Scenario Details */}
            {activeShock && (
              <div className="space-y-4 font-mono text-xs pt-2">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-sans text-xs">
                  <strong className="text-rose-400 font-mono">SCENARIO: </strong>
                  {activeShock.scenario}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Skill Demand Shifts */}
                  <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-3">
                    <span className="text-slate-400 uppercase text-[10px] block">Simulated Skill Velocity Shifts:</span>
                    <div className="space-y-2">
                      {activeShock.effects?.map((eff) => (
                        <div key={eff.skill} className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                          <span className="text-white font-medium">{eff.skill}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-500">{eff.baseline_demand}</span>
                            <span>→</span>
                            <span className="font-bold text-white">{eff.shock_demand}</span>
                            <span className={`text-[10px] font-bold ${eff.delta.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                              ({eff.delta})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Role Level Impacts */}
                  <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-3">
                    <span className="text-slate-400 uppercase text-[10px] block">Affected Workforce Roles:</span>
                    <div className="space-y-2">
                      {activeShock.affected_roles?.map((r) => (
                        <div key={r.role} className="p-2.5 rounded bg-white/[0.02] space-y-1">
                          <span className="text-white font-bold block">{r.role}</span>
                          <span className="text-rose-300 text-[11px] block">{r.impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 pt-2 border-t border-white/10">
                  * Clearly designated as a Scenario Simulation model; not an absolute real-world guarantee.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
