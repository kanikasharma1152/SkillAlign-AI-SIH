import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function LaunchSequence({ onComplete }) {
  const [step, setStep] = useState(0);
  const [completedChecks, setCompletedChecks] = useState([]);
  const canvasRef = useRef(null);

  const checks = [
    { id: 'market', label: 'MARKET DATA', status: 'SYNCHRONIZING' },
    { id: 'graph', label: 'SKILL GRAPH', status: 'TOPOLOGY MAP READY' },
    { id: 'trend', label: 'TREND ENGINE', status: 'VELOCITY COMPUTED' },
    { id: 'nlp', label: 'NLP EXTRACTION', status: 'EMBEDDINGS READY' },
    { id: 'forecast', label: 'FORECAST ENGINE', status: 'POLYNOMIAL RIDGE READY' },
    { id: 'gap', label: 'GAP ANALYSIS', status: 'BENCHMARKS LOADED' },
    { id: 'sim', label: 'SIMULATION ENGINE', status: 'CONVERGENCE VERIFIED' },
    { id: 'curriculum', label: 'CURRICULUM INTELLIGENCE', status: 'SYLLABI MAPPED' },
    { id: 'resume', label: 'RESUME INTELLIGENCE', status: 'EVIDENCE PARSER READY' },
    { id: 'workforce', label: 'WORKFORCE GRAPH', status: 'RELATIONAL NETWORK MAPPED' }
  ];

  // Canvas particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes = [
      { x: canvas.width * 0.45, y: canvas.height * 0.35, vx: 0.15, vy: -0.1, label: 'GenAI' },
      { x: canvas.width * 0.55, y: canvas.height * 0.35, vx: -0.1, vy: 0.12, label: 'RAG' },
      { x: canvas.width * 0.38, y: canvas.height * 0.48, vx: 0.2, vy: 0.15, label: 'Python' },
      { x: canvas.width * 0.50, y: canvas.height * 0.50, vx: 0, vy: 0, label: 'CORE', center: true },
      { x: canvas.width * 0.62, y: canvas.height * 0.48, vx: -0.15, vy: -0.2, label: 'VectorDB' },
      { x: canvas.width * 0.44, y: canvas.height * 0.62, vx: 0.1, vy: -0.15, label: 'MLOps' },
      { x: canvas.width * 0.56, y: canvas.height * 0.62, vx: -0.2, vy: 0.1, label: 'Cloud' }
    ];

    const render = () => {
      ctx.fillStyle = 'rgba(6, 8, 13, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 260) {
            const alpha = Math.max(0, 1 - dist / 260) * 0.45;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        if (!node.center) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < canvas.width * 0.3 || node.x > canvas.width * 0.7) node.vx *= -1;
          if (node.y < canvas.height * 0.25 || node.y > canvas.height * 0.75) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.center ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = node.center ? '#00E5FF' : '#3B82F6';
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = '10px JetBrains Mono';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(node.label, node.x + 8, node.y + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Timed progression sequence
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);

    const checkTimers = checks.map((c, idx) => {
      return setTimeout(() => {
        setCompletedChecks(prev => [...prev, c.id]);
      }, 450 + idx * 180);
    });

    const t2 = setTimeout(() => setStep(2), 2200);
    const t3 = setTimeout(() => {
      setStep(3);
      setTimeout(() => onComplete(), 450);
    }, 3400);

    const handleKey = (e) => {
      if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t1);
      checkTimers.forEach(clearTimeout);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-50 bg-[#06080D] flex flex-col items-center justify-center transition-opacity duration-700 select-none ${step === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg p-7 mx-4 glass-panel rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              SKILL INTELLIGENCE INITIALIZING...
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">v3.0_LIVE</span>
        </div>

        {/* 9-System Checks Checklist */}
        <div className="space-y-1.5 font-mono text-xs max-h-[220px] overflow-y-auto pr-1">
          {checks.map((check) => {
            const isDone = completedChecks.includes(check.id);
            return (
              <div
                key={check.id}
                className={`flex items-center justify-between p-1.5 rounded transition-all duration-200 ${
                  isDone ? 'bg-white/[0.03] text-slate-200' : 'text-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                  <span className="tracking-wider text-[11px]">{check.label}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  {isDone ? (
                    <>
                      <span className="text-[9px] text-cyan-400 font-mono">{check.status}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </>
                  ) : (
                    <span className="text-[9px] text-slate-600 animate-pulse">QUEUED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Reveal Stage */}
        <div className={`mt-5 text-center transition-all duration-700 ${step >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-3'}`}>
          <div className="inline-block px-3 py-0.5 mb-1.5 text-[9px] font-mono tracking-widest uppercase rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20">
            SYSTEM BOOT COMPLETE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
            SKILLALIGN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI</span>
          </h1>
          <p className="mt-1 text-[11px] font-medium text-slate-400 max-w-sm mx-auto leading-relaxed">
            "Analyze today's skills. Predict tomorrow's demand. Adapt before the gap grows."
          </p>
        </div>

        {/* Quick Launch Skip button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={onComplete}
            className="text-[10px] font-mono text-slate-400 hover:text-white transition-colors flex items-center space-x-1 px-3 py-1 rounded-lg border border-white/10 hover:border-cyan-400/40 bg-white/[0.02]"
          >
            <span>Press Space or Click to Enter Platform</span>
            <span className="text-cyan-400">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
