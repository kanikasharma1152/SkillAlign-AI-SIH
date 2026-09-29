import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  Download,
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-react';
import { api } from '../services/api';

export default function CurriculumIntelligenceView({ onNavigate }) {
  const [curriculumData, setCurriculumData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeCourseCode, setActiveCourseCode] = useState('CS603');

  useEffect(() => {
    const load = async () => {
      const data = await api.getCurriculum();
      setCurriculumData(data);
    };
    load();
  }, []);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1200);
  };

  const collegeSkills = [
    { name: 'Python', status: 'ALIGNED', matchedIndustry: 'Python Ecosystem', demand: 94 },
    { name: 'SQL / Modeling', status: 'ALIGNED', matchedIndustry: 'SQL / Relational', demand: 89 },
    { name: 'Machine Learning', status: 'ALIGNED', matchedIndustry: 'Scikit & Classical ML', demand: 88 },
    { name: 'Cloud Infrastructure', status: 'MODERATE', matchedIndustry: 'Cloud Architecture', demand: 86 },
    { name: 'Legacy MapReduce', status: 'OUTDATED', matchedIndustry: 'Deprecated Hadoop', demand: 28 },
    { name: 'RAG Architectures', status: 'MISSING', matchedIndustry: 'Modern Retrieval GenAI', demand: 93 },
    { name: 'Vector Databases', status: 'MISSING', matchedIndustry: 'Pinecone / Milvus', demand: 89 },
    { name: 'MLOps / Telemetry', status: 'MISSING', matchedIndustry: 'MLflow & Docker CI/CD', demand: 91 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title & SIH Problem Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>SIH CORE ENGINE // HIGHER EDUCATION CURRICULUM ALIGNMENT</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Curriculum Intelligence & Syllabus Alignment
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated mapping of university courses & syllabi against real-time industry requirement vectors to detect obsolete coursework and critical omissions.
            </p>
          </div>

          {/* Upload / Ingestion Simulation Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSimulateUpload}
              disabled={isUploading}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-all shadow-md"
            >
              <Upload className={`w-3.5 h-3.5 ${isUploading ? 'animate-bounce' : ''}`} />
              <span>{isUploading ? 'PARSING SYLLABUS PDF...' : 'UPLOAD NEW CURRICULUM'}</span>
            </button>
          </div>
        </div>

        {/* Institution Info Card */}
        {curriculumData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-3.5 rounded-xl glass-panel border border-white/10 font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">ANALYZED INSTITUTION</span>
              <span className="font-semibold text-white truncate block">{curriculumData.institution}</span>
            </div>
            <div className="p-3.5 rounded-xl glass-panel border border-white/10 font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">DEGREE & SCHEME</span>
              <span className="font-semibold text-white truncate block">{curriculumData.degree}</span>
            </div>
            <div className="p-3.5 rounded-xl glass-panel border border-white/10 font-mono text-xs flex justify-between items-center">
              <div>
                <span className="text-slate-400 block text-[10px]">CURRICULUM COVERAGE</span>
                <span className="text-xl font-bold text-cyan-400 tabular-nums">
                  {curriculumData.curriculum_coverage_score}%
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                MODERATE GAP
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Dual Column Ribbon: College Topics vs Industry Requirements */}
      <div className="mt-8 glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
          <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4" />
            <span>COLLEGE CURRICULUM TOPICS</span>
          </span>
          <span className="text-slate-500 uppercase tracking-widest text-[10px] hidden sm:block">
            DYNAMIC MAPPING RIBBON
          </span>
          <span className="text-blue-400 font-bold flex items-center space-x-1.5">
            <Layers className="w-4 h-4" />
            <span>INDUSTRY 2026 DEMAND NODES</span>
          </span>
        </div>

        {/* Visual Mapping Lines and Nodes */}
        <div className="space-y-4 my-6 font-mono text-xs">
          {collegeSkills.map((sk) => {
            const isAligned = sk.status === 'ALIGNED';
            const isModerate = sk.status === 'MODERATE';
            const isOutdated = sk.status === 'OUTDATED';
            const isMissing = sk.status === 'MISSING';

            return (
              <div key={sk.name} className="flex items-center justify-between group">
                
                {/* Left Side: College Side Node */}
                <div className="w-[38%] flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      isAligned ? 'bg-emerald-400' : isModerate ? 'bg-cyan-400' : isOutdated ? 'bg-amber-400' : 'border border-dashed border-rose-400 bg-transparent'
                    }`}
                  />
                  <span className={`truncate font-medium ${isMissing ? 'text-rose-400 line-through' : 'text-slate-200'}`}>
                    {isMissing ? `[OMITTED] ${sk.name}` : sk.name}
                  </span>
                  {isOutdated && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden sm:inline">
                      OUTDATED
                    </span>
                  )}
                </div>

                {/* Center Animated Connector Ribbon */}
                <div className="w-[24%] px-2 flex items-center justify-center">
                  <div className="w-full relative flex items-center">
                    <div
                      className={`w-full h-0.5 ${
                        isAligned
                          ? 'bg-emerald-500/60'
                          : isModerate
                          ? 'bg-cyan-500/50'
                          : isOutdated
                          ? 'bg-amber-500/40 border-t border-dashed border-amber-400'
                          : 'bg-rose-500/40 border-t border-dashed border-rose-500'
                      }`}
                    />
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 px-1.5 py-0.2 text-[8px] rounded font-bold ${
                        isAligned ? 'bg-emerald-950 text-emerald-300' : isOutdated ? 'bg-amber-950 text-amber-300' : 'bg-rose-950 text-rose-300'
                      }`}
                    >
                      {isAligned ? '100%' : isOutdated ? '28%' : '0%'}
                    </div>
                  </div>
                </div>

                {/* Right Side: Industry Side Node */}
                <div className="w-[38%] flex items-center justify-end space-x-2 text-right">
                  <span className="text-slate-300 truncate">{sk.matchedIndustry}</span>
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      sk.demand > 80 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-600'
                    }`}
                  />
                  <span className="text-[10px] text-cyan-400 font-bold tabular-nums">
                    [{sk.demand}]
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Action Plan & Curriculum Revision Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left: Recommended Syllabus Modernization Steps */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC BOARD MODERNIZATION ROADMAP</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400">SIH RECOMMENDATION ENGINE</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {curriculumData?.action_plan?.map((plan) => (
              <div key={plan.step} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-400 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                    {plan.step}
                  </span>
                  <span className="font-bold text-white text-sm">{plan.action}</span>
                </div>
                <p className="text-slate-300 text-xs pl-7 leading-relaxed font-sans">
                  {plan.details}
                </p>
              </div>
            ))}
          </div>

          {/* Export Proposal Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400">
              Formatted according to AICTE / UGC Curriculum Modernization Standards.
            </span>
            <button
              onClick={() => alert("Curriculum Modernization Proposal downloaded (PDF/JSON)!")}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs font-mono text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Syllabus Proposal</span>
            </button>
          </div>
        </div>

        {/* Right: Urgent Missing Skills Callout */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>CRITICAL OMISSIONS</span>
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {curriculumData?.critical_omissions?.map((omit) => (
              <div key={omit.skill} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{omit.skill}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-300 font-bold">
                    {omit.priority}
                  </span>
                </div>
                <div className="text-[10px] text-cyan-400">
                  Current Demand: {omit.current_demand} / 100 ({omit.growth_velocity})
                </div>
                <p className="text-[11px] text-slate-300 font-sans mt-1">
                  {omit.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
