import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  BookOpen, 
  Cpu, 
  FolderGit2 
} from 'lucide-react';

export default function WorkforceGraphView({ onNavigate }) {
  const [selectedEntityFilter, setSelectedEntityFilter] = useState('all');
  const [selectedNode, setSelectedNode] = useState(null);

  const entities = [
    { id: 'role-ai', name: 'AI / GenAI Engineer', type: 'Role', x: 50, y: 45, radius: 18, color: '#3B82F6', connections: 7 },
    { id: 'skill-rag', name: 'RAG Architectures', type: 'Skill', x: 74, y: 32, radius: 15, color: '#06B6D4', connections: 5 },
    { id: 'skill-agent', name: 'Agentic AI', type: 'Skill', x: 80, y: 60, radius: 14, color: '#06B6D4', connections: 4 },
    { id: 'skill-vector', name: 'Vector Databases', type: 'Technology', x: 62, y: 22, radius: 13, color: '#10B981', connections: 4 },
    { id: 'skill-mlops', name: 'MLOps Pipelines', type: 'Skill', x: 30, y: 35, radius: 14, color: '#06B6D4', connections: 5 },
    { id: 'ind-fintech', name: 'Fintech & Banking', type: 'Industry', x: 22, y: 65, radius: 15, color: '#8B5CF6', connections: 4 },
    { id: 'ind-health', name: 'Healthcare AI', type: 'Industry', x: 78, y: 80, radius: 14, color: '#8B5CF6', connections: 3 },
    { id: 'course-cs603', name: 'CS603 Data Systems', type: 'Course', x: 42, y: 78, radius: 12, color: '#F59E0B', connections: 3 },
    { id: 'proj-ridenow', name: 'Project: RideNow', type: 'Project', x: 20, y: 20, radius: 12, color: '#EC4899', connections: 3 }
  ];

  const edges = [
    { from: 'role-ai', to: 'skill-rag', label: 'Primary Benchmark' },
    { from: 'role-ai', to: 'skill-agent', label: 'Emerging Requirement' },
    { from: 'role-ai', to: 'skill-mlops', label: 'Deployment Telemetry' },
    { from: 'skill-rag', to: 'skill-vector', label: 'Prerequisite' },
    { from: 'skill-rag', to: 'skill-agent', label: 'Tool Invocation' },
    { from: 'ind-fintech', to: 'skill-rag', label: 'Private Data Retrieval' },
    { from: 'ind-health', to: 'skill-rag', label: 'Clinical Guidelines' },
    { from: 'course-cs603', to: 'skill-vector', label: 'Modern Curriculum Gap' },
    { from: 'proj-ridenow', to: 'skill-mlops', label: 'Missing CI/CD' }
  ];

  const filteredEntities = entities.filter(e => {
    if (selectedEntityFilter === 'all') return true;
    return e.type.toLowerCase() === selectedEntityFilter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
          <Network className="w-4 h-4 text-cyan-400" />
          <span>MULTI-ENTITY WORKFORCE GRAPH // GLOBAL TOPOLOGY</span>
          <span className="px-2 py-0.5 rounded text-[9px] bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
            [GRAPH TOPOLOGY]
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Workforce Skill Graph & Interconnected Ecosystem
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Explore interconnected relationships across Skills, Roles, Industries, Technologies, Projects, and Higher Education Courses.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {['all', 'Skill', 'Role', 'Industry', 'Technology', 'Course', 'Project'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedEntityFilter(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedEntityFilter === cat
                    ? 'bg-blue-600 text-white border-blue-400 font-bold'
                    : 'bg-white/[0.02] text-slate-400 hover:text-white border-white/10'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Interactive Canvas Graph */}
        <div className="lg:col-span-8 relative aspect-[16/10] max-h-[580px] rounded-3xl glass-panel border border-white/10 p-6 overflow-hidden flex items-center justify-center">
          
          {/* Ambient Grids */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* SVG Connecting Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map((edge, idx) => {
              const src = entities.find(e => e.id === edge.from);
              const tgt = entities.find(e => e.id === edge.to);
              if (!src || !tgt) return null;
              return (
                <line
                  key={idx}
                  x1={`${src.x}%`}
                  y1={`${src.y}%`}
                  x2={`${tgt.x}%`}
                  y2={`${tgt.y}%`}
                  stroke="rgba(59, 130, 246, 0.28)"
                  strokeWidth="1.5"
                  strokeDasharray={edge.label.includes('Missing') || edge.label.includes('Gap') ? '3 3' : undefined}
                />
              );
            })}
          </svg>

          {/* Graph Nodes */}
          {filteredEntities.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 group"
                style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: isSelected ? 30 : 10 }}
              >
                <div
                  className={`rounded-full flex items-center justify-center font-mono font-bold transition-all shadow-lg ${
                    isSelected ? 'scale-125 ring-4 ring-cyan-400/50' : 'hover:scale-110'
                  }`}
                  style={{
                    width: `${node.radius * 2.8}px`,
                    height: `${node.radius * 2.8}px`,
                    backgroundColor: node.color,
                    color: '#06080D'
                  }}
                >
                  <span className="text-[10px] text-center px-1 font-sans font-bold leading-tight">
                    {node.name.split(' ')[0]}
                  </span>
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap pointer-events-none">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 text-slate-200 border border-white/10 shadow-md">
                    {node.name} [{node.type}]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Entity Intelligence Panel */}
        <div className="lg:col-span-4 space-y-4">
          {selectedNode ? (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-slate-400 text-[10px] uppercase">NODE SPECIFICATION</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: `${selectedNode.color}25`, color: selectedNode.color }}>
                  {selectedNode.type}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white font-sans">{selectedNode.name}</h3>
                <span className="text-xs text-slate-400">{selectedNode.connections} Graph Interconnections</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase block">Adjacent Node Traversal:</span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).map((e, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <span className="text-cyan-400">→</span>
                      <span>{e.from === selectedNode.id ? e.to.replace('-', ': ') : e.from.replace('-', ': ')}</span>
                      <span className="text-slate-500 text-[9px]">({e.label})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate(selectedNode.type === 'Role' ? 'skill-gap' : 'forecast')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-colors flex items-center justify-center space-x-1 shadow-md"
                >
                  <span>Inspect in Intelligence Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center font-mono text-xs text-slate-500 space-y-2">
              <Network className="w-8 h-8 text-cyan-400/40 mx-auto" />
              <p>Click any entity node to inspect its multi-dimensional connection topology and industry demand links.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
