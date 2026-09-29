import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Sparkles, ArrowRight, Activity } from 'lucide-react';
import { api } from '../services/api';

export default function VoiceAgentModal({ isOpen, onClose, onVoiceCommand, currentSection }) {
  // Agent States: 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING'
  const [agentState, setAgentState] = useState('IDLE');
  const [transcript, setTranscript] = useState('');
  const [spokenResponse, setSpokenResponse] = useState('');
  const [audioLevel, setAudioLevel] = useState(0.2);
  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const sampleCommands = [
    "Which skills should I learn next?",
    "Why is Generative AI growing so fast?",
    "What am I missing for Data Scientist?",
    "Compare my profile with ML Engineer.",
    "What happens if I learn Generative AI?",
    "Show me the market radar."
  ];

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setAgentState('LISTENING');
        setTranscript('');
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onend = () => {
        // If we captured something, trigger command processing
        setAgentState((prev) => {
          if (prev === 'LISTENING') {
            return 'THINKING';
          }
          return prev;
        });
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setAgentState('IDLE');
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Process text once in THINKING state
  useEffect(() => {
    if (agentState === 'THINKING' && transcript.trim()) {
      handleProcessCommand(transcript);
    }
  }, [agentState, transcript]);

  // Execute command parsing & text-to-speech response
  const handleProcessCommand = async (text) => {
    setAgentState('THINKING');
    const result = await api.parseVoiceIntent(text, currentSection);

    setTimeout(() => {
      setSpokenResponse(result.spoken_response);
      setAgentState('SPEAKING');

      // Dispatch UI action
      if (onVoiceCommand) {
        onVoiceCommand(result);
      }

      // Voice speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(result.spoken_response);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          setTimeout(() => setAgentState('IDLE'), 800);
        };
        utterance.onerror = () => {
          setAgentState('IDLE');
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setAgentState('IDLE'), 3500);
      }
    }, 900);
  };

  const handleStartListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      }
    } else {
      // Mock listening for environments without speech recognition
      setAgentState('LISTENING');
      setTranscript('Show me future demand for GenAI');
      setTimeout(() => {
        setAgentState('THINKING');
      }, 1500);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setAgentState('IDLE');
  };

  // Canvas Responsive Waveform
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const mid = height / 2;

      let amplitude = 6;
      let freq = 0.04;
      let strokeColor = '#3B82F6';

      if (agentState === 'LISTENING') {
        amplitude = 24;
        freq = 0.08;
        strokeColor = '#00E5FF';
      } else if (agentState === 'THINKING') {
        amplitude = 12;
        freq = 0.12;
        strokeColor = '#A78BFA';
      } else if (agentState === 'SPEAKING') {
        amplitude = 28;
        freq = 0.06;
        strokeColor = '#10B981';
      }

      // Draw 3 harmonic waves
      for (let w = 1; w <= 3; w++) {
        ctx.beginPath();
        ctx.lineWidth = w === 1 ? 2.5 : 1.2;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = 1.0 / w;

        for (let x = 0; x < width; x++) {
          const y = mid + Math.sin(x * freq + phase * w) * (amplitude / w);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += 0.08;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, agentState]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] p-8 text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            window.speechSynthesis?.cancel();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* State Symbol & Status */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ASK SKILLALIGN AI VOICE CO-PILOT</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white font-sans">
            {agentState === 'IDLE' && '◉ ASK SKILLALIGN'}
            {agentState === 'LISTENING' && '◉ LISTENING...'}
            {agentState === 'THINKING' && '◉ REASONING OVER GRAPH...'}
            {agentState === 'SPEAKING' && '◉ SPEAKING & UPDATING UI'}
          </h2>

          {agentState === 'THINKING' && (
            <p className="text-[11px] font-mono text-cyan-300">
              MARKET → SKILLS → FORECAST → ROLE → WHAT-IF
            </p>
          )}
        </div>

        {/* Responsive Audio Waveform Canvas */}
        <div className="w-full h-24 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden relative">
          <canvas ref={canvasRef} width={480} height={96} className="w-full h-full" />
        </div>

        {/* Transcript or Spoken Response */}
        <div className="min-h-[50px] flex items-center justify-center font-mono text-xs px-4">
          {transcript && (
            <p className="text-cyan-300 italic">
              "{transcript}"
            </p>
          )}
          {agentState === 'SPEAKING' && spokenResponse && (
            <p className="text-slate-200 leading-relaxed font-sans text-sm border-l-2 border-emerald-400 pl-3 text-left">
              {spokenResponse}
            </p>
          )}
          {agentState === 'IDLE' && !transcript && (
            <p className="text-slate-500">
              Click the microphone or choose a sample prompt below to control the interface by voice.
            </p>
          )}
        </div>

        {/* Microphone Primary Trigger Button */}
        <div className="flex justify-center">
          <button
            onClick={agentState === 'LISTENING' ? handleStopListening : handleStartListening}
            className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all shadow-2xl ${
              agentState === 'LISTENING'
                ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_30px_rgba(244,63,94,0.6)]'
                : 'bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)]'
            }`}
          >
            {agentState === 'LISTENING' ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
        </div>

        {/* Quick Voice Command Chips */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
            OR TEST PRESET VOICE COMMAND (TRIGGERS UI SYNC):
          </span>
          <div className="flex flex-wrap justify-center gap-1.5 font-mono text-[11px]">
            {sampleCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setTranscript(cmd);
                  handleProcessCommand(cmd);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40 transition-all text-left"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
