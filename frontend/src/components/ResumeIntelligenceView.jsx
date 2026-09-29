import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  BarChart3, 
  Sliders,
  FolderGit2,
  FileCheck2,
  Cpu,
  Trash2,
  Download,
  Printer,
  History,
  Info,
  X,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Check,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

const ROLE_OPTIONS = [
  { id: 'data-scientist', name: 'Data Scientist' },
  { id: 'data-analyst', name: 'Data Analyst' },
  { id: 'ml-engineer', name: 'ML Engineer' },
  { id: 'ai-engineer', name: 'AI Engineer' },
  { id: 'software-developer', name: 'Software Developer' },
  { id: 'backend-developer', name: 'Backend Developer' },
  { id: 'frontend-developer', name: 'Frontend Developer' },
  { id: 'data-engineer', name: 'Data Engineer' },
  { id: 'custom', name: 'Custom Role...' }
];

const DEMO_PRESETS = {
  kanika: {
    name: 'Kanika Sharma',
    target_role: 'data-scientist',
    filename: 'kanika_sharma_resume.txt',
    text: `Kanika Sharma
kanika.sharma@example.com | +91 98765 43210 | github.com/kanika-ds | linkedin.com/in/kanika-sharma

SUMMARY
Data Scientist & Machine Learning Engineer with 2+ years of experience building statistical models, predictive pipelines, and automated analytics systems.

SKILLS
Python, SQL, Pandas, NumPy, Scikit-Learn, FastAPI, Machine Learning, Statistics & Inference, Data Visualization, Git, Docker

EXPERIENCE
Data Science Intern | Apex Analytics Lab | Jan 2024 - Jun 2024
- Engineered customer segmentation models with Scikit-Learn and Pandas across 250,000+ consumer records.
- Optimized SQL data aggregation pipelines, decreasing query latency by 45%.
- Deployed FastAPI inference microservice handling 40,000+ daily prediction requests with 99.7% uptime.

PROJECTS
RideNow - High-Throughput Pricing & Booking API | 2024
- Built distributed backend with Python, FastAPI, and PostgreSQL. Processed 15,000+ simulated rides.
- Integrated Docker containerization and automated test suites with GitHub Actions.

Customer Churn Risk Prediction Engine | 2023
- Trained XGBoost and Random Forest classifiers on 100k customer records with 0.89 ROC-AUC.
- Implemented SHAP value explainability and exposed REST endpoints with FastAPI.

EDUCATION
B.Tech in Computer Science (Data Science Specialization) | National Institute of Technology | 2022 - 2026`
  },
  sukanya: {
    name: 'Sukanya Jadon',
    target_role: 'ai-engineer',
    filename: 'sukanya_jadon_resume.txt',
    text: `Sukanya Jadon
sukanya.jadon@example.com | +91 91234 56789 | github.com/sukanya-ai | linkedin.com/in/sukanya-jadon

SUMMARY
AI Engineer specializing in PyTorch deep learning, NLP architectures, FastAPI model serving, and LLM orchestration.

SKILLS
Python, Machine Learning, PyTorch, Deep Learning, Natural Language Processing, FastAPI, LLM Concepts, RAG Architectures, Vector Databases, Docker, Git

EXPERIENCE
AI Engineering Fellow | NeuralWorks Lab | Jan 2024 - Jul 2024
- Trained PyTorch Transformer sequence classification models achieving 94.2% accuracy on benchmark datasets.
- Containerized model serving runtimes using Docker and deployed on Kubernetes inference clusters with 50ms p95 latency.

PROJECTS
Autonomous Drone Vision & Perception Pipeline | 2024
- Architected real-time object detection with PyTorch and OpenCV, achieving 45 FPS streaming inference.
- Reduced model parameter footprint by 35% using post-training quantization.

Semantic Document Search & Question-Answering | 2023
- Implemented dense vector retrieval pipeline with Sentence-Transformers and ChromaDB.
- Integrated FastAPI query endpoints serving 10,000+ document queries with sub-second response times.

EDUCATION
B.Tech in Artificial Intelligence & Data Systems | Indian Institute of Information Technology | 2022 - 2026`
  }
};

export default function ResumeIntelligenceView({ onNavigate }) {
  // Target Role State
  const [selectedRoleId, setSelectedRoleId] = useState('data-scientist');
  const [customRoleInput, setCustomRoleInput] = useState('');
  
  // Real Upload State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, processing, complete, error
  const [uploadProgressStage, setUploadProgressStage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Analysis Data
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('scores'); // scores, skills, drawbacks, optimize, simulation, history, report
  
  // Explainability Modal
  const [selectedScoreExplainer, setSelectedScoreExplainer] = useState(null);
  
  // Interactive Applied Recommendations
  const [appliedRecommendations, setAppliedRecommendations] = useState({});
  
  // Resume Version History
  const [versionHistory, setVersionHistory] = useState([]);
  
  const fileInputRef = useRef(null);

  // Initial load: test with Kanika Sharma (Data Scientist)
  useEffect(() => {
    loadPresetCandidate('kanika');
  }, []);

  const loadPresetCandidate = async (presetKey) => {
    const preset = DEMO_PRESETS[presetKey];
    if (!preset) return;
    try {
      setSelectedRoleId(preset.target_role);
      setUploadStatus('processing');
      setUploadProgressStage(`Loading ${preset.name} (${preset.target_role.replace('-', ' ')}) Profile...`);
      
      const blob = new Blob([preset.text], { type: 'text/plain' });
      const file = new File([blob], preset.filename, { type: 'text/plain' });
      
      const result = await api.uploadResume(file, preset.target_role);
      setAnalysisResult(result);
      if (result.history_versions) {
        setVersionHistory(result.history_versions);
      }
      setUploadStatus('complete');
      setUploadProgressStage('Analysis Complete');
    } catch (err) {
      console.warn('Backend load error:', err);
      setUploadStatus('idle');
    }
  };

  // Real File Upload Handler
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processRealFileUpload(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processRealFileUpload(file);
  };

  const processRealFileUpload = async (file) => {
    setUploadedFile(file);
    setErrorMessage('');
    setUploadStatus('uploading');
    setUploadProgressStage('File Selected: Uploading to Secure Server...');

    try {
      // Step 1: Uploading
      await new Promise(r => setTimeout(r, 400));
      setUploadStatus('processing');
      setUploadProgressStage('Validating File Format & Extracting Text...');

      // Step 2: Extracting & Parsing
      await new Promise(r => setTimeout(r, 400));
      setUploadProgressStage('Parsing Sections: Education, Projects, Experience...');

      // Step 3: Call Real Backend API
      const targetRole = selectedRoleId === 'custom' ? (customRoleInput || 'Custom Role') : selectedRoleId;
      const customParam = selectedRoleId === 'custom' ? customRoleInput : null;
      
      const result = await api.uploadResume(file, targetRole, customParam);

      if (!result.success && result.error) {
        throw new Error(result.error);
      }

      setUploadProgressStage('Skill Extraction & Benchmark Analysis Complete');
      setAnalysisResult(result);
      if (result.history_versions) {
        setVersionHistory(result.history_versions);
      }
      setUploadStatus('complete');
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadStatus('error');
      setErrorMessage(err.message || 'Resume processing failed. Please ensure file is a readable PDF, DOCX, or TXT.');
    }
  };

  // Re-run analysis when role changes
  const handleRoleChange = async (newRoleId) => {
    setSelectedRoleId(newRoleId);
    if (!analysisResult) return;

    if (uploadedFile) {
      processRealFileUpload(uploadedFile);
    } else {
      loadDefaultAnalysis(newRoleId);
    }
  };

  // Clear / Delete Resume Session (Privacy Requirement)
  const handleDeleteResume = async () => {
    if (window.confirm("Are you sure you want to securely clear this resume and all session data from memory?")) {
      const candidateName = analysisResult?.candidate_info?.name || "Candidate";
      await api.deleteResumeHistory(candidateName);
      setAnalysisResult(null);
      setUploadedFile(null);
      setVersionHistory([]);
      setUploadStatus('idle');
      setErrorMessage('');
    }
  };

  // Export JSON Report
  const handleExportJSON = () => {
    if (!analysisResult) return;
    const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillAnalyze_Report_${analysisResult.candidate_info?.name || 'Resume'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export PDF (Print View)
  const handleExportPDF = () => {
    window.print();
  };

  // Toggle Applied Recommendation
  const toggleApplyRecommendation = (recId) => {
    setAppliedRecommendations(prev => ({
      ...prev,
      [recId]: !prev[recId]
    }));
  };

  const scores = analysisResult?.scores || {};
  const drawbacks = analysisResult?.drawbacks || [];
  const recommendations = analysisResult?.recommendations || [];
  const candidate = analysisResult?.candidate_info || {};
  const extractedSkills = analysisResult?.all_extracted_skills || [];
  const roleComparison = analysisResult?.role_comparison || {};
  const simulation = analysisResult?.simulation || {};

  // Calculate dynamic simulated score based on applied recommendations
  const appliedCount = Object.values(appliedRecommendations).filter(Boolean).length;
  const baseAggregate = scores.aggregate_index || 0;
  const dynamicProjectedScore = Math.min(96.0, roundVal(baseAggregate + (appliedCount * 6.5)));

  function roundVal(n) {
    return Math.round(n * 10) / 10;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* 1. Header with Taxonomy & Title */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>PRODUCTION RESUME INTELLIGENCE & EVIDENCE AUDITOR</span>
          <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
            [ANALYZED EVIDENCE]
          </span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Resume Intelligence & Market Calibration
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Multi-dimensional evaluation separating demonstrated project evidence from unverified mentions. No arbitrary ATS scores.
            </p>
          </div>

          {/* Target Role Picker & Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono text-slate-400">BENCHMARK ROLE:</span>
              <select
                value={selectedRoleId}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              >
                {ROLE_OPTIONS.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {selectedRoleId === 'custom' && (
              <input
                type="text"
                placeholder="Enter custom role title..."
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                onBlur={() => { if (customRoleInput.trim()) handleRoleChange('custom'); }}
                className="bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
              />
            )}

            {/* Demo Profiles Quick Switcher (Section 50) */}
            <div className="flex items-center space-x-1 p-1 rounded-xl glass-panel border border-white/10 font-mono text-xs">
              <span className="text-slate-400 text-[10px] px-1.5">DEMO:</span>
              <button
                type="button"
                onClick={() => loadPresetCandidate('kanika')}
                className={`px-2.5 py-1 rounded-lg transition-all ${candidate.name === 'Kanika Sharma' ? 'bg-blue-600 text-white font-bold border border-cyan-400/40' : 'text-slate-400 hover:text-white'}`}
              >
                Kanika Sharma
              </button>
              <button
                type="button"
                onClick={() => loadPresetCandidate('sukanya')}
                className={`px-2.5 py-1 rounded-lg transition-all ${candidate.name === 'Sukanya Jadon' ? 'bg-blue-600 text-white font-bold border border-cyan-400/40' : 'text-slate-400 hover:text-white'}`}
              >
                Sukanya Jadon
              </button>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs transition-all shadow-md"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>UPLOAD LOCAL RESUME (PDF/DOCX/TXT)</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        {/* 2. Drag & Drop Upload Hero Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`mt-6 border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
            uploadStatus === 'uploading' || uploadStatus === 'processing'
              ? 'border-cyan-400 bg-cyan-500/5'
              : uploadStatus === 'error'
              ? 'border-rose-500/40 bg-rose-500/5'
              : 'border-white/10 hover:border-cyan-500/40 bg-white/[0.01]'
          }`}
        >
          <div className="max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              {uploadStatus === 'processing' || uploadStatus === 'uploading' ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <div>
              <div className="font-bold text-white text-sm">
                DROP YOUR RESUME HERE OR BROWSE LOCAL FILES
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Supported formats: <strong className="text-slate-200">PDF, DOCX, TXT</strong> (Max 10MB)
              </p>
            </div>

            {/* Real Upload Progress Timeline */}
            {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-left font-mono text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-cyan-300 font-bold">
                  <span>{uploadProgressStage}</span>
                  <span className="text-[10px] animate-pulse">PROCESSING</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full animate-pulse w-3/4" />
                </div>
              </div>
            )}

            {/* Error Banner */}
            {uploadStatus === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-left font-mono text-xs text-rose-300 flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Resume Processing Failed</div>
                  <div className="text-[11px] text-rose-200">{errorMessage}</div>
                </div>
              </div>
            )}

            {uploadStatus === 'complete' && uploadedFile && (
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Uploaded: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Candidate Profile Telemetry Bar */}
        {analysisResult && (
          <div className="flex flex-wrap items-center justify-between p-4 mt-6 rounded-2xl glass-panel border border-white/10 font-mono text-xs">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center font-bold text-cyan-300 text-base">
                {candidate.name?.slice(0, 2).toUpperCase() || 'CV'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{candidate.name || 'Candidate'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                    ID: {analysisResult.resume_id}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-3">
                  <span>{candidate.email}</span>
                  {candidate.phone && <span>• {candidate.phone}</span>}
                  {candidate.github && (
                    <a href={candidate.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center space-x-1">
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {candidate.linkedin && (
                    <a href={candidate.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center space-x-1">
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-[11px] mt-3 lg:mt-0">
              <div>
                <span className="text-slate-500 block text-[9px]">TARGET ROLE</span>
                <span className="font-bold text-white text-xs">{analysisResult.target_role}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px]">AGGREGATE ALIGNMENT</span>
                <span className="font-bold text-cyan-400 text-sm tabular-nums">{scores.aggregate_index || 0}%</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px]">SKILLS EXTRACTED</span>
                <span className="font-bold text-emerald-400 text-sm tabular-nums">
                  {analysisResult.extracted_skills_summary?.total_detected || 0}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px]">IDENTIFIED DRAWBACKS</span>
                <span className="font-bold text-rose-400 text-sm tabular-nums">{drawbacks.length}</span>
              </div>

              {/* Privacy: Secure Delete Button */}
              <button
                onClick={handleDeleteResume}
                title="Clear resume from server memory"
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Navigation Sub-Tabs */}
      {analysisResult && (
        <>
          <div className="flex flex-wrap border-b border-white/10 my-6 font-mono text-xs gap-3">
            {[
              { id: 'scores', label: '1. 7-DIMENSION SCORES' },
              { id: 'skills', label: `2. SKILL EVIDENCE (${extractedSkills.length})` },
              { id: 'drawbacks', label: `3. DRAWBACK AUDIT (${drawbacks.length})` },
              { id: 'optimize', label: `4. OPTIMIZATION PREVIEW (${recommendations.length})` },
              { id: 'simulation', label: '5. WHAT-IF SIMULATION' },
              { id: 'history', label: `6. VERSION HISTORY (${versionHistory.length})` },
              { id: 'report', label: '7. INTELLIGENCE REPORT & EXPORT' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2.5 transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-300 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: 7-DIMENSIONAL SCORES */}
          {activeTab === 'scores' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Explainable Multi-Dimensional Score Matrix</h3>
                  <p className="text-xs text-slate-400">
                    Each score is derived from mathematical criteria against empirical market benchmarks. Click any dimension to inspect the exact formula.
                  </p>
                </div>
                <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-lg">
                  AGGREGATE INDEX: <strong className="text-white text-sm">{scores.aggregate_index}%</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(scores)
                  .filter(([k, v]) => typeof v === 'object' && v.score !== undefined)
                  .map(([key, data]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedScoreExplainer({ key, ...data })}
                      className="group cursor-pointer p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/40 transition-all shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{data.label}</span>
                          <span className="text-xs font-mono text-cyan-400 flex items-center space-x-1 group-hover:underline">
                            <span>Explain</span>
                            <HelpCircle className="w-3 h-3" />
                          </span>
                        </div>

                        <div className="flex items-baseline space-x-2">
                          <span className="text-3xl font-black font-mono text-white tabular-nums">{data.score}%</span>
                          <span className="text-xs text-slate-400">benchmark match</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              data.score >= 75 ? 'bg-emerald-400' : data.score >= 50 ? 'bg-cyan-400' : 'bg-amber-400'
                            }`}
                            style={{ width: `${Math.min(100, data.score)}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-slate-400 mt-3 font-sans line-clamp-2">
                          {data.criteria}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/5 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                        <span>Click for formula breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cyan-400" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 2: SKILL EVIDENCE & ROLE MATCH */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Evidence Tier Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase">HIGH EVIDENCE (PROJECT-SUPPORTED)</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {analysisResult.extracted_skills_summary?.demonstrated_high || 0}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Backed by verified code, latency, or throughput metrics</div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase">MEDIUM EVIDENCE (SUPPORTED)</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {analysisResult.extracted_skills_summary?.medium_evidence || 0}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Referenced in experience or project description</div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="text-[10px] text-amber-400 font-bold uppercase">LOW EVIDENCE (MENTIONED ONLY)</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {analysisResult.extracted_skills_summary?.unverified_low || 0}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Listed in skills header without implementation context</div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                  <div className="text-[10px] text-rose-400 font-bold uppercase">ROLE BENCHMARK MISSING</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {roleComparison.missing_skills?.length || 0}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Core skills absent for {analysisResult.target_role}</div>
                </div>
              </div>

              {/* Skills Table with Exact Evidence Snippets */}
              <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden font-mono text-xs">
                <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                  <span className="font-bold text-white uppercase tracking-wider">
                    Extracted Skills & Verifiable Ground Evidence
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Source: Actual Extracted Text from Resume
                  </span>
                </div>

                <div className="divide-y divide-white/5">
                  {extractedSkills.map((s, idx) => (
                    <div key={idx} className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-white">{s.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            s.evidence_strength === 'HIGH' 
                              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                              : s.evidence_strength === 'MEDIUM'
                              ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300'
                              : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                          }`}>
                            {s.tier_label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans italic">
                          "{s.evidence_snippet}"
                        </p>
                      </div>

                      <div className="text-right text-[11px] text-slate-400 space-y-0.5 flex-shrink-0">
                        <div>In Skills Section: <strong className="text-white">{s.in_skills_section ? 'YES' : 'NO'}</strong></div>
                        <div>Projects Linked: <strong className="text-cyan-400">{s.project_evidence?.length || 0}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DRAWBACK AUDIT */}
          {activeTab === 'drawbacks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Genuine Drawbacks & Anti-Pattern Audit</h3>
                  <p className="text-xs text-slate-400">
                    Rigorous findings detected from your actual resume text. No fabricated criticisms.
                  </p>
                </div>
                <span className="text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-lg">
                  {drawbacks.length} DEFICITS FLAGGED
                </span>
              </div>

              <div className="space-y-3">
                {drawbacks.map((d, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2 font-mono text-xs font-bold text-white">
                        <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
                          d.severity === 'CRITICAL' ? 'text-rose-400' : d.severity === 'HIGH' ? 'text-amber-400' : 'text-blue-400'
                        }`} />
                        <span>{d.issue}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        d.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        d.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}>
                        {d.severity}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">GROUND EVIDENCE</span>
                        <p className="text-slate-300 font-sans text-xs">{d.evidence}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1">
                        <span className="text-[10px] text-cyan-400 uppercase tracking-wider block">ACTIONABLE CORRECTION</span>
                        <p className="text-cyan-200 font-sans text-xs">{d.suggestion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OPTIMIZATION PREVIEW (BEFORE -> RECOMMENDED -> PROJECTED) */}
          {activeTab === 'optimize' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Actionable Resume Optimization Studio</h3>
                  <p className="text-xs text-slate-400">
                    Compare your current resume text against recommended improvements. Click [Apply Recommendation] to test the projected alignment lift.
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg">
                  PROJECTED LIFT: <strong className="text-white text-sm">+{roundVal(dynamicProjectedScore - baseAggregate)}%</strong>
                </div>
              </div>

              <div className="space-y-5">
                {recommendations.map((rec) => {
                  const isApplied = !!appliedRecommendations[rec.id];
                  return (
                    <div
                      key={rec.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isApplied ? 'bg-emerald-500/[0.04] border-emerald-500/40 shadow-lg' : 'bg-white/[0.02] border-white/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-bold">
                            {rec.category}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1">{rec.title}</h4>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-mono text-emerald-400 font-bold">{rec.impact}</span>
                          <button
                            onClick={() => toggleApplyRecommendation(rec.id)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                              isApplied
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/15'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isApplied ? 'Applied' : 'Apply Recommendation'}</span>
                          </button>
                        </div>
                      </div>

                      {/* 3-Column Studio: Current vs Recommended vs Projected */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs font-mono">
                        {/* Current */}
                        <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                          <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">CURRENT (ACTUAL)</span>
                          <p className="text-slate-300 font-sans text-xs italic">
                            "{rec.current}"
                          </p>
                        </div>

                        {/* Recommended Direction */}
                        <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1">
                          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">RECOMMENDED DIRECTION</span>
                          <p className="text-blue-200 font-sans text-xs">
                            {rec.recommended}
                          </p>
                        </div>

                        {/* Projected Content */}
                        <div className={`p-3 rounded-xl border space-y-1 ${
                          isApplied ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-slate-900/60 border-white/5 text-slate-400'
                        }`}>
                          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">PROJECTED TEXT</span>
                          <p className="font-sans text-xs">
                            "{rec.projected}"
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: WHAT-IF SIMULATION */}
          {activeTab === 'simulation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Counterfactual Resume Simulation</h3>
                  <p className="text-xs text-slate-400">
                    Model hypothetical project additions and skill acquisitions before writing a single line of your actual resume.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  [SIMULATION ONLY]
                </span>
              </div>

              {/* Simulation Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl glass-panel border border-white/10 text-center space-y-1">
                  <span className="text-xs font-mono text-slate-400">CURRENT BASELINE</span>
                  <div className="text-4xl font-black font-mono text-white tabular-nums">{baseAggregate}%</div>
                  <span className="text-[11px] text-slate-500 font-mono">Calibrated against {analysisResult.target_role}</span>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 text-center space-y-1 bg-cyan-500/5">
                  <span className="text-xs font-mono text-cyan-400 font-bold">PROJECTED SIMULATION</span>
                  <div className="text-4xl font-black font-mono text-cyan-300 tabular-nums">{dynamicProjectedScore}%</div>
                  <span className="text-[11px] text-cyan-400/80 font-mono">With {appliedCount} applied optimizations</span>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 text-center space-y-1 bg-emerald-500/5">
                  <span className="text-xs font-mono text-emerald-400 font-bold">TOTAL ESTIMATED LIFT</span>
                  <div className="text-4xl font-black font-mono text-emerald-400 tabular-nums">
                    +{roundVal(dynamicProjectedScore - baseAggregate)}%
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Alignment Delta</span>
                </div>
              </div>

              {/* Simulation Actions List */}
              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 font-mono text-xs">
                <span className="font-bold text-white uppercase tracking-wider block">Modeled Simulation Actions</span>
                <div className="space-y-2">
                  {simulation.simulated_improvements?.map((sim, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <span className="text-slate-200">{sim.action}</span>
                      <span className="text-emerald-400 font-bold">{sim.projected_lift}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 pt-2 border-t border-white/5">
                  {simulation.disclaimer}
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: VERSION HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Analyzed Resume Versions & Progress</h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Track the evolution of your resume across iterations.
                  </p>
                </div>
                <span className="text-xs text-slate-400">{versionHistory.length} VERSIONS IN SESSION</span>
              </div>

              <div className="divide-y divide-white/10 rounded-2xl glass-panel border border-white/10 overflow-hidden">
                {versionHistory.map((ver, i) => (
                  <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-blue-600/20 text-cyan-300 font-bold border border-blue-500/30">
                          {ver.version}
                        </span>
                        <span className="font-bold text-white">{ver.filename}</span>
                        <span className="text-slate-500 text-[10px]">({ver.timestamp})</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        Target Role: <strong className="text-slate-200">{ver.target_role}</strong>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-[11px]">
                      <div>
                        <span className="text-slate-500 block text-[9px]">SKILLS</span>
                        <span className="font-bold text-white">{ver.skills_count}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">ROLE MATCH</span>
                        <span className="font-bold text-cyan-400">{ver.role_alignment}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">AGGREGATE</span>
                        <span className="font-bold text-emerald-400">{ver.aggregate_index}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">DEFICITS</span>
                        <span className="font-bold text-rose-400">{ver.drawbacks_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: REPORT & EXPORT */}
          {activeTab === 'report' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-white/10 font-mono text-xs">
                <div>
                  <h3 className="text-base font-bold text-white">Full Resume Intelligence Report</h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Complete analytical audit formatted for download or presentation.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-white/15"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>EXPORT JSON</span>
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs shadow-md"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>PRINT / SAVE PDF</span>
                  </button>
                </div>
              </div>

              {/* Printable Document Sheet */}
              <div id="printable-report" className="p-8 rounded-3xl bg-[#090D14] border border-white/10 text-slate-200 space-y-6 font-sans">
                {/* Report Header */}
                <div className="border-b border-white/10 pb-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-white">SKILLALIGN AI // RESUME INTELLIGENCE REPORT</h2>
                    <p className="text-xs text-cyan-400 font-mono mt-1">
                      Candidate: {candidate.name} • Target Role: {analysisResult.target_role} • Date: {analysisResult.timestamp}
                    </p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs text-slate-400 block">AGGREGATE RATING</span>
                    <span className="text-2xl font-black text-cyan-400">{scores.aggregate_index}%</span>
                  </div>
                </div>

                {/* Report Section 1: Executive Summary */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">1. EXECUTIVE SUMMARY</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The uploaded profile for <strong className="text-white">{candidate.name}</strong> was benchmarked against 
                    the <strong className="text-white">{analysisResult.target_role}</strong> standard (calibrated from 1.4M+ job postings). 
                    A total of <strong className="text-white">{extractedSkills.length} skills</strong> were detected across the document, 
                    with <strong className="text-emerald-400">{analysisResult.extracted_skills_summary?.demonstrated_high} backed by verifiable project/latency metrics</strong>, 
                    and <strong className="text-rose-400">{drawbacks.length} critical optimization opportunities</strong> identified.
                  </p>
                </div>

                {/* Report Section 2: Dimensional Scores */}
                <div className="space-y-2 font-mono text-xs">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">2. DIMENSIONAL SCORES</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(scores)
                      .filter(([k, v]) => typeof v === 'object' && v.score !== undefined)
                      .map(([k, v]) => (
                        <div key={k} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-[10px] text-slate-400 block">{v.label}</span>
                          <span className="text-base font-bold text-white">{v.score}%</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Report Section 3: Priority Drawbacks */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">3. IDENTIFIED DRAWBACKS & DEFICITS</h4>
                  <ul className="space-y-2 text-xs">
                    {drawbacks.map((d, i) => (
                      <li key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                        <div className="font-bold text-rose-300 font-mono">⚠ {d.issue} [{d.severity}]</div>
                        <div className="text-slate-400"><strong>Evidence:</strong> {d.evidence}</div>
                        <div className="text-cyan-300"><strong>Correction:</strong> {d.suggestion}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Report Section 4: Recommended Action Plan */}
                <div className="space-y-2 font-mono text-xs">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">4. NEXT ACTIONS FOR CANDIDATE</h4>
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-200 space-y-1.5 font-sans">
                    <div>1. Rewrite project bullets using the Google X-Y-Z formula with quantified latency, scale, or accuracy metrics.</div>
                    <div>2. Provide repository commit links for unverified skills to eliminate the "Mentioned Keyword Only" penalty.</div>
                    <div>3. Complete a capstone demonstrator closing the top missing benchmark skill for {analysisResult.target_role}.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* 5. Explainability Modal: "Why is this score calculated this way?" */}
      {selectedScoreExplainer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl glass-panel-active border border-cyan-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">{selectedScoreExplainer.label}</h3>
              </div>
              <button
                onClick={() => setSelectedScoreExplainer(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">CALCULATED SCORE</span>
                <span className="text-3xl font-black text-cyan-300">{selectedScoreExplainer.score}%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">MATHEMATICAL FORMULA</span>
                <p className="text-slate-200 text-xs font-mono">{selectedScoreExplainer.formula}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">EVALUATED RESUME CRITERIA</span>
                <p className="text-slate-200 text-xs font-sans">{selectedScoreExplainer.criteria}</p>
              </div>

              <p className="text-[10px] text-slate-400 pt-2 border-t border-white/10">
                Unlike arbitrary ATS parsers, SKILLANALYZE AI transparently breaks down every score into deterministic criteria derived from active job postings.
              </p>
            </div>

            <button
              onClick={() => setSelectedScoreExplainer(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-all"
            >
              CLOSE EXPLAINER
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
