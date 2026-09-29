import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock, 
  ArrowRight, 
  BookOpen, 
  Award,
  ChevronRight
} from 'lucide-react';

export default function LearningRoadmapView({ onNavigate }) {
  const [activeNodeId, setActiveNodeId] = useState('ml');

  const [milestones, setMilestones] = useState([
    {
      id: 'python',
      title: 'Python Ecosystem & Advanced Data Structures',
      status: 'MASTERED',
      category: 'Foundation',
      duration: '40 Hours',
      prerequisites: 'None',
      capstone: 'Concurrent Async API with Pydantic & FastAPI',
      impact: 'Essential Core Bedrock'
    },
    {
      id: 'stats',
      title: 'Applied Statistics & Causal Inference',
      status: 'MASTERED',
      category: 'Foundation',
      duration: '35 Hours',
      prerequisites: 'Python',
      capstone: 'A/B Testing Simulator with Bootstrap Resampling',
      impact: 'Eliminates False Signals'
    },
    {
      id: 'ml',
      title: 'Machine Learning & Predictive Modeling',
      status: 'ACTIVE',
      category: 'Core AI',
      duration: '50 Hours',
      prerequisites: 'Python + Statistics',
      capstone: 'Gradient Boosted Tree Ensemble & Model Explainability (SHAP)',
      impact: '+14% Role Alignment'
    },
    {
      id: 'genai',
      title: 'Generative AI & Large Language Models',
      status: 'UNLOCKING',
      category: 'Modern AI',
      duration: '30 Hours',
      prerequisites: 'Machine Learning',
      capstone: 'Structured Extraction & Prompt Evaluation Harness',
      impact: '+18% Role Alignment'
    },
    {
      id: 'rag',
      title: 'RAG Architectures & Vector Search',
      status: 'LOCKED',
      category: 'Critical Horizon',
      duration: '45 Hours',
      prerequisites: 'GenAI + Vector DBs',
      capstone: 'Hybrid BM25 + Dense Retrieval Pipeline with Cross-Encoder Reranking',
      impact: '+24% High-Demand Mobility'
    },
    {
      id: 'agentic',
      title: 'Autonomous Multi-Agent Orchestration',
      status: 'LOCKED',
      category: 'Frontier AI',
      duration: '40 Hours',
      prerequisites: 'RAG Architectures',
      capstone: 'Self-Reflecting Agent Framework with Tool Invocation Sandbox',
      impact: 'Top 5% Senior Alignment'
    }
  ]);

  const activeMilestone = milestones.find(m => m.id === activeNodeId) || milestones[2];

  const handleAdvanceStatus = (id) => {
    setMilestones(prev => {
      const idx = prev.findIndex(m => m.id === id);
      if (idx === -1) return prev;
      const updated = [...prev];
      if (updated[idx].status === 'ACTIVE') {
        updated[idx].status = 'MASTERED';
        if (idx + 1 < updated.length) {
          updated[idx + 1].status = 'ACTIVE';
          setActiveNodeId(updated[idx + 1].id);
        }
      }
      return updated;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>ADAPTIVE LEARNING JOURNEY // NON-LINEAR TRAJECTORY</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Personalized Learning Roadmap
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Dynamic prerequisite-driven milestone spine. Progress updates recalculate downstream role alignments.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-slate-400">Target Role:</span>
            <span className="px-3 py-1 rounded-lg bg-blue-600/20 text-cyan-300 border border-blue-500/30 font-bold">
              AI / GenAI Engineer
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Spine vs Milestone Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left Column: Visual Skill Journey Spine */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-white/10 relative">
          
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pb-4 mb-4 border-b border-white/10 flex justify-between">
            <span>START PROFILE</span>
            <span>TARGET: MARKET EXCELLENCE</span>
          </div>

          {/* Vertical Path Spine */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-[35px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-cyan-400 before:to-slate-800">
            {milestones.map((m) => {
              const isSelected = m.id === activeNodeId;
              const isMastered = m.status === 'MASTERED';
              const isActive = m.status === 'ACTIVE';
              const isUnlocking = m.status === 'UNLOCKING';
              const isLocked = m.status === 'LOCKED';

              return (
                <div
                  key={m.id}
                  onClick={() => setActiveNodeId(m.id)}
                  className="relative flex items-start space-x-4 cursor-pointer group"
                >
                  {/* Node Circle */}
                  <div
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isMastered
                        ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                        : isActive
                        ? 'bg-cyan-400 text-black shadow-[0_0_16px_rgba(6,182,212,0.8)] scale-125'
                        : isUnlocking
                        ? 'bg-slate-900 border-2 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border border-slate-700 text-slate-500'
                    }`}
                  >
                    {isMastered ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                    ) : isUnlocking ? (
                      <Unlock className="w-3 h-3" />
                    ) : (
                      <Lock className="w-2.5 h-2.5" />
                    )}
                  </div>

                  {/* Milestone Card */}
                  <div
                    className={`flex-1 p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-cyan-400/60 shadow-md'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {m.title}
                      </span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                          isMastered
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                            : isUnlocking
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-white/[0.02] text-slate-500'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 mt-1.5">
                      <span>{m.category}</span>
                      <span>•</span>
                      <span>{m.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Milestone Module & Capstone */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                MILESTONE SPECIFICATION
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-400">
                {activeMilestone.status}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{activeMilestone.title}</h2>
              <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 mt-1">
                <span>{activeMilestone.category} Domain</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeMilestone.duration}</span>
                </span>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs space-y-1">
              <span className="text-slate-500 uppercase text-[10px] block">Prerequisites</span>
              <span className="text-slate-200 font-semibold">{activeMilestone.prerequisites}</span>
            </div>

            {/* Hands-on Capstone Requirement */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 font-mono text-xs space-y-2">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>EVALUATION CAPSTONE PROJECT</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                {activeMilestone.capstone}
              </p>
            </div>

            {/* Estimated Market Lift */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
              <span className="text-slate-400">Estimated Alignment Lift:</span>
              <span className="text-emerald-400 font-bold">{activeMilestone.impact}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center space-x-3">
              {activeMilestone.status === 'ACTIVE' && (
                <button
                  onClick={() => handleAdvanceStatus(activeMilestone.id)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-black font-mono text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete & Advance Journey</span>
                </button>
              )}

              <button
                onClick={() => onNavigate('what-if')}
                className="px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white font-mono text-xs transition-colors flex items-center space-x-1"
              >
                <span>Simulate Impact</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
