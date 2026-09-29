import React, { useState, useEffect } from 'react';
import LaunchSequence from './components/LaunchSequence';
import HeaderNav, { NAV_ITEMS } from './components/HeaderNav';
import IntelligenceOverview from './components/IntelligenceOverview';
import SkillDNAView from './components/SkillDNAView';
import MarketRadarView from './components/MarketRadarView';
import ForecastEngineView from './components/ForecastEngineView';
import PredictionLabView from './components/PredictionLabView';
import SkillGapView from './components/SkillGapView';
import WhatIfSimulatorView from './components/WhatIfSimulatorView';
import ResumeIntelligenceView from './components/ResumeIntelligenceView';
import LearningRoadmapView from './components/LearningRoadmapView';
import CurriculumIntelligenceView from './components/CurriculumIntelligenceView';
import IndustryDashboardView from './components/IndustryDashboardView';
import WorkforceGraphView from './components/WorkforceGraphView';
import VoiceAgentModal from './components/VoiceAgentModal';
import { Bell, X, AlertTriangle, ArrowRight } from 'lucide-react';
import { api } from './services/api';
import { FALLBACK_MARKET_DATA } from './data/mockFallback';

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [activeSection, setActiveSection] = useState('intelligence');
  const [forecastTargetSkill, setForecastTargetSkill] = useState('rag');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);
  const [alerts, setAlerts] = useState(FALLBACK_MARKET_DATA.monitoring_alerts);
  const [skills, setSkills] = useState(FALLBACK_MARKET_DATA.skills);
  const [roles, setRoles] = useState(FALLBACK_MARKET_DATA.roles);
  const [userProfile, setUserProfile] = useState(FALLBACK_MARKET_DATA.sample_user_profile);

  useEffect(() => {
    const initData = async () => {
      try {
        const [loadedSkills, loadedRoles, overview, loadedAlerts] = await Promise.all([
          api.getSkills(),
          api.getRoles(),
          api.getOverview(),
          api.getMonitoringAlerts()
        ]);
        if (loadedSkills) setSkills(loadedSkills);
        if (loadedRoles) setRoles(loadedRoles);
        if (overview?.sample_user) setUserProfile(overview.sample_user);
        if (loadedAlerts) setAlerts(loadedAlerts);
      } catch (e) {
        console.warn('Using client memory dataset');
      }
    };
    initData();
  }, []);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        setIsVoiceModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsVoiceModalOpen(false);
        setIsAlertsDrawerOpen(false);
      } else if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (NAV_ITEMS[index]) {
          setActiveSection(NAV_ITEMS[index].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleVoiceCommand = (commandPayload) => {
    if (commandPayload.section) {
      setActiveSection(commandPayload.section);
    }
    if (commandPayload.target_skill) {
      setForecastTargetSkill(commandPayload.target_skill);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-white">
      
      {/* 1. Cinematic Startup Sequence */}
      {!hasLaunched && (
        <LaunchSequence onComplete={() => setHasLaunched(true)} />
      )}

      {/* 2. Top Header Navigation */}
      <HeaderNav
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onRestartLaunch={() => setHasLaunched(false)}
        onOpenAlerts={() => setIsAlertsDrawerOpen(!isAlertsDrawerOpen)}
        alertCount={alerts.length}
      />

      {/* Continuous Monitoring Alert Drawer (Section 26) */}
      {isAlertsDrawerOpen && (
        <div className="fixed top-16 right-4 z-50 w-full max-w-md p-5 rounded-2xl glass-panel-active border border-cyan-500/40 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>CONTINUOUS MARKET TELEMETRY ALERTS</span>
            </span>
            <button
              onClick={() => setIsAlertsDrawerOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 mt-3 max-h-72 overflow-y-auto">
            {alerts.map((al) => (
              <div key={al.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    {al.type}
                  </span>
                  <span className="text-[9px] text-slate-500">{al.timestamp}</span>
                </div>
                <p className="text-slate-200 text-xs font-sans">{al.message}</p>
                <div className="text-[10px] text-slate-400 pt-1">
                  <strong>Action: </strong>{al.recommended_action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Main Dynamic Content Stages */}
      <main className="flex-1 w-full relative">
        {activeSection === 'intelligence' && (
          <IntelligenceOverview
            onNavigate={setActiveSection}
            skills={skills}
            roles={roles}
          />
        )}

        {activeSection === 'skill-dna' && (
          <SkillDNAView
            onNavigate={setActiveSection}
            userSkills={userProfile.skills}
          />
        )}

        {activeSection === 'radar' && (
          <MarketRadarView
            onNavigate={setActiveSection}
            skills={skills}
          />
        )}

        {activeSection === 'forecast' && (
          <ForecastEngineView
            onNavigate={setActiveSection}
            preselectedSkillId={forecastTargetSkill}
          />
        )}

        {activeSection === 'prediction-lab' && (
          <PredictionLabView
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === 'skill-gap' && (
          <SkillGapView
            onNavigate={setActiveSection}
            userSkills={userProfile.skills}
          />
        )}

        {activeSection === 'what-if' && (
          <WhatIfSimulatorView
            onNavigate={setActiveSection}
            userSkills={userProfile.skills}
          />
        )}

        {activeSection === 'resume-intelligence' && (
          <ResumeIntelligenceView
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === 'learning-roadmap' && (
          <LearningRoadmapView
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === 'curriculum' && (
          <CurriculumIntelligenceView
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === 'industry' && (
          <IndustryDashboardView
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === 'workforce-graph' && (
          <WorkforceGraphView
            onNavigate={setActiveSection}
          />
        )}
      </main>

      {/* 4. Real-time Voice Agent Modal (ASK SKILLALIGN) */}
      <VoiceAgentModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onVoiceCommand={handleVoiceCommand}
        currentSection={activeSection}
      />

      {/* 5. Precision Bloomberg-Style Footer Bar */}
      <footer className="border-t border-white/[0.08] bg-[#05070A] py-6 px-4 sm:px-6 font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-slate-300">SKILLALIGN AI</span>
            <span>//</span>
            <span className="text-[11px] text-slate-400">
              Future Workforce & Skill Intelligence System
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px]">
            <span>ENGINE: FASTAPI + NUMPY POLYNOMIAL RIDGE + RESUME EVIDENCE PARSER</span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: 60 FPS OPTIMIZED</span>
            <span>•</span>
            <span>SIH 2026 EDITION</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
