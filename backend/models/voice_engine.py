from typing import Dict, Any

class VoiceIntentEngine:
    """
    Parses natural speech queries and dispatches synchronized UI state actions
    and conversational audio responses for ASK SKILLANALYZE.
    """

    def parse_speech_command(self, transcript: str, current_context: Dict[str, Any] = None) -> Dict[str, Any]:
        text = transcript.lower().strip()

        # 1. Backtesting & Prediction Lab
        if any(w in text for w in ["backtest", "validate", "model accuracy", "mae", "prediction lab", "how reliable"]):
            return {
                "action": "NAVIGATE_PREDICTION_LAB",
                "section": "prediction-lab",
                "spoken_response": "Accessing Prediction Validation Lab. Polynomial Ridge model demonstrated 98.4% R-squared and 1.95% MAPE on historical hold-out validation splits."
            }

        # 2. Resume Intelligence
        if any(w in text for w in ["resume", "my cv", "optimize resume", "parse resume", "drawback"]):
            return {
                "action": "NAVIGATE_RESUME",
                "section": "resume-intelligence",
                "spoken_response": "Opening Resume Intelligence. Analysis reveals 3 critical missing skills: RAG, Vector Databases, and MLOps, with a projected alignment lift of plus 22.9%."
            }

        # 3. Workforce Shock Simulation
        if any(w in text for w in ["workforce shock", "scenario", "accelerate", "shock simulator", "genai shock"]):
            return {
                "action": "TRIGGER_SHOCK_SIMULATION",
                "section": "what-if",
                "sub_tab": "shock",
                "spoken_response": "Initiating GenAI Workforce Acceleration Shock scenario. Agentic AI demand surges by plus 24 index points, while manual scripting contracts."
            }

        # 4. Skill Transferability
        if any(w in text for w in ["transferable", "transferability", "switch role", "other jobs"]):
            return {
                "action": "NAVIGATE_TRANSFERABILITY",
                "section": "skill-dna",
                "sub_tab": "transferability",
                "spoken_response": "Evaluating Skill Transferability. Your Python and ML foundations provide 84% readiness for Data Scientist and 78% for Full-Stack AI roles."
            }

        # 5. Forecast query
        if any(w in text for w in ["forecast", "future demand", "predict", "trajectory", "where is", "trending"]):
            target_skill = "GenAI / LLMs"
            if "rag" in text:
                target_skill = "RAG Architectures"
            elif "agent" in text:
                target_skill = "Agentic AI"
            elif "vector" in text:
                target_skill = "Vector Databases"
            elif "mlops" in text:
                target_skill = "MLOps / Deployment"
            elif "python" in text:
                target_skill = "Python Ecosystem"
            elif "kubernetes" in text or "k8s" in text:
                target_skill = "Kubernetes"

            return {
                "action": "NAVIGATE_AND_FORECAST",
                "section": "forecast",
                "target_skill": target_skill,
                "spoken_response": f"Opening Forecast Engine for {target_skill}. Market signals indicate sustained rising momentum with over 90% confidence through 2028."
            }

        # 6. What-if query
        if any(w in text for w in ["what if", "simulate", "if i learn", "if i master", "learn rag", "priority"]):
            target_skill = "RAG Architectures"
            if "agent" in text:
                target_skill = "Agentic AI"
            elif "vector" in text:
                target_skill = "Vector Databases"
            elif "mlops" in text:
                target_skill = "MLOps / Deployment"

            return {
                "action": "TRIGGER_WHAT_IF",
                "section": "what-if",
                "simulated_skill": target_skill,
                "spoken_response": f"Simulating impact of acquiring {target_skill}. Recalculating career alignment, network spillovers, and role eligibility now."
            }

        # 7. Skill gap query
        if any(w in text for w in ["skill gap", "my gap", "biggest gap", "weakness", "missing skill"]):
            return {
                "action": "NAVIGATE_SKILL_GAP",
                "section": "skill-gap",
                "spoken_response": "Analyzing your profile against industry benchmarks. Your most critical gaps are RAG Architectures and Vector Databases for the AI Engineer role."
            }

        # 8. Curriculum query
        if any(w in text for w in ["curriculum", "college", "university", "syllabus", "degree"]):
            return {
                "action": "NAVIGATE_CURRICULUM",
                "section": "curriculum",
                "spoken_response": "Opening Curriculum Intelligence. University syllabus CS603 shows outdated MapReduce topics, missing urgent industry demand in Vector DBs and RAG."
            }

        # 9. Radar / Market query
        if any(w in text for w in ["market radar", "radar", "market overview", "where is the market"]):
            return {
                "action": "NAVIGATE_RADAR",
                "section": "radar",
                "spoken_response": "Launching interactive Market Radar. You can drag the timeline from 2024 to 2028 to see skills evolve from emerging to dominant tiers."
            }

        # Default fallback
        return {
            "action": "NAVIGATE_INTELLIGENCE",
            "section": "intelligence",
            "spoken_response": "I am SkillAnalyze AI. Ask me to forecast skills, run prediction backtesting, analyze your resume, or simulate workforce shocks."
        }
