import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  FileQuestion
} from 'lucide-react';
import { api } from '../services/api';

export default function ForecastEngineView({ onNavigate, preselectedSkillId = 'rag' }) {
  const [selectedSkillId, setSelectedSkillId] = useState(preselectedSkillId);
  const [forecastData, setForecastData] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runStage, setRunStage] = useState(0);
  const [isChartDrawn, setIsChartDrawn] = useState(false);

  const availableSkills = [
    { id: 'genai', name: 'GenAI / LLMs' },
    { id: 'rag', name: 'RAG Architectures' },
    { id: 'agentic-ai', name: 'Agentic AI' },
    { id: 'vector-db', name: 'Vector Databases' },
    { id: 'mlops', name: 'MLOps / Deployment' },
    { id: 'python', name: 'Python Ecosystem' },
    { id: 'legacy-hadoop', name: 'Legacy Hadoop / MapReduce' }
  ];

  const stages = [
    { label: 'COLLECTING MARKET SIGNALS', desc: 'Ingesting job postings & GitHub commit velocities' },
    { label: 'DETECTING TRENDS', desc: 'Computing 1st & 2nd order demand acceleration' },
    { label: 'RUNNING FORECAST MODEL', desc: 'Fitting Polynomial Ridge time-series regression' },
    { label: 'CALCULATING CONFIDENCE', desc: 'Deriving heteroskedastic variance & uncertainty cone' }
  ];

  useEffect(() => {
    const load = async () => {
      const data = await api.getForecast(selectedSkillId);
      setForecastData(data);
      setIsChartDrawn(true);
    };
    load();
  }, [selectedSkillId]);

  const handleRunForecast = () => {
    setIsRunning(true);
    setIsChartDrawn(false);
    setRunStage(1);

    setTimeout(() => setRunStage(2), 450);
    setTimeout(() => setRunStage(3), 900);
    setTimeout(() => setRunStage(4), 1350);
    setTimeout(() => {
      setRunStage(5);
      setIsRunning(false);
      setIsChartDrawn(true);
    }, 1800);
  };

  const historical = forecastData?.historical || [];
  const future = forecastData?.forecast || [];
  const whyData = forecastData?.why_prediction;
  const quality = forecastData?.data_quality;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header with Information Hierarchy Badges */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span>STATISTICAL DEMAND FORECASTING ENGINE</span>
          <span className="px-2 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
            [STATISTICAL FORECAST]
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Future Skill Demand & Trajectory Forecasting
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Time-series polynomial ridge estimation with statistical confidence intervals. Historical demand vs. 2026-2028 projections.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('prediction-lab')}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-slate-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open Prediction Validation Lab</span>
            </button>

            <button
              onClick={handleRunForecast}
              disabled={isRunning}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-lg ${
                isRunning
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-wait'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'CALCULATING...' : 'RUN FORECAST'}</span>
            </button>
          </div>
        </div>

        {/* 7-Step Pipeline Ribbon */}
        <div className="hidden sm:flex items-center space-x-1 mt-6 text-[10px] font-mono text-slate-400 overflow-x-auto py-1">
          {['MARKET DATA', 'DATA CLEANING', 'SKILL EXTRACTION', 'FEATURE ENG', 'TREND DETECTION', 'FORECAST MODEL', 'CONFIDENCE CONE'].map((step, idx) => (
            <React.Fragment key={step}>
              <span className={`px-2 py-1 rounded bg-white/[0.02] border ${idx >= 4 ? 'border-cyan-500/30 text-cyan-300' : 'border-white/5'}`}>
                {step}
              </span>
              {idx < 6 && <span className="text-slate-600">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left Column: Skill Selector & Data Confidence Layer */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2 font-mono text-xs">
            <label className="text-slate-400 uppercase tracking-widest text-[10px] block">
              SELECT CAPABILITY TO PROJECT:
            </label>
            <div className="space-y-1.5">
              {availableSkills.map((sk) => (
                <button
                  key={sk.id}
                  onClick={() => setSelectedSkillId(sk.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                    selectedSkillId === sk.id
                      ? 'bg-blue-600/30 text-white border border-cyan-400/50 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <span>{sk.name}</span>
                  {selectedSkillId === sk.id && <span className="text-cyan-400 text-xs">● ACTIVE</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Section 16: Data Confidence Layer */}
          {quality && (
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400 uppercase text-[10px]">DATA CONFIDENCE LAYER</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  {quality.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Coverage Score:</span>
                  <strong className="text-white">{quality.coverage}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Telemetry Recency:</span>
                  <strong className="text-cyan-300">{quality.recency}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Data Sample Size:</span>
                  <strong className="text-slate-200">{quality.sample_size}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Statistical Consistency:</span>
                  <strong className="text-emerald-400">{quality.consistency}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Animated Chart & Why This Prediction */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">{forecastData?.skill} Trajectory</h3>
                <p className="text-xs font-mono text-slate-400">Demand Index (0 - 100) with 90% Confidence Interval</p>
              </div>
              <div className="flex items-center space-x-3 text-[10px] font-mono">
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-0.5 bg-blue-400 inline-block" />
                  <span className="text-slate-300">Observed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-0.5 border-t border-dashed border-cyan-400 inline-block" />
                  <span className="text-cyan-300">Forecast</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500/20 border border-cyan-500/40 inline-block" />
                  <span className="text-slate-400">Uncertainty Cone</span>
                </div>
              </div>
            </div>

            {/* SVG Visual Chart */}
            <div className="relative w-full h-[280px] my-4 select-none">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {[100, 75, 50, 25, 0].map(val => (
                  <div key={val} className="w-full border-b border-slate-700 flex justify-between">
                    <span className="text-[9px] font-mono text-slate-400 -translate-y-2">{val}</span>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 bottom-0 left-[54%] border-l-2 border-dashed border-cyan-500/40 z-10 flex flex-col justify-between">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 -translate-x-1/2">
                  2025 TODAY
                </span>
                <span className="text-[9px] font-mono text-cyan-500/60 uppercase tracking-widest pl-1">
                  FORECAST TERRITORY →
                </span>
              </div>

              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="coneGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.05)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.22)" />
                  </linearGradient>
                </defs>

                {isChartDrawn && (
                  <polygon
                    points="54%, 72 70%, 54 85%, 38 100%, 28 100%, 82 85%, 100 70%, 116 54%, 72"
                    fill="url(#coneGrad2)"
                    stroke="rgba(6, 182, 212, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {isChartDrawn && (
                  <path
                    d="M 6% 220 Q 22% 160 38% 115 T 54% 72"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}

                {isChartDrawn && (
                  <path
                    d="M 54% 72 Q 72% 52 100% 42"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="3.5"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                  />
                )}

                {isChartDrawn && historical.map((h, i) => {
                  const xPercent = 6 + i * 16;
                  const yPercent = 250 - (h.demand / 100) * 200;
                  return (
                    <g key={h.year}>
                      <circle cx={`${xPercent}%`} cy={yPercent} r="5" fill="#3B82F6" stroke="#fff" strokeWidth="1.5" />
                      <text x={`${xPercent}%`} y={yPercent - 10} fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
                        {h.demand}
                      </text>
                    </g>
                  );
                })}

                {isChartDrawn && future.map((f, i) => {
                  const xPercent = 70 + i * 15;
                  const yPercent = 250 - (f.demand / 100) * 200;
                  return (
                    <g key={f.year}>
                      <circle cx={`${xPercent}%`} cy={yPercent} r="5.5" fill="#22D3EE" stroke="#000" strokeWidth="2" />
                      <text x={`${xPercent}%`} y={yPercent - 12} fill="#22D3EE" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                        {f.demand}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
                <span className="text-cyan-400 font-bold">2025</span>
                <span className="text-cyan-300">2026</span>
                <span className="text-cyan-300">2027</span>
                <span className="text-cyan-300">2028</span>
              </div>
            </div>
          </div>

          {/* Section 15: "Why This Prediction?" Explainability Layer */}
          {whyData && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <FileQuestion className="w-4 h-4 text-cyan-400" />
                  <span>WHY THIS PREDICTION? (EXPLAINABILITY LAYER)</span>
                </span>
                <span className="text-slate-400 text-[10px]">GROUNDED REASONING</span>
              </div>

              <p className="text-slate-200 font-sans text-xs leading-relaxed">
                {whyData.summary}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-slate-400 uppercase text-[10px] block">Observed Evidence Factors:</span>
                {whyData.evidence_factors?.map((ef, i) => (
                  <div key={i} className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-white font-medium">{ef.factor}</span>
                    <span className="text-cyan-300 font-bold">{ef.impact}</span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-500 pt-2 border-t border-white/10">
                <strong>Model Limitations: </strong>{whyData.limitations}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
