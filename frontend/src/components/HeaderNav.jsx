import React from 'react';
import { 
  Compass, 
  Dna, 
  Radio, 
  TrendingUp, 
  FlaskConical,
  GitCompare, 
  Sliders, 
  FileText,
  Map,
  GraduationCap, 
  Briefcase, 
  Network,
  Mic,
  Activity,
  Bell
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'intelligence', label: 'Intelligence', icon: Compass, symbol: '◉' },
  { id: 'skill-dna', label: 'Skill DNA', icon: Dna, symbol: '◈' },
  { id: 'radar', label: 'Market Radar', icon: Radio, symbol: '⌁' },
  { id: 'forecast', label: 'Forecast', icon: TrendingUp, symbol: '◌' },
  { id: 'prediction-lab', label: 'Prediction Lab', icon: FlaskConical, symbol: '🧪' },
  { id: 'skill-gap', label: 'Skill Gap', icon: GitCompare, symbol: '△' },
  { id: 'what-if', label: 'What-If', icon: Sliders, symbol: '⬡' },
  { id: 'resume-intelligence', label: 'Resume AI', icon: FileText, symbol: '📄' },
  { id: 'learning-roadmap', label: 'Roadmap', icon: Map, symbol: '🗺️' },
  { id: 'curriculum', label: 'Curriculum', icon: GraduationCap, symbol: '▦' },
  { id: 'industry', label: 'Industry', icon: Briefcase, symbol: '⚡' },
  { id: 'workforce-graph', label: 'Workforce Graph', icon: Network, symbol: '🌐' }
];

export default function HeaderNav({ 
  activeSection, 
  onSelectSection, 
  onOpenVoice, 
  onRestartLaunch,
  onOpenAlerts,
  alertCount = 3 
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#06080D]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={onRestartLaunch} title="Click to replay startup sequence">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/30 group-hover:border-cyan-400 transition-all">
            <Activity className="w-4 h-4 text-cyan-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white font-sans">SKILLALIGN</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-cyan-400 font-semibold border border-blue-500/30">AI</span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 hidden xl:block">Workforce & Skill Intelligence Platform</p>
          </div>
        </div>

        {/* Primary Desktop Navigation Bar (Scrollable for comprehensive coverage) */}
        <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-md overflow-x-auto max-w-2xl xl:max-w-3xl no-scrollbar">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`relative whitespace-nowrap flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-blue-600/25 border border-cyan-400/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                }`}
                title={item.label}
              >
                <span className={`text-[10px] ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                  {item.symbol}
                </span>
                <span className="text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions & Alerts */}
        <div className="flex items-center space-x-2.5">
          {/* Continuous Monitoring Alert Trigger */}
          <button
            onClick={onOpenAlerts}
            className="relative p-2 rounded-xl glass-panel border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-colors"
            title="Continuous Market Telemetry Alerts (Section 26)"
          >
            <Bell className="w-4 h-4 text-cyan-400" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                {alertCount}
              </span>
            )}
          </button>

          {/* ASK SKILLALIGN Voice Button */}
          <button
            onClick={onOpenVoice}
            className="group relative flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 hover:border-cyan-400/50 transition-all"
            title="Press [V] or Click to activate ASK SKILLALIGN Voice Intelligence"
          >
            <div className="relative flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -inset-1 rounded-full bg-cyan-400/20 animate-ping opacity-75" />
            </div>
            <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-200 group-hover:text-white hidden sm:block">
              ASK SKILLALIGN
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Horizontal Navigation Scroll */}
      <div className="lg:hidden flex items-center space-x-2 px-4 py-2 overflow-x-auto border-t border-white/[0.05] bg-[#0A0E17]/95 no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`whitespace-nowrap flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/30 text-white border border-cyan-400/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px]">{item.symbol}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
