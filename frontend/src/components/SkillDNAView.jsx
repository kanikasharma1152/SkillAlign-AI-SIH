import React, { useState, useMemo, useEffect } from 'react';
import { 
  Dna, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Sliders,
  GitBranch,
  Network,
  Share2,
  User,
  Check,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { api } from '../services/api';

const DEMO_CANDIDATES = [
  {
    id: 'kanika-sharma',
    name: 'Kanika Sharma',
    target_role: 'Data Scientist',
    headline: 'Final Year CSE • Specializing in Data Science & Statistical Modeling',
    skills: [
      { id: 'python', name: 'Python', strength: 92, category: 'Core', demand: 95, futureDemand: 98, evidence: 'Strong', trend: 'Growing', gap: 'Low', confidence: 'High' },
      { id: 'sql', name: 'SQL / Modeling', strength: 88, category: 'Data', demand: 92, futureDemand: 94, evidence: 'Strong', trend: 'Stable', gap: 'Low', confidence: 'High' },
      { id: 'pandas', name: 'Pandas', strength: 90, category: 'Data', demand: 89, futureDemand: 90, evidence: 'Strong', trend: 'Stable', gap: 'Low', confidence: 'High' },
      { id: 'numpy', name: 'NumPy', strength: 86, category: 'Core', demand: 88, futureDemand: 89, evidence: 'Strong', trend: 'Stable', gap: 'Low', confidence: 'High' },
      { id: 'sklearn', name: 'Scikit-Learn', strength: 85, category: 'AI & ML', demand: 91, futureDemand: 92, evidence: 'Strong', trend: 'Growing', gap: 'Low', confidence: 'High' },
      { id: 'fastapi', name: 'FastAPI', strength: 78, category: 'Backend', demand: 85, futureDemand: 92, evidence: 'Supported', trend: 'Growing', gap: 'Medium', confidence: 'High' },
      { id: 'ml', name: 'Machine Learning', strength: 82, category: 'AI & ML', demand: 92, futureDemand: 95, evidence: 'Strong', trend: 'Growing', gap: 'Low', confidence: 'High' },
      { id: 'stats', name: 'Statistics & Inference', strength: 80, category: 'Core', demand: 88, futureDemand: 90, evidence: 'Supported', trend: 'Stable', gap: 'Low', confidence: 'High' },
      { id: 'rag', name: 'RAG Architectures', strength: 25, category: 'AI Frontier', demand: 78, futureDemand: 96, evidence: 'Unverified', trend: 'Surging', gap: 'High', confidence: 'Moderate' },
      { id: 'mlops', name: 'MLOps / Deployment', strength: 30, category: 'DevOps', demand: 84, futureDemand: 95, evidence: 'Unverified', trend: 'Surging', gap: 'High', confidence: 'Moderate' }
    ]
  },
  {
    id: 'sukanya-jadon',
    name: 'Sukanya Jadon',
    target_role: 'AI Engineer',
    headline: 'AI & Data Systems Specialist • PyTorch, NLP & Generative AI',
    skills: [
      { id: 'python', name: 'Python', strength: 94, category: 'Core', demand: 95, futureDemand: 98, evidence: 'Strong', trend: 'Growing', gap: 'Low', confidence: 'High' },
      { id: 'ml', name: 'Machine Learning', strength: 88, category: 'AI & ML', demand: 92, futureDemand: 95, evidence: 'Strong', trend: 'Growing', gap: 'Low', confidence: 'High' },
      { id: 'deeplearning', name: 'Deep Learning', strength: 84, category: 'AI & ML', demand: 90, futureDemand: 96, evidence: 'Strong', trend: 'Growing', gap: 'Low', confidence: 'High' },
      { id: 'nlp', name: 'NLP', strength: 80, category: 'AI & ML', demand: 86, futureDemand: 94, evidence: 'Supported', trend: 'Growing', gap: 'Medium', confidence: 'High' },
      { id: 'fastapi', name: 'FastAPI', strength: 82, category: 'Backend', demand: 85, futureDemand: 92, evidence: 'Strong', trend: 'Growing', gap: 'Low', confidence: 'High' },
      { id: 'genai', name: 'Generative AI / LLMs', strength: 72, category: 'AI Frontier', demand: 94, futureDemand: 99, evidence: 'Supported', trend: 'Surging', gap: 'Medium', confidence: 'High' },
      { id: 'rag', name: 'RAG Architectures', strength: 50, category: 'AI Frontier', demand: 85, futureDemand: 96, evidence: 'Supported', trend: 'Surging', gap: 'Medium', confidence: 'Moderate' },
      { id: 'vector', name: 'Vector Databases', strength: 45, category: 'Data', demand: 76, futureDemand: 93, evidence: 'Supported', trend: 'Surging', gap: 'Medium', confidence: 'Moderate' },
      { id: 'docker', name: 'Docker', strength: 68, category: 'DevOps', demand: 88, futureDemand: 92, evidence: 'Supported', trend: 'Stable', gap: 'Medium', confidence: 'High' },
      { id: 'mlops', name: 'MLOps / Deployment', strength: 42, category: 'DevOps', demand: 84, futureDemand: 95, evidence: 'Unverified', trend: 'Surging', gap: 'High', confidence: 'Moderate' }
    ]
  }
];

// Hierarchical Skill Dependency Catalog (Section 8)
const SKILL_DEPENDENCY_DATA = {
  python: {
    name: 'Python',
    prerequisites: ['Basic Logic & Programming Fundamentals'],
    dependents: ['NumPy', 'Pandas', 'Scikit-Learn', 'FastAPI', 'Machine Learning'],
    complementary: ['SQL / Modeling', 'Git & Version Control'],
    related_tech: ['PyPy', 'Conda', 'Poetry', 'Jupyter'],
    career_roles: ['Data Scientist', 'AI Engineer', 'Backend Developer', 'ML Engineer']
  },
  numpy: {
    name: 'NumPy',
    prerequisites: ['Python', 'Linear Algebra Basics'],
    dependents: ['Pandas', 'Scikit-Learn', 'PyTorch / Deep Learning'],
    complementary: ['SciPy', 'Matplotlib'],
    related_tech: ['Numba', 'BLAS / LAPACK', 'CuPy'],
    career_roles: ['Data Scientist', 'Quantitative Researcher', 'ML Engineer']
  },
  pandas: {
    name: 'Pandas',
    prerequisites: ['Python', 'NumPy', 'SQL Basics'],
    dependents: ['Feature Engineering', 'Scikit-Learn Pipelines'],
    complementary: ['SQL / Modeling', 'Data Visualization (Seaborn/Plotly)'],
    related_tech: ['Polars', 'Dask', 'DuckDB'],
    career_roles: ['Data Analyst', 'Data Scientist', 'Data Engineer']
  },
  sklearn: {
    name: 'Scikit-Learn',
    prerequisites: ['Python', 'NumPy', 'Pandas', 'Statistics & Inference'],
    dependents: ['Machine Learning', 'Model Evaluation & Tuning'],
    complementary: ['XGBoost', 'LightGBM', 'Optuna'],
    related_tech: ['joblib', 'SHAP', 'Yellowbrick'],
    career_roles: ['Data Scientist', 'ML Engineer', 'Predictive Modeler']
  },
  fastapi: {
    name: 'FastAPI',
    prerequisites: ['Python', 'REST API Fundamentals', 'AsyncIO Basics'],
    dependents: ['Microservices', 'Model Serving Endpoints'],
    complementary: ['Docker', 'Pydantic', 'PostgreSQL'],
    related_tech: ['Uvicorn', 'Starlette', 'SQLAlchemy'],
    career_roles: ['Backend Developer', 'AI Platform Engineer', 'Full-Stack AI Developer']
  },
  ml: {
    name: 'Machine Learning',
    prerequisites: ['Python', 'Statistics & Inference', 'Scikit-Learn'],
    dependents: ['Deep Learning', 'NLP', 'Generative AI', 'MLOps'],
    complementary: ['Data Engineering', 'Cloud Infrastructure'],
    related_tech: ['PyTorch', 'TensorFlow', 'MLflow'],
    career_roles: ['ML Engineer', 'Data Scientist', 'Research Scientist']
  },
  deeplearning: {
    name: 'Deep Learning',
    prerequisites: ['Machine Learning', 'Linear Algebra', 'Calculus'],
    dependents: ['Computer Vision', 'NLP', 'Generative AI / LLMs'],
    complementary: ['GPU Acceleration (CUDA)', 'Distributed Training'],
    related_tech: ['PyTorch', 'HuggingFace Transformers', 'Triton'],
    career_roles: ['Deep Learning Researcher', 'AI Engineer', 'Vision / NLP Engineer']
  },
  nlp: {
    name: 'NLP',
    prerequisites: ['Deep Learning', 'Python', 'Text Preprocessing'],
    dependents: ['Large Language Models (LLMs)', 'RAG Architectures', 'Agentic AI'],
    complementary: ['Vector Databases', 'Tokenization Runtimes'],
    related_tech: ['spaCy', 'HuggingFace', 'Sentence-Transformers', 'Tiktoken'],
    career_roles: ['NLP Scientist', 'GenAI Engineer', 'Conversational AI Architect']
  },
  genai: {
    name: 'Generative AI',
    prerequisites: ['Deep Learning', 'NLP', 'Transformer Architectures'],
    dependents: ['RAG Architectures', 'Agentic AI', 'PEFT / Fine-Tuning'],
    complementary: ['Vector Databases', 'Prompt Engineering', 'LangChain / LlamaIndex'],
    related_tech: ['vLLM', 'Ollama', 'LoRA / QLoRA', 'LangGraph'],
    career_roles: ['GenAI Engineer', 'AI Product Architect', 'Cognitive Systems Lead']
  }
};

function renderBlockBar(val) {
  const filled = Math.round((val / 100) * 10);
  const empty = 10 - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

export default function SkillDNAView({ onNavigate, defaultSubTab = 'topology' }) {
  const [activeSubTab, setActiveSubTab] = useState(defaultSubTab); // 'topology', 'dependencies', 'transferability'
  const [activeCandidateId, setActiveCandidateId] = useState('kanika-sharma');
  const [transferabilityMatrix, setTransferabilityMatrix] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState('python');

  const currentCandidate = useMemo(() => {
    return DEMO_CANDIDATES.find(c => c.id === activeCandidateId) || DEMO_CANDIDATES[0];
  }, [activeCandidateId]);

  const skills = currentCandidate.skills;

  useEffect(() => {
    const loadTransfer = async () => {
      const data = await api.getTransferability();
      if (data) setTransferabilityMatrix(data);
    };
    loadTransfer();
  }, []);

  const selectedSkill = useMemo(() => {
    return skills.find(s => s.id === selectedSkillId) || skills[0];
  }, [skills, selectedSkillId]);

  const dependencyInfo = useMemo(() => {
    return SKILL_DEPENDENCY_DATA[selectedSkillId] || {
      name: selectedSkill.name,
      prerequisites: ['Foundational Programming'],
      dependents: ['Advanced System Integration'],
      complementary: ['Cloud & Containerization'],
      related_tech: ['Enterprise Frameworks'],
      career_roles: ['Technology Specialist']
    };
  }, [selectedSkillId, selectedSkill]);

  const positionedNodes = useMemo(() => {
    const centerIndex = skills.findIndex(s => s.id === selectedSkillId);
    return skills.map((s, idx) => {
      if (s.id === selectedSkillId) {
        return { ...s, posX: 50, posY: 50, isAnchor: true };
      }
      const ringRadius = s.gap === 'High' ? 42 : s.strength > 75 ? 26 : 35;
      const angle = ((idx - centerIndex + skills.length) % (skills.length - 1)) * ((2 * Math.PI) / (skills.length - 1));
      
      const x = 50 + ringRadius * Math.cos(angle);
      const y = 50 + ringRadius * Math.sin(angle);

      return {
        ...s,
        posX: Math.max(12, Math.min(88, x)),
        posY: Math.max(12, Math.min(88, y)),
        isAnchor: false
      };
    });
  }, [skills, selectedSkillId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* 1. Header with Badges & Candidate Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
            <Dna className="w-4 h-4 text-cyan-400" />
            <span>PERSONAL SKILL DNA // LIVING PROFILE MAP</span>
            <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
              [OBSERVED & ANALYZED]
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Skill DNA & Structural Topology
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic ecosystem mapping current capability, market demand, evidence verification, and prerequisite ladders.
          </p>
        </div>

        {/* Demo Candidate Switcher (Section 50 & 57) */}
        <div className="flex items-center space-x-2 p-1.5 rounded-2xl glass-panel border border-white/10 font-mono text-xs">
          <span className="text-slate-400 text-[11px] px-2 flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEMO CANDIDATE:</span>
          </span>
          {DEMO_CANDIDATES.map(cand => {
            const isActive = cand.id === activeCandidateId;
            return (
              <button
                key={cand.id}
                onClick={() => {
                  setActiveCandidateId(cand.id);
                  setSelectedSkillId(cand.skills[0].id);
                }}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white font-bold shadow-md border border-cyan-400/40' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <span>{cand.name}</span>
                <span className="text-[10px] opacity-75 ml-1">({cand.target_role})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-white/10 my-6 font-mono text-xs gap-3">
        {[
          { id: 'topology', label: '1. DYNAMIC SKILL DNA ECOSYSTEM', icon: Dna },
          { id: 'dependencies', label: '2. SKILL DEPENDENCY GRAPH (PREREQUISITES)', icon: GitBranch },
          { id: 'transferability', label: '3. SKILL TRANSFERABILITY ENGINE', icon: Share2 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-2.5 transition-all border-b-2 flex items-center space-x-2 ${
                activeSubTab === tab.id
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

      {/* Sub-Tab 1: Dynamic Topology & Block-Bar Skill DNA Cards */}
      {activeSubTab === 'topology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Interactive Orbit Graph */}
            <div className="lg:col-span-7 relative aspect-square sm:aspect-[4/3] rounded-2xl glass-panel p-6 border border-white/10 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[52%] h-[52%] rounded-full border border-cyan-500/10 border-dashed animate-spin-slow" />
                <div className="w-[80%] h-[80%] rounded-full border border-white/[0.04]" />
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {positionedNodes.map((node) => {
                  if (node.isAnchor) return null;
                  return (
                    <line
                      key={node.id}
                      x1="50%"
                      y1="50%"
                      x2={`${node.posX}%`}
                      y2={`${node.posY}%`}
                      stroke={node.gap === 'High' ? 'rgba(244, 63, 94, 0.35)' : 'rgba(59, 130, 246, 0.35)'}
                      strokeWidth={node.isAnchor ? 2.5 : 1.2}
                      strokeDasharray={node.gap === 'High' ? '4 4' : undefined}
                    />
                  );
                })}
              </svg>

              {positionedNodes.map((node) => {
                const isSelected = node.id === selectedSkillId;
                const size = node.isAnchor ? 64 : node.strength > 75 ? 52 : node.strength > 45 ? 44 : 38;
                
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedSkillId(node.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 ease-out group"
                    style={{
                      left: `${node.posX}%`,
                      top: `${node.posY}%`,
                      zIndex: isSelected ? 30 : 10
                    }}
                  >
                    <div
                      className={`rounded-full flex flex-col items-center justify-center transition-all duration-300 font-mono ${
                        isSelected
                          ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.6)] scale-110'
                          : node.gap === 'High'
                          ? 'bg-slate-900 border-2 border-dashed border-rose-500/80 text-rose-300 hover:border-rose-400'
                          : node.strength >= 80
                          ? 'bg-blue-950/80 border border-blue-400 text-blue-200'
                          : 'bg-slate-900 border border-white/20 text-slate-300'
                      }`}
                      style={{ width: `${size}px`, height: `${size}px` }}
                    >
                      <span className="text-[10px] font-bold">{node.strength}%</span>
                      <span className="text-[8px] opacity-75 font-mono">
                        {node.gap === 'High' ? 'GAP' : node.name.slice(0, 3)}
                      </span>
                    </div>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap pointer-events-none">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded shadow-lg backdrop-blur-md border ${
                        isSelected 
                          ? 'bg-blue-900/90 text-white border-blue-400 font-bold' 
                          : 'bg-slate-950/80 text-slate-300 border-white/10'
                      }`}>
                        {node.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inspector Panel with Exact Block-Bar Visualization (Section 7) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase">INSPECTING CAPABILITY</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${selectedSkill.gap === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-blue-500/20 text-cyan-300 border border-blue-500/30'}`}>
                    GAP: {selectedSkill.gap.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white font-sans">{selectedSkill.name}</h2>
                  <span className="text-xs text-slate-400">{selectedSkill.category} Domain • Target Role: {currentCandidate.target_role}</span>
                </div>

                {/* Section 7 Spec Format */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 text-[11px] font-mono leading-relaxed">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Strength</span>
                    <span className="text-cyan-400 font-bold tracking-tight">{renderBlockBar(selectedSkill.strength)} <span className="text-white ml-1">{selectedSkill.strength}%</span></span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Market Demand</span>
                    <span className="text-blue-400 font-bold tracking-tight">{renderBlockBar(selectedSkill.demand)} <span className="text-white ml-1">{selectedSkill.demand}%</span></span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Future Relevance</span>
                    <span className="text-purple-400 font-bold tracking-tight">{renderBlockBar(selectedSkill.futureDemand)} <span className="text-white ml-1">{selectedSkill.futureDemand}%</span></span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-slate-400">Evidence</span>
                    <span className={`font-bold ${selectedSkill.evidence === 'Strong' ? 'text-emerald-400' : selectedSkill.evidence === 'Supported' ? 'text-cyan-300' : 'text-amber-400'}`}>{selectedSkill.evidence}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Trend</span>
                    <span className="text-white font-bold">{selectedSkill.trend}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Skill Gap</span>
                    <span className={`font-bold ${selectedSkill.gap === 'High' ? 'text-rose-400' : selectedSkill.gap === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>{selectedSkill.gap}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Confidence</span>
                    <span className="text-emerald-400 font-bold">{selectedSkill.confidence}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('what-if')}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-md"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Simulate Learning in What-If Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Full Grid of All Personal Skills (Section 7) */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              ALL SKILL DNA CAPABILITY BLOCKS ({skills.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 font-mono text-xs">
              {skills.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSkillId(s.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    s.id === selectedSkillId
                      ? 'bg-blue-950/30 border-cyan-400 shadow-md'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-sm">{s.name}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded font-bold ${
                      s.gap === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {s.strength}%
                    </span>
                  </div>

                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Strength:</span>
                      <span className="text-cyan-400">{renderBlockBar(s.strength)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Demand:</span>
                      <span className="text-blue-400">{renderBlockBar(s.demand)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Relevance:</span>
                      <span className="text-purple-400">{renderBlockBar(s.futureDemand)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Skill Dependency Tree (Section 8) */}
      {activeSubTab === 'dependencies' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 font-mono text-xs gap-2">
            <span className="text-cyan-400 font-bold uppercase tracking-widest flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>SKILL DEPENDENCY GRAPH & PREREQUISITE LADDER (SECTION 8)</span>
            </span>
            <span className="text-slate-400">SELECT ANY NODE TO INSPECT PREREQUISITES & ROLES</span>
          </div>

          {/* Hierarchical ASCII Visual Tree per Section 8 */}
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-slate-200 space-y-3">
            <div className="text-[11px] text-cyan-300 font-bold pb-2 border-b border-white/10">
              HIERARCHICAL KNOWLEDGE RELATIONSHIP
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`Python
 ├── NumPy
 ├── Pandas
 ├── Scikit-Learn
 ├── FastAPI
 └── Machine Learning
       ├── Deep Learning
       ├── NLP
       └── Generative AI`}
            </pre>
          </div>

          {/* Interactive Node Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(SKILL_DEPENDENCY_DATA).map(key => {
              const item = SKILL_DEPENDENCY_DATA[key];
              const isSelected = selectedSkillId === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSkillId(key)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold border border-cyan-400 shadow-md'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Section 8 Detail Breakdown Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-sm">{dependencyInfo.name} Ecosystem Blueprint</span>
              </div>
              <span className="text-[10px] text-slate-400">Topological Graph Link</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Prerequisites */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">1. PREREQUISITES</span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {dependencyInfo.prerequisites.map((p, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="text-amber-400 font-bold">←</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dependent Skills */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">2. DEPENDENT SKILLS UNLOCKED</span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {dependencyInfo.dependents.map((d, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="text-cyan-400 font-bold">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complementary Skills */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">3. COMPLEMENTARY SKILLS</span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {dependencyInfo.complementary.map((c, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="text-emerald-400 font-bold">↔</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Technologies */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">4. RELATED TECHNOLOGIES</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dependencyInfo.related_tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Possible Career Roles */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2 md:col-span-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">5. TARGET CAREER ROLES ENABLED</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {dependencyInfo.career_roles.map((r, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-cyan-300 font-bold text-[11px]">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Skill Transferability Engine (Section 17) */}
      {activeSubTab === 'transferability' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
            <span className="text-cyan-400 font-bold uppercase tracking-widest flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>SKILL TRANSFERABILITY ENGINE (SECTION 17)</span>
            </span>
            <span className="text-slate-400">TRANSFERABLE PATHS: DATA ANALYST ➔ DATA SCIENTIST ➔ ML ➔ AI ENGINEER</span>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 font-mono text-xs text-slate-300 leading-relaxed">
            Candidate profile <strong>{currentCandidate.name}</strong> knows: <span className="text-cyan-300">Python, SQL, Pandas, Statistics</span>.
            The engine calculates pairwise transferability vectors across adjacent job roles.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {transferabilityMatrix.map((t) => (
              <div key={t.role_id} className="p-4 rounded-xl glass-panel border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{t.role_name}</span>
                  <span className="text-cyan-400 font-bold text-sm tabular-nums">
                    {t.alignment_percentage}% Alignment
                  </span>
                </div>

                <div className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-cyan-300 font-bold inline-block">
                  MOBILITY READINESS: {t.mobility_readiness}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Covered Foundation:</span>
                    <span className="text-emerald-300 text-[11px]">{t.covered_skills.join(', ') || 'None'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Transferable Skills:</span>
                    <span className="text-cyan-300 text-[11px]">{t.transferable_skills.join(', ') || 'Direct foundation'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Primary Gaps to Close:</span>
                    <span className="text-rose-300 text-[11px]">{t.missing_skills.join(', ') || 'Fully covered'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
